"use client";

import Link from "next/link";
import { useActionState, useState } from "react";

import { ImageField } from "@/components/admin/ImageField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import {
  Callout,
  Field,
  Select,
  TextArea,
  TextInput,
} from "@/components/ui/fields";
import {
  deleteTestimonial,
  saveTestimonial,
} from "@/app/admin/(protected)/actions";
import { idleState, type FormState } from "@/components/admin/form-state";
import type { Category } from "@/lib/content/categories";
import { hasEmDash } from "@/lib/content/plaintext";

export type TestimonialDraft = {
  id: string;
  quote: string;
  name: string;
  location: string;
  categorySlug: string;
  photoPath: string | null;
  photoAlt: string | null;
  consentOnFile: boolean;
  status: "draft" | "published";
};

const blankTestimonial: TestimonialDraft = {
  id: "",
  quote: "",
  name: "",
  location: "",
  categorySlug: "",
  photoPath: null,
  photoAlt: null,
  consentOnFile: false,
  status: "draft",
};

export function TestimonialForm({
  categories,
  testimonial = blankTestimonial,
}: {
  categories: Category[];
  testimonial?: TestimonialDraft;
}) {
  const [state, formAction] = useActionState<FormState, FormData>(
    saveTestimonial,
    idleState,
  );

  const [quote, setQuote] = useState(testimonial.quote);
  const [name, setName] = useState(testimonial.name);

  const errors = state.fieldErrors ?? {};

  return (
    <>
      <form action={formAction} className="flex flex-col gap-7">
        <input type="hidden" name="id" value={testimonial.id} readOnly />
        <input type="hidden" name="status" value={testimonial.status} readOnly />

        {state.message ? <Callout tone="error">{state.message}</Callout> : null}

        {hasEmDash(quote, name) ? (
          <Callout tone="warning">
            There is an em dash in these words. House style asks for a comma, a
            colon, brackets or a second sentence instead.
          </Callout>
        ) : null}

        <Field
          label="Their words"
          htmlFor="quote"
          error={errors.quote}
          hint={`Quote them as they wrote it. ${quote.length} of 600 characters.`}
        >
          <TextArea
            id="quote"
            name="quote"
            rows={4}
            maxLength={600}
            value={quote}
            onChange={(event) => setQuote(event.target.value)}
            required
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name" htmlFor="name" error={errors.name}>
            <TextInput
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Field>

          <Field
            label="Town or city"
            htmlFor="location"
            error={errors.location}
            hint="Shown under the name, e.g. Gurugram."
          >
            <TextInput
              id="location"
              name="location"
              defaultValue={testimonial.location}
              required
            />
          </Field>
        </div>

        <Field
          label="Service"
          htmlFor="category_slug"
          error={errors.category_slug}
          hint="The small gold caption above the quote."
        >
          <Select
            id="category_slug"
            name="category_slug"
            defaultValue={testimonial.categorySlug}
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

        <ImageField
          label="Photo"
          hint="Optional. Without one the card shows a gold circle with their initial."
          folder="testimonials"
          pathName="photo_path"
          altName="photo_alt"
          initialPath={testimonial.photoPath}
          initialAlt={testimonial.photoAlt}
          altLabel="Describe the photo"
          altError={errors.photo_alt}
          shape="round"
        />

        <div className="flex flex-col gap-1.5 rounded-sm border border-line bg-white p-4">
          <label className="flex items-start gap-3 text-[0.88rem] text-ink">
            <input
              type="checkbox"
              name="consent_on_file"
              defaultChecked={testimonial.consentOnFile}
              className="mt-1 h-4 w-4 accent-peach"
            />
            <span>
              I have written permission to publish these words, and the photo if
              there is one.
            </span>
          </label>
          <p className="pl-7 text-[0.78rem] text-ink-muted">
            The site will not publish a testimonial without this ticked.
          </p>
          {errors.consent_on_file ? (
            <p role="alert" className="pl-7 text-[0.78rem] text-peach-deep">
              {errors.consent_on_file}
            </p>
          ) : null}
        </div>

        <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-line bg-cream-raised/95 px-4 py-4 backdrop-blur">
          <SubmitButton intent="save" variant="ghost">
            Save
          </SubmitButton>

          {testimonial.status === "published" ? (
            <SubmitButton intent="unpublish" variant="quiet">
              Take off the site
            </SubmitButton>
          ) : (
            <SubmitButton intent="publish">Publish</SubmitButton>
          )}

          <Link
            href="/admin/testimonials"
            className="ml-auto text-[0.78rem] text-ink-muted underline underline-offset-4 hover:text-peach-deep"
          >
            Back without saving
          </Link>
        </div>
      </form>

      {testimonial.id ? (
        <form
          action={deleteTestimonial}
          className="mt-10 border-t border-line pt-6"
        >
          <input type="hidden" name="id" value={testimonial.id} readOnly />
          <SubmitButton
            variant="quiet"
            confirm="Delete this testimonial for good? This cannot be undone."
          >
            Delete this testimonial
          </SubmitButton>
        </form>
      ) : null}
    </>
  );
}
