import { NextResponse } from "next/server";
import { orderMessage, priceCart, type CartLine } from "@/lib/domains/ecommerce";
import { whatsappUrl } from "@/lib/config/site";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const lines = Array.isArray(body?.lines) ? (body.lines as CartLine[]) : [];
  const cart = priceCart(lines);
  if (!cart.lines.length) {
    return NextResponse.json({ error: "Stash is empty or products were not recognised." }, { status: 400 });
  }
  return NextResponse.json({
    totalGbp: cart.totalGbp,
    exchangeEligible: cart.exchangeEligible,
    cardEligible: cart.cardEligible,
    lines: cart.lines.map((line) => ({
      id: line.product.id,
      name: line.product.name,
      qty: line.qty,
      unitGbp: line.product.priceGbp,
      lineTotalGbp: line.lineTotalGbp,
    })),
    whatsappUrl: whatsappUrl(orderMessage(cart)),
  });
}
