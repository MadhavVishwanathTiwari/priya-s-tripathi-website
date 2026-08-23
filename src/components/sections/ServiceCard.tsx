import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * Vertical on desktop, horizontal on phones — the mobile reference turns these
 * into wide icon-left cards so the copy gets a comfortable measure.
 *
 * `h-full` makes the card fill its grid cell rather than its own content, so a
 * two-line title like "Combined Analysis" no longer leaves the card taller than
 * its neighbours; `mt-auto` then keeps every "Learn More" on the same baseline.
 */
export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <article
      className={cn(
        "group flex h-full gap-4 rounded-sm border border-transparent p-5 transition-all duration-300 sm:p-6 lg:flex-col lg:items-center lg:gap-0 lg:p-7 lg:text-center",
        "hover:-translate-y-0.5 hover:border-gold/25",
        index % 2 === 0 ? "bg-card-cream" : "bg-card-rose",
      )}
    >
      <Image
        src={service.icon}
        alt=""
        aria-hidden="true"
        width={176}
        height={176}
        className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12 lg:h-14 lg:w-14"
      />

      <div className="lg:mt-5 lg:flex lg:w-full lg:flex-1 lg:flex-col lg:items-center">
        <h3 className="text-[0.78rem] font-medium tracked text-ink lg:text-[0.8rem] lg:leading-relaxed">
          {service.title}
        </h3>

        <p className="mt-2 text-pretty text-[0.85rem] leading-relaxed text-ink-muted lg:mt-3 lg:text-[0.83rem]">
          {service.description}
        </p>

        {/* Padding plus matching negative margin grows the tap target to ~44px
            without changing the card's visual rhythm. */}
        <Link
          href={service.href}
          aria-label={`Learn more about ${service.title}`}
          className="-mb-3 inline-flex items-center gap-1.5 py-3 text-[0.78rem] text-gold-deep transition-colors duration-200 hover:text-peach lg:mt-auto lg:pt-5"
        >
          Learn More
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
