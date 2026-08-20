import type { AuditedEntity, EntityId } from "@/types/shared";

export const STRATEGY_DIMENSIONS = ["control", "attack", "defence"] as const;
export type StrategyDimension = (typeof STRATEGY_DIMENSIONS)[number];
export type StrategyScores = Readonly<Record<StrategyDimension, number>>;

export interface AnswerSelection {
  readonly questionId: EntityId;
  readonly answerId: EntityId;
}

/** Server-owned scoring data; never accepted from an assessment submission. */
export interface AnswerWeightDefinition extends AnswerSelection {
  readonly weights: StrategyScores;
}

interface BloodTestResultBase extends AuditedEntity {
  readonly userId: EntityId;
  readonly version: string;
  readonly answers: readonly AnswerSelection[];
}

export type BloodTestResult =
  | (BloodTestResultBase & {
      readonly status: "in_progress";
      readonly scores: null;
      readonly completedAt: null;
    })
  | (BloodTestResultBase & {
      readonly status: "completed";
      readonly scores: StrategyScores;
      readonly completedAt: string;
    });

export interface BloodTestScoringInput {
  readonly testId: EntityId;
  readonly questionnaireVersion: string;
  readonly answers: readonly AnswerSelection[];
}

export interface ArchetypeAssignment {
  readonly primary: StrategyDimension;
  readonly secondary: StrategyDimension | null;
  readonly scores: StrategyScores;
  readonly modelVersion: string;
}

export function isValidStrategyScores(
  scores: unknown,
): scores is StrategyScores {
  if (typeof scores !== "object" || scores === null) {
    return false;
  }

  const candidate = scores as Readonly<Record<string, unknown>>;
  return STRATEGY_DIMENSIONS.every((dimension) => {
    const value = candidate[dimension];
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
  });
}
