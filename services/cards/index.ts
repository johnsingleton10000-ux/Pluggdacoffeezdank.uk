import type { CardDefinition, CardOwnership } from "@/types/card";
import { assertServerOnly, assertSameUser } from "@/lib/security";

const CARD_CATALOGUE: CardDefinition[] = [];

export function listCardDefinitions(): readonly CardDefinition[] {
  return CARD_CATALOGUE;
}

export function assertOwnsCard(actorId: string, ownership: CardOwnership): void {
  assertServerOnly();
  assertSameUser(actorId, ownership.ownerId);
}
