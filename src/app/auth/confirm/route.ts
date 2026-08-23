import type { EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { serverClient } from "@/lib/supabase/server";

/**
 * Lands the magic link.
 *
 * Two shapes are accepted so the sign-in works whether or not the Supabase
 * email template has been customised:
 *
 *  - `?code=...`        the default PKCE link, exchanged for a session here
 *  - `?token_hash=&type=` the template Supabase recommends for server-side auth
 *
 * Either way the session cookie is written by this handler, which is a Route
 * Handler and so allowed to set cookies.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  // Only ever redirect within this site: an open redirect here would hand the
  // session to whoever crafted the link.
  const requested = searchParams.get("next") ?? "/admin";
  const next = requested.startsWith("/") ? requested : "/admin";

  const supabase = await serverClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, origin));
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) return NextResponse.redirect(new URL(next, origin));
  }

  return NextResponse.redirect(new URL("/admin/login?error=link", origin));
}
