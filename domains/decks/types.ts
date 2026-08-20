import type { AuditedEntity, EntityId, IsoDateTime } from "@/types/core";

export interface Deck extends AuditedEntity {
  ownerId: EntityId;
  name: string;
  personality: string | null;
  primaryArchetypeId: EntityId;
  secondaryArchetypeId: EntityId | null;
  sourceBloodTestId: EntityId | null;
}

export interface DeckCard {
  deckId: EntityId;
  cardOwnershipId: EntityId;
  position: number;
}

export interface DeckRevision {
  id: EntityId;
  deckId: EntityId;
  cardOwnershipIds: readonly EntityId[];
  reason: string;
  createdAt: IsoDateTime;
}
