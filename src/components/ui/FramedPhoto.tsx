import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * A photograph mounted the way a photograph in a house is mounted: a cream mat,
 * a gold hairline where the mat meets the image, a thin frame, and a shadow soft
 * enough to lift it off the page without announcing itself.
 *
 * Shared rather than written twice, so the portrait on the home page and the one
 * on /about are unmistakably the same treatment.
 */
export function FramedPhoto({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn("relative", className)}>
      {/* A bloom under the frame, so it sits in the cream rather than on it. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(circle,var(--color-peach-soft),transparent_70%)] opacity-60 blur-2xl"
      />

      <div className="relative rounded-sm border border-gold/30 bg-cream-raised p-2.5 shadow-[0_24px_55px_-32px_rgba(90,70,55,0.6)]">
        <div className="overflow-hidden rounded-[2px] ring-1 ring-inset ring-gold/25">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={priority}
            className="h-auto w-full"
          />
        </div>
      </div>
    </figure>
  );
}
