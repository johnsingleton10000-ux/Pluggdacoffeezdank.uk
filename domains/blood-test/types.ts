import type { EntityId, IsoDateTime } from "@/types/core";

export const STRATEGY_DIMENSIONS = [
  "control",
  "attack",
  "defence",
] as const;

export type StrategyDimension = (typeof STRATEGY_DIMENSIONS)[number];
export type StrategyScores = Readonly<Record<StrategyDimension, number>>;

export interface WeightedAnswer {
  questionId: EntityId;
  optionId: EntityId;
}

export interface BloodTestSubmission {
  id: EntityId;
  userId: EntityId;
  version: string;
  answers: readonly WeightedAnswer[];
  submittedAt: IsoDateTime | null;
}

export interface BloodTestResult {
  submissionId: EntityId;
  scores: StrategyScores;
  primaryArchetypeId: EntityId;
  secondaryArchetypeId: EntityId | null;
  evaluatedAt: IsoDateTime;
  evaluatorVersion: string;
}

export interface BloodTestEvaluator {
  evaluate(submission: BloodTestSubmission): Promise<BloodTestResult>;
}
