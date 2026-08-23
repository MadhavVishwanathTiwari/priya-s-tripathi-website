import { io } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

import { Callout } from "@/components/admin/fields";
import { serviceRoleClient } from "@/lib/supabase/admin";
import { serverClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

/** How long the project may sit idle before Supabase pauses a free project. */
const PAUSE_AFTER_DAYS = 7;

async function counts(table: "posts" | "testimonials") {
  const supabase = await serverClient();

  const [live, drafts] = await Promise.all([
    supabase
      .from(table)
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from(table)
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
  ]);

  return { live: live.count ?? 0, drafts: drafts.count ?? 0 };
}

/**
 * The heartbeat row is written daily by /api/heartbeat. Reading it needs the
 * service role, which is why this page is the only screen that uses it.
 */
async function heartbeat() {
  // Reading the clock is request-time work: `io()` keeps it out of the
  // prerendered shell rather than being captured once at build.
  await io();

  try {
    const { data, error } = await serviceRoleClient()
      .from("heartbeat")
      .select("last_ping")
      .maybeSingle();

    if (error) return { reachable: false as const };

    const lastPing = data?.last_ping ?? null;
    const daysSince = lastPing
      ? Math.floor((Date.now() - Date.parse(lastPing)) / 86_400_000)
      : null;

    return { reachable: true as const, lastPing, daysSince };
  } catch {
    return { reachable: false as const };
  }
}

function Stat({
  label,
  value,
  detail,
  href,
  cta,
}: {
  label: string;
  value: string;
  detail: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded-sm border border-line bg-white p-6">
      <p className="text-[0.62rem] tracked text-gold-deep/80">{label}</p>
      <p className="mt-3 font-serif text-[2rem] leading-none text-ink">{value}</p>
      <p className="mt-2 flex-1 text-[0.82rem] text-ink-muted">{detail}</p>
      <Link
        href={href}
        className="mt-5 text-[0.78rem] text-gold-deep underline underline-offset-4 hover:text-peach"
      >
        {cta}
      </Link>
    </div>
  );
}

async function DatabaseStatus() {
  const pulse = await heartbeat();
  const dashboardUrl = process.env.NEXT_PUBLIC_SUPABASE_DASHBOARD_URL;

  return !pulse.reachable ? (
    <Callout tone="error">
      The database cannot be reached. Free Supabase projects are paused after
      about {PAUSE_AFTER_DAYS} days with no activity, and only the Supabase
      dashboard can wake one up.{" "}
      {dashboardUrl ? (
        <a
          href={dashboardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Open the project and press Resume
        </a>
      ) : (
        "Open the project in the Supabase dashboard and press Resume"
      )}
      , wait a minute or two, then reload this page.
    </Callout>
  ) : (
    <Callout>
      Database awake.{" "}
      {pulse.lastPing
        ? `Last checked ${formatDate(pulse.lastPing.slice(0, 10))}${
            pulse.daysSince !== null && pulse.daysSince > 2
              ? ", which is longer ago than expected. The daily check may have stopped."
              : "."
          }`
        : "The daily check has not run yet."}{" "}
      A check runs once a day so the project never sits idle long enough to be
      paused.
    </Callout>
  );
}

export default async function AdminDashboard() {
  const [posts, testimonials] = await Promise.all([
    counts("posts"),
    counts("testimonials"),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-[1.8rem] font-light text-ink">
          Everything you can change
        </h1>
        <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-ink-muted">
          Articles and testimonials live here. The rest of the site, the
          services, the fees and the wording of the home page, is part of the
          design and is changed by your developer.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Stat
          label="Articles"
          value={String(posts.live)}
          detail={
            posts.drafts > 0
              ? `on the site, and ${posts.drafts} still in draft`
              : "on the site, nothing waiting in draft"
          }
          href="/admin/posts"
          cta="Write or edit an article"
        />
        <Stat
          label="Testimonials"
          value={String(testimonials.live)}
          detail={
            testimonials.drafts > 0
              ? `on the site, and ${testimonials.drafts} still in draft`
              : "on the site, nothing waiting in draft"
          }
          href="/admin/testimonials"
          cta="Add or edit a testimonial"
        />
      </div>

      <Suspense
        fallback={
          <Callout>Checking that the database is awake.</Callout>
        }
      >
        <DatabaseStatus />
      </Suspense>
    </div>
  );
}
