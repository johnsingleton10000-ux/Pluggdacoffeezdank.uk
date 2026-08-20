import "server-only";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getServiceRoleKey, isSupabaseConfigured, publicEnv } from "@/lib/config/env";

export async function createServerSupabaseClient() {
  if (!isSupabaseConfigured() || !publicEnv.supabaseUrl || !publicEnv.supabaseAnonKey) {
    return null;
  }

  const cookieStore = cookies();

  return createServerClient(publicEnv.supabaseUrl, publicEnv.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always persist refreshed cookies.
        }
      },
    },
  });
}

export function createServiceRoleClient() {
  const serviceRoleKey = getServiceRoleKey();
  if (!publicEnv.supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(publicEnv.supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
