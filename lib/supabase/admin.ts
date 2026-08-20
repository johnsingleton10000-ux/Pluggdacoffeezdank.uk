import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getPublicSupabaseConfig, getServiceRoleKey } from "@/lib/env";
import { assertServerOnly } from "@/lib/security";
import { DcbdConfigError } from "@/lib/errors";

/**
 * Service-role client. Server-only. Bypasses RLS — use only inside
 * trusted XP, membership and reward writers.
 */
export function createAdminSupabaseClient() {
  assertServerOnly();
  const config = getPublicSupabaseConfig();
  const serviceRoleKey = getServiceRoleKey();
  if (!config || !serviceRoleKey) {
    throw new DcbdConfigError("Supabase service role is not configured.");
  }

  return createClient(config.url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
