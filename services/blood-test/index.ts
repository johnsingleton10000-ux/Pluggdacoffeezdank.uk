import { ARCHETYPES } from "@/config/archetypes";
import type {
  ArchetypeMatchPolicy,
  BloodTestAnswer,
  BloodTestDimension,
  BloodTestScores,
} from "@/types/blood-test";
import type { ArchetypeMatch } from "@/types/archetype";
import { BLOOD_TEST_DIMENSIONS } from "@/types/blood-test";

const DEFAULT_POLICY: ArchetypeMatchPolicy = {
  hybridMargin: 8,
};

export function emptyScores(): BloodTestScores {
  return { control: 0, attack: 0, defence: 0 };
}

export function accumulateScores(answers: BloodTestAnswer[]): BloodTestScores {
  return answers.reduce((scores, answer) => {
    for (const weight of answer.weights) {
      scores[weight.dimension] += weight.weight;
    }
    return scores;
  }, emptyScores());
}

export function normaliseScores(scores: BloodTestScores): BloodTestScores {
  const total = scores.control + scores.attack + scores.defence;
  if (total <= 0) return emptyScores();
  return {
    control: (scores.control / total) * 100,
    attack: (scores.attack / total) * 100,
    defence: (scores.defence / total) * 100,
  };
}

export function leadingDimensions(
  scores: BloodTestScores,
  policy: ArchetypeMatchPolicy = DEFAULT_POLICY,
): BloodTestDimension[] {
  const ranked = BLOOD_TEST_DIMENSIONS.map((dimension) => ({
    dimension,
    value: scores[dimension],
  })).sort((a, b) => b.value - a.value);

  const first = ranked[0];
  if (!first) return [];

  const close = ranked.filter((item) => first.value - item.value <= policy.hybridMargin);
  if (close.length === 3) return [...BLOOD_TEST_DIMENSIONS];
  return close.map((item) => item.dimension);
}

export function matchArchetype(
  scores: BloodTestScores,
  policy: ArchetypeMatchPolicy = DEFAULT_POLICY,
): ArchetypeMatch {
  const normalised = normaliseScores(scores);
  const leading = leadingDimensions(normalised, policy);

  const match = ARCHETYPES.reduce((best, archetype) => {
    const distance = vectorDistance(normalised, archetype.vector);
    if (!best || distance < best.distance) {
      return { archetype, distance };
    }
    return best;
  }, null as { archetype: (typeof ARCHETYPES)[number]; distance: number } | null);

  return {
    archetypeId: match?.archetype.id ?? "balanced",
    scores: normalised,
    leadingDimensions: leading,
  };
}

function vectorDistance(
  scores: BloodTestScores,
  vector: { control: number; attack: number; defence: number },
): number {
  const scaled = {
    control: vector.control * 100,
    attack: vector.attack * 100,
    defence: vector.defence * 100,
  };
  return Math.hypot(
    scores.control - scaled.control,
    scores.attack - scaled.attack,
    scores.defence - scaled.defence,
  );
}
