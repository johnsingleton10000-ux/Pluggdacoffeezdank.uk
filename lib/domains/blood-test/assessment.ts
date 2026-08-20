import type { ArchetypeScores } from "../../../types/dcbd";

export interface BloodTestAnswer {
  questionId: string;
  value: unknown;
}

export interface BloodTestAssessment {
  questionnaireVersion: number;
  answers: BloodTestAnswer[];
  scores: ArchetypeScores | null;
}

export function createEmptyBloodTest(
  questionnaireVersion: number,
): BloodTestAssessment {
  return {
    questionnaireVersion,
    answers: [],
    scores: null,
  };
}
