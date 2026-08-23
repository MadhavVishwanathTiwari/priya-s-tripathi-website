import Image from "next/image";

import type { Testimonial } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/**
 * One quote in the rotating row. Alternating cream/rose tints echo the service
 * cards; `h-full` lets every card match the tallest in the track so the strip
 * keeps a single baseline as it drifts.
 *
 * A client photo replaces the gold initial when the CMS has one, which most of
 * the time it will not: consent for a photograph is a bigger ask than consent
 * for the words.
 */
export function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-sm border border-transparent p-6 transition-colors duration-300 sm:p-7",
        "hover:border-gold/25",
        index % 2 === 0 ? "bg-card-cream" : "bg-card-rose",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className="select-none font-serif text-5xl leading-[0.7] text-gold/45"
        >
          &ldquo;
        </span>
        <p className="pt-1 text-right text-[0.62rem] tracked text-gold-deep/80">
          {testimonial.service}
        </p>
      </div>

      <blockquote className="mt-4 flex-1 text-pretty font-serif text-[1.05rem] font-light italic leading-relaxed text-ink">
        {testimonial.quote}
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-gold/20 pt-4">
        {testimonial.photo ? (
          <Image
            src={testimonial.photo.url}
            alt={testimonial.photo.alt}
            width={80}
            height={80}
            sizes="40px"
            className="h-10 w-10 shrink-0 rounded-full border border-gold/40 object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 font-serif text-[1.1rem] text-gold-deep"
          >
            {testimonial.name.charAt(0)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-[0.72rem] font-medium tracked text-ink">
            {testimonial.name}
          </span>
          <span className="mt-0.5 block text-[0.8rem] text-ink-muted">
            {testimonial.location}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
