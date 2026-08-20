import type { BloodTestResult } from "@/features/blood-test/domain";
import type { Membership } from "@/features/membership/domain";
import type { PlayerProfile } from "@/features/profile/domain";
import type {
  RecordXpTransactionInput,
  XpAccountSummary,
  XpTransaction,
} from "@/features/xp/domain";
import type { EntityId, ServiceResult } from "@/types/shared";

export interface ProfileRepository {
  findByUserId(userId: EntityId): Promise<PlayerProfile | null>;
}

export interface MembershipRepository {
  findActiveByUserId(userId: EntityId): Promise<Membership | null>;
}

export interface XpLedgerRepository {
  getSummary(userId: EntityId): Promise<XpAccountSummary>;
  /**
   * The implementation must check idempotency and available balance in the
   * same database transaction that appends the ledger entry.
   */
  recordAtomically(
    input: RecordXpTransactionInput,
  ): Promise<
    ServiceResult<
      XpTransaction,
      "INSUFFICIENT_BALANCE" | "DUPLICATE_TRANSACTION"
    >
  >;
}

export interface BloodTestRepository {
  findLatestByUserId(userId: EntityId): Promise<BloodTestResult | null>;
}
