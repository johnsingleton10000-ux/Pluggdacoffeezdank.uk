import type { IsoDateTime, Uuid } from "@/types/common";

export const XP_SOURCES = [
  "onboarding",
  "community",
  "purchase",
  "flip",
  "victory",
  "event",
  "trading",
  "membership",
  "adjustment",
] as const;

export type XpSource = (typeof XP_SOURCES)[number];
export type XpDirection = "earn" | "spend";

export interface XpBalance {
  current: number;
  earned: number;
  spent: number;
}

export interface XpTransaction {
  id: Uuid;
  userId: Uuid;
  amount: number;
  direction: XpDirection;
  source: XpSource;
  sourceRef: string | null;
  note: string | null;
  createdAt: IsoDateTime;
  createdBy: "system" | "admin";
}

export interface RecordXpInput {
  userId: Uuid;
  amount: number;
  direction: XpDirection;
  source: XpSource;
  sourceRef?: string;
  note?: string;
  createdBy?: XpTransaction["createdBy"];
}
