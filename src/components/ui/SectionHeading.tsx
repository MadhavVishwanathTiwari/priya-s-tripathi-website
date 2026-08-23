import Image from "next/image";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: string;
  id?: string;
  className?: string;
  /** Centre the heading and its lotus ornament (the default in the reference). */
  align?: "center" | "left";
};

/** Letterspaced serif section title with the small lotus ornament beneath it. */
export function SectionHeading({
  children,
  id,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <h2
        id={id}
        className="font-serif text-[clamp(1.4rem,3.2vw,1.85rem)] font-normal tracked text-gold-deep"
      >
        {children}
      </h2>
      <Image
        src="/decorative/divider-lotus.png"
        alt=""
        aria-hidden="true"
        width={51}
        height={45}
        className="h-4 w-auto opacity-70"
      />
    </div>
  );
}
