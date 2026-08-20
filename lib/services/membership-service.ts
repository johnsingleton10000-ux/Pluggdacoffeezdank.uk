import "server-only";

import { requireCurrentUser } from "@/lib/auth/session";
import { getUserDataClient } from "@/lib/data/server";
import { assertOwner } from "@/lib/security/authorize";
import { parseMembershipTierId, type Membership, type MembershipStatus } from "@/domains/membership";

export async function getCurrentMembership(userId: string): Promise<Membership | null> {
  const actor = await requireCurrentUser();
  assertOwner(actor.id, userId);

  const supabase = await getUserDataClient();
  const { data, error } = await supabase
    .from("memberships")
    .select(
      "id, user_id, tier, status, started_at, current_period_end, provider, provider_subscription_id, created_at, updated_at",
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    userId: data.user_id,
    tier: parseMembershipTierId(data.tier),
    status: data.status as MembershipStatus,
    startedAt: data.started_at,
    currentPeriodEnd: data.current_period_end,
    provider: data.provider,
    providerSubscriptionId: data.provider_subscription_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}
