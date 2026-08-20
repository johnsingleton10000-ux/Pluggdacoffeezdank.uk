import type { Uuid } from "@/types/common";

export type CardRarityToken =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary";

export type CardCollectionStatus = "unowned" | "owned" | "locked";
export type CardTradeStatus = "not_tradeable" | "tradeable" | "listed" | "in_trade";

export interface CardDefinition {
  id: Uuid;
  name: string;
  artworkUrl: string | null;
  rarity: CardRarityToken | string;
  category: string | null;
  attack: number | null;
  defence: number | null;
  control: number | null;
  abilities: string[];
}

export interface CardOwnership {
  id: Uuid;
  cardId: Uuid;
  ownerId: Uuid;
  source: string;
  collectionStatus: CardCollectionStatus;
  tradeStatus: CardTradeStatus;
  acquiredAt: string;
}
