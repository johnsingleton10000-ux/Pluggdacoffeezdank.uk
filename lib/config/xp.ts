export const XP_CONFIG = {
  onboardingComplete: 50,
  firstEstateName: 25,
  communityPost: 5,
  flipSurvive: 12,
  flipCrease: 6,
  flipDestroy: 3,
  qualifyingPurchaseCard: 20,
  exchangeEligibleSpendGbp: 40,
} as const;

export const CARD_EXCHANGE = {
  qualifyingSpendGbp: 40,
  luxuryUnlockLifetimeGbp: 1000,
  rates: [
    { rarity: "common", count: 10, reward: "entry reward" },
    { rarity: "uncommon", count: 5, reward: "premium reward" },
    { rarity: "rare", count: 2, reward: "special reward" },
    { rarity: "epic", count: 1, reward: "premium bonus" },
    { rarity: "wonder", count: 1, reward: "manual approval" },
  ],
} as const;

export type XpSource = keyof typeof XP_CONFIG | "purchase" | "adjustment" | "membership";
