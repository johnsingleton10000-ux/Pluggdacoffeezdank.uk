import { ARCHETYPE_FAMILIES, type ArchetypeId } from "@/domains/blood-test/types";
import type { StarterDeckBlueprint } from "@/domains/decks/types";

const HYBRID_ARCHETYPES = new Set<ArchetypeId>([
  "control_attack",
  "control_defence",
  "attack_defence",
  "balanced",
]);

export function isHybridArchetype(archetypeId: ArchetypeId): boolean {
  return HYBRID_ARCHETYPES.has(archetypeId);
}

export function createStarterDeckBlueprint(input: {
  userId: string;
  bloodTestId: string;
  archetypeId: ArchetypeId;
}): StarterDeckBlueprint {
  if (!(ARCHETYPE_FAMILIES as readonly string[]).includes(input.archetypeId)) {
    throw new Error(`Unknown archetype: ${input.archetypeId}`);
  }

  return {
    userId: input.userId,
    bloodTestId: input.bloodTestId,
    archetypeId: input.archetypeId,
    isHybrid: isHybridArchetype(input.archetypeId),
    name: null,
    personality: null,
    cardIds: [],
  };
}
