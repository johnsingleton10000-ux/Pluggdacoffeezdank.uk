import "server-only";

import { getCurrentUser } from "@/lib/auth/session";
import { DataStoreNotConfiguredError } from "@/lib/data/errors";
import { getUserDataClient } from "@/lib/data/server";
import { getCurrentMembership } from "@/lib/services/membership-service";
import { getXpBalance } from "@/lib/services/xp-service";
import { parseMembershipTierId } from "@/domains/membership";
import { ARCHETYPE_FAMILIES, type ArchetypeId } from "@/domains/blood-test";
import type { AccountFoundation } from "@/lib/types/profile";
import { emptyXpBalance } from "@/domains/xp";

function parseArchetypeId(value: string | null | undefined): ArchetypeId | null {
  if (!value) return null;
  return (ARCHETYPE_FAMILIES as readonly string[]).includes(value) ? (value as ArchetypeId) : null;
}

export async function getAccountFoundation(): Promise<AccountFoundation | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  try {
    const supabase = await getUserDataClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_id, membership_tier, archetype_id, active_deck_id")
      .eq("id", user.id)
      .maybeSingle();

    if (error) throw error;

    const xp = data ? await getXpBalance(user.id) : emptyXpBalance(user.id);
    const membership = data ? await getCurrentMembership(user.id) : null;

    return {
      userId: user.id,
      username: data?.username ?? null,
      displayName: data?.display_name ?? null,
      avatarId: data?.avatar_id ?? null,
      membershipTier: membership?.tier ?? parseMembershipTierId(data?.membership_tier),
      xp: {
        currentXp: xp.currentXp,
        earnedXp: xp.earnedXp,
        spentXp: xp.spentXp,
      },
      archetypeId: parseArchetypeId(data?.archetype_id),
      activeDeckId: data?.active_deck_id ?? null,
      collectionCount: 0,
      forumProfileId: data?.id ?? null,
      tradingHistoryCount: 0,
      flipHistoryCount: 0,
      purchaseHistoryCount: 0,
    };
  } catch (error) {
    if (error instanceof DataStoreNotConfiguredError) {
      return {
        userId: user.id,
        username: null,
        displayName: user.email ?? null,
        avatarId: null,
        membershipTier: "free",
        xp: emptyXpBalance(user.id),
        archetypeId: null,
        activeDeckId: null,
        collectionCount: 0,
        forumProfileId: null,
        tradingHistoryCount: 0,
        flipHistoryCount: 0,
        purchaseHistoryCount: 0,
      };
    }
    throw error;
  }
}
