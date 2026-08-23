"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/supabase/database.types";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase/env";

/**
 * Client-side Supabase for the admin: signing in, and uploading images straight
 * to storage so large files never pass through a server action.
 */
export function browserClient() {
  return createBrowserClient<Database>(supabaseUrl(), supabaseAnonKey());
}
