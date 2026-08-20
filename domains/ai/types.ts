import type { ArchetypeId, BloodTestResult, DimensionScores, WeightedAnswer } from "@/domains/blood-test/types";
import type { StockAvatar } from "@/domains/avatars/types";
import type { StarterDeckBlueprint } from "@/domains/decks/types";

export type BloodTestAnalysisInput = {
  answers: WeightedAnswer[];
};

export type AvatarMatchInput = {
  scores: DimensionScores;
  pool: StockAvatar[];
};

export type StarterDeckPersonalityInput = {
  blueprint: StarterDeckBlueprint;
  scores: DimensionScores;
};

export type DeckNameInput = {
  archetypeId: ArchetypeId;
  scores: DimensionScores;
};

export interface DcbdAiProvider {
  readonly id: string;
  analyseBloodTest(input: BloodTestAnalysisInput): Promise<BloodTestResult>;
  matchAvatar(input: AvatarMatchInput): Promise<StockAvatar | null>;
  generateStarterDeckPersonality(input: StarterDeckPersonalityInput): Promise<string | null>;
  generateDeckName(input: DeckNameInput): Promise<string | null>;
}
