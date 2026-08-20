import type { RecordXpInput, XpBalance, XpTransaction } from "@/domains/xp/types";

export class InvalidXpTransactionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidXpTransactionError";
  }
}

export function assertValidXpAmount(amount: number): void {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new InvalidXpTransactionError("XP amounts must be positive integers.");
  }
}

export function applyTransaction(balance: XpBalance, transaction: Pick<XpTransaction, "amount" | "direction">): XpBalance {
  assertValidXpAmount(transaction.amount);

  if (transaction.direction === "earn") {
    return {
      ...balance,
      currentXp: balance.currentXp + transaction.amount,
      earnedXp: balance.earnedXp + transaction.amount,
    };
  }

  if (balance.currentXp < transaction.amount) {
    throw new InvalidXpTransactionError("XP spend exceeds current balance.");
  }

  return {
    ...balance,
    currentXp: balance.currentXp - transaction.amount,
    spentXp: balance.spentXp + transaction.amount,
  };
}

export function emptyXpBalance(userId: string): XpBalance {
  return {
    userId,
    currentXp: 0,
    earnedXp: 0,
    spentXp: 0,
  };
}

export function summariseLedger(userId: string, transactions: readonly XpTransaction[]): XpBalance {
  return transactions.reduce<XpBalance>(
    (balance, transaction) => applyTransaction(balance, transaction),
    emptyXpBalance(userId),
  );
}

export function validateRecordXpInput(input: RecordXpInput): RecordXpInput {
  assertValidXpAmount(input.amount);
  return input;
}
