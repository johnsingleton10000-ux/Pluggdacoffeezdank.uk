import type { AuditedEntity, EntityId } from "@/types/shared";

export type OrderStatus =
  | "pending"
  | "paid"
  | "fulfilled"
  | "cancelled"
  | "refunded";

export interface Order extends AuditedEntity {
  readonly userId: EntityId;
  readonly status: OrderStatus;
  readonly currency: string;
  readonly totalMinorUnits: number;
  readonly externalReference: string | null;
}

export type OrderRewardType = "xp" | "card" | "membership";

export interface OrderReward extends AuditedEntity {
  readonly orderId: EntityId;
  readonly userId: EntityId;
  readonly type: OrderRewardType;
  readonly rewardReferenceId: EntityId;
  readonly grantedAt: string | null;
}
