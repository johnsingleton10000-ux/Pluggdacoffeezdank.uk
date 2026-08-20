import type { Card, CardOwnership } from "../../../types/dcbd";

export interface CardCatalog {
  getCard(cardId: string): Promise<Card | null>;
  getOwnership(cardId: string, ownerId: string): Promise<CardOwnership | null>;
}

export interface CardReward {
  source: string;
  cardId: string;
  ownerId: string;
}
