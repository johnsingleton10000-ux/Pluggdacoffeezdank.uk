import type { IsoDateTime, Uuid } from "@/types/common";
import type { MembershipTierId } from "@/types/membership";
import type { ArchetypeId } from "@/types/archetype";
import type { XpBalance } from "@/types/xp";

export interface AuthUser {
  id: Uuid;
  email: string | null;
}

export interface UserProfile {
  id: Uuid;
  username: string | null;
  displayName: string | null;
  avatarId: Uuid | null;
  membershipTier: MembershipTierId;
  xp: XpBalance;
  archetypeId: ArchetypeId | null;
  starterDeckId: Uuid | null;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

/**
 * Future account surfaces. These remain optional until each system is built.
 * They are listed here so later work can attach without reshaping the profile.
 */
export interface UserAccountLinks {
  collectionId: Uuid | null;
  forumProfileId: Uuid | null;
  tradingHistoryId: Uuid | null;
  flipHistoryId: Uuid | null;
  purchaseHistoryId: Uuid | null;
}

export interface UserAccount extends UserProfile {
  email: string | null;
  links: UserAccountLinks;
}

export type ProfilePublicFields = Pick<
  UserProfile,
  "id" | "username" | "displayName" | "avatarId" | "membershipTier" | "archetypeId"
>;
