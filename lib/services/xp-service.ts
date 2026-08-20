import "server-only";

import { requireCurrentUser } from "@/lib/auth/session";
import { getPrivilegedDataClient, getUserDataClient } from "@/lib/data/server";
import { assertOwner, rejectClientAuthoritativePayload } from "@/lib/security/authorize";
import {
  emptyXpBalance,
  validateRecordXpInput,
  XP_SOURCES,
  type RecordXpInput,
  type XpBalance,
  type XpDirection,
  type XpSource,
  type XpTransaction,
} from "@/domains/xp";

function asXpSource(value: string): XpSource {
  if ((XP_SOURCES as readonly string[]).includes(value)) return value as XpSource;
  return "adjustment";
}

export async function getXpBalance(userId: string): Promise<XpBalance> {
  const actor = await requireCurrentUser();
  assertOwner(actor.id, userId);

  const supabase = await getUserDataClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, current_xp, earned_xp, spent_xp")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return emptyXpBalance(userId);

  return {
    userId: data.id,
    currentXp: data.current_xp,
    earnedXp: data.earned_xp,
    spentXp: data.spent_xp,
  };
}

export async function listXpTransactions(userId: string): Promise<XpTransaction[]> {
  const actor = await requireCurrentUser();
  assertOwner(actor.id, userId);

  const supabase = await getUserDataClient();
  const { data, error } = await supabase
    .from("xp_transactions")
    .select("id, user_id, amount, direction, source, reference_type, reference_id, note, created_at, created_by")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    amount: row.amount,
    direction: row.direction as XpDirection,
    source: asXpSource(row.source),
    referenceType: row.reference_type,
    referenceId: row.reference_id,
    note: row.note,
    createdAt: row.created_at,
    createdBy: row.created_by,
  }));
}

/**
 * XP writes are privileged and must go through a ledger insert.
 * Reward amounts are not defined yet; this records a validated transaction only.
 */
export async function recordXpTransaction(input: RecordXpInput): Promise<void> {
  rejectClientAuthoritativePayload({});
  const validated = validateRecordXpInput(input);
  const privileged = getPrivilegedDataClient();

  const { error } = await privileged.rpc("record_xp_transaction", {
    p_user_id: validated.userId,
    p_amount: validated.amount,
    p_direction: validated.direction,
    p_source: validated.source,
    p_reference_type: validated.referenceType ?? null,
    p_reference_id: validated.referenceId ?? null,
    p_note: validated.note ?? null,
    p_created_by: validated.createdBy ?? null,
  });

  if (error) throw error;
}
