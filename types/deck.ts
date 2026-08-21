import type { ArchetypeId } from "@/types/archetype";

export interface DeckCardEntry {
  cardId: string;
  quantity: number;
  slot: "attack" | "defence" | "hidden" | "holster";
}

export interface Deck {
  id: string;
  userId: string;
  name: string;
  personality: string;
  archetypeId: ArchetypeId;
  isStarter: boolean;
  cards: DeckCardEntry[];
}

export interface StarterDeckPlan {
  archetypeId: ArchetypeId;
  name: string;
  personality: string;
  cardIds: string[];
}
