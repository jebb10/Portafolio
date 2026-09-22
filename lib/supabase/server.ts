import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

/**
 * Cliente de servidor Supabase con privilegios administrativos (Service Role)
 * para tareas de backend, logging de telemetría y sincronización segura.
 */
export function createServerSupabaseClient(): SupabaseClient<Database> | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
