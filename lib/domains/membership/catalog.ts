import { MEMBERSHIP_TIER_CONFIG } from "../../../config/dcbd";
import type { MembershipTier } from "../../../types/dcbd";

export function getMembershipTierConfig(tier: MembershipTier) {
  return MEMBERSHIP_TIER_CONFIG[tier];
}

/**
 * Benefits and permissions are intentionally data-driven but empty until the
 * product owner defines them. Access checks should call this boundary later.
 */
export interface MembershipEntitlements {
  canAccess: (capability: string) => boolean;
}

export function getMembershipEntitlements(): MembershipEntitlements {
  return { canAccess: () => false };
}
