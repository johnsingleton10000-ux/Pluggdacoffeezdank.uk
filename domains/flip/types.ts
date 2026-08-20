import type { EntityId, IsoDateTime } from "@/types/core";

export type FlipMatchStatus =
  | "pending"
  | "active"
  | "completed"
  | "cancelled";

export interface FlipMatchParticipant {
  userId: EntityId;
  avatarId: EntityId;
  deckRevisionId: EntityId;
}

export interface FlipMatch {
  id: EntityId;
  participants: readonly FlipMatchParticipant[];
  status: FlipMatchStatus;
  winnerId: EntityId | null;
  rulesetVersion: string;
  startedAt: IsoDateTime | null;
  completedAt: IsoDateTime | null;
}

export interface FlipMatchEngine {
  createMatch(
    participants: readonly FlipMatchParticipant[],
    rulesetVersion: string,
  ): Promise<FlipMatch>;
}
