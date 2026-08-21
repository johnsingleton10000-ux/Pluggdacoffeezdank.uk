import { CARD_CATALOGUE, getCard } from "@/data/cards";
import { assertServerOnly, assertSameUser } from "@/lib/security";
import type { CardOwnership } from "@/types/card";

export function listCardDefinitions() {
  return CARD_CATALOGUE;
}

export function assertOwnsCard(actorId: string, ownership: CardOwnership) {
  assertServerOnly();
  assertSameUser(actorId, ownership.ownerId);
}

export { getCard };
