"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

/**
 * Submit that disables itself while the action is in flight, so a slow save
 * cannot be double-submitted. `intent` rides along as the button's own value,
 * which is how one form offers save, publish and unpublish.
 */
export function SubmitButton({
  children,
  intent,
  variant = "solid",
  className,
  confirm,
}: {
  children: ReactNode;
  intent?: string;
  variant?: "solid" | "ghost" | "quiet";
  className?: string;
  /** When set, the click asks first. Used for anything that destroys work. */
  confirm?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name={intent ? "intent" : undefined}
      value={intent}
      disabled={pending}
      onClick={
        confirm
          ? (event) => {
              if (!window.confirm(confirm)) event.preventDefault();
            }
          : undefined
      }
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-[0.7rem] font-medium tracked transition-all duration-300 disabled:cursor-wait disabled:opacity-60",
        variant === "solid" &&
          "bg-peach text-white hover:bg-peach-deep hover:shadow-[0_6px_18px_-8px_rgba(191,124,96,0.65)]",
        variant === "ghost" &&
          "border border-gold/45 text-gold-deep hover:border-gold hover:bg-peach-soft/40",
        variant === "quiet" && "text-ink-muted hover:text-peach-deep",
        className,
      )}
    >
      {pending ? "Working" : children}
    </button>
  );
}
