export const BLOOD_TEST_DIMENSIONS = ["control", "attack", "defence"] as const;

export type BloodTestDimension = (typeof BLOOD_TEST_DIMENSIONS)[number];

export interface BloodTestScores {
  control: number;
  attack: number;
  defence: number;
}

export interface BloodTestAnswerWeight {
  questionId: string;
  dimension: BloodTestDimension;
  weight: number;
}

/**
 * Questions are not defined yet. Answers are stored as opaque payloads
 * plus optional dimension weights that later questionnaires will supply.
 */
export interface BloodTestAnswer {
  questionId: string;
  value: string | number | boolean;
  weights: BloodTestAnswerWeight[];
}

export interface BloodTestResult {
  id: string;
  userId: string;
  answers: BloodTestAnswer[];
  scores: BloodTestScores;
  createdAt: string;
}

export interface ArchetypeMatchPolicy {
  hybridMargin: number;
}
