import type { MembershipTierDefinition, MembershipTierId } from "@/types/membership";

/**
 * Prices are specified by the DCBD product owner.
 * Benefits and permissions stay empty until they are defined separately.
 */
export const MEMBERSHIP_TIERS: readonly MembershipTierDefinition[] = [
  {
    id: "free",
    name: "Free",
    priceMonthlyGbp: 0,
    priceMonthlyPence: 0,
    benefits: [],
    permissions: [],
  },
  {
    id: "estate",
    name: "Estate",
    priceMonthlyGbp: 5.99,
    priceMonthlyPence: 599,
    benefits: [],
    permissions: [],
  },
  {
    id: "elite",
    name: "Elite",
    priceMonthlyGbp: 12.99,
    priceMonthlyPence: 1299,
    benefits: [],
    permissions: [],
  },
  {
    id: "founder",
    name: "Founder",
    priceMonthlyGbp: 20,
    priceMonthlyPence: 2000,
    benefits: [],
    permissions: [],
  },
] as const;

export function getMembershipTier(id: MembershipTierId): MembershipTierDefinition {
  const tier = MEMBERSHIP_TIERS.find((item) => item.id === id);
  if (!tier) {
    throw new Error(`Unknown membership tier: ${id}`);
  }
  return tier;
}

export function formatMembershipPrice(tier: MembershipTierDefinition): string {
  if (tier.priceMonthlyPence === 0) return "£0";
  if (Number.isInteger(tier.priceMonthlyGbp)) return `£${tier.priceMonthlyGbp}/month`;
  return `£${tier.priceMonthlyGbp.toFixed(2)}/month`;
}
