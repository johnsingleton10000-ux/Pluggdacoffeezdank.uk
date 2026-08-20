import type { EntityId, IsoDateTime } from "@/types/core";

export type TradeStatus =
  | "proposed"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "completed"
  | "failed";

export interface TradeItem {
  ownershipId: EntityId;
  offeredByUserId: EntityId;
}

export interface Trade {
  id: EntityId;
  proposerId: EntityId;
  recipientId: EntityId;
  items: readonly TradeItem[];
  status: TradeStatus;
  createdAt: IsoDateTime;
  completedAt: IsoDateTime | null;
}

export interface TradeExecutor {
  completeTrade(tradeId: EntityId, actorId: EntityId): Promise<Trade>;
}
