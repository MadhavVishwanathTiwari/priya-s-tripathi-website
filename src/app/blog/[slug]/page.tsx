import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRightIcon, CalendarIcon } from "@/components/icons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/sections/PostCard";
import { Button } from "@/components/ui/Button";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";
import { Reveal } from "@/components/ui/Reveal";
import {
  getPostBySlug,
  getPublishedSlugs,
  getRelatedPosts,
} from "@/lib/content/posts";
import { RichText } from "@/lib/content/richtext";
import { site } from "@/data/site";
import { formatDate } from "@/lib/utils";

type ArticleProps = {
  params: Promise<{ slug: string }>;
};

/*
  Cache Components prerenders the route once per param returned here to prove
  nothing inside it reaches for request-time data, and so it refuses an empty
  list. A database-backed blog is legitimately empty on the day it launches, and
  that is not a state the site should be unable to build in, so a placeholder
  stands in: the page turns it into a 404 the same way it would any unknown
  slug, and the moment something is published the real slugs take over.
*/
const NO_ARTICLES_YET = "no-articles-yet";

/**
 * Everything published at build time is prerendered. A post published later is
 * rendered on first request and then cached, so a publish needs no deploy.
 */
export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();

  if (slugs.length === 0) return [{ slug: NO_ARTICLES_YET }];

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: `${post.title} | ${site.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.cover ? [{ url: post.cover.url }] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticleProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const more = await getRelatedPosts(post.slug);

  return (
    <>
      <Header />

      <main>
        <article>
          <header className="relative isolate overflow-hidden bg-cream py-[clamp(2.5rem,5.5vw,4.5rem)]">
            <Image
              src="/decorative/botanical-3.png"
              alt=""
              aria-hidden="true"
              width={300}
              height={300}
              className="pointer-events-none absolute -right-10 top-0 w-32 opacity-25 sm:w-40 lg:w-48"
            />

            <div className="container-page relative">
              <div className="mx-auto max-w-[46rem]">
                <Link
                  href="/blog"
                  className="-ml-1 inline-flex min-h-11 items-center gap-2 px-1 text-[0.72rem] tracked text-ink-muted transition-colors duration-200 hover:text-gold-deep"
                >
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="h-3.5 w-3.5 rotate-180"
                  />
                  All articles
                </Link>

                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src={post.glyph}
                    alt=""
                    aria-hidden="true"
                    width={176}
                    height={176}
                    className="h-10 w-10 shrink-0 object-contain"
                  />
                  <p className="text-[0.62rem] tracked text-gold-deep/80">
                    {post.category}
                  </p>
                </div>

                <h1 className="mt-5 text-balance font-serif text-display font-light leading-tight text-ink">
                  {post.title}
                </h1>

                <p className="mt-4 text-[0.78rem] text-ink-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true"> · </span>
                  {post.readingMinutes} min read
                </p>

                <DecorativeDivider className="mt-7" />
              </div>
            </div>
          </header>

          <div className="bg-cream-raised py-[clamp(2.5rem,5.5vw,4.5rem)]">
            <div className="container-page">
              <div className="mx-auto max-w-[46rem]">
                {post.cover ? (
                  <div className="relative mb-10 aspect-16/9 overflow-hidden rounded-sm">
                    <Image
                      src={post.cover.url}
                      alt={post.cover.alt}
                      fill
                      priority
                      sizes="(min-width: 768px) 46rem, 92vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <p className="text-pretty font-serif text-[clamp(1.15rem,2.2vw,1.4rem)] font-light leading-relaxed text-ink">
                  {post.lead}
                </p>

                <RichText doc={post.body} />

                {/* Sign-off, echoing the script name in the footer. */}
                <div className="mt-12 flex flex-col items-end border-t border-gold/20 pt-6">
                  <p className="font-script text-4xl leading-tight text-gold-deep">
                    {site.founder.name}
                  </p>
                  <p className="text-[0.62rem] tracked-wide text-ink-muted">
                    {site.founder.role}
                  </p>
                </div>

                <Reveal className="mt-12 rounded-sm bg-card-rose p-7 text-center sm:p-9">
                  <h2 className="font-serif text-[1.35rem] font-normal text-ink">
                    Want this looked at for your own chart or home?
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-pretty text-[0.88rem] leading-relaxed text-ink-muted">
                    A consultation starts with your date of birth, your name as
                    people use it, and (for Vastu) a floor plan with the
                    directions marked.
                  </p>

                  <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button
                      href="/contact"
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
            </div>
          </div>
        </article>

        {more.length ? (
          <section
            aria-labelledby="more-articles"
            className="bg-cream py-[clamp(3rem,6vw,5rem)]"
          >
            <div className="container-page">
              <div className="mx-auto max-w-[46rem] lg:max-w-none">
                <h2
                  id="more-articles"
                  className="text-center font-serif text-[clamp(1.25rem,2.6vw,1.6rem)] font-normal tracked text-gold-deep"
                >
                  More Reading
                </h2>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:gap-5">
                  {more.map((related, index) => (
                    <Reveal key={related.slug} delay={index * 70}>
                      <PostCard post={related} index={index} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </>
  );
}
