export type {
  ArchetypeId,
  BloodTest,
  BloodTestResult,
  DimensionId,
  DimensionScores,
  WeightedAnswer,
} from "@/domains/blood-test/types";
export { ARCHETYPE_FAMILIES, DIMENSION_IDS } from "@/domains/blood-test/types";
export {
  EMPTY_SCORES,
  deriveArchetype,
  evaluateBloodTest,
  normaliseScores,
  rankedDimensions,
  tallyRawScores,
} from "@/domains/blood-test/scoring";
