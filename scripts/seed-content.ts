/*
  One-off: fills an empty Supabase project with the content the site shipped
  with, converting each article's headed sections into the Tiptap document the
  CMS and the public renderer both expect.

    npx tsx scripts/seed-content.ts

  Safe to re-run: rows are matched on slug (articles) and name plus quote
  (testimonials), so nothing is duplicated. It talks to the database with the
  service role key, which is why it lives in scripts/ and never in src/.
*/

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { basename, extname, join } from "node:path";

import { posts } from "./seed-data/posts";
import { testimonials } from "./seed-data/testimonials";

// --- env ------------------------------------------------------------------

/** Minimal .env.local reader: one dependency fewer for a script run once. */
function loadEnv(file = ".env.local") {
  try {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const value = match[2].replace(/^["']|["']$/g, "");
      if (!process.env[match[1]]) process.env[match[1]] = value;
    }
  } catch {
    // Fall through to whatever is already in the environment.
  }
}

loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are needed. Copy .env.example to .env.local first.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

// --- helpers --------------------------------------------------------------

type TextNode = { type: "text"; text: string };
type BlockNode = {
  type: "heading" | "paragraph";
  attrs?: { level: number };
  content: TextNode[];
};

/** `{heading, paragraphs[]}` sections become an h2 followed by paragraphs. */
function toTiptapDoc(
  sections: { heading: string; paragraphs: string[] }[],
): { type: "doc"; content: BlockNode[] } {
  const content: BlockNode[] = [];

  for (const section of sections) {
    content.push({
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: section.heading }],
    });

    for (const paragraph of section.paragraphs) {
      content.push({
        type: "paragraph",
        content: [{ type: "text", text: paragraph }],
      });
    }
  }

  return { type: "doc", content };
}

function readingMinutes(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));
}

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

/**
 * Puts a file from public/testimonials into the media bucket, at a stable path
 * so re-running the seed overwrites rather than accumulating copies. Returns
 * the object path the row stores, or null if the upload failed.
 */
