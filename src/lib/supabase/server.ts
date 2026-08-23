import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/lib/supabase/database.types";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

/**
 * Cookie-bound client for the admin area: it knows who is signed in, so every
 * query it makes is subject to that user's row level security policies.
 *
 * Reading cookies makes the caller dynamic, which is exactly right for /admin
 * and exactly wrong for the public pages. Those use `publicClient()` instead.
 */
export async function serverClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl(), supabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Called from a Server Component, where cookies are read-only. The
          // session is refreshed in proxy.ts instead, so this is safe to skip.
        }
      },
    },
  });
}

/**
 * The signed-in user, or null. Also confirms the account is on the admins
 * allowlist, so a stray Supabase account cannot reach the CMS even before its
 * queries hit row level security.
 */
export async function currentAdmin() {
  const supabase = await serverClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id, email")
    .eq("user_id", user.id)
    .maybeSingle();

  return admin ? { id: user.id, email: admin.email } : null;
}
