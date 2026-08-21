export type MembershipTierId = "free" | "estate_born_plus";

export type MembershipTier = {
  id: MembershipTierId;
  name: string;
  rankLabel: string;
  cadence: "none" | "month";
  priceGbp: number | null;
  stripeUrl?: string;
  entitlements: string[];
  configurable?: boolean;
};

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "free",
    name: "Street Access",
    rankLabel: "Outer Circle",
    cadence: "none",
    priceGbp: 0,
    entitlements: ["Read community boards", "Browse the Vault", "Hold a guest stash"],
  },
  {
    id: "estate_born_plus",
    name: "Estate Born+",
    rankLabel: "Founder Circle",
    cadence: "month",
    priceGbp: 8.99,
    stripeUrl: process.env.NEXT_PUBLIC_STRIPE_MEMBERSHIP_URL || "https://buy.stripe.com/8x2aEX4Kh3js3Li7S2cjS00",
    entitlements: [
      "Estate Born+ member badge",
      "Private boards and voting",
      "Exclusive drops and card odds",
      "Blood Test starter deck lock-in",
      "Street Control product access flags",
    ],
  },
];

export function getMembershipTier(id: MembershipTierId) {
  const tier = MEMBERSHIP_TIERS.find((item) => item.id === id);
  if (!tier) throw new Error(`Unknown membership tier: ${id}`);
  return tier;
}
