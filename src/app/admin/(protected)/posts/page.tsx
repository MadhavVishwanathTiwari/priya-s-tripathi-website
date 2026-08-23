import Link from "next/link";

import { StatusChip } from "@/components/ui/fields";
import { serverClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Articles" };

export default async function PostsListPage() {
  const supabase = await serverClient();

  // Drafts appear here and nowhere else: the public key cannot read them.
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, slug, status, published_at, updated_at, category_slug")
    .order("status")
    .order("updated_at", { ascending: false });

  const { data: categories } = await supabase
    .from("categories")
    .select("slug, label");

  const labels = new Map((categories ?? []).map((row) => [row.slug, row.label]));

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[1.8rem] font-light text-ink">
            Articles
          </h1>
          <p className="mt-2 text-[0.9rem] text-ink-muted">
            The three most recent live articles also appear on the home page.
          </p>
        </div>

        <Link
          href="/admin/posts/new"
          className="inline-flex min-h-11 items-center rounded-full bg-peach px-6 text-[0.7rem] font-medium tracked text-white transition-colors duration-300 hover:bg-peach-deep"
        >
          Write an article
        </Link>
      </div>

      {error ? (
        <p role="alert" className="text-[0.85rem] text-peach-deep">
          The articles could not be loaded: {error.message}
        </p>
      ) : null}

      {posts && posts.length > 0 ? (
        <ul className="flex flex-col divide-y divide-line rounded-sm border border-line bg-white">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/admin/posts/${post.id}`}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 transition-colors duration-200 hover:bg-cream-raised"
              >
                <StatusChip status={post.status} />

                <span className="min-w-0 flex-1">
                  <span className="block font-serif text-[1.05rem] text-ink">
                    {post.title}
                  </span>
                  <span className="mt-0.5 block text-[0.75rem] text-ink-muted">
                    {labels.get(post.category_slug) ?? post.category_slug}
                    <span aria-hidden="true"> · </span>
                    {post.published_at
                      ? `published ${formatDate(post.published_at.slice(0, 10))}`
                      : `saved ${formatDate(post.updated_at.slice(0, 10))}`}
                  </span>
                </span>

                <span className="text-[0.78rem] text-gold-deep">Edit</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-sm border border-line bg-white px-5 py-8 text-center text-[0.9rem] text-ink-muted">
          Nothing written yet. The first article is a good place to start.
        </p>
      )}
    </div>
  );
}
