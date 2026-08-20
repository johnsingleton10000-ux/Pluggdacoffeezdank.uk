import type { MembershipTierId } from "@/domains/membership/types";
import type { ArchetypeId } from "@/domains/blood-test/types";
import type { XpBalance } from "@/domains/xp/types";

export type Profile = {
  id: string;
  userId: string;
  username: string | null;
  displayName: string | null;
  avatarId: string | null;
  membershipTier: MembershipTierId;
  xp: XpBalance;
  archetypeId: ArchetypeId | null;
  activeDeckId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AccountFoundation = {
  userId: string;
  username: string | null;
  displayName: string | null;
  avatarId: string | null;
  membershipTier: MembershipTierId;
  xp: Pick<XpBalance, "currentXp" | "earnedXp" | "spentXp">;
  archetypeId: ArchetypeId | null;
  activeDeckId: string | null;
  collectionCount: number;
  forumProfileId: string | null;
  tradingHistoryCount: number;
  flipHistoryCount: number;
  purchaseHistoryCount: number;
};
