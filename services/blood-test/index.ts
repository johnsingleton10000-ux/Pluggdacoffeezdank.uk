import { ARCHETYPES } from "@/config/archetypes";
import { BLOOD_TEST_QUESTIONS } from "@/config/blood-test";
import type { ArchetypeMatch } from "@/types/archetype";
import type {
  ArchetypeMatchPolicy,
  BloodTestAnswer,
  BloodTestDimension,
  BloodTestScores,
} from "@/types/blood-test";
import { BLOOD_TEST_DIMENSIONS } from "@/types/blood-test";

const DEFAULT_POLICY: ArchetypeMatchPolicy = { hybridMargin: 8 };

const LEXICON: Record<BloodTestDimension, string[]> = {
  attack: ["charge", "front", "force", "strike", "first", "attack", "war", "pressure", "aggressive", "holster", "fight", "flick", "push", "flip", "table", "own"],
  defence: ["protect", "weak", "wait", "smoke", "clear", "fortress", "shield", "survive", "crease", "hold", "line", "ready", "watch"],
  control: ["silent", "silence", "patience", "patient", "grow", "perfect", "master", "strategy", "outlast", "calm", "read", "plan", "control", "outthink"],
};

export function emptyScores(): BloodTestScores {
  return { attack: 0, defence: 0, control: 0 };
}

export function scoreFreeText(questionId: string, text: string): BloodTestAnswer {
  const haystack = text.toLowerCase();
  const weights = BLOOD_TEST_DIMENSIONS.map((dimension) => {
    const hits = LEXICON[dimension].reduce((count, word) => count + (haystack.includes(word) ? 1 : 0), 0);
    return { questionId, dimension, weight: hits + 0.15 };
  });
  return { questionId, value: text, weights };
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
  const total = scores.attack + scores.defence + scores.control;
  if (total <= 0) return emptyScores();
  return {
    attack: (scores.attack / total) * 100,
    defence: (scores.defence / total) * 100,
    control: (scores.control / total) * 100,
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
    if (!best || distance < best.distance) return { archetype, distance };
    return best;
  }, null as { archetype: (typeof ARCHETYPES)[number]; distance: number } | null);

  return {
    archetypeId: match?.archetype.id ?? "balanced",
    scores: normalised,
    leadingDimensions: leading,
  };
}

export function analyseBloodTest(raw: Record<string, string>, estateName: string) {
  const answers = BLOOD_TEST_QUESTIONS.map((question) => {
    const value = (raw[question.id] || "").trim();
    if (value.length < 8) {
      throw new Error(`Answer the ${question.title} in Estate language — at least a sentence.`);
    }
    return scoreFreeText(question.id, value);
  });
  const scores = accumulateScores(answers);
  const match = matchArchetype(scores);
  return { estateName: estateName.trim(), answers, scores: match.scores, match };
}

function vectorDistance(
  scores: BloodTestScores,
  vector: { attack: number; defence: number; control: number },
) {
  const scaled = {
    attack: vector.attack * 100,
    defence: vector.defence * 100,
    control: vector.control * 100,
  };
  return Math.hypot(
    scores.attack - scaled.attack,
    scores.defence - scaled.defence,
    scores.control - scaled.control,
  );
}
