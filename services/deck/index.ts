import type { ArchetypeMatch } from "@/types/archetype";
import type { StarterDeckPlan } from "@/types/deck";

/**
 * Starter decks are derived from Blood Test results, not assigned at random.
 * Card contents remain empty until the card database is specified.
 */
export function planStarterDeck(archetype: ArchetypeMatch): StarterDeckPlan {
  return {
    archetypeId: archetype.archetypeId,
    suggestedName: null,
    suggestedPersonality: null,
    cardIds: [],
  };
}
