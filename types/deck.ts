import type { ArchetypeId } from "@/types/archetype";
import type { Uuid } from "@/types/common";

export interface DeckCardEntry {
  cardId: Uuid;
  quantity: number;
}

export interface Deck {
  id: Uuid;
  userId: Uuid;
  name: string;
  personality: string | null;
  archetypeId: ArchetypeId;
  isStarter: boolean;
  cards: DeckCardEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface DeckHistoryEvent {
  id: Uuid;
  deckId: Uuid;
  kind: "created" | "renamed" | "modified" | "archived";
  detail: string | null;
  createdAt: string;
}

export interface StarterDeckPlan {
  archetypeId: ArchetypeId;
  suggestedName: string | null;
  suggestedPersonality: string | null;
  cardIds: Uuid[];
}
