import { PostForm } from "@/components/admin/PostForm";
import { getCategories } from "@/lib/content/categories";

export const metadata = { title: "New article" };

export default async function NewPostPage() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="font-serif text-[1.8rem] font-light text-ink">
          A new article
        </h1>
        <p className="mt-2 text-[0.9rem] text-ink-muted">
          Save it as a draft as often as you like. Nothing reaches the site until
          you press Publish.
        </p>
      </div>

      <PostForm categories={categories} />
    </div>
  );
}
