"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

import { readingMinutes, slugify } from "@/lib/content/plaintext";
import { POSTS_TAG, postTag } from "@/lib/content/posts";
import { TESTIMONIALS_TAG } from "@/lib/content/testimonials";
import { asRichTextDoc } from "@/lib/content/types";
import type { Json, PostStatus } from "@/lib/supabase/database.types";
import { MEDIA_BUCKET } from "@/lib/supabase/env";
import { currentAdmin, serverClient } from "@/lib/supabase/server";
import type { FormState } from "@/components/admin/form-state";

/*
  Every mutation the CMS can make.

  Each one ends by invalidating the tags the public reads are cached under.
  `updateTag` rather than `revalidateTag`: it expires the entry immediately, so
  the editor sees her own change the moment she lands back on the site instead
  of a stale copy that refreshes a beat later.
*/

function fail(message: string, fieldErrors?: Record<string, string>): FormState {
  return { status: "error", message, fieldErrors };
}

/** The layout gates the pages; this gates the actions themselves. */
async function requireAdmin() {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

function text(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function lengthError(
  label: string,
  value: string,
  max: number,
): string | undefined {
  if (!value) return `${label} is needed.`;
  if (value.length > max) return `${label} is ${value.length} characters; the limit is ${max}.`;
  return undefined;
}

/**
 * Removes an object that is no longer referenced. Failure here is logged rather
 * than surfaced: an orphaned file is untidy, not broken, and it must never cost
 * the editor her save.
 */
async function removeMedia(path: string | null | undefined) {
  if (!path) return;
  const supabase = await serverClient();
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path]);
  if (error) console.error(`Could not remove ${path} from storage:`, error.message);
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function savePost(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const title = text(formData, "title");
  const excerpt = text(formData, "excerpt");
  const lead = text(formData, "lead");
  const categorySlug = text(formData, "category_slug");
  const coverPath = text(formData, "cover_path") || null;
  const coverAlt = text(formData, "cover_alt") || null;
  const previousCoverPath = text(formData, "previous_cover_path") || null;
  const publish = text(formData, "intent") === "publish";
  const unpublish = text(formData, "intent") === "unpublish";
  const slug = slugify(text(formData, "slug") || title);

  let body;
  try {
    body = asRichTextDoc(JSON.parse(text(formData, "body") || "{}"));
  } catch {
    return fail("The article body could not be read. Try saving again.");
  }

  const fieldErrors: Record<string, string> = {};
  const titleError = lengthError("A title", title, 160);
  if (titleError) fieldErrors.title = titleError;
  const excerptError = lengthError("A summary", excerpt, 220);
  if (excerptError) fieldErrors.excerpt = excerptError;
  const leadError = lengthError("An opening paragraph", lead, 600);
  if (leadError) fieldErrors.lead = leadError;
  if (!categorySlug) fieldErrors.category_slug = "Choose which service this belongs to.";
  if (!slug) fieldErrors.slug = "A web address is needed.";
  if (coverPath && !coverAlt) {
    fieldErrors.cover_alt = "Describe the cover image for anyone who cannot see it.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return fail("Some details still need attention.", fieldErrors);
  }

  const supabase = await serverClient();

  // Preserve the original publication date across later edits.
  let publishedAt: string | null = null;
  let existingSlug: string | null = null;
  if (id) {
    const { data: existing } = await supabase
      .from("posts")
      .select("published_at, slug")
      .eq("id", id)
      .maybeSingle();
    publishedAt = existing?.published_at ?? null;
    existingSlug = existing?.slug ?? null;
  }

  const intended = unpublish ? "draft" : publish ? "published" : undefined;
  const nextStatus: PostStatus =
    intended ?? (text(formData, "status") === "published" ? "published" : "draft");

  const row = {
    slug,
    title,
    excerpt,
    lead,
    // The editor's document is JSON by construction; the row type just wants
    // to hear it said.
    body: body as unknown as Json,
    category_slug: categorySlug,
    cover_path: coverPath,
    cover_alt: coverPath ? coverAlt : null,
    reading_minutes: readingMinutes(body, lead),
    status: nextStatus,
    published_at:
      nextStatus === "published" ? (publishedAt ?? new Date().toISOString()) : publishedAt,
  };

  const query = id
    ? supabase.from("posts").update(row).eq("id", id)
    : supabase.from("posts").insert(row);

  const { error } = await query;

  if (error) {
    if (error.code === "23505") {
      return fail("Another article already uses that web address.", {
        slug: "Pick a different web address.",
      });
    }
    return fail(`The article could not be saved: ${error.message}`);
  }

  if (previousCoverPath && previousCoverPath !== coverPath) {
    await removeMedia(previousCoverPath);
  }

  updateTag(POSTS_TAG);
  updateTag(postTag(slug));
  if (existingSlug && existingSlug !== slug) updateTag(postTag(existingSlug));

  redirect("/admin/posts");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id");
  if (!id) return;

  const supabase = await serverClient();
  const { data: existing } = await supabase
    .from("posts")
    .select("slug, cover_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(`The article could not be deleted: ${error.message}`);

  await removeMedia(existing?.cover_path);

  updateTag(POSTS_TAG);
  if (existing?.slug) updateTag(postTag(existing.slug));

  redirect("/admin/posts");
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function saveTestimonial(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const id = text(formData, "id");
  const quote = text(formData, "quote");
  const name = text(formData, "name");
  const location = text(formData, "location");
  const categorySlug = text(formData, "category_slug");
  const photoPath = text(formData, "photo_path") || null;
  const photoAlt = text(formData, "photo_alt") || null;
  const previousPhotoPath = text(formData, "previous_photo_path") || null;
  const consent = formData.get("consent_on_file") === "on";
  const sortIndex = Number(text(formData, "sort_index") || "0");
  const publish = text(formData, "intent") === "publish";
  const unpublish = text(formData, "intent") === "unpublish";

  const fieldErrors: Record<string, string> = {};
  const quoteError = lengthError("The words", quote, 600);
  if (quoteError) fieldErrors.quote = quoteError;
  if (!name) fieldErrors.name = "A name is needed.";
  if (!location) fieldErrors.location = "A town or city is needed.";
  if (!categorySlug) fieldErrors.category_slug = "Choose which service this refers to.";
  if (photoPath && !photoAlt) {
    fieldErrors.photo_alt = "Describe the photo for anyone who cannot see it.";
  }
  if (publish && !consent) {
    fieldErrors.consent_on_file =
      "Written permission is needed before these words go on the site.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return fail("Some details still need attention.", fieldErrors);
  }

  const supabase = await serverClient();

  let publishedAt: string | null = null;
  if (id) {
    const { data: existing } = await supabase
      .from("testimonials")
      .select("published_at")
      .eq("id", id)
      .maybeSingle();
    publishedAt = existing?.published_at ?? null;
  }

  const status: PostStatus = unpublish
    ? "draft"
    : publish
      ? "published"
      : text(formData, "status") === "published"
        ? "published"
        : "draft";

  const row = {
    quote,
    name,
    location,
    category_slug: categorySlug,
    photo_path: photoPath,
    photo_alt: photoPath ? photoAlt : null,
    consent_on_file: consent,
    sort_index: Number.isFinite(sortIndex) ? sortIndex : 0,
    status,
    published_at:
      status === "published" ? (publishedAt ?? new Date().toISOString()) : publishedAt,
  };

  const { error } = id
    ? await supabase.from("testimonials").update(row).eq("id", id)
    : await supabase.from("testimonials").insert(row);

  if (error) return fail(`This testimonial could not be saved: ${error.message}`);

  if (previousPhotoPath && previousPhotoPath !== photoPath) {
    await removeMedia(previousPhotoPath);
  }

  updateTag(TESTIMONIALS_TAG);
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id");
  if (!id) return;

  const supabase = await serverClient();
  const { data: existing } = await supabase
    .from("testimonials")
    .select("photo_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(`This testimonial could not be deleted: ${error.message}`);

  await removeMedia(existing?.photo_path);

  updateTag(TESTIMONIALS_TAG);
  redirect("/admin/testimonials");
}

/** Swaps a row with its neighbour so the marquee order is editable in place. */
export async function moveTestimonial(formData: FormData) {
  await requireAdmin();

  const id = text(formData, "id");
  const direction = text(formData, "direction") === "up" ? "up" : "down";
  if (!id) return;

  const supabase = await serverClient();
  const { data: rows } = await supabase
    .from("testimonials")
    .select("id, sort_index")
    .order("sort_index")
    .order("created_at");

  if (!rows) return;

  const index = rows.findIndex((row) => row.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= rows.length) return;

  // Rewrite the whole column: the stored indexes may have collided or drifted,
  // and there are never more than a few dozen rows.
  const reordered = [...rows];
  [reordered[index], reordered[swapWith]] = [reordered[swapWith], reordered[index]];

  for (const [position, row] of reordered.entries()) {
    await supabase
      .from("testimonials")
      .update({ sort_index: position })
      .eq("id", row.id);
  }

  updateTag(TESTIMONIALS_TAG);
}

// ---------------------------------------------------------------------------
// Session
// ---------------------------------------------------------------------------

export async function signOut() {
  const supabase = await serverClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
