import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Keeps the Supabase session cookie fresh for the admin area.
 *
 * Server Components cannot write cookies, so a token that expires mid-session
 * would otherwise sign the editor out at an arbitrary moment. Refreshing here,
 * before the route renders, is the supported way around that.
 *
 * Supabase's own guide calls this file `middleware.ts`. Next 16 deprecated that
 * convention and renamed it to `proxy.ts`, which is why the export below is
 * `proxy` rather than `middleware`.
 *
 * Scoped to /admin only: the public pages hold no session and must not be made
 * request-time by touching cookies.
 */
export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Before setup there is no project to talk to. Let the route render and
  // explain itself rather than failing here with a cryptic proxy error.
  if (!url || !key) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Touching the user is what triggers the refresh. The result is deliberately
  // unused: the gate lives in the protected layout, where it can redirect.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
