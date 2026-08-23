import Image from "next/image";

import { ArrowRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { FramedPhoto } from "@/components/ui/FramedPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blurb, credentials, portraits } from "@/data/about";
import { site } from "@/data/site";

/**
 * The handshake, not the biography: two paragraphs in her own voice beside the
 * portrait, with the full account a click away at /about.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden scroll-mt-24 bg-cream py-[clamp(3.5rem,7vw,6.5rem)]"
    >
      <Image
        src="/decorative/botanical-4.png"
        alt=""
        aria-hidden="true"
        width={300}
        height={300}
        className="pointer-events-none absolute -left-14 bottom-0 w-36 opacity-20 sm:w-44 lg:w-56"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal className="mx-auto w-[15rem] sm:w-[17rem] lg:w-full lg:max-w-[21rem]">
            <FramedPhoto
              src={portraits.room.src}
              alt={`${site.founder.name}, ${site.founder.title}`}
              width={portraits.room.width}
              height={portraits.room.height}
              sizes="(min-width: 1024px) 21rem, 17rem"
            />
          </Reveal>

          <div>
            <SectionHeading id="about-heading" align="left">
              About Priya
            </SectionHeading>

            <Reveal delay={80}>
              <p className="mt-6 font-script text-4xl leading-tight text-gold-deep sm:text-5xl">
                {site.founder.name}
              </p>
              <p className="mt-1 text-[0.62rem] tracked-wide text-ink-muted">
                {site.founder.title}
              </p>

              {blurb.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-5 text-pretty text-[0.92rem] leading-[1.85] text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}

              <ul className="mt-7 flex flex-wrap gap-2">
                {credentials.map((credential) => (
                  <li
                    key={credential}
                    className="rounded-full border border-gold/35 px-3.5 py-1.5 text-[0.68rem] text-gold-deep"
                  >
                    {credential}
                  </li>
                ))}
              </ul>

              <Button
                href="/about"
                variant="ghost"
                className="mt-8"
                trailing={<ArrowRightIcon className="h-3.5 w-3.5" />}
              >
                Read her story
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
