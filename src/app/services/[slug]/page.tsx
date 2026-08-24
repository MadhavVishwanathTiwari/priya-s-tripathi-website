import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRightIcon, CalendarIcon } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/sections/PostCard";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { Button } from "@/components/ui/Button";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPublishedPosts } from "@/lib/content/posts";
import { getPublishedTestimonials } from "@/lib/content/testimonials";
import { fees } from "@/data/fees";
import { getService, services } from "@/data/services";
import { site } from "@/data/site";

type ServiceProps = {
  params: Promise<{ slug: string }>;
};

/** The catalogue is code, so every page is known and prerendered. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: `${service.title} | ${site.name}`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: ServiceProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const rows = fees.filter((fee) => fee.slug === service.slug);

  // Both of these already carry the service they belong to, so the page can
  // show its own proof and its own further reading without any new plumbing.
  const [testimonials, posts] = await Promise.all([
    getPublishedTestimonials(),
    getPublishedPosts(),
  ]);

  const said = testimonials.filter((item) => item.service === service.title);
  const reading = posts
    .filter((post) => post.categorySlug === service.slug)
    .slice(0, 3);

  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <Header />

      <main>
        <section className="relative isolate overflow-hidden bg-cream py-[clamp(2.75rem,6vw,5rem)]">
          <Image
            src="/decorative/botanical-2.png"
            alt=""
            aria-hidden="true"
            width={300}
            height={300}
            className="pointer-events-none absolute -right-12 top-4 w-32 opacity-25 sm:w-40 lg:w-52"
          />

          <div className="container-page relative">
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <Link
                href="/services"
                className="-ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-[0.72rem] tracked text-ink-muted transition-colors duration-200 hover:text-gold-deep"
              >
                <ArrowRightIcon
                  aria-hidden="true"
                  className="h-3.5 w-3.5 rotate-180"
                />
                All services
              </Link>

              <Image
                src={service.icon}
                alt=""
                aria-hidden="true"
                width={176}
                height={176}
                className="mt-2 h-16 w-16 object-contain"
              />

              <h1 className="mt-5 text-balance font-serif text-display font-light text-ink">
                {service.title}
              </h1>

              <p className="mt-4 text-pretty font-serif text-[clamp(1.05rem,2vw,1.25rem)] font-light italic leading-relaxed text-gold-deep">
                {service.tagline}
              </p>

              <DecorativeDivider className="mt-8" />
            </div>
          </div>
        </section>

        <section className="bg-cream-raised py-[clamp(2.5rem,5.5vw,4.5rem)]">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14">
              <div>
                {service.body.map((paragraph, index) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className={
                      index === 0
                        ? "text-pretty font-serif text-[clamp(1.05rem,1.9vw,1.2rem)] font-light leading-relaxed text-ink"
                        : "mt-5 text-pretty text-[0.97rem] leading-[1.85] text-ink-soft"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-5">
                <div className="rounded-sm bg-card-cream p-6 sm:p-7">
                  <h2 className="text-[0.68rem] tracked text-gold-deep">
                    What this covers
                  </h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[0.88rem] leading-relaxed text-ink-soft"
                      >
                        <span aria-hidden="true" className="text-gold">
                          &middot;
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {rows.length ? (
                  <div className="rounded-sm bg-card-rose p-6 sm:p-7">
                    <h2 className="text-[0.68rem] tracked text-gold-deep">
                      Fees
                    </h2>
                    <ul className="mt-4 flex flex-col divide-y divide-gold/20">
                      {rows.map((row) => (
                        <li
                          key={row.service}
                          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0"
                        >
                          <span className="text-[0.86rem] text-ink">
                            {row.service}
                            {row.note ? (
                              <span className="mt-0.5 block text-[0.78rem] text-ink-muted">
                                {row.note}
                              </span>
                            ) : null}
                          </span>
                          <span className="text-[0.86rem] text-gold-deep">
                            {row.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[0.78rem] leading-relaxed text-ink-muted">
                      Indicative starting points. You get a real figure before
                      anything is booked.
                    </p>
                  </div>
                ) : null}

                <div className="rounded-sm border border-gold/30 p-6 text-center sm:p-7">
                  <p className="text-pretty text-[0.88rem] leading-relaxed text-ink-soft">
                    Tell me what you are facing and I will say what this would
                    involve for you.
                  </p>
                  <Button
                    href={`/contact?service=${service.slug}`}
                    icon={<CalendarIcon className="h-4 w-4" />}
                    className="mt-5"
                  >
                    Book Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {service.faqs.length ? (
          <section
            aria-labelledby="service-faqs"
            className="bg-cream py-[clamp(3rem,6vw,5rem)]"
          >
            <div className="container-page">
              <SectionHeading id="service-faqs">Questions</SectionHeading>

              <div className="mx-auto mt-9 max-w-[46rem] lg:mt-11">
                <dl className="flex flex-col divide-y divide-line">
                  {service.faqs.map((faq) => (
                    <div key={faq.question} className="py-6 first:pt-0">
                      <dt className="font-serif text-[1.15rem] font-normal text-ink">
                        {faq.question}
                      </dt>
                      <dd className="mt-3 text-pretty text-[0.92rem] leading-[1.85] text-ink-soft">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        ) : null}

        {said.length ? (
          <section
            aria-labelledby="service-testimonials"
            className="bg-cream-raised py-[clamp(3rem,6vw,5rem)]"
          >
            <div className="container-page">
              <SectionHeading id="service-testimonials">
                In their words
              </SectionHeading>

              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-11 lg:grid-cols-3 lg:gap-5">
                {said.slice(0, 3).map((testimonial, index) => (
                  <Reveal key={testimonial.id} delay={index * 70}>
                    <TestimonialCard testimonial={testimonial} index={index} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {reading.length ? (
          <section
            aria-labelledby="service-reading"
            className="bg-cream py-[clamp(3rem,6vw,5rem)]"
          >
            <div className="container-page">
              <SectionHeading id="service-reading">
                Reading on this
              </SectionHeading>

              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-11 lg:grid-cols-3 lg:gap-5">
                {reading.map((post, index) => (
                  <Reveal key={post.slug} delay={index * 70}>
                    <PostCard post={post} index={index} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-cream-raised py-[clamp(3rem,6vw,5rem)]">
          <div className="container-page">
            <h2 className="text-center text-[0.68rem] tracked text-ink-soft">
              The other services
            </h2>

            <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2.5 rounded-full border border-gold/35 py-2 pl-2 pr-4 text-[0.78rem] text-ink-soft transition-colors duration-200 hover:border-gold hover:bg-peach-soft/40 hover:text-gold-deep"
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      width={176}
                      height={176}
                      className="h-7 w-7 object-contain"
                    />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
