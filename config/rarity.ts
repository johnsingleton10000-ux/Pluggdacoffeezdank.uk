import type { CardRarityToken } from "@/types/card";

/**
 * Visual rarity tokens for the design system.
 * These are not drop rates and are not the final card economy.
 */
export const RARITY_LABELS: Record<CardRarityToken, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};
