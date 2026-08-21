import { MEMBERSHIP_TIERS } from "@/config/membership";
import type { MembershipTierId } from "@/types/membership";

export function listMembershipTiers() {
  return MEMBERSHIP_TIERS;
}

export function getTier(id: MembershipTierId) {
  return MEMBERSHIP_TIERS.find((tier) => tier.id === id) ?? MEMBERSHIP_TIERS[0];
}

export function hasPermission(tier: MembershipTierId, permissionId: string) {
  return getTier(tier).permissions.some((permission) => permission.id === permissionId);
}

export function formatMembershipPrice(tier: (typeof MEMBERSHIP_TIERS)[number]) {
  if (tier.priceMonthlyGbp === 0) return "Free";
  if (tier.priceMonthlyGbp == null) return "Price set by the membership backend";
  return `£${tier.priceMonthlyGbp.toFixed(2)}/month`;
}
