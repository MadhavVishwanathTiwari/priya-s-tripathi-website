"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import { ImageField } from "@/components/admin/ImageField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SubmitButton } from "@/components/admin/SubmitButton";
import {
  Callout,
  Field,
  Select,
  TextArea,
  TextInput,
} from "@/components/admin/fields";
import { deletePost, savePost } from "@/app/admin/(protected)/actions";
import { idleState, type FormState } from "@/components/admin/form-state";
import type { Category } from "@/lib/content/categories";
import {
  hasEmDash,
  richTextToPlainText,
  slugify,
} from "@/lib/content/plaintext";
import { EMPTY_DOC, type RichTextDoc } from "@/lib/content/types";

export type PostDraft = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  lead: string;
  body: RichTextDoc;
  categorySlug: string;
  coverPath: string | null;
  coverAlt: string | null;
  status: "draft" | "published";
};

const blankPost: PostDraft = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  lead: "",
  body: EMPTY_DOC,
  categorySlug: "",
  coverPath: null,
  coverAlt: null,
  status: "draft",
};

export function PostForm({
  categories,
  post = blankPost,
}: {
  categories: Category[];
  post?: PostDraft;
}) {
  const [state, formAction] = useActionState<FormState, FormData>(
    savePost,
    idleState,
  );

  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  // Only a brand new post follows the title. Changing a published address
  // breaks every link to it, so an existing slug is left alone.
  const [slugFollowsTitle, setSlugFollowsTitle] = useState(post.slug === "");
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [lead, setLead] = useState(post.lead);
  const [bodyText, setBodyText] = useState(richTextToPlainText(post.body));

  const errors = state.fieldErrors ?? {};
  const emDash = hasEmDash(title, excerpt, lead, bodyText);

  return (
    <>
      <form action={formAction} className="flex flex-col gap-7">
        <input type="hidden" name="id" value={post.id} readOnly />
        <input type="hidden" name="status" value={post.status} readOnly />

        {state.message ? <Callout tone="error">{state.message}</Callout> : null}

        {emDash ? (
          <Callout tone="warning">
            There is an em dash in this article. House style asks for a comma, a
            colon, brackets or a second sentence instead. Saving still works.
          </Callout>
        ) : null}

        <Field label="Title" htmlFor="title" error={errors.title}>
          <TextInput
            id="title"
            name="title"
            value={title}
            maxLength={160}
            onChange={(event) => {
              setTitle(event.target.value);
              if (slugFollowsTitle) setSlug(slugify(event.target.value));
            }}
            required
          />
        </Field>

        <Field
          label="Web address"
          htmlFor="slug"
          error={errors.slug}
          hint={`The article will live at /blog/${slug || "your-title"}`}
        >
          <TextInput
            id="slug"
            name="slug"
            value={slug}
            onChange={(event) => {
              setSlug(event.target.value);
              setSlugFollowsTitle(false);
            }}
          />
        </Field>

        <Field
          label="Service"
          htmlFor="category_slug"
          error={errors.category_slug}
          hint="Sets the small gold label and the glyph on the card."
        >
          <Select
            id="category_slug"
            name="category_slug"
            defaultValue={post.categorySlug}
            required
          >
            <option value="">Choose one</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Card summary"
          htmlFor="excerpt"
          error={errors.excerpt}
          hint={`Shown on the cards and in search results. ${excerpt.length} of 220 characters.`}
        >
          <TextArea
            id="excerpt"
            name="excerpt"
            rows={2}
            maxLength={220}
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            required
          />
        </Field>

        <Field
          label="Opening paragraph"
          htmlFor="lead"
          error={errors.lead}
          hint="Set larger than the rest of the article, above the first heading."
        >
          <TextArea
            id="lead"
            name="lead"
            rows={3}
            maxLength={600}
            value={lead}
            onChange={(event) => setLead(event.target.value)}
            required
          />
        </Field>

        <ImageField
          label="Cover image"
          hint="Optional. Without one the card shows the service glyph, as they all do today."
          folder="covers"
          pathName="cover_path"
          altName="cover_alt"
          initialPath={post.coverPath}
          initialAlt={post.coverAlt}
          altLabel="Describe the cover"
          altError={errors.cover_alt}
        />

        <div className="flex flex-col gap-1.5">
          <p className="text-[0.68rem] tracked text-ink-soft">Article</p>
          <RichTextEditor
            name="body"
            initialDoc={post.body}
            onChange={(doc) => setBodyText(richTextToPlainText(doc))}
          />
        </div>

        <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-line bg-cream-raised/95 px-4 py-4 backdrop-blur">
          <SubmitButton intent="save" variant="ghost">
            Save
          </SubmitButton>

          {post.status === "published" ? (
            <>
              <SubmitButton intent="unpublish" variant="quiet">
                Take off the site
              </SubmitButton>
              <Link
                href={`/blog/${post.slug}`}
                className="text-[0.78rem] text-ink-muted underline underline-offset-4 hover:text-peach-deep"
              >
                View on the site
              </Link>
            </>
          ) : (
            <SubmitButton intent="publish">Publish</SubmitButton>
          )}

          <Link
            href="/admin/posts"
            className="ml-auto text-[0.78rem] text-ink-muted underline underline-offset-4 hover:text-peach-deep"
          >
            Back without saving
          </Link>
        </div>
      </form>

      {/* Kept out of the form above: forms cannot be nested. */}
      {post.id ? (
        <form action={deletePost} className="mt-10 border-t border-line pt-6">
          <input type="hidden" name="id" value={post.id} readOnly />
          <SubmitButton
            variant="quiet"
            confirm="Delete this article for good? This cannot be undone."
          >
            Delete this article
          </SubmitButton>
        </form>
      ) : null}
    </>
  );
}
