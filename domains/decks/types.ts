import type { ArchetypeId } from "@/domains/blood-test/types";

export type DeckCardEntry = {
  cardId: string;
  quantity: number;
  position: number | null;
};

export type DeckHistoryEntry = {
  id: string;
  deckId: string;
  event: "created" | "renamed" | "modified" | "archived";
  note: string | null;
  createdAt: string;
};

export type Deck = {
  id: string;
  userId: string;
  name: string;
  personality: string | null;
  archetypeId: ArchetypeId | null;
  isHybrid: boolean;
  isStarter: boolean;
  cards: DeckCardEntry[];
  createdAt: string;
  updatedAt: string;
};

export type StarterDeckBlueprint = {
  userId: string;
  bloodTestId: string;
  archetypeId: ArchetypeId;
  isHybrid: boolean;
  name: string | null;
  personality: string | null;
  cardIds: string[];
};
