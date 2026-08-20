import "server-only";

import { createServerSupabaseClient } from "@/lib/auth/supabase-server";
import { UnauthorizedError } from "@/lib/data/errors";

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) throw new UnauthorizedError("Sign in required.");
  return user;
}
