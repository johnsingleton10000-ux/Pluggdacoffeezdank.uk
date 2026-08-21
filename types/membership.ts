export const MEMBERSHIP_TIER_IDS = ["street", "estate_born_plus", "founder_circle"] as const;
export type MembershipTierId = (typeof MEMBERSHIP_TIER_IDS)[number];
export type MembershipStatus = "active" | "pending" | "cancelled" | "expired";

export interface MembershipBenefit {
  id: string;
  label: string;
}

export interface MembershipPermission {
  id: string;
  description: string;
}

export interface MembershipTierDefinition {
  id: MembershipTierId;
  name: string;
  /** Null means the commerce backend has not supplied a public price. */
  priceMonthlyGbp: number | null;
  stripeUrl: string | null;
  benefits: MembershipBenefit[];
  permissions: MembershipPermission[];
}
