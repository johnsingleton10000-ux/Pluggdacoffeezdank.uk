import { getCard } from "@/data/cards";
import { DcbdError } from "@/lib/errors";
import { assertServerOnly } from "@/lib/security";
import { xpFor } from "@/services/xp";
import type { FlipChoice, FlipOutcome, FlipResolveInput, FlipResolveResult } from "@/types/flip";

function hashSeed(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function opponentChoice(seed: string): FlipChoice {
  return hashSeed(seed) % 2 === 0 ? "attack" : "defend";
}

function scoreHand(cardIds: string[], choice: FlipChoice) {
  return cardIds.reduce((sum, id) => {
    const card = getCard(id);
    if (!card) return sum;
    const attack = card.attack ?? 40;
    const defence = card.defence ?? 40;
    return sum + (choice === "attack" ? attack : defence);
  }, 0);
}

function outcomeFor(player: number, opponent: number): FlipOutcome {
  const gap = player - opponent;
  if (gap >= 40) return "survive";
  if (gap <= -40) return "destroyed";
  return "creased";
}

export function resolveFlip(input: FlipResolveInput): FlipResolveResult {
  assertServerOnly();
  if (input.handCardIds.length !== 3) {
    throw new DcbdError("bad_hand", "Flip Three requires exactly three cards.", 400);
  }
  if (input.choice !== "attack" && input.choice !== "defend") {
    throw new DcbdError("bad_choice", "Choice must be attack or defend.", 400);
  }
  for (const id of input.handCardIds) {
    if (!getCard(id)) throw new DcbdError("unknown_card", `Unknown card ${id}.`, 400);
  }

  const opp = opponentChoice(`${input.seed}:${input.handCardIds.join(",")}`);
  const playerScore = scoreHand(input.handCardIds, input.choice);
  const opponentScore = scoreHand(input.handCardIds, opp) - 12 + (hashSeed(input.seed) % 25);
  const winner =
    playerScore === opponentScore ? "draw" : playerScore > opponentScore ? "player" : "opponent";
  const outcome = outcomeFor(playerScore, opponentScore);

  return {
    playerChoice: input.choice,
    opponentChoice: opp,
    playerScore,
    opponentScore,
    winner,
    outcome,
    xpSource: winner === "player" ? "victory" : "flip",
  };
}

export function flipXpAmount(result: FlipResolveResult) {
  return result.xpSource ? xpFor(result.xpSource) : 0;
}
