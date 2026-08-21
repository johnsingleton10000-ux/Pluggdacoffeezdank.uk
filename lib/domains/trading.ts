export type TradeStatus = "offered" | "accepted" | "rejected" | "completed" | "cancelled";

export type TradeOffer = {
  id: string;
  offeringPlayer: string;
  receivingPlayer: string;
  offeredCardIds: string[];
  requestedCardIds: string[];
  status: TradeStatus;
  createdAt: string;
};

export function canCompleteTrade(trade: TradeOffer, ownedOffering: string[], ownedReceiving: string[]) {
  if (trade.status !== "accepted") return false;
  const offeringOk = trade.offeredCardIds.every((id) => ownedOffering.includes(id));
  const receivingOk = trade.requestedCardIds.every((id) => ownedReceiving.includes(id));
  return offeringOk && receivingOk;
}
