import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { CATEGORIES_TAG } from "@/lib/content/categories";
import { POSTS_TAG } from "@/lib/content/posts";
import { TESTIMONIALS_TAG } from "@/lib/content/testimonials";

/**
 * Drops the cached content so the next request rebuilds it.
 *
 * Saving in /admin already does this for the row it touched, which covers the
 * ordinary way content changes. This route is for the times something writes to
 * the database behind the app's back: the seed script, a fix applied in the
 * Supabase table editor, a restored backup. Without it those changes sit
 * invisible until the pages happen to revalidate on their own.
 *
 * Same bearer secret as the heartbeat, so it cannot be used to make a stranger
 * rebuild the site on demand.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.CRON_SECRET;

  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  }

  const tags = [POSTS_TAG, TESTIMONIALS_TAG, CATEGORIES_TAG];

  // Stale-while-revalidate rather than an immediate expiry: a visitor mid-read
  // keeps the old copy for a moment instead of waiting on a fresh render.
  for (const tag of tags) revalidateTag(tag, "max");

  return NextResponse.json({ ok: true, revalidated: tags });
}
