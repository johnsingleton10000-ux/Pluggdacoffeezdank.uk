import { getProduct, type CatalogProduct } from "@/lib/data/catalog";
import { CARD_EXCHANGE } from "@/lib/config/xp";

export type CartLine = { productId: string; qty: number };

export type PricedCartLine = {
  product: CatalogProduct;
  qty: number;
  lineTotalGbp: number;
};

export type PricedCart = {
  lines: PricedCartLine[];
  totalGbp: number;
  cardEligible: boolean;
  exchangeEligible: boolean;
};

export function priceCart(lines: CartLine[]): PricedCart {
  const priced: PricedCartLine[] = [];
  for (const line of lines) {
    const product = getProduct(line.productId);
    if (!product) continue;
    const qty = Math.max(1, Math.floor(Number(line.qty) || 0));
    priced.push({
      product,
      qty,
      lineTotalGbp: Number((product.priceGbp * qty).toFixed(2)),
    });
  }
  const totalGbp = Number(priced.reduce((sum, line) => sum + line.lineTotalGbp, 0).toFixed(2));
  return {
    lines: priced,
    totalGbp,
    cardEligible: priced.some((line) => line.product.cardReward),
    exchangeEligible: totalGbp >= CARD_EXCHANGE.qualifyingSpendGbp,
  };
}

export function orderMessage(cart: PricedCart) {
  const items = cart.lines.map((line) => `- ${line.product.name} x${line.qty} = £${line.lineTotalGbp.toFixed(2)}`).join("\n");
  const qualifies = cart.exchangeEligible
    ? `Yes - £${CARD_EXCHANGE.qualifyingSpendGbp}+ card exchange eligible`
    : `No - below £${CARD_EXCHANGE.qualifyingSpendGbp} card exchange threshold`;
  return `Hi DCBD, I want to order from The Vault.\n\n${items}\n\nTotal: £${cart.totalGbp.toFixed(2)}\nCard exchange eligible: ${qualifies}\n\nPlease confirm stock and payment instructions.`;
}
