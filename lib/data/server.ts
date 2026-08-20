import "server-only";

import { createServerSupabaseClient, createServiceRoleClient } from "@/lib/auth/supabase-server";
import { DataStoreNotConfiguredError } from "@/lib/data/errors";

export async function getUserDataClient() {
  const client = await createServerSupabaseClient();
  if (!client) throw new DataStoreNotConfiguredError("Supabase is not configured.");
  return client;
}

export function getPrivilegedDataClient() {
  const client = createServiceRoleClient();
  if (!client) {
    throw new DataStoreNotConfiguredError("Supabase service role is not configured.");
  }
  return client;
}
