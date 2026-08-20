import type { Uuid } from "@/types/common";

export type TradeStatus = "proposed" | "accepted" | "declined" | "cancelled" | "completed";

export interface TradeOfferItem {
  ownershipId: Uuid;
  cardId: Uuid;
}

export interface Trade {
  id: Uuid;
  initiatorId: Uuid;
  recipientId: Uuid;
  offered: TradeOfferItem[];
  requested: TradeOfferItem[];
  status: TradeStatus;
  createdAt: string;
  updatedAt: string;
}
