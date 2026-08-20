export type TradeStatus = "draft" | "offered" | "accepted" | "declined" | "cancelled" | "completed";

export type TradeItem = {
  ownershipId: string;
  cardId: string;
  fromUserId: string;
};

export type Trade = {
  id: string;
  initiatorUserId: string;
  counterpartyUserId: string;
  status: TradeStatus;
  offered: TradeItem[];
  requested: TradeItem[];
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};
