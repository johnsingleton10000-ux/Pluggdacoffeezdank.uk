import type { XpTransaction } from "../../../types/dcbd";

export interface GrantXpInput {
  userId: string;
  amount: number;
  source: string;
  referenceId?: string;
  metadata?: Record<string, unknown>;
}

export interface XpLedger {
  getBalance(userId: string): Promise<number>;
  listTransactions(userId: string): Promise<XpTransaction[]>;
  grant(input: GrantXpInput): Promise<XpTransaction>;
  spend(input: GrantXpInput): Promise<XpTransaction>;
}

/**
 * XP changes must go through a server-side ledger implementation. No client
 * component should be allowed to set a balance directly.
 */
export class UnconfiguredXpLedger implements XpLedger {
  async getBalance(): Promise<number> {
    return 0;
  }

  async listTransactions(): Promise<XpTransaction[]> {
    return [];
  }

  async grant(): Promise<never> {
    throw new Error("XP ledger is not connected to a data store yet.");
  }

  async spend(): Promise<never> {
    throw new Error("XP ledger is not connected to a data store yet.");
  }
}
