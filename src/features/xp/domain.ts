import type { AuditedEntity, EntityId } from "@/types/shared";

export const XP_TRANSACTION_KINDS = ["credit", "debit"] as const;
export type XpTransactionKind = (typeof XP_TRANSACTION_KINDS)[number];

export type XpSource =
  | "onboarding"
  | "community"
  | "purchase"
  | "flip"
  | "event"
  | "trade"
  | "membership"
  | "administration";

export interface XpAccountSummary {
  readonly current: number;
  readonly earned: number;
  readonly spent: number;
}

export interface XpTransaction extends AuditedEntity {
  readonly userId: EntityId;
  readonly kind: XpTransactionKind;
  readonly amount: number;
  readonly source: XpSource;
  readonly reason: string;
  readonly referenceId: EntityId | null;
  readonly idempotencyKey: string;
  readonly balanceAfter: number;
}

export interface RecordXpTransactionInput {
  readonly userId: EntityId;
  readonly kind: XpTransactionKind;
  readonly amount: number;
  readonly source: XpSource;
  readonly reason: string;
  readonly referenceId?: EntityId;
  readonly idempotencyKey: string;
}
