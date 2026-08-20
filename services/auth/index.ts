import "server-only";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mapProfileRow, toUserAccount } from "@/lib/mappers";
import { isSupabaseConfigured } from "@/lib/env";
import { DcbdConfigError } from "@/lib/errors";
import type { AuthUser, UserAccount, UserProfile } from "@/types/account";

export function authIsConfigured(): boolean {
  return isSupabaseConfigured();
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return { id: data.user.id, email: data.user.email ?? null };
}

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, username, display_name, avatar_id, membership_tier, xp_current, xp_earned, xp_spent, archetype_id, starter_deck_id, created_at, updated_at",
    )
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return mapProfileRow(data as Parameters<typeof mapProfileRow>[0]);
}

export async function getCurrentAccount(): Promise<UserAccount | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  const profile = await getProfile(user.id);
  return toUserAccount(user, profile);
}

export async function requireConfiguredAuth() {
  if (!authIsConfigured()) {
    throw new DcbdConfigError("Supabase authentication is not configured.");
  }
}
