import {
  ARCHETYPE_FAMILIES,
  DIMENSION_IDS,
  type ArchetypeId,
  type BloodTestResult,
  type DimensionId,
  type DimensionScores,
  type WeightedAnswer,
} from "@/domains/blood-test/types";

export const EMPTY_SCORES: DimensionScores = {
  control: 0,
  attack: 0,
  defence: 0,
};

export function tallyRawScores(answers: readonly WeightedAnswer[]): DimensionScores {
  return answers.reduce<DimensionScores>(
    (scores, answer) => ({
      control: scores.control + (answer.weights.control ?? 0),
      attack: scores.attack + (answer.weights.attack ?? 0),
      defence: scores.defence + (answer.weights.defence ?? 0),
    }),
    { ...EMPTY_SCORES },
  );
}

export function normaliseScores(raw: DimensionScores): DimensionScores {
  const total = DIMENSION_IDS.reduce((sum, dimension) => sum + Math.max(raw[dimension], 0), 0);
  if (total <= 0) return { ...EMPTY_SCORES };

  const rounded = DIMENSION_IDS.reduce<DimensionScores>(
    (scores, dimension) => {
      scores[dimension] = Math.round((Math.max(raw[dimension], 0) / total) * 100);
      return scores;
    },
    { ...EMPTY_SCORES },
  );

  const drift = 100 - DIMENSION_IDS.reduce((sum, dimension) => sum + rounded[dimension], 0);
  if (drift !== 0) {
    const dominant = rankedDimensions(rounded)[0];
    if (dominant) rounded[dominant] += drift;
  }

  return rounded;
}

export function rankedDimensions(scores: DimensionScores): DimensionId[] {
  return [...DIMENSION_IDS].sort((a, b) => scores[b] - scores[a] || a.localeCompare(b));
}

/**
 * Hybrid detection uses relative score gaps rather than invented game rules.
 * A later spec can replace these thresholds without changing the data model.
 */
const HYBRID_GAP = 12;
const BALANCED_SPREAD = 15;

export function deriveArchetype(scores: DimensionScores): Pick<BloodTestResult, "archetypeId" | "primary" | "secondary"> {
  const [first, second, third] = rankedDimensions(scores);
  if (!first || !second || !third) {
    return { archetypeId: "balanced", primary: null, secondary: null };
  }

  const spread = scores[first] - scores[third];
  if (spread <= BALANCED_SPREAD) {
    return { archetypeId: "balanced", primary: first, secondary: second };
  }

  const gap = scores[first] - scores[second];
  if (gap <= HYBRID_GAP) {
    const hybrid = [first, second].sort().join("_") as ArchetypeId;
    if ((ARCHETYPE_FAMILIES as readonly string[]).includes(hybrid)) {
      return { archetypeId: hybrid, primary: first, secondary: second };
    }
  }

  return { archetypeId: first, primary: first, secondary: second };
}

export function evaluateBloodTest(answers: readonly WeightedAnswer[]): BloodTestResult {
  const scores = normaliseScores(tallyRawScores(answers));
  const archetype = deriveArchetype(scores);
  return { scores, ...archetype };
}
