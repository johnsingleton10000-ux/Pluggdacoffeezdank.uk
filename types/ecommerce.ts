export type ProductVaultId =
  | "herbal-tea"
  | "classics"
  | "collector"
  | "cards"
  | "art"
  | "merch"
  | "membership";

export interface Product {
  id: string;
  name: string;
  category: string;
  vaultId: ProductVaultId;
  priceGbp: number;
  profile: string;
  color: string;
  stripeUrl?: string;
  code: string;
  cardId: string;
  xpKey: "purchase" | "membership";
  availability: "in_vault" | "membership" | "made_to_order";
}

export interface CartItemInput {
  id: string;
  qty: number;
}

export interface QuotedLine {
  id: string;
  name: string;
  qty: number;
  unitPriceGbp: number;
  lineTotalGbp: number;
  cardId: string;
}

export interface OrderQuote {
  lines: QuotedLine[];
  subtotalGbp: number;
  cardExchangeEligible: boolean;
  rewards: { cardId: string; reason: string }[];
  xpKey: "purchase" | "membership" | null;
}

export type OrderStatus = "draft" | "pending" | "paid" | "fulfilled" | "cancelled";
