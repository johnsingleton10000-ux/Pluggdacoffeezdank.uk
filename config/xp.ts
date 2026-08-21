import type { XpSource } from "@/types/xp";

export const XP_SOURCE_LABELS: Record<XpSource, string> = {
  onboarding: "Personality Blood Test",
  community: "Estate Born board",
  purchase: "Qualifying purchase",
  flip: "Flip Three",
  victory: "Flip Three win",
  event: "Estate event",
  trading: "Trade",
  membership: "Membership",
  adjustment: "Adjustment",
};

/**
 * Central XP table. Pages must read from here — never hard-code amounts in UI.
 * Amounts can be replaced by the commerce / game backend without rewriting screens.
 */
export const XP_TABLE: Record<XpSource, number | null> = {
  onboarding: 50,
  community: 10,
  purchase: 25,
  flip: 15,
  victory: 40,
  event: null,
  trading: 5,
  membership: 30,
  adjustment: null,
};

export const CARD_EXCHANGE = {
  thresholdGbp: 40,
  luxuryLifetimeGbp: 1000,
  rules: [
    { from: "10 Common", to: "entry reward" },
    { from: "5 Uncommon", to: "premium reward" },
    { from: "2 Rare", to: "special reward" },
    { from: "1 Epic", to: "premium bonus" },
    { from: "Wonder Card", to: "manual approval" },
  ],
} as const;
