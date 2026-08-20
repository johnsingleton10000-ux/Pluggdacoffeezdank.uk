export const CARD_RARITIES = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "wonder",
] as const;

export type CardRarity = (typeof CARD_RARITIES)[number];

export type CardTradeStatus = "not_eligible" | "eligible" | "listed" | "locked";
export type CardCollectionStatus = "unowned" | "owned" | "hidden";

export type Card = {
  id: string;
  slug: string;
  name: string;
  artworkUrl: string | null;
  rarity: CardRarity | null;
  category: string | null;
  attack: number | null;
  defence: number | null;
  control: number | null;
  abilities: string[];
  createdAt: string;
  updatedAt: string;
};

export type CardOwnership = {
  id: string;
  cardId: string;
  userId: string;
  source: string;
  collectionStatus: CardCollectionStatus;
  tradeStatus: CardTradeStatus;
  acquiredAt: string;
  createdAt: string;
  updatedAt: string;
};
