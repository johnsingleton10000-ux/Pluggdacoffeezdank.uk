import type { StrategyScores } from "@/features/blood-test/domain";
import type { AuditedEntity, EntityId } from "@/types/shared";

export type CardRarity = string;
export type CardCategory = string;
export type CardAbility = Readonly<Record<string, unknown>>;

export interface CardDefinition extends AuditedEntity {
  readonly name: string;
  readonly artworkUrl: string | null;
  readonly rarity: CardRarity;
  readonly category: CardCategory;
  readonly statistics: StrategyScores;
  readonly abilities: readonly CardAbility[];
}

/** Taxonomies remain product-owner-defined until the card specification. */
export type CardCollectionStatus = string;
export type CardTradeStatus = string;

export interface CardOwnership extends AuditedEntity {
  readonly cardId: EntityId;
  readonly ownerId: EntityId;
  readonly sourceType: string;
  readonly sourceId: EntityId | null;
  readonly collectionStatus: CardCollectionStatus;
  readonly tradeStatus: CardTradeStatus;
}
