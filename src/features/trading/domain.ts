import type { AuditedEntity, EntityId } from "@/types/shared";

/** Lifecycle values will be fixed with the trading settlement specification. */
export type TradeStatus = string;

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
