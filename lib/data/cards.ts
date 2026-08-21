export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "wonder";
export type CardType = "rookie" | "universe" | "product" | "holster";

export type DcbdCard = {
  id: string;
  name: string;
  set: string;
  rarity: Rarity;
  type: CardType;
  attack: number;
  defence: number;
  ability: string;
  glow: string;
  productId?: string;
  lockedByDefault?: boolean;
};

export const ROOKIE_CARDS: DcbdCard[] = [
  { id: "c-top-floor", name: "Top Floor", set: "Common Set 01", rarity: "common", type: "rookie", attack: 6, defence: 4, ability: "Pressure the crease", glow: "#f1be48" },
  { id: "c-wheelie", name: "Wheelie Life", set: "Common Set 01", rarity: "common", type: "rookie", attack: 5, defence: 5, ability: "Keep moving", glow: "#38bdf8" },
  { id: "c-ride", name: "Ride Or Die", set: "Common Set 01", rarity: "common", type: "rookie", attack: 7, defence: 3, ability: "All-in flick", glow: "#ef4444" },
  { id: "c-my-time", name: "My Time", set: "Common Set 01", rarity: "common", type: "rookie", attack: 4, defence: 6, ability: "Wait for smoke", glow: "#a78bfa" },
  { id: "c-built", name: "Built Different", set: "Common Set 01", rarity: "common", type: "rookie", attack: 6, defence: 5, ability: "Ignore crease once", glow: "#22c55e" },
  { id: "c-supply", name: "Supply Mode", set: "Common Set 01", rarity: "common", type: "rookie", attack: 5, defence: 4, ability: "Draw from holster", glow: "#f97316" },
  { id: "c-keys", name: "Keys To The City", set: "Common Set 01", rarity: "common", type: "rookie", attack: 3, defence: 7, ability: "Lock a lane", glow: "#d4af37" },
  { id: "c-count", name: "Count Up", set: "Common Set 01", rarity: "common", type: "rookie", attack: 4, defence: 4, ability: "XP on survive", glow: "#84cc16" },
  { id: "c-watch", name: "They Watch", set: "Common Set 01", rarity: "common", type: "rookie", attack: 5, defence: 6, ability: "Read opponent", glow: "#8e38ff" },
  { id: "c-mark", name: "Leave A Mark", set: "Common Set 01", rarity: "common", type: "rookie", attack: 8, defence: 2, ability: "High-risk strike", glow: "#ff2bd6" },
];

export const UNIVERSE_CARDS: DcbdCard[] = [
  { id: "u-caesar", name: "Julius Caesar", set: "Gangsta Ancient People", rarity: "legendary", type: "universe", attack: 9, defence: 6, ability: "Table Flip", glow: "#a020f0", lockedByDefault: true },
  { id: "u-spartan", name: "Spartan Roadman", set: "Gangsta Ancient People", rarity: "rare", type: "universe", attack: 8, defence: 5, ability: "Front line charge", glow: "#ef4444", lockedByDefault: true },
  { id: "u-pharaoh", name: "Pharaoh Flex", set: "Gangsta Ancient People", rarity: "epic", type: "universe", attack: 6, defence: 7, ability: "Silent gold", glow: "#d4af37", lockedByDefault: true },
  { id: "u-medusa", name: "Medusa Viking Barber", set: "Gangsta Ancient People", rarity: "rare", type: "universe", attack: 7, defence: 7, ability: "Crease stare", glow: "#4ade80", lockedByDefault: true },
  { id: "u-kev", name: "Gladiator Caveman Kev", set: "Pluto's Babies", rarity: "uncommon", type: "universe", attack: 8, defence: 4, ability: "Horn rush", glow: "#c45c26", lockedByDefault: true },
  { id: "u-gaz", name: "Gladiator Gaz", set: "Pluto's Babies", rarity: "uncommon", type: "universe", attack: 6, defence: 4, ability: "Bag runner", glow: "#fbbf24", lockedByDefault: true },
  { id: "u-shadow", name: "Shadow Kid", set: "Pluto's Babies", rarity: "rare", type: "universe", attack: 5, defence: 8, ability: "Blue hood vanish", glow: "#1d4ed8", lockedByDefault: true },
  { id: "u-leonidas", name: "Gangsta King Leonidas", set: "Luxury", rarity: "legendary", type: "universe", attack: 9, defence: 8, ability: "Gate hold", glow: "#d4af37", lockedByDefault: true },
  { id: "u-athena", name: "Athena Boss Lady", set: "Luxury", rarity: "epic", type: "universe", attack: 6, defence: 9, ability: "Owl court", glow: "#c084fc", lockedByDefault: true },
  { id: "u-augustus", name: "Emperor Augustus The Don", set: "Luxury", rarity: "legendary", type: "universe", attack: 8, defence: 7, ability: "Empire call", glow: "#22c55e", lockedByDefault: true },
  { id: "u-hades", name: "Hades Accountant Dealer", set: "Holographic Luxury", rarity: "wonder", type: "universe", attack: 7, defence: 9, ability: "Ledger lock", glow: "#fbbf24", lockedByDefault: true },
  { id: "u-cleestra", name: "Cleestra Roadman", set: "Empire 2026", rarity: "epic", type: "universe", attack: 7, defence: 6, ability: "Nile control", glow: "#60a5fa", lockedByDefault: true },
];

export const PRODUCT_ART_CARDS = [
  { id: "art-blueberry", name: "Blueberry Slush", label: "Special Edition", image: "/images/blueberry-slush-card.svg" },
  { id: "art-wedding", name: "Wedding Cake Reserve", label: "Founder Drop", image: "/images/wedding-cake-card.svg" },
  { id: "art-temple", name: "Temple Ball Reserve", label: "Legendary", image: "/images/temple-ball-card.svg" },
  { id: "art-danish", name: "Danish Crumble", label: "Rare Card", image: "/images/danish-crumble-card.svg" },
] as const;

export const ALL_CARDS: DcbdCard[] = [...ROOKIE_CARDS, ...UNIVERSE_CARDS];

export function getCard(id: string) {
  return ALL_CARDS.find((card) => card.id === id);
}

export const RARITY_GLOW: Record<Rarity, string> = {
  common: "#a8a29e",
  uncommon: "#4ade80",
  rare: "#38bdf8",
  epic: "#c026ff",
  legendary: "#d4af37",
  wonder: "#fb7185",
};
