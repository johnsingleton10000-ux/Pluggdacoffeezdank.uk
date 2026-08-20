import type {
  ArchetypeCode,
  ArchetypeScores,
  BloodTestResult,
  Deck,
} from "../../../types/dcbd";

export interface BloodTestAnalysisInput {
  answers: Record<string, unknown>;
  questionnaireVersion: number;
}

export interface StarterDeckGenerationInput {
  bloodTest: BloodTestResult;
  availableCardIds: string[];
}

export interface AiProvider {
  analyzeBloodTest(input: BloodTestAnalysisInput): Promise<{
    scores: ArchetypeScores;
    archetype: ArchetypeCode;
  }>;
  matchAvatar(input: {
    archetype: ArchetypeCode;
    scores: ArchetypeScores;
    availableAvatarIds: string[];
  }): Promise<string>;
  generateStarterDeck(input: StarterDeckGenerationInput): Promise<
    Pick<Deck, "name" | "personality" | "archetype"> & { cardIds: string[] }
  >;
}

/**
 * AI is intentionally an application boundary. Provider credentials and
 * prompts belong in a server-side implementation when the product rules exist.
 */
export class UnconfiguredAiProvider implements AiProvider {
  async analyzeBloodTest(): Promise<never> {
    throw new Error("Blood Test analysis is not configured yet.");
  }

  async matchAvatar(): Promise<never> {
    throw new Error("Avatar matching is not configured yet.");
  }

  async generateStarterDeck(): Promise<never> {
    throw new Error("Starter deck generation is not configured yet.");
  }
}

export function createAiProvider(): AiProvider {
  return new UnconfiguredAiProvider();
}
