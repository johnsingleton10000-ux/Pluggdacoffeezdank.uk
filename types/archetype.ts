import type { BloodTestDimension, BloodTestScores } from "@/types/blood-test";

export const ARCHETYPE_IDS = [
  "attack",
  "defence",
  "control",
  "attack_control",
  "attack_defence",
  "defence_control",
  "balanced",
] as const;

export type ArchetypeId = (typeof ARCHETYPE_IDS)[number];

export interface ArchetypeVector {
  attack: number;
  defence: number;
  control: number;
}

export interface ArchetypeDefinition {
  id: ArchetypeId;
  name: string;
  deckName: string;
  quote: string;
  summary: string;
  primaryDimensions: BloodTestDimension[];
  vector: ArchetypeVector;
}

export interface ArchetypeMatch {
  archetypeId: ArchetypeId;
  scores: BloodTestScores;
  leadingDimensions: BloodTestDimension[];
}
