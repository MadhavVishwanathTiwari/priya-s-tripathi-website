import { cacheLife, cacheTag } from "next/cache";

import { getCategoryMap } from "@/lib/content/categories";
import type { Testimonial } from "@/lib/content/types";
import { publicClient } from "@/lib/supabase/public";
import { mediaUrl } from "@/lib/supabase/env";

export const TESTIMONIALS_TAG = "testimonials";

/**
 * Ordered by `sort_index`, so the marquee keeps the sequence the admin set
 * rather than drifting with edit times. Only published rows are readable, and a
 * row cannot be published without consent recorded against it.
 */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheTag(TESTIMONIALS_TAG);
  cacheLife("max");

  const categories = await getCategoryMap();

  const { data, error } = await publicClient()
    .from("testimonials")
    .select("id, quote, name, location, category_slug, photo_path, photo_alt")
    .eq("status", "published")
    .order("sort_index")
    .order("created_at");

  if (error) {
    console.error(`Could not load testimonials: ${error.message}`);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    quote: row.quote,
    name: row.name,
    location: row.location,
    service: categories.get(row.category_slug)?.label ?? row.category_slug,
    photo:
      row.photo_path && row.photo_alt
        ? { url: mediaUrl(row.photo_path), alt: row.photo_alt }
        : null,
  }));
}
