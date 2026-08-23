import type { Metadata } from "next";
import Image from "next/image";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/sections/PostCard";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { Reveal } from "@/components/ui/Reveal";
import { getPublishedPosts } from "@/lib/content/posts";
import { site } from "@/data/site";

const title = "Journal";
const description =
  "Notes on Vastu, astrology, numerology, healing and tarot from Priya S Tripathi. Written plainly, for anyone weighing a consultation.";

export const metadata: Metadata = {
  title: `${title} | ${site.name}`,
  description,
  openGraph: {
    title: `${title} | ${site.name}`,
    description,
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <Header />

      <main>
        {/* Masthead. Quieter than the homepage hero: no photograph, just the
            title over the cream, so the articles below carry the page. */}
        <section className="relative isolate overflow-hidden bg-cream py-[clamp(2.75rem,6vw,5rem)]">
          <Image
            src="/decorative/botanical-1.png"
            alt=""
            aria-hidden="true"
            width={300}
            height={300}
            className="pointer-events-none absolute -left-10 -top-6 w-32 opacity-25 sm:w-40 lg:w-52"
          />
          <Image
            src="/decorative/mandala.png"
            alt=""
            aria-hidden="true"
            width={400}
            height={400}
            className="pointer-events-none absolute -bottom-16 -right-16 w-44 opacity-15 sm:w-56 lg:w-72"
          />

          <div className="container-page relative">
            <Reveal className="flex flex-col items-center text-center">
              <p className="text-[0.62rem] tracked-wide text-gold-deep">
                {site.name}
              </p>

              <h1 className="mt-4 text-balance font-serif text-display font-light text-ink">
                The Journal
              </h1>

              <p className="mt-5 max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-ink-soft">
                {description}
              </p>

              <DecorativeDivider className="mt-8" />
            </Reveal>
          </div>
        </section>

        <section
          aria-label="All articles"
          className="bg-cream-raised py-[clamp(3rem,6vw,5.5rem)]"
        >
          <div className="container-page">
            {posts.length === 0 ? (
              <p className="text-center text-[0.95rem] text-ink-muted">
                The first articles are being written. Do come back shortly.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {posts.map((post, index) => (
                  <Reveal key={post.slug} delay={(index % 3) * 70}>
                    <PostCard post={post} index={index} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
