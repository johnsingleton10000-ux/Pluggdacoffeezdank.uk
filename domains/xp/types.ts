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

export type XpTransaction = {
  id: string;
  userId: string;
  amount: number;
  direction: XpDirection;
  source: XpSource;
  referenceType: string | null;
  referenceId: string | null;
  note: string | null;
  createdAt: string;
  createdBy: string | null;
};

export type XpBalance = {
  userId: string;
  currentXp: number;
  earnedXp: number;
  spentXp: number;
};

export type RecordXpInput = {
  userId: string;
  amount: number;
  direction: XpDirection;
  source: XpSource;
  referenceType?: string;
  referenceId?: string;
  note?: string;
  createdBy?: string;
};
