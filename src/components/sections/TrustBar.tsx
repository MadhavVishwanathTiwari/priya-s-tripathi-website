import Image from "next/image";

import { QuoteSection } from "@/components/sections/QuoteSection";
import { Reveal } from "@/components/ui/Reveal";
import { trustItems } from "@/data/trust";
import { cn } from "@/lib/utils";

/**
 * Credibility strip. On wide screens it shares one peach band with the quote, as
 * in the desktop reference; below that the quote drops onto its own line, and on
 * phones the four stats become a stacked list rather than four squeezed columns.
 */
export function TrustBar() {
  return (
    <section aria-label="Why clients choose Shivoham" className="bg-band">
      <div className="container-page">
        <div className="xl:grid xl:grid-cols-[minmax(0,1.85fr)_minmax(0,1fr)]">
          <Reveal>
            <ul className="divide-y divide-gold/20 py-2 md:grid md:grid-cols-2 md:gap-x-0 md:divide-y-0 xl:grid-cols-[0.9fr_0.95fr_1.27fr_1.33fr] xl:items-center xl:py-8">
              {trustItems.map((item, index) => (
                <li
                  key={item.headline}
                  className={cn(
                    "flex items-center gap-4 py-5 md:border-gold/25 md:py-6 xl:gap-3 xl:border-l xl:border-gold/25 xl:py-0 xl:pl-4 xl:first:border-l-0 xl:first:pl-0",
                    index % 2 === 0 && "md:border-r md:pr-8 xl:border-r-0 xl:pr-0",
                    index % 2 === 1 && "md:pl-8 xl:pl-4",
                    index < 2 && "md:border-b xl:border-b-0",
                  )}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    width={130}
                    height={130}
                    className="h-10 w-10 shrink-0 object-contain"
                  />
                  <p className="text-[0.86rem] leading-snug text-ink-soft xl:text-[0.82rem]">
                    <span className="font-medium text-ink">{item.headline}</span>
                    {item.detail ? (
                      <span className="block text-ink-muted">{item.detail}</span>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <QuoteSection />
        </div>
      </div>
    </section>
  );
}
