export const MEMBERSHIP_TIER_IDS = ["free", "estate", "elite", "founder"] as const;

export type MembershipTierId = (typeof MEMBERSHIP_TIER_IDS)[number];

export type MembershipStatus = "inactive" | "active" | "past_due" | "cancelled";

export type MembershipTierDefinition = {
  id: MembershipTierId;
  label: string;
  priceGbpMonthly: number;
  sortOrder: number;
};

export type MembershipBenefitDefinition = {
  key: string;
  label: string;
  description?: string;
  config: Record<string, unknown>;
};

export type Membership = {
  id: string;
  userId: string;
  tier: MembershipTierId;
  status: MembershipStatus;
  startedAt: string;
  currentPeriodEnd: string | null;
  provider: string | null;
  providerSubscriptionId: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Permission keys are open-ended so access rules can be added later
 * without changing the membership data model.
 */
export type PermissionKey = string;
export type PermissionValue = boolean | number | string;
export type PermissionMap = Record<string, PermissionValue>;
