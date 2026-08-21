import { ARCHETYPES } from "@/config/archetypes";
import { STARTER_DECK_IDS } from "@/data/cards";
import type { ArchetypeId } from "@/types/archetype";
import type { StarterDeckPlan } from "@/types/deck";

export function planStarterDeck(archetypeId: ArchetypeId): StarterDeckPlan {
  const archetype = ARCHETYPES.find((item) => item.id === archetypeId) ?? ARCHETYPES[6];
  return {
    archetypeId,
    name: archetype.deckName,
    personality: archetype.quote,
    cardIds: STARTER_DECK_IDS[archetypeId] ?? STARTER_DECK_IDS.balanced,
  };
}
