import { cacheLife, cacheTag } from "next/cache";

import { publicClient } from "@/lib/supabase/public";

export const CATEGORIES_TAG = "categories";

export type Category = {
  slug: string;
  label: string;
  /** Service glyph in `public/`, used wherever a post has no cover image. */
  iconPath: string;
};

/**
 * The fixed list of services a post or testimonial belongs to. Six rows that
 * change once a year, read by nearly every page, so it is cached hard and
 * joined in JavaScript rather than in every query.
 */
export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheTag(CATEGORIES_TAG);
  cacheLife("max");

  const { data, error } = await publicClient()
    .from("categories")
    .select("slug, label, icon_path")
    .order("sort_order");

  // A missing environment variable throws (that is a misconfiguration), but a
  // failed query does not: a paused or unreachable project should cost the site
  // its blog band, not the whole page.
  if (error) {
    console.error(`Could not load categories: ${error.message}`);
    return [];
  }

  return (data ?? []).map((row) => ({
    slug: row.slug,
    label: row.label,
    iconPath: row.icon_path,
  }));
}

export async function getCategoryMap(): Promise<Map<string, Category>> {
  const categories = await getCategories();
  return new Map(categories.map((category) => [category.slug, category]));
}
