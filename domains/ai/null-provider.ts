import { evaluateBloodTest } from "@/domains/blood-test/scoring";
import { matchClosestAvatar } from "@/domains/avatars/matching";
import type { DcbdAiProvider } from "@/domains/ai/types";

/**
 * Deterministic fallback. Swap this for an external provider later
 * without changing Blood Test, avatar or deck call sites.
 */
export const nullAiProvider: DcbdAiProvider = {
  id: "null",
  async analyseBloodTest(input) {
    return evaluateBloodTest(input.answers);
  },
  async matchAvatar(input) {
    return matchClosestAvatar(input.scores, input.pool);
  },
  async generateStarterDeckPersonality() {
    return null;
  },
  async generateDeckName() {
    return null;
  },
};
