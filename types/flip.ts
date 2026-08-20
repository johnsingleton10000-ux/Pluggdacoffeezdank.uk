import type { Uuid } from "@/types/common";

export type FlipMatchStatus = "scheduled" | "in_progress" | "completed" | "cancelled";

export interface FlipMatch {
  id: Uuid;
  playerOneId: Uuid;
  playerTwoId: Uuid | null;
  playerOneDeckId: Uuid;
  playerTwoDeckId: Uuid | null;
  status: FlipMatchStatus;
  winnerId: Uuid | null;
  createdAt: string;
  completedAt: string | null;
}
