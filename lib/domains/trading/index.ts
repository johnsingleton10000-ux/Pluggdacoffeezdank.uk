import type { CardOwnership, Trade } from "../../../types/dcbd";

export interface TradeProposal {
  trade: Trade;
  offered: CardOwnership[];
  requested: CardOwnership[];
}

export interface TradingService {
  createProposal(input: TradeProposal): Promise<Trade>;
  cancel(tradeId: string, actorId: string): Promise<Trade>;
}
