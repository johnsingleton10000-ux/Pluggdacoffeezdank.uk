import { DcbdError } from "@/lib/errors";
import { flipXpAmount, resolveFlip } from "@/services/flip";
import type { FlipResolveInput } from "@/types/flip";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FlipResolveInput;
    const result = resolveFlip(body);
    return Response.json({ ...result, xp: flipXpAmount(result) });
  } catch (error) {
    const status = error instanceof DcbdError ? error.status : 400;
    return Response.json({ error: error instanceof Error ? error.message : "Flip failed" }, { status });
  }
}
