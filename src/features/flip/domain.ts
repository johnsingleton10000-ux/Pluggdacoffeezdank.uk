import type { AuditedEntity, EntityId } from "@/types/shared";

/** Match lifecycle values depend on the future Flip ruleset. */
export type FlipMatchStatus = string;

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
