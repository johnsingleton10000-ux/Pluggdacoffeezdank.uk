import type { ArchetypeAssignment } from "@/features/blood-test/domain";
import type { AuditedEntity, EntityId, IsoDateTime } from "@/types/shared";

export interface Deck extends AuditedEntity {
  readonly ownerId: EntityId;
  readonly name: string;
  readonly personality: string;
  readonly archetype: ArchetypeAssignment;
  readonly cardOwnershipIds: readonly EntityId[];
  readonly sourceBloodTestId: EntityId | null;
}

export interface DeckRevision {
  readonly id: EntityId;
  readonly deckId: EntityId;
  readonly revision: number;
  readonly cardOwnershipIds: readonly EntityId[];
  readonly changedAt: IsoDateTime;
  readonly reason: string;
}
