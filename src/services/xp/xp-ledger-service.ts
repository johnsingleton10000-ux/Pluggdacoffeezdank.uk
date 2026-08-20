import "server-only";

import type { XpLedgerRepository } from "@/data/repositories";
import type {
  RecordXpTransactionInput,
  XpTransaction,
} from "@/features/xp/domain";
import type { ServiceResult } from "@/types/shared";

type XpLedgerError =
  | "INVALID_TRANSACTION"
  | "INSUFFICIENT_BALANCE"
  | "DUPLICATE_TRANSACTION";

export interface XpLedgerService {
  record(
    input: RecordXpTransactionInput,
  ): Promise<ServiceResult<XpTransaction, XpLedgerError>>;
}

export function createXpLedgerService(
  repository: XpLedgerRepository,
): XpLedgerService {
  return {
    async record(input) {
      if (
        !Number.isSafeInteger(input.amount) ||
        input.amount <= 0 ||
        input.reason.trim().length === 0 ||
        input.idempotencyKey.trim().length === 0
      ) {
        return {
          ok: false,
          code: "INVALID_TRANSACTION",
          message: "XP transactions require a positive integer and audit details.",
        };
      }

      const existing = await repository.findByIdempotencyKey(
        input.idempotencyKey,
      );

      if (existing) {
        return {
          ok: false,
          code: "DUPLICATE_TRANSACTION",
          message: "This XP transaction has already been recorded.",
        };
      }

      if (input.kind === "debit") {
        const summary = await repository.getSummary(input.userId);
        if (summary.current < input.amount) {
          return {
            ok: false,
            code: "INSUFFICIENT_BALANCE",
            message: "The account does not have enough XP.",
          };
        }
      }

      return { ok: true, value: await repository.record(input) };
    },
  };
}
