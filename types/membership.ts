export const MEMBERSHIP_TIER_IDS = ["free", "estate", "elite", "founder"] as const;

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
  priceMonthlyGbp: number;
  priceMonthlyPence: number;
  benefits: MembershipBenefit[];
  permissions: MembershipPermission[];
}

export interface MembershipRecord {
  id: string;
  userId: string;
  tier: MembershipTierId;
  status: MembershipStatus;
  startsAt: string;
  endsAt: string | null;
  provider: string | null;
  providerRef: string | null;
  createdAt: string;
}