async function uploadTestimonialPhoto(file: string) {
  const extension = extname(file).toLowerCase();
  const contentType = MIME[extension];
  if (!contentType) {
    console.error(`  no known type for ${file}; skipping the photo`);
    return null;
  }

  const objectPath = `testimonials/seed/${basename(file)}`;
  const { error } = await supabase.storage
    .from("media")
    .upload(objectPath, readFileSync(join("public", "testimonials", file)), {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error(`  could not upload ${file}: ${error.message}`);
    return null;
  }

  return objectPath;
}

/**
 * The site caches its content until something invalidates it, and writing
 * straight to Postgres like this tells it nothing. Ping the revalidate route so
 * the seeded rows actually appear. Skipped, with a note, when the site address
 * is not configured.
 */
async function refreshSiteCache() {
  const site = process.env.SITE_URL;
  const secret = process.env.CRON_SECRET;

  if (!site || !secret) {
    console.log(
      "\nSet SITE_URL and CRON_SECRET to have the site's cache refreshed\n" +
        "automatically. Without it the new rows appear on the next deploy or\n" +
        "daily revalidation.",
    );
    return;
  }

  try {
    const response = await fetch(`${site}/api/revalidate`, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}` },
    });
    console.log(
      response.ok
        ? "\nSite cache refreshed."
        : `\nCould not refresh the site cache: ${response.status}`,
    );
  } catch (cause) {
    console.log(
      `\nCould not reach the site to refresh its cache: ${
        cause instanceof Error ? cause.message : "unknown failure"
      }`,
    );
  }
}

// --- seed -----------------------------------------------------------------

async function main() {
  const { data: categories, error: categoryError } = await supabase
    .from("categories")
    .select("slug, label");

  if (categoryError || !categories?.length) {
    console.error(
      "No categories found. Run supabase/migrations/0001_init.sql and 0002_seed_categories.sql first.",
    );
    process.exit(1);
  }

  const slugForLabel = new Map(
    categories.map((row) => [row.label as string, row.slug as string]),
  );

  /*
    `placeholder` arrives with migration 0004, which has to be run by hand in
    the SQL editor. Seeding should not be blocked on that, so probe for the
    column and drop the field where the migration has not been applied yet. The
    seeded rows are filler either way; without the column the CMS simply cannot
    show which ones.
  */
  const probe = await supabase.from("posts").select("placeholder").limit(1);
  const marksPlaceholders = !probe.error;

  if (!marksPlaceholders) {
    console.log(
      "\nNote: no `placeholder` column, so the seeded rows cannot be marked\n" +
        "as filler in the CMS. Run supabase/migrations/0004_placeholder_flag.sql\n" +
        "in the SQL editor and seed again to add the mark.\n",
    );
  }

  /** Spreads `{ placeholder }` only where the column exists. */
  const mark = (value: boolean) =>
    marksPlaceholders ? { placeholder: value } : {};

  for (const post of posts) {
    const categorySlug = slugForLabel.get(post.category);
    if (!categorySlug) {
      console.error(`No category matches "${post.category}"; skipping ${post.slug}.`);
      continue;
    }

    const body = toTiptapDoc(post.sections);
    const words = post.sections
      .flatMap((section) => [section.heading, ...section.paragraphs])
      .join(" ");

    const { error } = await supabase.from("posts").upsert(
      {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        lead: post.lead,
        body,
        category_slug: categorySlug,
        reading_minutes: readingMinutes(`${post.lead} ${words}`),
        status: "published",
        published_at: `${post.date}T09:00:00Z`,
        ...mark(post.placeholder),
      },
      { onConflict: "slug" },
    );

    console.log(error ? `  failed ${post.slug}: ${error.message}` : `  ${post.slug}`);
  }

  for (const testimonial of testimonials) {
    const categorySlug = slugForLabel.get(testimonial.service);
    if (!categorySlug) {
      console.error(
        `No category matches "${testimonial.service}"; skipping ${testimonial.name}.`,
      );
      continue;
    }

    const { data: existing } = await supabase
      .from("testimonials")
      .select("id")
      .eq("name", testimonial.name)
      .eq("quote", testimonial.quote)
      .maybeSingle();

    if (existing) {
      // Re-running after migration 0004 should still mark the filler, so the
      // ordering of "seed" and "run the migration" does not matter.
      if (marksPlaceholders) {
        await supabase
          .from("testimonials")
          .update({ placeholder: testimonial.placeholder })
          .eq("id", existing.id);
      }
      console.log(`  ${testimonial.name} already present`);
      continue;
    }

    const photoPath = testimonial.photo
      ? await uploadTestimonialPhoto(testimonial.photo.file)
      : null;

    const { error } = await supabase.from("testimonials").insert({
      quote: testimonial.quote,
      name: testimonial.name,
      location: testimonial.location,
      category_slug: categorySlug,
      photo_path: photoPath,
      photo_alt: photoPath ? testimonial.photo?.alt : null,
      /*
        For the three real ones, consent comes from their publication on the
        2021 site. For the invented ones there is no third party who could give
        or withhold it, so this flag only satisfies the table constraint and
        says nothing at all. `placeholder` below carries the truth, and it is
        what the pre-launch cleanup deletes on.
      */
      consent_on_file: true,
      status: "published",
      published_at: new Date().toISOString(),
      sort_index: testimonials.indexOf(testimonial),
      ...mark(testimonial.placeholder),
    });

    console.log(
      error ? `  failed ${testimonial.name}: ${error.message}` : `  ${testimonial.name}`,
    );
  }

  await refreshSiteCache();

  const invented =
    testimonials.filter((item) => item.placeholder).length +
    posts.filter((item) => item.placeholder).length;

  console.log(
    "\nDone. Three testimonials are real, recovered from the 2021 site with\n" +
      `their photographs. The other ${invented} rows are filler written by the\n` +
      "build, so that every service page has three testimonials and three\n" +
      "articles behind it rather than one lonely card in a grid of three.\n\n" +
      "Replace or delete them before the site is advertised as a live\n" +
      "business:\n\n" +
      "  delete from public.testimonials where placeholder;\n" +
      "  delete from public.posts        where placeholder;\n",
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
