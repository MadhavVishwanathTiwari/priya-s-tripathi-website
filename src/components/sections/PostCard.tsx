import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import type { PostSummary } from "@/lib/content/types";
import { cn, formatDate } from "@/lib/utils";

/**
 * One article in a grid. A post carries the glyph of the service it belongs to,
 * the same artwork the service cards use, which keeps the two grids in one
 * visual family. A cover image, when the CMS has one, sits above that as a
 * banner; without one the card looks exactly as it always has.
 *
 * The whole card is the hit area: the heading anchor is stretched over it, so
 * the accessible name stays the title alone.
 */
export function PostCard({ post, index }: { post: PostSummary; index: number }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-sm border border-transparent p-6 transition-all duration-300 sm:p-7",
        "hover:-translate-y-0.5 hover:border-gold/25",
        index % 2 === 0 ? "bg-card-cream" : "bg-card-rose",
      )}
    >
      {post.cover ? (
        <div className="relative -mx-6 -mt-6 mb-6 aspect-16/9 sm:-mx-7 sm:-mt-7">
          <Image
            src={post.cover.url}
            alt={post.cover.alt}
            fill
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <Image
          src={post.glyph}
          alt=""
          aria-hidden="true"
          width={176}
          height={176}
          className="h-9 w-9 shrink-0 object-contain"
        />
        <p className="text-[0.62rem] tracked text-gold-deep/80">
          {post.category}
        </p>
      </div>

      <h3 className="mt-5 text-balance font-serif text-[1.28rem] font-normal leading-snug text-ink">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors duration-200 before:absolute before:inset-0 before:content-[''] group-hover:text-gold-deep"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-pretty text-[0.85rem] leading-relaxed text-ink-muted">
        {post.excerpt}
      </p>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-gold/20 pt-4">
        <p className="text-[0.72rem] text-ink-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {post.readingMinutes} min read
        </p>

        <span
          aria-hidden="true"
          className="inline-flex items-center gap-1.5 text-[0.78rem] text-gold-deep transition-colors duration-200 group-hover:text-peach"
        >
          Read
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
