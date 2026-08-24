import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  /** Rendered before the label, e.g. a calendar glyph. */
  icon?: ReactNode;
  /** Rendered after the label, e.g. an arrow. */
  trailing?: ReactNode;
  /** For the header menu, which closes itself when the CTA is taken. */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * The peach pill used for both calls to action. Sized so it always clears the
 * 44px minimum tap target.
 */
export function Button({
  href,
  children,
  variant = "solid",
  className,
  icon,
  trailing,
  onClick,
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[0.7rem] font-medium tracked transition-all duration-300 sm:px-7 sm:text-xs",
        variant === "solid"
          ? "bg-peach text-white hover:bg-peach-deep hover:shadow-[0_6px_18px_-8px_rgba(191,124,96,0.65)]"
          : "border border-gold/45 text-gold-deep hover:border-gold hover:bg-peach-soft/40",
        className,
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
      {trailing ? (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
          {trailing}
        </span>
      ) : null}
    </Link>
  );
}
