export const BLOOD_TEST_DIMENSIONS = ["attack", "defence", "control"] as const;
export type BloodTestDimension = (typeof BLOOD_TEST_DIMENSIONS)[number];

export interface BloodTestScores {
  attack: number;
  defence: number;
  control: number;
}

export interface BloodTestAnswerWeight {
  questionId: string;
  dimension: BloodTestDimension;
  weight: number;
}

export interface BloodTestAnswer {
  questionId: string;
  value: string;
  weights: BloodTestAnswerWeight[];
}

export interface BloodTestQuestion {
  id: string;
  index: number;
  title: string;
  prompt: string;
}

export interface BloodTestResult {
  id: string;
  userId: string;
  estateName: string;
  answers: BloodTestAnswer[];
  scores: BloodTestScores;
  createdAt: string;
}

export interface ArchetypeMatchPolicy {
  hybridMargin: number;
}
