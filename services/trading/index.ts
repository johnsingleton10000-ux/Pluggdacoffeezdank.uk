import { DcbdError } from "@/lib/errors";
import { assertServerOnly, assertSameUser } from "@/lib/security";
import type { Trade, TradeStatus } from "@/types/trading";

const ALLOWED: Record<TradeStatus, TradeStatus[]> = {
  proposed: ["accepted", "declined", "cancelled"],
  accepted: ["completed", "cancelled"],
  declined: [],
  cancelled: [],
  completed: [],
};

export function assertCanTransition(from: TradeStatus, to: TradeStatus) {
  if (!ALLOWED[from].includes(to)) {
    throw new DcbdError("illegal_trade_state", `Cannot move a trade from ${from} to ${to}.`, 400);
  }
}

export function assertTradeActor(actorId: string, trade: Trade) {
  assertServerOnly();
  if (actorId !== trade.initiatorId && actorId !== trade.recipientId) {
    throw new DcbdError("forbidden", "You are not part of this trade.", 403);
  }
}

export function assertOwnershipOnServer(actorId: string, ownerId: string) {
  assertServerOnly();
  assertSameUser(actorId, ownerId);
}
