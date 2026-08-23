import Image from "next/image";

import type { Feature } from "@/data/features";

/**
 * Circular peach badge with a gold line icon. The label keeps its authored line
 * break so the four columns stay visually even.
 */
export function HeroFeature({ feature }: { feature: Feature }) {
  return (
    <li className="flex flex-col items-center text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-peach-soft/80 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]">
        <Image
          src={feature.icon}
          alt=""
          aria-hidden="true"
          width={140}
          height={140}
          className="h-7 w-7 object-contain sm:h-8 sm:w-8 lg:h-9 lg:w-9"
        />
      </span>
      <span className="mt-3 whitespace-pre-line text-[0.78rem] leading-snug text-ink-soft sm:text-[0.82rem]">
        {feature.label}
      </span>
    </li>
  );
}
