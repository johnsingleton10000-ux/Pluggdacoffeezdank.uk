import { getMembershipTier, type MembershipTierId } from "@/lib/config/membership";

export function hasEntitlement(tierId: MembershipTierId, flag: string) {
  return getMembershipTier(tierId).entitlements.includes(flag);
}

export function isPaidMember(tierId: MembershipTierId) {
  return tierId !== "free";
}
