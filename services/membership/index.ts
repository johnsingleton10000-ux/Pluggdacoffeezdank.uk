import { MEMBERSHIP_TIERS, getMembershipTier } from "@/config/membership";
import { assertServerOnly, assertSameUser } from "@/lib/security";
import type { MembershipPermission, MembershipTierId } from "@/types/membership";

export function listMembershipTiers() {
  return MEMBERSHIP_TIERS;
}

export function getTier(id: MembershipTierId) {
  return getMembershipTier(id);
}

/**
 * Benefits and permissions are configuration, not client claims.
 * The empty arrays are intentional until product defines them.
 */
export function getPermissionsForTier(tier: MembershipTierId): MembershipPermission[] {
  return getMembershipTier(tier).permissions;
}

export function hasPermission(tier: MembershipTierId, permissionId: string): boolean {
  return getPermissionsForTier(tier).some((permission) => permission.id === permissionId);
}

export function assertActorCanReadMembership(actorId: string, ownerId: string): void {
  assertServerOnly();
  assertSameUser(actorId, ownerId);
}
