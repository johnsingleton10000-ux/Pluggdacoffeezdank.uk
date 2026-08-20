import type { MembershipTierDefinition, MembershipTierId } from "@/domains/membership/types";

export const MEMBERSHIP_TIERS: readonly MembershipTierDefinition[] = [
  { id: "free", label: "Free", priceGbpMonthly: 0, sortOrder: 0 },
  { id: "estate", label: "Estate", priceGbpMonthly: 5.99, sortOrder: 1 },
  { id: "elite", label: "Elite", priceGbpMonthly: 12.99, sortOrder: 2 },
  { id: "founder", label: "Founder", priceGbpMonthly: 20, sortOrder: 3 },
] as const;

export function getMembershipTier(id: MembershipTierId): MembershipTierDefinition {
  const tier = MEMBERSHIP_TIERS.find((item) => item.id === id);
  if (!tier) {
    throw new Error(`Unknown membership tier: ${id}`);
  }
  return tier;
}

export function isPaidTier(id: MembershipTierId): boolean {
  return getMembershipTier(id).priceGbpMonthly > 0;
}

export function parseMembershipTierId(value: string | null | undefined): MembershipTierId {
  const match = MEMBERSHIP_TIERS.find((tier) => tier.id === value);
  return match?.id ?? "free";
}
