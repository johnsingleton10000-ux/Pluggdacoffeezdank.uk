export type FlipMatchStatus = "pending" | "in_progress" | "completed" | "void";

export type FlipMatchParticipant = {
  userId: string;
  avatarId: string | null;
  deckId: string | null;
  result: "win" | "loss" | "draw" | null;
};

export type FlipMatch = {
  id: string;
  status: FlipMatchStatus;
  participants: FlipMatchParticipant[];
  startedAt: string | null;
  endedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
