import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPublishedTestimonials } from "@/lib/content/testimonials";

/**
 * Client words on a slow left-to-right drift. The row is full-bleed rather than
 * boxed inside `container-page`, so the cards fade in and out at the viewport
 * edges instead of arriving from behind a hard boundary; the marquee mechanics
 * live in `globals.css`. With nothing published the section drops out entirely.
 */
export async function Testimonials() {
  const testimonials = await getPublishedTestimonials();

  if (testimonials.length === 0) return null;

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
        <div className="marquee">
          <div className="marquee-track">
            {/*
              Two identical passes. The second is a purely visual tail that keeps
              the loop seamless, so it is hidden from assistive tech.
            */}
            {[false, true].map((isClone) => (
              <ul
                key={String(isClone)}
                className="flex"
                aria-hidden={isClone || undefined}
              >
                {testimonials.map((testimonial, index) => (
                  <li
                    key={testimonial.id}
                    className="w-[clamp(17rem,82vw,21.5rem)] shrink-0 pr-4 sm:pr-5"
                  >
                    <TestimonialCard testimonial={testimonial} index={index} />
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
