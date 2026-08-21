import { STOCK_AVATARS, avatarBias, type ArchetypeId, type DeckStyleId, type DimensionId, type DimensionScores, type StockAvatar } from "@/lib/data/avatars";
import { ROOKIE_CARDS } from "@/lib/data/cards";

export type BloodQuestion = {
  id: "war" | "philosophy" | "society";
  number: 1 | 2 | 3;
  title: string;
  prompt: string;
};

export const BLOOD_QUESTIONS: BloodQuestion[] = [
  {
    id: "war",
    number: 1,
    title: "War Question",
    prompt: "When the Estate goes to war and the flip is live, do you charge the front line first or wait for the smoke to clear before you move?",
  },
  {
    id: "philosophy",
    number: 2,
    title: "Philosophy Question",
    prompt: "Is power something you take by force, or something you grow by staying silent until the moment is perfect?",
  },
  {
    id: "society",
    number: 3,
    title: "Society Question",
    prompt: "In the streets of the Estate, do you believe the strong protect the weak, or does every man live or die by his own holster?",
  },
];

const LEXICON: Record<DimensionId, string[]> = {
  attack: ["charge", "front", "first", "force", "strike", "attack", "war", "pressure", "take", "holster", "own", "fight", "flip", "mercy", "rush", "all-in", "aggressive", "hit"],
  defence: ["protect", "weak", "shield", "hold", "survive", "crease", "fortress", "guard", "wall", "safe", "cover", "last", "armour", "armor"],
  control: ["wait", "smoke", "silent", "perfect", "grow", "patience", "time", "read", "strategy", "outlast", "master", "quiet", "timing", "control", "think"],
};

export type BloodAnswer = { questionId: BloodQuestion["id"]; text: string };

export type BloodTestResult = {
  scores: DimensionScores;
  archetypeId: ArchetypeId;
  primary: DimensionId;
  secondary: DimensionId | null;
  deckStyle: DeckStyleId;
  avatar: StockAvatar;
  starterCardIds: string[];
  quote: string;
};

function empty(): DimensionScores {
  return { attack: 0, defence: 0, control: 0 };
}

function scoreText(text: string): DimensionScores {
  const hay = text.toLowerCase();
  const scores = empty();
  (Object.keys(LEXICON) as DimensionId[]).forEach((dimension) => {
    LEXICON[dimension].forEach((word) => {
      if (hay.includes(word)) scores[dimension] += 2;
    });
  });
  if (scores.attack + scores.defence + scores.control === 0) {
    if (hay.length < 12) scores.control += 1;
    else scores.attack += 1;
  }
  return scores;
}

function tally(answers: BloodAnswer[]): DimensionScores {
  return answers.reduce((total, answer) => {
    const next = scoreText(answer.text);
    return {
      attack: total.attack + next.attack,
      defence: total.defence + next.defence,
      control: total.control + next.control,
    };
  }, empty());
}

function normalise(raw: DimensionScores): DimensionScores {
  const total = raw.attack + raw.defence + raw.control;
  if (total <= 0) return { attack: 34, defence: 33, control: 33 };
  const rounded: DimensionScores = {
    attack: Math.round((raw.attack / total) * 100),
    defence: Math.round((raw.defence / total) * 100),
    control: Math.round((raw.control / total) * 100),
  };
  const drift = 100 - (rounded.attack + rounded.defence + rounded.control);
  const ranked = rank(rounded);
  rounded[ranked[0]] += drift;
  return rounded;
}

function rank(scores: DimensionScores): DimensionId[] {
  return (["attack", "defence", "control"] as DimensionId[]).sort((a, b) => scores[b] - scores[a] || a.localeCompare(b));
}

function archetypeFrom(scores: DimensionScores): Pick<BloodTestResult, "archetypeId" | "primary" | "secondary"> {
  const [first, second, third] = rank(scores);
  const spread = scores[first] - scores[third];
  if (spread <= 15) return { archetypeId: "balanced", primary: first, secondary: second };
  const gap = scores[first] - scores[second];
  if (gap <= 12) {
    const pair = [first, second].sort().join("_");
    if (pair === "attack_control") return { archetypeId: "attack_control", primary: first, secondary: second };
    if (pair === "attack_defence") return { archetypeId: "attack_defence", primary: first, secondary: second };
    if (pair === "control_defence") return { archetypeId: "defence_control", primary: first, secondary: second };
  }
  return { archetypeId: first, primary: first, secondary: second };
}

function deckStyleFor(archetypeId: ArchetypeId): DeckStyleId {
  if (archetypeId === "attack") return "aggressor";
  if (archetypeId === "control" || archetypeId === "defence_control") return "controlled";
  if (archetypeId === "defence" || archetypeId === "attack_defence") return "offense";
  return "hybrid";
}

function distance(avatar: StockAvatar, scores: DimensionScores) {
  const bias = avatarBias(avatar);
  return (["attack", "defence", "control"] as DimensionId[]).reduce((sum, key) => {
    const delta = bias[key] - scores[key];
    return sum + delta * delta;
  }, 0);
}

export function matchAvatar(scores: DimensionScores) {
  return [...STOCK_AVATARS].sort((a, b) => distance(a, scores) - distance(b, scores))[0];
}

export function starterCardsFor(style: DeckStyleId) {
  const pool = [...ROOKIE_CARDS];
  const sorted = pool.sort((a, b) => {
    if (style === "aggressor") return b.attack - a.attack;
    if (style === "controlled") return b.defence - a.defence + (a.attack - b.attack) / 4;
    if (style === "offense") return b.defence + b.attack - (a.defence + a.attack);
    return Math.abs(b.attack - b.defence) - Math.abs(a.attack - a.defence);
  });
  return sorted.slice(0, 6).map((card) => card.id);
}

export function evaluateBloodTest(answers: BloodAnswer[]): BloodTestResult {
  const scores = normalise(tally(answers));
  const arch = archetypeFrom(scores);
  const deckStyle = deckStyleFor(arch.archetypeId);
  const avatar = matchAvatar(scores);
  return {
    scores,
    ...arch,
    deckStyle,
    avatar,
    starterCardIds: starterCardsFor(deckStyle),
    quote: avatar.quote,
  };
}

export const DECK_PREVIEWS = [
  { id: "aggressor", name: "Aggressor Deck", art: "obelisk", copy: "Attack-focused. Pure pressure. Strike first. No mercy." },
  { id: "controlled", name: "Controlled Deck", art: "monk", copy: "Calm mastery. Outlast. Master the crease." },
  { id: "offense", name: "Offense Deck", art: "shield", copy: "Fortified attack stance. Protected power. Controlled aggression." },
] as const;
