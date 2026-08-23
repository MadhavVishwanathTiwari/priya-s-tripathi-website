import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

/**
 * Anonymous, cookie-free client for the public pages.
 *
 * Deliberately not the `@supabase/ssr` server client: reading cookies would opt
 * every page that touches content into request-time rendering. Nothing here
 * depends on who is asking, so the reads stay cacheable and the pages stay
 * static. Row level security limits this key to published rows.
 */
export function publicClient() {
  return createClient<Database>(supabaseUrl(), supabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
