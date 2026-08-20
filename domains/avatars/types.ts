import type { AuditedEntity, EntityId } from "@/types/core";
import type { StrategyScores } from "@/domains/blood-test/types";

export interface AvatarDefinition extends AuditedEntity {
  name: string;
  strategicProfile: StrategyScores;
  baseArtworkUrl: string;
  isActive: boolean;
}

export type AvatarCosmeticValue = string | number | boolean;

export interface PlayerAvatar {
  id: EntityId;
  userId: EntityId;
  avatarDefinitionId: EntityId;
  sourceBloodTestId: EntityId;
  cosmetics: Readonly<Record<string, AvatarCosmeticValue>>;
}

export interface AvatarMatcher {
  findClosestMatch(
    scores: StrategyScores,
    candidates: readonly AvatarDefinition[],
  ): Promise<AvatarDefinition>;
}
