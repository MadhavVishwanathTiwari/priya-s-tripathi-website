import type { Metadata } from "next";
import Image from "next/image";

import { CalendarIcon } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { Button } from "@/components/ui/Button";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";
import { site } from "@/data/site";

const description =
  "Vastu, astrology, numerology, tarot, healing and the combined analysis. What each consultation covers, what it costs, and which one suits the question you are bringing.";

export const metadata: Metadata = {
  title: `Services | ${site.name}`,
  description,
  openGraph: { title: `Services | ${site.name}`, description, type: "website" },
};

export default function ServicesPage() {
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
            <div className="flex flex-col items-center text-center">
              <p className="text-[0.62rem] tracked-wide text-gold-deep">
                Services
              </p>

              <h1 className="mt-4 text-balance font-serif text-display font-light text-ink">
                Six ways in
              </h1>

              <p className="mt-5 max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-ink-soft">
                {description}
              </p>

              <DecorativeDivider className="mt-8" />
            </div>
          </div>
        </section>

        <section
          aria-label="All services"
          className="bg-cream-raised py-[clamp(3rem,6vw,5.5rem)]"
        >
          <div className="container-page">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {services.map((service, index) => (
                <Reveal key={service.slug} delay={(index % 3) * 70}>
                  <ServiceCard service={service} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream py-[clamp(3rem,6vw,5rem)]">
          <div className="container-page">
            <Reveal className="mx-auto max-w-2xl rounded-sm bg-band-quote p-8 text-center sm:p-10">
              <h2 className="font-serif text-[clamp(1.3rem,2.6vw,1.7rem)] font-light text-ink">
                Not sure which one you need?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-pretty text-[0.9rem] leading-relaxed text-ink-muted">
                Most people arrive with a situation rather than a service.
                Describe it and she will tell you which reading answers it, or
                whether one is needed at all.
              </p>

              <div className="mt-7 flex justify-center">
                <Button
                  href="/contact"
                  icon={<CalendarIcon className="h-4 w-4" />}
                >
                  Book Consultation
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
