import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/layout/Logo";
import { DecorativeDivider } from "@/components/ui/DecorativeDivider";

export const metadata: Metadata = {
  title: "Sign in",
  // Nothing here should ever appear in a search result.
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center">
          <Logo />
          <DecorativeDivider className="mt-6" />
        </div>

        <h1 className="mt-8 text-center font-serif text-[1.6rem] font-light text-ink">
          Sign in to edit the site
        </h1>

        {/* The form reads the query string, which is only known per request. */}
        <Suspense
          fallback={
            <p className="mt-8 text-center text-[0.85rem] text-ink-muted">
              One moment.
            </p>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
