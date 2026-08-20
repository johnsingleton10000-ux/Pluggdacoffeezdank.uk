import type { EntityId, IsoDateTime } from "@/types/core";

export const MEMBERSHIP_TIER_IDS = [
  "free",
  "estate",
  "elite",
  "founder",
] as const;

export type MembershipTierId = (typeof MEMBERSHIP_TIER_IDS)[number];

export type MembershipCapability =
  | "xp"
  | "cards"
  | "commerce"
  | "community"
  | "flip";

export interface MembershipTier {
  id: MembershipTierId;
  name: string;
  monthlyPricePence: number;
  currency: "GBP";
  capabilities: Partial<Record<MembershipCapability, boolean>>;
}

export interface PlayerMembership {
  id: EntityId;
  userId: EntityId;
  tierId: MembershipTierId;
  status: "active" | "paused" | "cancelled" | "expired";
  startsAt: IsoDateTime;
  endsAt: IsoDateTime | null;
}
