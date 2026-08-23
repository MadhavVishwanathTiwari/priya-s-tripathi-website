import type { NextConfig } from "next";

/*
  Post covers and testimonial photos are served from the project's Supabase
  storage bucket. Built from the env var so a new project needs no code change;
  when it is unset (a fresh clone before setup) the list is simply empty and
  next/image rejects remote sources, which is the safe default.
*/
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const remotePatterns = supabaseUrl
  ? [new URL(`${supabaseUrl}/storage/v1/object/public/media/**`)]
  : [];

const nextConfig: NextConfig = {
  // Dev-only floating badge; it overlaps page content when reviewing layouts.
  devIndicators: false,
  /*
    Content comes from Supabase, so the pages need to say what may be cached.
    With Cache Components the reads in `src/lib/content` are explicit `use cache`
    scopes tagged by collection, and the admin invalidates a tag on save. The
    pages stay in the static shell and a publish still appears without a deploy.
  */
  cacheComponents: true,
  images: {
    /*
      WebP only. AVIF buys a little extra compression but its encoder is an order
      of magnitude slower, which stalls the dev image optimizer on the large hero
      photograph; WebP is universally supported and encodes fast.
    */
    formats: ["image/webp"],
    remotePatterns,
  },
};

export default nextConfig;
