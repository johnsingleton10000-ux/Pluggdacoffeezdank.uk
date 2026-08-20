export const DIMENSION_IDS = ["control", "attack", "defence"] as const;

export type DimensionId = (typeof DIMENSION_IDS)[number];

export type DimensionScores = Record<DimensionId, number>;

export const ARCHETYPE_FAMILIES = [
  "control",
  "attack",
  "defence",
  "control_attack",
  "control_defence",
  "attack_defence",
  "balanced",
] as const;

export type ArchetypeId = (typeof ARCHETYPE_FAMILIES)[number];

export type WeightedAnswer = {
  questionId: string;
  optionId: string;
  weights: Partial<DimensionScores>;
};

export type BloodTest = {
  id: string;
  userId: string;
  status: "in_progress" | "completed";
  answers: WeightedAnswer[];
  scores: DimensionScores | null;
  archetypeId: ArchetypeId | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BloodTestResult = {
  scores: DimensionScores;
  archetypeId: ArchetypeId;
  primary: DimensionId | null;
  secondary: DimensionId | null;
};
