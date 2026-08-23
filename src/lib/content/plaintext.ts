import type { RichTextDoc, RichTextNode } from "@/lib/content/types";

/**
 * Text-only helpers, kept apart from the renderer so server actions and the
 * seed script can use them without pulling JSX in.
 */

/** Flattened text, used for reading time and the house-style em dash check. */
export function richTextToPlainText(doc: RichTextDoc): string {
  const parts: string[] = [];

  function walk(nodes: RichTextNode[]) {
    for (const node of nodes) {
      if (node.text) parts.push(node.text);
      if (node.content) walk(node.content);
    }
  }

  walk(doc.content ?? []);
  return parts.join(" ");
}

/** Rounded, never zero. 200 words a minute is the usual reading estimate. */
export function readingMinutes(doc: RichTextDoc, extra = ""): number {
  const words = `${richTextToPlainText(doc)} ${extra}`
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * House style: no em dashes anywhere a visitor can read (see AGENTS.md). The
 * admin surfaces this as a warning rather than blocking a save.
 */
export function hasEmDash(...values: string[]): boolean {
  return values.some((value) => value.includes("—"));
}

/** "Five Vastu Corrections" becomes "five-vastu-corrections". */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    // Drop the accents NFKD just separated out, so "Priya's" style marks do
    // not each become a hyphen in the slug.
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
