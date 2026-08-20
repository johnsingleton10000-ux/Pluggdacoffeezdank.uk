import type { BloodTestResult } from "@/features/blood-test/domain";
import type { Membership } from "@/features/membership/domain";
import type { PlayerProfile } from "@/features/profile/domain";
import type {
  RecordXpTransactionInput,
  XpAccountSummary,
  XpTransaction,
} from "@/features/xp/domain";
import type { EntityId } from "@/types/shared";

export interface ProfileRepository {
  findByUserId(userId: EntityId): Promise<PlayerProfile | null>;
}

export interface MembershipRepository {
  findActiveByUserId(userId: EntityId): Promise<Membership | null>;
}

export interface XpLedgerRepository {
  getSummary(userId: EntityId): Promise<XpAccountSummary>;
  record(input: RecordXpTransactionInput): Promise<XpTransaction>;
  findByIdempotencyKey(key: string): Promise<XpTransaction | null>;
}

export interface BloodTestRepository {
  findLatestByUserId(userId: EntityId): Promise<BloodTestResult | null>;
}
