/**
 * View models handed to the components.
 *
 * These keep the shape the presentational components already expected when the
 * content lived in `src/data`, so moving to the database did not ripple through
 * the markup. Rows are mapped into these in `posts.ts` and `testimonials.ts`.
 */

export type RichTextMark = {
  type: string;
  attrs?: Record<string, unknown> | null;
};

export type RichTextNode = {
  type: string;
  text?: string;
  marks?: RichTextMark[] | null;
  attrs?: Record<string, unknown> | null;
  content?: RichTextNode[] | null;
};

/** A Tiptap document, as stored in `posts.body`. */
export type RichTextDoc = {
  type: "doc";
  content?: RichTextNode[] | null;
};

export type Media = {
  url: string;
  alt: string;
};

/** Everything a card needs. */
export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Human label of the service the post belongs to, e.g. "Tarot Reading". */
  category: string;
  categorySlug: string;
  /** Service glyph, shown whether or not there is a cover image. */
  glyph: string;
  cover: Media | null;
  /** Publication date as an ISO day, ready for `formatDate`. */
  date: string;
  readingMinutes: number;
};

export type Post = PostSummary & {
  lead: string;
  body: RichTextDoc;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  location: string;
  /** Service label shown as the small gold caption. */
  service: string;
  photo: Media | null;
};

export const EMPTY_DOC: RichTextDoc = { type: "doc", content: [] };

/** Narrow unknown JSONB from the database into a document we can render. */
export function asRichTextDoc(value: unknown): RichTextDoc {
  if (
    value &&
    typeof value === "object" &&
    (value as RichTextDoc).type === "doc"
  ) {
    return value as RichTextDoc;
  }
  return EMPTY_DOC;
}
