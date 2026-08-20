import type { AuthUser, UserAccount, UserProfile } from "@/types/account";
import { MEMBERSHIP_TIER_IDS, type MembershipTierId } from "@/types/membership";
import type { ArchetypeId } from "@/types/archetype";
import { ARCHETYPE_IDS } from "@/types/archetype";

interface ProfileRow {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_id: string | null;
  membership_tier: string;
  xp_current: number;
  xp_earned: number;
  xp_spent: number;
  archetype_id: string | null;
  starter_deck_id: string | null;
  created_at: string;
  updated_at: string;
}

function isMembershipTier(value: string): value is MembershipTierId {
  return (MEMBERSHIP_TIER_IDS as readonly string[]).includes(value);
}

function isArchetypeId(value: string): value is ArchetypeId {
  return (ARCHETYPE_IDS as readonly string[]).includes(value);
}

export function mapProfileRow(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    username: row.username,
    displayName: row.display_name,
    avatarId: row.avatar_id,
    membershipTier: isMembershipTier(row.membership_tier) ? row.membership_tier : "free",
    xp: {
      current: row.xp_current,
      earned: row.xp_earned,
      spent: row.xp_spent,
    },
    archetypeId: row.archetype_id && isArchetypeId(row.archetype_id) ? row.archetype_id : null,
    starterDeckId: row.starter_deck_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toUserAccount(user: AuthUser, profile: UserProfile | null): UserAccount | null {
  if (!profile) return null;
  return {
    ...profile,
    email: user.email,
    links: {
      collectionId: null,
      forumProfileId: null,
      tradingHistoryId: null,
      flipHistoryId: null,
      purchaseHistoryId: null,
    },
  };
}
