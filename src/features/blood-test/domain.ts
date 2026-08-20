import type { AuditedEntity, EntityId } from "@/types/shared";

export const STRATEGY_DIMENSIONS = ["control", "attack", "defence"] as const;
export type StrategyDimension = (typeof STRATEGY_DIMENSIONS)[number];
export type StrategyScores = Readonly<Record<StrategyDimension, number>>;

export interface WeightedAnswer {
  readonly questionId: EntityId;
  readonly answerId: EntityId;
  readonly weights: StrategyScores;
}

export interface BloodTestResult extends AuditedEntity {
  readonly userId: EntityId;
  readonly version: string;
  readonly scores: StrategyScores;
  readonly answers: readonly WeightedAnswer[];
  readonly status: "in_progress" | "completed";
}

export interface ArchetypeAssignment {
  readonly primary: StrategyDimension;
  readonly secondary: StrategyDimension | null;
  readonly scores: StrategyScores;
  readonly modelVersion: string;
}

export function isValidStrategyScores(
  scores: StrategyScores,
): boolean {
  return STRATEGY_DIMENSIONS.every(
    (dimension) =>
      Number.isFinite(scores[dimension]) && scores[dimension] >= 0,
  );
}
