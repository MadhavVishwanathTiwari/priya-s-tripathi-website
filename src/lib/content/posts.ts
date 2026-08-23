import { cacheLife, cacheTag } from "next/cache";

import { getCategoryMap, type Category } from "@/lib/content/categories";
import { readingMinutes } from "@/lib/content/richtext";
import {
  asRichTextDoc,
  type Post,
  type PostSummary,
} from "@/lib/content/types";
import { publicClient } from "@/lib/supabase/public";
import { mediaUrl } from "@/lib/supabase/env";

/*
  Reads for the public pages.

  Every function is a `use cache` scope tagged with the collection it reads, and
  given the `max` lifetime: this is CMS content, so it should sit in the static
  shell until an edit invalidates it rather than expiring on a timer. The admin
  server actions call `updateTag` after each mutation, which is what makes a
  publish show up without a redeploy.
*/

export const POSTS_TAG = "posts";
export const postTag = (slug: string) => `post:${slug}`;

type CategoryMap = Map<string, Category>;

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category_slug: string;
  cover_path: string | null;
  cover_alt: string | null;
  reading_minutes: number;
  published_at: string | null;
  created_at: string;
};

const SUMMARY_COLUMNS =
  "id, slug, title, excerpt, category_slug, cover_path, cover_alt, reading_minutes, published_at, created_at";

function toSummary(row: PostRow, categories: CategoryMap): PostSummary {
  const category = categories.get(row.category_slug);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: category?.label ?? row.category_slug,
    categorySlug: row.category_slug,
    glyph: category?.iconPath ?? "/logo-mark.png",
    cover:
      row.cover_path && row.cover_alt
        ? { url: mediaUrl(row.cover_path), alt: row.cover_alt }
        : null,
    // Stored as a timestamp, rendered as a day by `formatDate`. A published
    // row always has a date; the fallback only matters if one is read back
    // through the admin before publishing.
    date: (row.published_at ?? row.created_at).slice(0, 10),
    readingMinutes: row.reading_minutes,
  };
}

/** Newest first. Drafts never reach here: row level security hides them. */
export async function getPublishedPosts(): Promise<PostSummary[]> {
  "use cache";
  cacheTag(POSTS_TAG);
  cacheLife("max");

  const categories = await getCategoryMap();

  const { data, error } = await publicClient()
    .from("posts")
    .select(SUMMARY_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  // See the note in categories.ts: an unreachable project drops the section
  // rather than taking the page down with it.
  if (error) {
    console.error(`Could not load posts: ${error.message}`);
    return [];
  }

  return (data ?? []).map((row) => toSummary(row as PostRow, categories));
}

/** The three carried on the homepage. */
export async function getFeaturedPosts(limit = 3): Promise<PostSummary[]> {
  const posts = await getPublishedPosts();
  return posts.slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  "use cache";
  cacheTag(POSTS_TAG, postTag(slug));
  cacheLife("max");

  const categories = await getCategoryMap();

  const { data, error } = await publicClient()
    .from("posts")
    .select(`${SUMMARY_COLUMNS}, lead, body`)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  // Unlike the listings, this one throws: answering "no such article" when the
  // truth is "the database did not answer" would be a lie told to a visitor and
  // to the crawler behind them.
  if (error) throw new Error(`Could not load post ${slug}: ${error.message}`);
  if (!data) return null;

  const row = data as PostRow & { lead: string; body: unknown };
  const body = asRichTextDoc(row.body);

  return {
    ...toSummary(row, categories),
    lead: row.lead,
    body,
    // Trust the stored estimate, but never show zero if a row predates it.
    readingMinutes: row.reading_minutes || readingMinutes(body, row.lead),
  };
}

/** Further reading at the foot of an article. */
export async function getRelatedPosts(
  slug: string,
  count = 2,
): Promise<PostSummary[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.slug !== slug).slice(0, count);
}

/** Slugs for `generateStaticParams`. */
export async function getPublishedSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((post) => post.slug);
}
