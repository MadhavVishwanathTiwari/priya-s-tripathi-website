"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Callout, Field, TextInput } from "@/components/ui/fields";
import { browserClient } from "@/lib/supabase/browser";

/**
 * Sign in by emailed link. No password to store, forget or reset, which for a
 * site with one editor is the kindest option available.
 */
export function LoginForm() {
  const linkFailed = useSearchParams().get("error") === "link";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const { error: sendError } = await browserClient().auth.signInWithOtp({
      email,
      options: {
        // Only accounts that already exist may sign in: the CMS is not open
        // for registration.
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/confirm?next=/admin`,
      },
    });

    if (sendError) {
      setStatus("idle");
      setError(
        sendError.message.toLowerCase().includes("signups not allowed")
          ? "That address is not set up to edit this site."
          : sendError.message,
      );
      return;
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="mt-8">
        <Callout>
          A sign-in link is on its way to {email}. Open it on this device, and it
          will bring you straight to the editor. The link works once, and for an
          hour.
        </Callout>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
      {linkFailed ? (
        <Callout tone="error">
          That link has already been used or has expired. Here is a fresh one.
        </Callout>
      ) : null}

      {error ? <Callout tone="error">{error}</Callout> : null}

      <Field label="Email address" htmlFor="email">
        <TextInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-peach px-7 text-[0.7rem] font-medium tracked text-white transition-all duration-300 hover:bg-peach-deep disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Sending" : "Email me a link"}
      </button>
    </form>
  );
}
