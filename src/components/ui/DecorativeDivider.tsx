import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Hairline rule broken by the lotus ornament from the reference sheet.
 * Composed rather than cropped whole so it stretches to any width.
 */
export function DecorativeDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex w-full max-w-xs items-center gap-3", className)}
    >
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-gold/45" />
      <Image
        src="/decorative/divider-lotus.png"
        alt=""
        width={51}
        height={45}
        className="h-3.5 w-auto opacity-75"
      />
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-gold/45" />
    </div>
  );
}
