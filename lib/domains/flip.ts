import { getCard, type DcbdCard } from "@/lib/data/cards";

export type FlipAction = "attack" | "defend";
export type FlipOutcome = "survive" | "creased" | "destroyed";

export type FlipResult = {
  playerCard: DcbdCard;
  opponentPower: number;
  action: FlipAction;
  risk: number;
  outcome: FlipOutcome;
  playerPower: number;
};

export function resolveFlip(input: { cardId: string; action: FlipAction; risk: number; seed?: number }): FlipResult | null {
  const card = getCard(input.cardId);
  if (!card) return null;
  const risk = Math.min(100, Math.max(0, input.risk));
  const seed = input.seed ?? Date.now();
  const jitter = ((seed % 17) - 8) / 10;
  const base = input.action === "attack" ? card.attack : card.defence;
  const playerPower = Number((base + risk / 20 + jitter).toFixed(2));
  const opponentPower = Number((5 + (100 - risk) / 25 + ((seed % 9) - 4) / 8).toFixed(2));
  const delta = playerPower - opponentPower;
  let outcome: FlipOutcome = "survive";
  if (delta < -1.5) outcome = "destroyed";
  else if (delta < 1.2) outcome = "creased";
  return { playerCard: card, opponentPower, action: input.action, risk, outcome, playerPower };
}
