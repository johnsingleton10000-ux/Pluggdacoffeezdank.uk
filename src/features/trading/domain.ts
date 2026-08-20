import type { AuditedEntity, EntityId } from "@/types/shared";

export type TradeStatus =
  | "proposed"
  | "accepted"
  | "declined"
  | "cancelled"
  | "completed";

export interface TradeItem {
  readonly cardOwnershipId: EntityId;
  readonly offeredByUserId: EntityId;
}

export interface Trade extends AuditedEntity {
  readonly proposerId: EntityId;
  readonly recipientId: EntityId;
  readonly items: readonly TradeItem[];
  readonly status: TradeStatus;
}
