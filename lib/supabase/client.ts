import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let clientInstance: SupabaseClient<Database> | null = null;

/**
 * Retorna el cliente Supabase para el navegador o null si las credenciales
 * aún no han sido configuradas en el entorno.
 */
export function getSupabaseClient(): SupabaseClient<Database> | null {
  if (typeof window === "undefined") {
    // Entorno de servidor
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }
    return createClient<Database>(supabaseUrl, supabaseAnonKey);
  }

  // Entorno de cliente (singleton)
  if (!clientInstance && supabaseUrl && supabaseAnonKey) {
    clientInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }

  return clientInstance;
}

/**
 * Indicador booleano de si Supabase está activo y configurado en runtime.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
