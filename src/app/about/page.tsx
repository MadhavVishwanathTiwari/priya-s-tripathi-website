import type { Metadata } from "next";
import Image from "next/image";

import { CalendarIcon } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { credentials, mission, portraits, story, vision } from "@/data/about";
import { site } from "@/data/site";

const description =
  "Priya Swaroop Tripathi, Numero-Vastu consultant. From a childhood spent reading Cheiro's Book of Numbers to a practice serving clients across the globe.";

export const metadata: Metadata = {
  title: `About ${site.founder.name} | ${site.name}`,
  description,
  openGraph: {
    title: `About ${site.founder.name}`,
    description,
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        <section className="relative isolate overflow-hidden bg-cream py-[clamp(2.75rem,6vw,5rem)]">
          <Image
            src="/decorative/mandala.png"
            alt=""
            aria-hidden="true"
            width={400}
            height={400}
            className="pointer-events-none absolute -right-16 -top-10 w-44 opacity-15 sm:w-56 lg:w-72"
          />

          <div className="container-page relative">
            <Reveal className="flex flex-col items-center text-center">
              <p className="text-[0.62rem] tracked-wide text-gold-deep">About</p>

              <h1 className="mt-4 text-balance font-serif text-display font-light text-ink">
                {site.founder.name}
              </h1>

              <p className="mt-3 text-[0.62rem] tracked-wide text-ink-muted">
                {site.founder.title}
              </p>

              <DecorativeDivider className="mt-8" />
            </Reveal>
          </div>
        </section>

        {/*
          The photograph is floated rather than columned: seven paragraphs beside
          a lone image read as two columns that have lost each other. Below the
          float breakpoint it simply sits above the story.
        */}
        <section className="bg-cream-raised py-[clamp(2.5rem,5.5vw,4.5rem)]">
          <div className="container-page">
            <div className="mx-auto max-w-[48rem]">
              <figure className="mb-8 md:float-right md:mb-6 md:ml-10 md:w-[19rem]">
                <Image
                  src={portraits.room.src}
                  alt={`${site.founder.name} at work`}
                  width={portraits.room.width}
                  height={portraits.room.height}
                  sizes="(min-width: 768px) 19rem, 100vw"
                  className="h-auto w-full rounded-sm"
                  priority
                />
              </figure>

              {story.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className={
                    index === 0
                      ? "text-pretty font-serif text-[clamp(1.15rem,2.2vw,1.4rem)] font-light leading-relaxed text-ink"
                      : "mt-5 text-pretty text-[0.95rem] leading-[1.85] text-ink-soft"
                  }
                >
                  {paragraph}
                </p>
              ))}

              <div className="clear-both" />

              <div className="mt-12 flex flex-col items-end border-t border-gold/20 pt-6">
                <p className="font-script text-4xl leading-tight text-gold-deep">
                  {site.founder.name}
                </p>
                <p className="text-[0.62rem] tracked-wide text-ink-muted">
                  {site.founder.role}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="vision-heading"
          className="bg-cream py-[clamp(3rem,6vw,5rem)]"
        >
          <div className="container-page">
            <SectionHeading id="vision-heading">Vision and Mission</SectionHeading>

            <div className="mt-9 grid gap-4 lg:mt-11 lg:grid-cols-2 lg:gap-5">
              <Reveal>
                <article className="h-full rounded-sm bg-card-cream p-7 sm:p-8">
                  <h3 className="text-[0.7rem] tracked text-gold-deep">Vision</h3>
                  <p className="mt-4 text-pretty font-serif text-[1.15rem] font-light leading-relaxed text-ink">
                    {vision}
                  </p>
                </article>
              </Reveal>

              <Reveal delay={70}>
                <article className="h-full rounded-sm bg-card-rose p-7 sm:p-8">
                  <h3 className="text-[0.7rem] tracked text-gold-deep">Mission</h3>
                  <p className="mt-4 text-pretty font-serif text-[1.15rem] font-light leading-relaxed text-ink">
                    {mission}
                  </p>
                </article>
              </Reveal>
            </div>

            <Reveal className="mt-12">
              <h2 className="text-center text-[0.7rem] tracked text-ink-soft">
                Areas of study
              </h2>
              <ul className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2">
                {credentials.map((credential) => (
                  <li
                    key={credential}
                    className="rounded-full border border-gold/35 px-3.5 py-1.5 text-[0.68rem] text-gold-deep"
                  >
                    {credential}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="bg-cream-raised py-[clamp(3rem,6vw,5rem)]">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl rounded-sm bg-band-quote p-8 text-center sm:p-10">
              <h2 className="font-serif text-[clamp(1.3rem,2.6vw,1.7rem)] font-light text-ink">
                Work with me
              </h2>

              <p className="mx-auto mt-3 max-w-md text-pretty text-[0.9rem] leading-relaxed text-ink-muted">
                {site.location.note} Reach me on{" "}
                <a
                  href={site.contact.whatsappHref}
                  className="text-gold-deep underline decoration-gold/40 underline-offset-4 hover:text-peach"
                >
                  WhatsApp
                </a>{" "}
                or by telephone on {site.contact.phone}.
              </p>

              <p className="mt-4 text-[0.78rem] text-ink-muted">
                {site.location.line}
                <span className="block">{site.location.region}</span>
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href="/#book"
                  icon={<CalendarIcon className="h-4 w-4" />}
                >
                  Book Consultation
                </Button>
                <Button href="/#services" variant="ghost">
                  See all services
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
