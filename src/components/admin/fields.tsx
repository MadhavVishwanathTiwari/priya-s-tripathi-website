import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Form furniture for the CMS. Plain markup, no hooks, so it can be used from
 * either side of the client boundary. The palette is the site's own: the admin
 * should feel like the same place, not a different product.
 */

const controlClass =
  "w-full rounded-sm border border-line bg-white px-3 py-2.5 text-[0.92rem] text-ink outline-none transition-colors duration-200 placeholder:text-ink-muted/70 focus:border-gold";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[0.68rem] tracked text-ink-soft"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="text-[0.78rem] text-ink-muted">{hint}</p> : null}
      {error ? (
        <p role="alert" className="text-[0.78rem] text-peach-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({ className, ...props }: ComponentProps<"input">) {
  return <input {...props} className={cn(controlClass, className)} />;
}

export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea {...props} className={cn(controlClass, "leading-relaxed", className)} />
  );
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select {...props} className={cn(controlClass, className)} />;
}

export function StatusChip({ status }: { status: "draft" | "published" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.6rem] tracked",
        status === "published"
          ? "bg-peach-soft text-gold-deep"
          : "border border-line text-ink-muted",
      )}
    >
      {status === "published" ? "Live" : "Draft"}
    </span>
  );
}

export function Callout({
  tone = "note",
  children,
}: {
  tone?: "note" | "warning" | "error";
  children: ReactNode;
}) {
  return (
    <p
      role={tone === "error" ? "alert" : undefined}
      className={cn(
        "rounded-sm border px-4 py-3 text-[0.84rem] leading-relaxed",
        tone === "error"
          ? "border-peach-deep/40 bg-peach-soft/50 text-ink"
          : tone === "warning"
            ? "border-gold/40 bg-cream-deep text-ink-soft"
            : "border-line bg-cream-raised text-ink-soft",
      )}
    >
      {children}
    </p>
  );
}
