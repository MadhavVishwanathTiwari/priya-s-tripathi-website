import Image from "next/image";

import { ArrowRightIcon } from "@/components/icons";
import { PostCard } from "@/components/sections/PostCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedPosts } from "@/lib/content/posts";

/**
 * The three most recent articles, sitting between the testimonials and the
 * footer. Everything longer lives at `/blog`; this band only ever shows three,
 * so the homepage keeps its length whatever the archive grows to. With nothing
 * published yet the section drops out rather than leaving an empty band.
 */
export async function Blog() {
  const posts = await getFeaturedPosts();

  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="relative isolate overflow-hidden scroll-mt-24 bg-cream-raised py-[clamp(3.5rem,7vw,6.5rem)]"
    >
      <Image
        src="/decorative/botanical-2.png"
        alt=""
        aria-hidden="true"
        width={300}
        height={300}
        className="pointer-events-none absolute -right-12 top-6 w-36 opacity-25 sm:w-44 lg:w-56"
      />

      <div className="container-page relative">
        <SectionHeading id="blog-heading">From the Journal</SectionHeading>

        <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-[0.9rem] leading-relaxed text-ink-muted">
          Notes on Vastu, charts, numbers and healing. Written plainly, for
          anyone weighing a consultation.
        </p>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-11 lg:grid-cols-3 lg:gap-5">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 70}>
              <PostCard post={post} index={index} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center lg:mt-12">
          <Button
            href="/blog"
            variant="ghost"
            trailing={<ArrowRightIcon className="h-3.5 w-3.5" />}
          >
            Read all articles
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
