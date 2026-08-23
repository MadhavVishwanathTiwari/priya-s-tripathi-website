import type { ReactNode } from "react";

import type { RichTextDoc, RichTextNode } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export { readingMinutes, richTextToPlainText } from "@/lib/content/plaintext";

/**
 * Server-side renderer for the Tiptap documents stored in `posts.body`.
 *
 * The editor is configured down to exactly the node and mark types handled
 * below, so the article page keeps the typography it had when the body was a
 * list of paragraphs, ships no editor code to visitors, and never needs
 * `dangerouslySetInnerHTML`. Anything unrecognised is dropped rather than
 * guessed at.
 */

const paragraphClass =
  "mt-4 text-pretty text-[0.95rem] leading-[1.85] text-ink-soft";

const headingClass: Record<number, string> = {
  2: "mt-10 font-serif text-[1.35rem] font-normal leading-snug text-gold-deep",
  3: "mt-8 font-serif text-[1.12rem] font-normal leading-snug text-ink",
};

const listClass =
  "mt-4 space-y-2 pl-5 text-[0.95rem] leading-[1.85] text-ink-soft marker:text-gold";

/**
 * Only schemes that cannot execute script. A link typed into the editor is
 * still author-controlled, but this closes `javascript:` off completely.
 */
function safeHref(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const href = value.trim();
  if (!href) return null;
  if (href.startsWith("/") || href.startsWith("#")) return href;
  return /^(https?:|mailto:|tel:)/i.test(href) ? href : null;
}

function Inline({ nodes }: { nodes: RichTextNode[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === "hardBreak") return <br key={index} />;
        if (node.type !== "text" || !node.text) return null;

        let element: ReactNode = node.text;

        for (const mark of node.marks ?? []) {
          if (mark.type === "bold") {
            element = <strong className="font-medium text-ink">{element}</strong>;
          } else if (mark.type === "italic") {
            element = <em>{element}</em>;
          } else if (mark.type === "link") {
            const href = safeHref(mark.attrs?.href);
            if (href) {
              const external = /^https?:/i.test(href);
              element = (
                <a
                  href={href}
                  className="text-gold-deep underline decoration-gold/40 underline-offset-4 transition-colors duration-200 hover:text-peach"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {element}
                </a>
              );
            }
          }
        }

        return <span key={index}>{element}</span>;
      })}
    </>
  );
}

function Block({ node }: { node: RichTextNode }) {
  const children = node.content ?? [];

  switch (node.type) {
    case "paragraph":
      // Tiptap keeps empty paragraphs as spacing; they add nothing here.
      if (children.length === 0) return null;
      return (
        <p className={paragraphClass}>
          <Inline nodes={children} />
        </p>
      );

    case "heading": {
      const level = node.attrs?.level === 3 ? 3 : 2;
      const Tag = level === 3 ? "h3" : "h2";
      return (
        <Tag className={headingClass[level]}>
          <Inline nodes={children} />
        </Tag>
      );
    }

    case "bulletList":
    case "orderedList": {
      const ordered = node.type === "orderedList";
      const Tag = ordered ? "ol" : "ul";
      return (
        <Tag className={cn(listClass, ordered ? "list-decimal" : "list-disc")}>
          {children.map((item, index) => (
            <li key={index}>
              {(item.content ?? []).map((child, childIndex) =>
                child.type === "paragraph" ? (
                  <Inline key={childIndex} nodes={child.content ?? []} />
                ) : (
                  <Block key={childIndex} node={child} />
                ),
              )}
            </li>
          ))}
        </Tag>
      );
    }

    case "blockquote":
      return (
        <blockquote className="mt-8 border-l-2 border-gold/40 pl-5 font-serif text-[1.1rem] font-light italic leading-relaxed text-ink">
          {children.map((child, index) => (
            <Block key={index} node={child} />
          ))}
        </blockquote>
      );

    default:
      return null;
  }
}

export function RichText({ doc }: { doc: RichTextDoc }) {
  return (
    <>
      {(doc.content ?? []).map((node, index) => (
        <Block key={index} node={node} />
      ))}
    </>
  );
}
