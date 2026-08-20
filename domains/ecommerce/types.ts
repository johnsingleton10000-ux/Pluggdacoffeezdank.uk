export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string | null;
  priceGbp: number | null;
  currency: "GBP";
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type OrderStatus = "draft" | "pending" | "paid" | "fulfilled" | "cancelled" | "refunded";

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPriceGbp: number;
};

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  totalGbp: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type OrderRewardType = "xp" | "card" | "membership" | "other";

export type OrderReward = {
  id: string;
  orderId: string;
  userId: string;
  type: OrderRewardType;
  referenceId: string | null;
  payload: Record<string, unknown>;
  processedAt: string | null;
  createdAt: string;
};
