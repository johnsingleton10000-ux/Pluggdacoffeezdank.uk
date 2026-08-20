import type { EntityId, IsoDateTime, PaginatedResult } from "@/types/core";

export type XpTransactionDirection = "credit" | "debit";

export type XpSource =
  | "onboarding"
  | "community"
  | "commerce"
  | "flip"
  | "event"
  | "trade"
  | "membership"
  | "adjustment";

export interface XpTransaction {
  id: EntityId;
  userId: EntityId;
  direction: XpTransactionDirection;
  amount: number;
  source: XpSource;
  sourceReferenceId: EntityId | null;
  reasonCode: string;
  metadata: Readonly<Record<string, unknown>>;
  createdAt: IsoDateTime;
  createdBy: EntityId;
}

export interface XpAccountSummary {
  userId: EntityId;
  currentXp: number;
  lifetimeEarned: number;
  lifetimeSpent: number;
}

export interface XpLedger {
  getSummary(userId: EntityId): Promise<XpAccountSummary>;
  listTransactions(
    userId: EntityId,
    cursor?: string,
  ): Promise<PaginatedResult<XpTransaction>>;
}
