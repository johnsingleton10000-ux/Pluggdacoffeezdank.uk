export type XpDirection = "earn" | "spend";

export type XpTransaction = {
  id: string;
  amount: number;
  direction: XpDirection;
  source: string;
  createdAt: string;
  note?: string;
};

export type XpBalance = {
  currentXp: number;
  earnedXp: number;
  spentXp: number;
};

export function emptyXp(): XpBalance {
  return { currentXp: 0, earnedXp: 0, spentXp: 0 };
}

export function applyXp(balance: XpBalance, amount: number, direction: XpDirection): XpBalance {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error("XP amounts must be positive integers.");
  }
  if (direction === "earn") {
    return {
      currentXp: balance.currentXp + amount,
      earnedXp: balance.earnedXp + amount,
      spentXp: balance.spentXp,
    };
  }
  if (balance.currentXp < amount) {
    throw new Error("XP spend exceeds current balance.");
  }
  return {
    currentXp: balance.currentXp - amount,
    earnedXp: balance.earnedXp,
    spentXp: balance.spentXp + amount,
  };
}
