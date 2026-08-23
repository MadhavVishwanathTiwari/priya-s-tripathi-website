import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { signOut } from "@/app/admin/(protected)/actions";
import { Logo } from "@/components/layout/Logo";
import { currentAdmin } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: { default: "Editor", template: "%s | Editor" },
  robots: { index: false, follow: false },
};

/*
  These pages are per-request by definition: every one of them reads the session
  cookie. Opting out of instant-navigation validation says that out loud rather
  than filling the dev overlay with insights we would only ever wave through.
*/
export const instant = false;

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/posts", label: "Articles" },
  { href: "/admin/testimonials", label: "Testimonials" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Row level security would refuse the queries anyway; this turns that refusal
  // into a sign-in page instead of an empty screen.
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-dvh bg-cream-raised">
      <header className="border-b border-line bg-cream">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
          <Logo />

          <nav aria-label="Editor" className="flex items-center gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.82rem] text-ink-soft transition-colors duration-200 hover:text-gold-deep"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/"
              className="text-[0.78rem] text-ink-muted underline underline-offset-4 hover:text-peach-deep"
            >
              View site
            </Link>

            <form action={signOut}>
              <button
                type="submit"
                className="text-[0.78rem] text-ink-muted underline underline-offset-4 hover:text-peach-deep"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 py-10">{children}</main>

      <footer className="mx-auto w-full max-w-5xl px-5 pb-10">
        <p className="border-t border-line pt-5 text-[0.75rem] text-ink-muted">
          Signed in as {admin.email}. Changes appear on the site as soon as they
          are saved.
        </p>
      </footer>
    </div>
  );
}
