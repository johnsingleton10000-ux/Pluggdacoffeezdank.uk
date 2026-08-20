import type { XpSource } from "@/types/xp";

/**
 * XP amounts are not specified yet. This map exists so later configuration
 * can attach values without changing the ledger architecture.
 */
export const XP_SOURCE_LABELS: Record<XpSource, string> = {
  onboarding: "Onboarding",
  community: "Community participation",
  purchase: "Eligible purchase",
  flip: "Flip activity",
  victory: "Victory",
  event: "Event",
  trading: "Trading",
  membership: "Membership",
  adjustment: "Adjustment",
};

export const XP_REWARDS: Partial<Record<XpSource, number>> = {};
