import { notFound } from "next/navigation";

import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { getCategories } from "@/lib/content/categories";
import { serverClient } from "@/lib/supabase/server";

export const metadata = { title: "Edit testimonial" };

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await serverClient();

  const [{ data: testimonial }, categories] = await Promise.all([
    supabase
      .from("testimonials")
      .select(
        "id, quote, name, location, category_slug, photo_path, photo_alt, consent_on_file, status",
      )
      .eq("id", id)
      .maybeSingle(),
    getCategories(),
  ]);

  if (!testimonial) notFound();

  return (
    <div className="flex flex-col gap-7">
      <h1 className="font-serif text-[1.8rem] font-light text-ink">
        {testimonial.name}
      </h1>

      <TestimonialForm
        categories={categories}
        testimonial={{
          id: testimonial.id,
          quote: testimonial.quote,
          name: testimonial.name,
          location: testimonial.location,
          categorySlug: testimonial.category_slug,
          photoPath: testimonial.photo_path,
          photoAlt: testimonial.photo_alt,
          consentOnFile: testimonial.consent_on_file,
          status: testimonial.status,
        }}
      />
    </div>
  );
}
