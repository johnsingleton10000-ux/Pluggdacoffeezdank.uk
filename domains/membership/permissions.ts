import type { MembershipTierId, PermissionMap } from "@/domains/membership/types";

/**
 * Benefits and permissions stay empty until the product owner specifies them.
 * Do not invent access rules here.
 */
export const MEMBERSHIP_TIER_PERMISSIONS: Record<MembershipTierId, PermissionMap> = {
  free: {},
  estate: {},
  elite: {},
  founder: {},
};

export function getTierPermissions(tier: MembershipTierId): PermissionMap {
  return MEMBERSHIP_TIER_PERMISSIONS[tier];
}

export function hasPermission(permissions: PermissionMap, key: string): boolean {
  const value = permissions[key];
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value > 0;
  if (typeof value === "string") return value.length > 0;
  return false;
}
