import type { AuditedEntity, EntityId } from "@/types/core";
import type { MembershipTierId } from "@/domains/membership/types";

export interface UserProfile extends AuditedEntity {
  userId: EntityId;
  username: string;
  displayName: string;
  avatarAssetUrl: string | null;
  membershipTier: MembershipTierId;
  archetypeId: EntityId | null;
}

export interface PlayerIdentityReferences {
  userId: EntityId;
  activeDeckId: EntityId | null;
  forumProfileId: EntityId | null;
}

export interface ProfileUpdate {
  displayName?: string;
  avatarAssetUrl?: string | null;
}
