import type { AuditedEntity, EntityId, IsoDateTime } from "@/types/shared";

export const MEMBERSHIP_TIERS = [
  "FREE",
  "ESTATE",
  "ELITE",
  "FOUNDER",
] as const;

export type MembershipTier = (typeof MEMBERSHIP_TIERS)[number];
export type MembershipStatus =
  | "active"
  | "inactive"
  | "past_due"
  | "cancelled";

export interface MembershipPlan {
  readonly tier: MembershipTier;
  readonly name: string;
  readonly pricePence: number;
  readonly billingCadence: "none" | "monthly";
}

export interface Membership extends AuditedEntity {
  readonly userId: EntityId;
  readonly tier: MembershipTier;
  readonly status: MembershipStatus;
  readonly currentPeriodEndsAt: IsoDateTime | null;
}

/**
 * Benefits remain intentionally provider- and product-owner-defined.
 * Authorization code should consume capabilities resolved on the server.
 */
export interface MembershipCapabilities {
  readonly tier: MembershipTier;
  readonly capabilities: ReadonlySet<string>;
}
