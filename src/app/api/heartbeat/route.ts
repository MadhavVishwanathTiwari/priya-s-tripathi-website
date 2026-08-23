import { NextResponse, type NextRequest } from "next/server";

import { serviceRoleClient } from "@/lib/supabase/admin";

/**
 * Keeps the Supabase project awake.
 *
 * Supabase pauses a free project after about a week of low activity, and only
 * the dashboard can resume one, so prevention is the whole strategy. Vercel Cron
 * calls this once a day (see vercel.json) and the row it writes is unambiguous
 * database activity. A read alone would probably do; a write certainly does.
 *
 * The public pages are served from cache and never touch Supabase, so ordinary
 * traffic cannot be relied on for this.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;

  // Vercel Cron sends the secret as a bearer token. Anything else is refused,
  // so the endpoint cannot be used to poke the database from outside.
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Not allowed" }, { status: 401 });
  }

  try {
    const { data, error } = await serviceRoleClient()
      .from("heartbeat")
      .upsert({ id: true, last_ping: new Date().toISOString() })
      .select("last_ping")
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, last_ping: data.last_ping });
  } catch (cause) {
    return NextResponse.json(
      {
        ok: false,
        error: cause instanceof Error ? cause.message : "Unknown failure",
      },
      { status: 500 },
    );
  }
}
