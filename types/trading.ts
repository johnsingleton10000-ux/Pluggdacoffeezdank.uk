export type TradeStatus =
  | "proposed"
  | "accepted"
  | "declined"
  | "cancelled"
  | "completed";

export interface TradeOfferItem {
  ownershipId: string;
  cardId: string;
}

export interface Trade {
  id: string;
  initiatorId: string;
  recipientId: string;
  offered: TradeOfferItem[];
  requested: TradeOfferItem[];
  status: TradeStatus;
  createdAt: string;
  updatedAt: string;
}
