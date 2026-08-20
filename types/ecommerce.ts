import type { Uuid } from "@/types/common";

export type OrderStatus = "draft" | "pending" | "paid" | "fulfilled" | "cancelled";

export interface Product {
  id: string;
  name: string;
  category: string;
  priceGbp: number | null;
  description: string | null;
}

export interface OrderLine {
  productId: string;
  quantity: number;
  unitPriceGbp: number;
}

export interface Order {
  id: Uuid;
  userId: Uuid;
  status: OrderStatus;
  lines: OrderLine[];
  totalGbp: number;
  createdAt: string;
}

export type OrderRewardKind = "xp" | "card" | "membership";

export interface OrderReward {
  id: Uuid;
  orderId: Uuid;
  userId: Uuid;
  kind: OrderRewardKind;
  payload: Record<string, string | number | boolean | null>;
  createdAt: string;
}
