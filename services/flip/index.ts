import { assertServerOnly } from "@/lib/security";
import type { FlipMatch } from "@/types/flip";

/**
 * Flip rules are not specified yet. This module only holds the match
 * relationship to player, avatar, deck, XP and history.
 */
export async function onMatchCompleted(_match: FlipMatch): Promise<void> {
  assertServerOnly();
}
