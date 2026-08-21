import type { CardRarity } from "@/types/card";

export const RARITY_LABELS: Record<CardRarity, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  wonder: "Wonder",
};

export const RARITY_GLOW: Record<CardRarity, string> = {
  common: "#9aa0a6",
  uncommon: "#4ea36a",
  rare: "#4f7fd6",
  epic: "#9b5de5",
  wonder: "#f1be48",
};
