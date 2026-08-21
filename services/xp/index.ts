import { XP_TABLE } from "@/config/xp";
import { DcbdError } from "@/lib/errors";
import { assertServerOnly } from "@/lib/security";
import type { XpSource } from "@/types/xp";

export function xpFor(source: XpSource): number {
  const amount = XP_TABLE[source];
  if (amount == null) {
    throw new DcbdError("xp_unconfigured", `XP for ${source} is not configured yet.`, 400);
  }
  return amount;
}

export function previewXp(source: XpSource) {
  assertServerOnly();
  return { source, amount: XP_TABLE[source] };
}
