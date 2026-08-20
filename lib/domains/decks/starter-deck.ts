import type { BloodTestResult, Deck } from "../../../types/dcbd";

export interface StarterDeckPlan extends Pick<
  Deck,
  "name" | "personality" | "archetype"
> {
  cardIds: string[];
}

export interface StarterDeckGenerator {
  generate(input: {
    bloodTest: BloodTestResult;
    availableCardIds: string[];
  }): Promise<StarterDeckPlan>;
}
