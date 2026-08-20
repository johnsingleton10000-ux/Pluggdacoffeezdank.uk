import type { FlipMatch } from "../../../types/dcbd";

export interface FlipService {
  createMatch(playerId: string, opponentId?: string): Promise<FlipMatch>;
  getMatch(matchId: string, playerId: string): Promise<FlipMatch | null>;
}

/**
 * The game rules are intentionally absent. This contract gives future match
 * orchestration a home without guessing how Flip is played.
 */
