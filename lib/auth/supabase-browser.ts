import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, publicEnv } from "@/lib/config/env";

export function createBrowserSupabaseClient() {
  if (!isSupabaseConfigured() || !publicEnv.supabaseUrl || !publicEnv.supabaseAnonKey) {
    return null;
  }

  return createBrowserClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey);
}
