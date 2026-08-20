import type { AuditedEntity, EntityId } from "@/types/shared";

export type FlipMatchStatus = "pending" | "active" | "completed" | "cancelled";

export interface FlipParticipant {
  readonly userId: EntityId;
  readonly avatarId: EntityId;
  readonly deckRevisionId: EntityId;
}

export interface FlipMatch extends AuditedEntity {
  readonly status: FlipMatchStatus;
  readonly participants: readonly FlipParticipant[];
  readonly winnerId: EntityId | null;
  readonly rulesetVersion: string;
}
