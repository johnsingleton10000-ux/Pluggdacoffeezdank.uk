import type { BloodTestAnswer, BloodTestScores } from "@/types/blood-test";
import type { ArchetypeMatch } from "@/types/archetype";
import type { AvatarMatch } from "@/types/avatar";
import type { StarterDeckPlan } from "@/types/deck";

export interface BloodTestAnalysis {
  scores: BloodTestScores;
  archetype: ArchetypeMatch;
}

export interface DcbdAiProvider {
  analyseBloodTest(answers: BloodTestAnswer[]): Promise<BloodTestAnalysis>;
  matchAvatar(analysis: BloodTestAnalysis): Promise<AvatarMatch>;
  generateStarterDeckPersonality(analysis: BloodTestAnalysis): Promise<string>;
  generateDeckName(analysis: BloodTestAnalysis): Promise<string>;
  planStarterDeck(analysis: BloodTestAnalysis): Promise<StarterDeckPlan>;
}
