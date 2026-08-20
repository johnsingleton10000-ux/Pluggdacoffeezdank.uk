import { assertServerOnly } from "@/lib/security";
import type { Trade } from "@/types/trading";
import type { CardOwnership } from "@/types/card";

export function isEligibleForTrade(ownership: CardOwnership): boolean {
  return ownership.tradeStatus === "tradeable" || ownership.tradeStatus === "listed";
}

export async function onTradeCompleted(_trade: Trade): Promise<void> {
  assertServerOnly();
}
