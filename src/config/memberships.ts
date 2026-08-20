import type {
  MembershipPlan,
  MembershipTier,
} from "@/features/membership/domain";

export const MEMBERSHIP_PLANS = {
  FREE: {
    tier: "FREE",
    name: "Free",
    pricePence: 0,
    billingCadence: "none",
  },
  ESTATE: {
    tier: "ESTATE",
    name: "Estate",
    pricePence: 599,
    billingCadence: "monthly",
  },
  ELITE: {
    tier: "ELITE",
    name: "Elite",
    pricePence: 1299,
    billingCadence: "monthly",
  },
  FOUNDER: {
    tier: "FOUNDER",
    name: "Founder",
    pricePence: 2000,
    billingCadence: "monthly",
  },
} as const satisfies Record<MembershipTier, MembershipPlan>;

export function formatMembershipPrice(plan: MembershipPlan): string {
  if (plan.pricePence === 0) {
    return "£0";
  }

  return `£${(plan.pricePence / 100).toFixed(2)}/month`;
}
