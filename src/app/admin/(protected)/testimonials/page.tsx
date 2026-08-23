import Link from "next/link";

import { moveTestimonial } from "@/app/admin/(protected)/actions";
import { StatusChip } from "@/components/admin/fields";
import { serverClient } from "@/lib/supabase/server";

export const metadata = { title: "Testimonials" };

export default async function TestimonialsListPage() {
  const supabase = await serverClient();

  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("id, name, location, quote, status, sort_index, consent_on_file")
    .order("sort_index")
    .order("created_at");

  const rows = testimonials ?? [];

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[1.8rem] font-light text-ink">
            Testimonials
          </h1>
          <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-ink-muted">
            These drift slowly across the home page in the order below. An even
            number keeps that loop seamless.
          </p>
        </div>

        <Link
          href="/admin/testimonials/new"
          className="inline-flex min-h-11 items-center rounded-full bg-peach px-6 text-[0.7rem] font-medium tracked text-white transition-colors duration-300 hover:bg-peach-deep"
        >
          Add a testimonial
        </Link>
      </div>

      {error ? (
        <p role="alert" className="text-[0.85rem] text-peach-deep">
          The testimonials could not be loaded: {error.message}
        </p>
      ) : null}

      {rows.length > 0 ? (
        <ul className="flex flex-col divide-y divide-line rounded-sm border border-line bg-white">
          {rows.map((testimonial, index) => (
            <li
              key={testimonial.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4"
            >
              <StatusChip status={testimonial.status} />

              <Link
                href={`/admin/testimonials/${testimonial.id}`}
                className="min-w-0 flex-1"
              >
                <span className="block text-[0.86rem] font-medium text-ink">
                  {testimonial.name}
                  <span className="font-normal text-ink-muted">
                    , {testimonial.location}
                  </span>
                </span>
                <span className="mt-0.5 line-clamp-1 block text-[0.8rem] text-ink-muted">
                  {testimonial.quote}
                </span>
              </Link>

              {!testimonial.consent_on_file ? (
                <span className="text-[0.72rem] text-peach-deep">
                  No permission recorded
                </span>
              ) : null}

              <div className="flex items-center gap-1">
                <form action={moveTestimonial}>
                  <input type="hidden" name="id" value={testimonial.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button
                    type="submit"
                    disabled={index === 0}
                    aria-label={`Move ${testimonial.name} earlier`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:bg-cream-deep disabled:opacity-30"
                  >
                    ↑
                  </button>
                </form>

                <form action={moveTestimonial}>
                  <input type="hidden" name="id" value={testimonial.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button
                    type="submit"
                    disabled={index === rows.length - 1}
                    aria-label={`Move ${testimonial.name} later`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-200 hover:bg-cream-deep disabled:opacity-30"
                  >
                    ↓
                  </button>
                </form>

                <Link
                  href={`/admin/testimonials/${testimonial.id}`}
                  className="ml-2 text-[0.78rem] text-gold-deep"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-sm border border-line bg-white px-5 py-8 text-center text-[0.9rem] text-ink-muted">
          No testimonials yet. Add the first one when a client sends their words
          and their permission.
        </p>
      )}
    </div>
  );
}
