import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { quote } from "@/data/trust";

/**
 * A deliberately quiet moment. Sits inside the trust band on wide screens and
 * becomes its own softly tinted block once the band stacks.
 */
export function QuoteSection() {
  return (
    <Reveal
      as="figure"
      className="relative -mx-[clamp(1.25rem,4vw,4rem)] overflow-hidden bg-band-quote px-[clamp(1.25rem,4vw,4rem)] py-10 xl:mx-0 xl:flex xl:items-center xl:bg-transparent xl:py-8 xl:pl-10"
    >
      <Image
        src="/decorative/lotus-large.png"
        alt=""
        aria-hidden="true"
        width={273}
        height={223}
        className="pointer-events-none absolute -bottom-8 -right-10 w-32 opacity-30 sm:w-40 xl:-bottom-12 xl:-right-14 xl:w-48"
      />

      <div className="relative flex gap-3">
        <span
          aria-hidden="true"
          className="select-none font-serif text-5xl leading-none text-gold/45"
        >
          &ldquo;
        </span>
        <blockquote className="max-w-md pt-2 font-serif text-quote font-light italic leading-relaxed text-ink">
          {quote}
        </blockquote>
      </div>
    </Reveal>
  );
}
