import type { AuditedEntity, EntityId } from "@/types/shared";

/** Provider and fulfilment status values are deliberately not fixed yet. */
export type OrderStatus = string;

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
