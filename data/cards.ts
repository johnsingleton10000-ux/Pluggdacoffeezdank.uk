import type { CardDefinition } from "@/types/card";
import { PRODUCTS } from "@/data/products";

const COMMON_SET = [
  "Top Floor",
  "Wheelie Life",
  "Ride Or Die",
  "My Time",
  "Built Different",
  "Supply Mode",
  "Keys To The City",
  "Count Up",
  "They Watch",
  "Leave A Mark",
];

const STARTER_POOL: CardDefinition[] = [
  { id: "f3-table-flip", name: "Table Flip", set: "Flip Three", artworkUrl: null, glow: "#ff3fbc", rarity: "rare", type: "attack", attack: 81, defence: 24, ability: "Force a re-flick if the crease is live.", productId: null, flavour: "I came, I saw, I flipped the table." },
  { id: "f3-legion", name: "Legion Command", set: "Flip Three", artworkUrl: null, glow: "#c45c26", rarity: "rare", type: "attack", attack: 72, defence: 40, ability: "Draw pressure from the holster.", productId: null, flavour: "Front line energy." },
  { id: "f3-fist", name: "Estate Fist", set: "Flip Three", artworkUrl: null, glow: "#ff3fbc", rarity: "uncommon", type: "attack", attack: 65, defence: 30, ability: null, productId: null, flavour: "One flick. One shot." },
  { id: "f3-shield", name: "Crease Shield", set: "Flip Three", artworkUrl: null, glow: "#38bdf8", rarity: "uncommon", type: "defence", attack: 22, defence: 78, ability: "First crease this cycle is ignored.", productId: null, flavour: "Stay ready." },
  { id: "f3-fortress", name: "Fortress Mind", set: "Flip Three", artworkUrl: null, glow: "#8e38ff", rarity: "rare", type: "defence", attack: 35, defence: 88, ability: "Convert one attack into a hold.", productId: null, flavour: "Protected power." },
  { id: "f3-skull", name: "Warzone Skull", set: "Flip Three", artworkUrl: null, glow: "#c4453c", rarity: "epic", type: "defence", attack: 48, defence: 70, ability: "High risk. High crease.", productId: null, flavour: "All-in warzone." },
  { id: "f3-ability", name: "Hidden Ability", set: "Flip Three", artworkUrl: null, glow: "#c26bff", rarity: "rare", type: "hidden", attack: 40, defence: 40, ability: "Reorder the holster once per cycle.", productId: null, flavour: "They never see the third card." },
  { id: "f3-recovery", name: "Recovery Draw", set: "Flip Three", artworkUrl: null, glow: "#b8ff3d", rarity: "uncommon", type: "hidden", attack: 18, defence: 55, ability: "Draw two. Keep one.", productId: null, flavour: "Control the crease." },
  { id: "f3-crown", name: "Blood Crown", set: "Flip Three", artworkUrl: null, glow: "#f1be48", rarity: "wonder", type: "wonder", attack: 90, defence: 90, ability: "Wonder: manual table presence.", productId: null, flavour: "Founder Circle only in spirit until drop rates exist." },
  { id: "f3-lightning", name: "Flick Bolt", set: "Flip Three", artworkUrl: null, glow: "#facc15", rarity: "common", type: "attack", attack: 58, defence: 20, ability: null, productId: null, flavour: "No luck. Just flick." },
  { id: "f3-fleur", name: "Estate Fleur", set: "Flip Three", artworkUrl: null, glow: "#f1be48", rarity: "uncommon", type: "hidden", attack: 33, defence: 61, ability: "Unlock a reward slot on survive.", productId: null, flavour: "Win & unlock." },
  { id: "f3-devil", name: "Street Devil", set: "Flip Three", artworkUrl: null, glow: "#7c3aed", rarity: "epic", type: "attack", attack: 77, defence: 28, ability: "Bluff: opponent cannot read this slot.", productId: null, flavour: "Psychological pressure." },
];

const ARTWORK_BY_NAME: Record<string, string> = {
  "Blueberry Melt Art Card": "/images/blueberry-slush-card.svg",
  "Wedding Z Reserve Style Tea": "/images/wedding-cake-card.svg",
  "Temple Ball Reserve Style Tea": "/images/temple-ball-card.svg",
};

const productCards: CardDefinition[] = PRODUCTS.map((product) => ({
  id: product.cardId,
  name: product.name,
  set: product.category,
  artworkUrl: ARTWORK_BY_NAME[product.name] ?? null,
  glow: product.color,
  rarity: product.priceGbp >= 47 ? "rare" : product.priceGbp >= 27 ? "uncommon" : "common",
  type: "product",
  attack: null,
  defence: null,
  ability: "Qualifying purchase adds this card to the collection.",
  productId: product.id,
  flavour: product.profile,
}));

const commonCards: CardDefinition[] = COMMON_SET.map((name, index) => ({
  id: `common-${String(index + 1).padStart(2, "0")}`,
  name,
  set: "Common Set 01",
  artworkUrl: null,
  glow: "#f1be48",
  rarity: "common",
  type: "hidden",
  attack: 40 + index * 2,
  defence: 30 + (9 - index) * 2,
  ability: null,
  productId: null,
  flavour: "Rookie card. Every order can draw from this set.",
}));

export const CARD_CATALOGUE: CardDefinition[] = [...STARTER_POOL, ...commonCards, ...productCards];

export function getCard(id: string) {
  return CARD_CATALOGUE.find((card) => card.id === id) ?? null;
}

export const STARTER_DECK_IDS: Record<string, string[]> = {
  attack: ["f3-table-flip", "f3-fist", "f3-lightning", "f3-devil", "common-01", "common-06"],
  defence: ["f3-fortress", "f3-shield", "f3-skull", "f3-recovery", "common-05", "common-09"],
  control: ["f3-ability", "f3-fleur", "f3-recovery", "f3-shield", "common-07", "common-10"],
  attack_control: ["f3-table-flip", "f3-ability", "f3-legion", "f3-fleur", "common-04", "common-08"],
  attack_defence: ["f3-legion", "f3-fist", "f3-shield", "f3-skull", "common-02", "common-03"],
  defence_control: ["f3-fortress", "f3-ability", "f3-recovery", "f3-fleur", "common-05", "common-07"],
  balanced: ["f3-table-flip", "f3-shield", "f3-ability", "f3-lightning", "common-01", "common-10"],
};
