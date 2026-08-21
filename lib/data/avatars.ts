export type DimensionId = "attack" | "defence" | "control";
export type ArchetypeId =
  | "attack"
  | "defence"
  | "control"
  | "attack_control"
  | "attack_defence"
  | "defence_control"
  | "balanced";

export type DeckStyleId = "aggressor" | "controlled" | "offense" | "hybrid";

export type DimensionScores = Record<DimensionId, number>;

export const DIMENSIONS: DimensionId[] = ["attack", "defence", "control"];

export type StockAvatar = {
  id: string;
  name: string;
  title: string;
  quote: string;
  deckName: string;
  deckStyle: DeckStyleId;
  primary: DimensionId;
  secondary?: DimensionId;
  glow: string;
  symbol: string;
  personality: string;
};

export const STOCK_AVATARS: StockAvatar[] = [
  { id: "caesar", name: "Julius Caesar", title: "Conqueror / Strategist", quote: "I came, I saw, I flipped the table.", deckName: "Caesar's Hand", deckStyle: "aggressor", primary: "attack", secondary: "control", glow: "#a020f0", symbol: "laurel", personality: "Front-line pressure with a senate brain." },
  { id: "spartan", name: "Spartan Roadman", title: "Frontliner", quote: "Charge the crease. No speech.", deckName: "Bat Line", deckStyle: "aggressor", primary: "attack", glow: "#ef4444", symbol: "bat", personality: "Pure pressure. Strike first." },
  { id: "leonidas", name: "Gangsta King Leonidas", title: "War Crown", quote: "Hold the gate, then take the street.", deckName: "Hot Gates", deckStyle: "offense", primary: "attack", secondary: "defence", glow: "#d4af37", symbol: "crown", personality: "Fortified attack. Protected power." },
  { id: "caveman", name: "Gladiator Caveman Kev", title: "Heavyweight", quote: "If it moves, crease it.", deckName: "Horned Hand", deckStyle: "aggressor", primary: "attack", glow: "#c45c26", symbol: "horn", personality: "Raw force, no diplomacy." },
  { id: "obelisk", name: "Cracked Obelisk", title: "Aggressor", quote: "Attack-focused. Pure pressure. No mercy.", deckName: "Aggressor Deck", deckStyle: "aggressor", primary: "attack", glow: "#8b0000", symbol: "monolith", personality: "High-risk power move." },
  { id: "strategist", name: "Silent Strategist", title: "Controlled", quote: "Calm mastery. Outlast. Master the crease.", deckName: "Controlled Deck", deckStyle: "controlled", primary: "control", glow: "#a020f0", symbol: "hood", personality: "Wait for the smoke. Then move." },
  { id: "athena", name: "Athena Boss Lady", title: "Estate Queen", quote: "The strong protect the board.", deckName: "Owl Court", deckStyle: "controlled", primary: "defence", secondary: "control", glow: "#c084fc", symbol: "owl", personality: "Armoured judgement." },
  { id: "senate", name: "Senate Hustler", title: "Shield Broker", quote: "Every deal is a wall.", deckName: "Serpent Shield", deckStyle: "offense", primary: "defence", glow: "#94a3b8", symbol: "shield", personality: "Deny what they want." },
  { id: "fortress", name: "Fortress Mind", title: "Offense", quote: "Fortified attack stance. Controlled aggression.", deckName: "Offense Deck", deckStyle: "offense", primary: "defence", secondary: "attack", glow: "#7c3aed", symbol: "castle", personality: "Protected power. Timed strike." },
  { id: "fortune", name: "Fortune Overlord", title: "Vault Guard", quote: "Value lives if the card lives.", deckName: "Blue Aegis", deckStyle: "offense", primary: "defence", glow: "#38bdf8", symbol: "aegis", personality: "Crease management as a lifestyle." },
  { id: "pharaoh", name: "Pharaoh Flex", title: "Gold Mask", quote: "Power grows quiet until the moment is perfect.", deckName: "Nemes Hand", deckStyle: "controlled", primary: "control", glow: "#d4af37", symbol: "nemes", personality: "Patience as a weapon." },
  { id: "odin", name: "Odin Executive", title: "All-Seeing Hood", quote: "Read the table before you flick.", deckName: "Raven Seat", deckStyle: "controlled", primary: "control", glow: "#818cf8", symbol: "raven", personality: "Information first, blood second." },
  { id: "hades", name: "Hades Accountant", title: "Dealer of Books", quote: "The vault never blinks.", deckName: "Ledger Crown", deckStyle: "controlled", primary: "control", secondary: "defence", glow: "#fbbf24", symbol: "mask", personality: "Numbers, not noise." },
  { id: "supreme", name: "Caesar Supreme", title: "Boss of Bosses", quote: "Own it. Control it. Live it.", deckName: "Imperial Fortune", deckStyle: "hybrid", primary: "control", secondary: "attack", glow: "#eab308", symbol: "eagle", personality: "Command presence." },
  { id: "shadow", name: "Shadow Kid", title: "Night Runner", quote: "You never saw the crease coming.", deckName: "Blue Hood", deckStyle: "controlled", primary: "control", glow: "#1d4ed8", symbol: "shadow", personality: "Silent timing." },
  { id: "augustus", name: "Emperor Augustus", title: "The Don", quote: "Empire first. Flick second.", deckName: "Laurel Snakes", deckStyle: "hybrid", primary: "attack", secondary: "control", glow: "#22c55e", symbol: "snake", personality: "Street senate energy." },
  { id: "medusa", name: "Medusa Viking Barber", title: "Cutthroat", quote: "Look once. Stay creased.", deckName: "Snake Scarf", deckStyle: "hybrid", primary: "attack", secondary: "defence", glow: "#4ade80", symbol: "snakehair", personality: "Pressure with a defensive grin." },
  { id: "queen", name: "Estate Queen", title: "Pink Crown", quote: "Outthink. Outflick. Win.", deckName: "Hoop Court", deckStyle: "hybrid", primary: "control", secondary: "defence", glow: "#ff2bd6", symbol: "hoop", personality: "Style as strategy." },
  { id: "boss", name: "Estate Boss", title: "Rock Hand", quote: "One flick. One shot. One win.", deckName: "Working Class", deckStyle: "aggressor", primary: "attack", glow: "#f97316", symbol: "fist", personality: "Manchester grit, no luck." },
  { id: "cleestra", name: "Cleestra Roadman", title: "Blue Nile", quote: "Queen of the estate, still on the pavement.", deckName: "Eagle Chain", deckStyle: "hybrid", primary: "control", secondary: "attack", glow: "#60a5fa", symbol: "chain", personality: "Regal street control." },
];

export function getAvatar(id: string) {
  return STOCK_AVATARS.find((avatar) => avatar.id === id);
}

export function avatarBias(avatar: StockAvatar): DimensionScores {
  const scores: DimensionScores = { attack: 20, defence: 20, control: 20 };
  scores[avatar.primary] += 50;
  if (avatar.secondary) scores[avatar.secondary] += 30;
  return scores;
}
