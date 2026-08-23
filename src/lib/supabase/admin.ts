import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";
import { supabaseServiceRoleKey, supabaseUrl } from "@/lib/supabase/env";

/**
 * Service role client. Bypasses row level security entirely, so it is used by
 * exactly two things: the daily heartbeat route and the one-off seed script.
 *
 * Never import this from a client component. The guard below is a tripwire, not
 * a security boundary: the real protection is that SUPABASE_SERVICE_ROLE_KEY has
 * no NEXT_PUBLIC_ prefix and so is never bundled for the browser.
 */
export function serviceRoleClient() {
  if (typeof window !== "undefined") {
    throw new Error("serviceRoleClient() must never run in the browser.");
  }

  return createClient<Database>(supabaseUrl(), supabaseServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
