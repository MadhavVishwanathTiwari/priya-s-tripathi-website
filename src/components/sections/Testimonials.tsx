import type { CSSProperties } from "react";

import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPublishedTestimonials } from "@/lib/content/testimonials";

/*
  The track slides from -50% back to 0, so half of it is off screen at the
  start. With only a handful of testimonials that half is narrower than the
  viewport, and the row begins with the cards bunched at the left and nothing
  filling the right. Repeating the list until each half comfortably outruns a
  wide screen fixes it, whatever the CMS holds.
*/
const CARDS_PER_HALF = 6;

/*
  Seconds per card, which is how the duration stays honest as the count changes:
  a fixed duration would make three testimonials crawl and twelve of them race.
  17s across a 21.5rem card is a shade over 20px a second.
*/
const SECONDS_PER_CARD = 17;

/**
 * Client words on a slow left-to-right drift. The row is full-bleed rather than
 * boxed inside `container-page`, so the cards fade in and out at the viewport
 * edges instead of arriving from behind a hard boundary; the marquee mechanics
 * live in `globals.css`. With nothing published the section drops out entirely.
 */
export async function Testimonials() {
  const testimonials = await getPublishedTestimonials();

  if (testimonials.length === 0) return null;

  const repeats = Math.max(1, Math.ceil(CARDS_PER_HALF / testimonials.length));
  // Twice the repeats: the animation assumes the second half is an exact copy
  // of the first, which is what makes the loop seamless.
  const passes = repeats * 2;
  const duration = `${repeats * testimonials.length * SECONDS_PER_CARD}s`;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-24 bg-cream py-[clamp(3.5rem,7vw,6.5rem)]"
    >
      <div className="container-page">
        <SectionHeading id="testimonials-heading">Testimonials</SectionHeading>
      </div>

      <Reveal className="mt-9 lg:mt-11">
        <div
          className="marquee"
          style={{ "--marquee-duration": duration } as CSSProperties}
        >
          <div className="marquee-track">
            {/*
              Only the first pass is read out. The rest exist to keep the loop
              seamless, and `globals.css` drops them entirely when a reader has
              asked for reduced motion, leaving one honest scrollable row.
            */}
            {Array.from({ length: passes }, (_, pass) => (
              <ul
                key={pass}
                className="flex"
                aria-hidden={pass > 0 || undefined}
              >
                {testimonials.map((testimonial, index) => (
                  <li
                    key={testimonial.id}
                    className="w-[clamp(17rem,82vw,21.5rem)] shrink-0 pr-4 sm:pr-5"
                  >
                    <TestimonialCard
                      testimonial={testimonial}
                      /* Alternating tints run across the whole half rather than
                         restarting each pass, so no two same-coloured cards
                         meet at a seam. Taken modulo the repeats so both halves
                         stay identical and the loop still hides its join. */
                      index={(pass % repeats) * testimonials.length + index}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
