import "server-only";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { assertPositiveInt, assertServerOnly, assertSameUser } from "@/lib/security";
import { DcbdError } from "@/lib/errors";
import type { RecordXpInput, XpBalance, XpTransaction } from "@/types/xp";

/**
 * XP is a ledger. Never accept a client-supplied balance.
 * All mutations must run on the server through this module.
 */
export async function recordXpTransaction(input: RecordXpInput): Promise<XpTransaction> {
  assertServerOnly();
  assertPositiveInt(input.amount, "XP amount");

  const admin = createAdminSupabaseClient();
  const { data, error } = await admin.rpc("record_xp_transaction", {
    p_user_id: input.userId,
    p_amount: input.amount,
    p_direction: input.direction,
    p_source: input.source,
    p_source_ref: input.sourceRef ?? null,
    p_note: input.note ?? null,
    p_created_by: input.createdBy ?? "system",
  });

  if (error || !data) {
    throw new DcbdError("xp_write_failed", error?.message ?? "Could not record XP.", 500);
  }

  return mapXpRow(data);
}

export async function getXpBalance(actorId: string, userId: string): Promise<XpBalance> {
  assertServerOnly();
  assertSameUser(actorId, userId);

  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("profiles")
    .select("xp_current, xp_earned, xp_spent")
    .eq("id", userId)
    .single();

  if (error || !data) {
    throw new DcbdError("xp_read_failed", "Could not load XP balance.", 500);
  }

  return {
    current: data.xp_current,
    earned: data.xp_earned,
    spent: data.xp_spent,
  };
}

export async function listXpTransactions(actorId: string, userId: string): Promise<XpTransaction[]> {
  assertServerOnly();
  assertSameUser(actorId, userId);

  const admin = createAdminSupabaseClient();
  const { data, error } = await admin
    .from("xp_transactions")
    .select("id, user_id, amount, direction, source, source_ref, note, created_at, created_by")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new DcbdError("xp_read_failed", error.message, 500);
  }

  return (data ?? []).map(mapXpRow);
}

interface XpRow {
  id: string;
  user_id: string;
  amount: number;
  direction: "earn" | "spend";
  source: XpTransaction["source"];
  source_ref: string | null;
  note: string | null;
  created_at: string;
  created_by: "system" | "admin";
}

function mapXpRow(row: XpRow): XpTransaction {
  return {
    id: row.id,
    userId: row.user_id,
    amount: row.amount,
    direction: row.direction,
    source: row.source,
    sourceRef: row.source_ref,
    note: row.note,
    createdAt: row.created_at,
    createdBy: row.created_by,
  };
}
