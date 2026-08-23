import Image from "next/image";

import { HeroFeature } from "@/components/hero/HeroFeature";
import { ArrowRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { Reveal } from "@/components/ui/Reveal";
import { features } from "@/data/features";

const HERO_ALT =
  "A calm, light-filled consultation room with a gold Sri Yantra artwork, plants and cream furniture";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-cream"
    >
      {/* Desktop: photograph bleeds off the right edge and dissolves into the cream. */}
      <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <Image
          src="/hero.jpg"
          alt={HERO_ALT}
          fill
          priority
          sizes="60vw"
          className="object-cover object-[70%_center]"
        />
        <div aria-hidden="true" className="hero-fade-x absolute inset-0" />
      </div>

      {/* Faint mandala bleeding off the left edge, as in the reference. */}
      <Image
        src="/decorative/mandala.png"
        alt=""
        aria-hidden="true"
        width={178}
        height={178}
        className="pointer-events-none absolute -left-24 top-24 hidden w-72 opacity-[0.11] md:block lg:w-96"
      />

      <div className="container-page relative">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_42%] lg:gap-8">
          <div className="lg:py-[clamp(3.5rem,6vw,6rem)]">
            {/*
              Mobile recomposition: rather than shrinking the desktop two-column
              split, the copy sits on cream and the photograph gets its own
              full-bleed band beneath it, cropped to keep the yantra in frame.
            */}
            <Reveal className="block pt-8 sm:pt-10 lg:pt-0">
              <p className="text-[0.72rem] font-medium tracked-wide text-peach sm:text-[0.8rem]">
                Cosmic Energy Architect
              </p>

              <h1
                id="hero-heading"
                className="mt-4 font-serif text-hero font-light leading-[1.08] text-ink"
              >
                Vastu <span className="text-peach">•</span> Astrology
                <span className="block">Numerology</span>
              </h1>

              <DecorativeDivider className="mt-6 max-w-[15rem]" />

              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink-muted sm:text-base">
                Bringing balance to your space, numbers, and destiny.
                <span className="block">
                  For a life of clarity, abundance &amp; inner peace.
                </span>
              </p>
            </Reveal>

            <div className="relative -mx-[clamp(1.25rem,4vw,4rem)] mt-8 h-[clamp(14rem,60vw,22rem)] lg:hidden">
              <Image
                src="/hero-mobile.jpg"
                alt={HERO_ALT}
                fill
                priority
                sizes="100vw"
                className="object-cover object-[58%_38%]"
              />
              <div aria-hidden="true" className="hero-fade-y absolute inset-x-0 top-0 h-24" />
            </div>

            <Reveal delay={120}>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-7 pt-10 xs:grid-cols-4 xs:gap-x-2 sm:gap-x-4 lg:pt-12 xl:max-w-[34rem]">
                {features.map((feature) => (
                  <HeroFeature key={feature.label} feature={feature} />
                ))}
              </ul>

              <div className="pb-14 pt-9 lg:pb-0 lg:pt-11">
                <Button
                  href="#services"
                  trailing={<ArrowRightIcon className="h-4 w-4" />}
                >
                  Explore Services
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
