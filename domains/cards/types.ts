import type { AuditedEntity, EntityId, IsoDateTime } from "@/types/core";
import type { StrategyScores } from "@/domains/blood-test/types";

export type CardRarityId = string;
export type CardCategoryId = string;

export interface CardDefinition extends AuditedEntity {
  name: string;
  artworkUrl: string | null;
  rarityId: CardRarityId;
  categoryId: CardCategoryId;
  statistics: StrategyScores;
  abilities: readonly EntityId[];
}

export type CardOwnershipStatus =
  | "owned"
  | "locked"
  | "listed"
  | "in_trade"
  | "transferred";

export interface CardOwnership {
  id: EntityId;
  cardId: EntityId;
  ownerId: EntityId;
  sourceType: string;
  sourceReferenceId: EntityId | null;
  status: CardOwnershipStatus;
  acquiredAt: IsoDateTime;
}

export interface CardOwnershipEvent {
  id: EntityId;
  ownershipId: EntityId;
  fromOwnerId: EntityId | null;
  toOwnerId: EntityId;
  reason: string;
  createdAt: IsoDateTime;
}
