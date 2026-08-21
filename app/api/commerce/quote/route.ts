import { quoteCart } from "@/services/ecommerce";
import { DcbdError } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { items?: { id: string; qty: number }[] };
    const quote = quoteCart(body.items ?? []);
    return Response.json(quote);
  } catch (error) {
    const status = error instanceof DcbdError ? error.status : 400;
    return Response.json({ error: error instanceof Error ? error.message : "Quote failed" }, { status });
  }
}
