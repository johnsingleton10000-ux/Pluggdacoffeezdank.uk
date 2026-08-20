import type { BloodTestDimension } from "@/types/blood-test";

export const ARCHETYPE_IDS = [
  "control",
  "attack",
  "defence",
  "control_attack",
  "control_defence",
  "attack_defence",
  "balanced",
] as const;

export type ArchetypeId = (typeof ARCHETYPE_IDS)[number];

export interface ArchetypeVector {
  control: number;
  attack: number;
  defence: number;
}

export interface ArchetypeDefinition {
  id: ArchetypeId;
  name: string;
  primaryDimensions: BloodTestDimension[];
  vector: ArchetypeVector;
}

export interface ArchetypeMatch {
  archetypeId: ArchetypeId;
  scores: ArchetypeVector;
  leadingDimensions: BloodTestDimension[];
}
