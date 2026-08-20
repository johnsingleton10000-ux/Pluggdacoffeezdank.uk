import type { EntityId, IsoDateTime } from "@/types/core";

export interface OrderReference {
  id: EntityId;
  userId: EntityId;
  provider: string;
  providerOrderId: string;
  status: "pending" | "paid" | "fulfilled" | "cancelled" | "refunded";
  createdAt: IsoDateTime;
}

export type OrderRewardType = "xp" | "card" | "membership";

export interface OrderReward {
  id: EntityId;
  orderId: EntityId;
  rewardType: OrderRewardType;
  rewardReferenceId: EntityId | null;
  status: "pending" | "granted" | "revoked";
  grantedAt: IsoDateTime | null;
}

export interface OrderRewardProcessor {
  processPaidOrder(orderId: EntityId): Promise<readonly OrderReward[]>;
}
