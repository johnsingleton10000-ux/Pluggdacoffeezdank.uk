import type { AuditedEntity, EntityId } from "@/types/shared";

export interface PlayerProfile extends AuditedEntity {
  readonly userId: EntityId;
  readonly username: string;
  readonly displayName: string;
  readonly avatarId: EntityId | null;
  readonly archetypeId: EntityId | null;
}

export interface PlayerEcosystemReferences {
  readonly userId: EntityId;
  readonly membershipId: EntityId | null;
  readonly activeDeckId: EntityId | null;
  readonly forumProfileId: EntityId | null;
}
