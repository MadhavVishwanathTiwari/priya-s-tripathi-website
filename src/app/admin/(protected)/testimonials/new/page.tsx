import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { getCategories } from "@/lib/content/categories";

export const metadata = { title: "New testimonial" };

export default async function NewTestimonialPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="font-serif text-[1.8rem] font-light text-ink">
          A new testimonial
        </h1>
        <p className="mt-2 text-[0.9rem] text-ink-muted">
          Quote the client in their own words, and only once they have said in
          writing that you may.
        </p>
      </div>

      <TestimonialForm categories={categories} />
    </div>
  );
}
