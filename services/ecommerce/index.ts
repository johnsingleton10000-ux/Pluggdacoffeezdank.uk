import { CARD_EXCHANGE } from "@/config/xp";
import { getProduct } from "@/data/products";
import { DcbdError } from "@/lib/errors";
import { assertServerOnly } from "@/lib/security";
import type { CartItemInput, OrderQuote, QuotedLine } from "@/types/ecommerce";

/** Server-authoritative quote. Client prices are ignored. */
export function quoteCart(items: CartItemInput[]): OrderQuote {
  assertServerOnly();
  if (!Array.isArray(items) || items.length === 0) {
    throw new DcbdError("empty_cart", "My Stash is empty.", 400);
  }

  const lines: QuotedLine[] = items.map((item) => {
    const qty = Number(item.qty);
    if (!Number.isInteger(qty) || qty <= 0 || qty > 20) {
      throw new DcbdError("bad_qty", "Quantity must be a whole number between 1 and 20.", 400);
    }
    const product = getProduct(item.id);
    if (!product) {
      throw new DcbdError("unknown_product", `Unknown product ${item.id}.`, 400);
    }
    return {
      id: product.id,
      name: product.name,
      qty,
      unitPriceGbp: product.priceGbp,
      lineTotalGbp: Number((product.priceGbp * qty).toFixed(2)),
      cardId: product.cardId,
    };
  });

  const subtotalGbp = Number(lines.reduce((sum, line) => sum + line.lineTotalGbp, 0).toFixed(2));
  const cardExchangeEligible = subtotalGbp >= CARD_EXCHANGE.thresholdGbp;
  const rewards = lines.map((line) => ({
    cardId: line.cardId,
    reason: "Product purchase feeds the digital collection after order confirmation.",
  }));

  return {
    lines,
    subtotalGbp,
    cardExchangeEligible,
    rewards,
    xpKey: lines.some((line) => getProduct(line.id)?.xpKey === "membership") ? "membership" : "purchase",
  };
}
