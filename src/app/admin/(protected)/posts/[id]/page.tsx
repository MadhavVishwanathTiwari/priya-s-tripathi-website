import { notFound } from "next/navigation";

import { PostForm } from "@/components/admin/PostForm";
import { getCategories } from "@/lib/content/categories";
import { asRichTextDoc } from "@/lib/content/types";
import { serverClient } from "@/lib/supabase/server";

export const metadata = { title: "Edit article" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await serverClient();

  const [{ data: post }, categories] = await Promise.all([
    supabase
      .from("posts")
      .select(
        "id, slug, title, excerpt, lead, body, category_slug, cover_path, cover_alt, status",
      )
      .eq("id", id)
      .maybeSingle(),
    getCategories(),
  ]);

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-7">
      <h1 className="font-serif text-[1.8rem] font-light text-ink">
        {post.title}
      </h1>

      <PostForm
        categories={categories}
        post={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt,
          lead: post.lead,
          body: asRichTextDoc(post.body),
          categorySlug: post.category_slug,
          coverPath: post.cover_path,
          coverAlt: post.cover_alt,
          status: post.status,
        }}
      />
    </div>
  );
}
