import type { MembershipTier } from "@/domains/membership/types";

export const membershipTiers = [
  {
    id: "free",
    name: "Free",
    monthlyPricePence: 0,
    currency: "GBP",
    capabilities: {},
  },
  {
    id: "estate",
    name: "Estate",
    monthlyPricePence: 599,
    currency: "GBP",
    capabilities: {},
  },
  {
    id: "elite",
    name: "Elite",
    monthlyPricePence: 1299,
    currency: "GBP",
    capabilities: {},
  },
  {
    id: "founder",
    name: "Founder",
    monthlyPricePence: 2000,
    currency: "GBP",
    capabilities: {},
  },
] as const satisfies readonly MembershipTier[];

export function formatMembershipPrice(tier: MembershipTier): string {
  if (tier.monthlyPricePence === 0) {
    return "£0";
  }

  const monthlyPrice = tier.monthlyPricePence / 100;
  return `£${Number.isInteger(monthlyPrice) ? monthlyPrice : monthlyPrice.toFixed(2)}`;
}
