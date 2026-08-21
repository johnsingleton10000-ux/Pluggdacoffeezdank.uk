export type CardRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "wonder";

export type CardType = "attack" | "defence" | "hidden" | "product" | "wonder";
export type CardCollectionStatus = "unowned" | "owned" | "locked" | "in_deck";
export type CardTradeStatus = "not_tradeable" | "tradeable" | "listed" | "in_trade";
export type CardLife = "ready" | "creased" | "destroyed";

export interface CardDefinition {
  id: string;
  name: string;
  set: string;
  artworkUrl: string | null;
  glow: string;
  rarity: CardRarity;
  type: CardType;
  attack: number | null;
  defence: number | null;
  ability: string | null;
  productId: string | null;
  flavour: string;
}

export interface CardOwnership {
  id: string;
  cardId: string;
  ownerId: string;
  source: "onboarding" | "purchase" | "flip" | "trade" | "reward";
  quantity: number;
  duplicates: number;
  collectionStatus: CardCollectionStatus;
  tradeStatus: CardTradeStatus;
  life: CardLife;
  creaseCount: number;
  acquiredAt: string;
}
