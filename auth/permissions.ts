import type { MembershipTierId } from "@/domains/membership/types";
import type { EntityId } from "@/types/core";

export type Permission =
  | "profile:read"
  | "profile:update"
  | "xp:read"
  | "membership:read"
  | "blood-test:create";

export interface AuthorizationContext {
  actorId: EntityId;
  subjectUserId: EntityId;
  membershipTier: MembershipTierId;
}

export function canAccessOwnResource(
  context: AuthorizationContext,
  permission: Permission,
): boolean {
  const selfServicePermissions: readonly Permission[] = [
    "profile:read",
    "profile:update",
    "xp:read",
    "membership:read",
    "blood-test:create",
  ];

  return (
    context.actorId === context.subjectUserId &&
    selfServicePermissions.includes(permission)
  );
}
