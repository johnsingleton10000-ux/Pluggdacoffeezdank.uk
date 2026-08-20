import "server-only";

import { ForbiddenError, UnauthorizedError } from "@/lib/data/errors";

export function assertAuthenticated(userId: string | null | undefined): asserts userId is string {
  if (!userId) throw new UnauthorizedError();
}

export function assertOwner(userId: string, resourceUserId: string): void {
  if (userId !== resourceUserId) {
    throw new ForbiddenError("Users may only access their own records.");
  }
}

/**
 * Game values from the browser are never a source of truth.
 * Call this before any XP, membership or ownership mutation.
 */
export function rejectClientAuthoritativePayload(payload: {
  currentXp?: unknown;
  membershipTier?: unknown;
  ownedCardIds?: unknown;
}): void {
  if (payload.currentXp !== undefined || payload.membershipTier !== undefined || payload.ownedCardIds !== undefined) {
    throw new ForbiddenError("XP, membership and card ownership must be resolved server-side.");
  }
}
