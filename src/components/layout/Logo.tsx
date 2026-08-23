import Image from "next/image";
import Link from "next/link";

import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Lotus mark plus wordmark. The mark is extracted artwork; swap in the client's
 * original logo file when it is available (see scripts/extract-assets.py).
 */
export function Logo({
  showTagline = false,
  className,
}: {
  showTagline?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex flex-col gap-1", className)}
      aria-label={`${site.name}, home`}
    >
      <span className="flex items-center gap-3">
        <Image
          src="/logo-mark.png"
          alt=""
          aria-hidden="true"
          width={127}
          height={107}
          priority
          className="h-9 w-auto sm:h-11"
        />
        <span className="flex flex-col">
          <span className="font-serif text-lg leading-none tracked text-ink sm:text-2xl">
            Shivoham
          </span>
          <span className="mt-1 text-[0.55rem] tracked-wide text-ink-muted sm:text-[0.63rem]">
            Universal Sol
          </span>
        </span>
      </span>
      {showTagline ? (
        <span className="hidden pl-[3.4rem] font-serif text-[0.8rem] italic text-ink-muted lg:block">
          {site.tagline}
        </span>
      ) : null}
    </Link>
  );
}
