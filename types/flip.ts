export type FlipChoice = "attack" | "defend";
export type FlipOutcome = "survive" | "creased" | "destroyed";
export type FlipMatchStatus = "idle" | "drawn" | "committed" | "resolved";

export interface FlipCardView {
  cardId: string;
  name: string;
  slot: "attack" | "defence" | "hidden";
  attack: number;
  defence: number;
  ability: string | null;
}

export interface FlipResolveInput {
  seed: string;
  choice: FlipChoice;
  handCardIds: [string, string, string];
}

export interface FlipResolveResult {
  playerChoice: FlipChoice;
  opponentChoice: FlipChoice;
  playerScore: number;
  opponentScore: number;
  winner: "player" | "opponent" | "draw";
  outcome: FlipOutcome;
  xpSource: "flip" | "victory" | null;
}
