"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/services/auth";

function normaliseUsername(value: string): string | null {
  const username = value.trim().toLowerCase();
  if (!username) return null;
  if (!/^[a-z0-9_]{3,24}$/.test(username)) {
    throw new Error("Username must be 3-24 characters: letters, numbers or underscore.");
  }
  return username;
}

export async function updateAccountIdentity(formData: FormData): Promise<{ error: string | null }> {
  try {
    const user = await getCurrentUser();
    if (!user) return { error: "Sign in required." };

    const supabase = createServerSupabaseClient();
    if (!supabase) return { error: "Authentication is not configured." };

    const username = normaliseUsername(String(formData.get("username") ?? ""));
    const displayName = String(formData.get("displayName") ?? "").trim() || null;

    const { error } = await supabase
      .from("profiles")
      .update({
        username,
        display_name: displayName,
      })
      .eq("id", user.id);

    if (error) return { error: error.message };
    return { error: null };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not update account." };
  }
}
