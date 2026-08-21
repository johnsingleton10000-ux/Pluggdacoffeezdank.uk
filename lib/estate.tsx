"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ArchetypeId } from "@/types/archetype";
import type { AvatarDefinition } from "@/types/avatar";
import type { BloodTestScores } from "@/types/blood-test";
import type { CardOwnership } from "@/types/card";
import type { XpBalance } from "@/types/xp";

export interface EstateProfile {
  estateName: string;
  rank: string;
  archetypeId: ArchetypeId | null;
  deckName: string;
  avatar: AvatarDefinition | null;
  scores: BloodTestScores | null;
  starterCardIds: string[];
  collection: CardOwnership[];
  xp: XpBalance;
  membershipTier: "street" | "estate_born_plus" | "founder_circle";
  onboarded: boolean;
}

const EMPTY: EstateProfile = {
  estateName: "",
  rank: "Street Seat",
  archetypeId: null,
  deckName: "",
  avatar: null,
  scores: null,
  starterCardIds: [],
  collection: [],
  xp: { current: 0, earned: 0, spent: 0 },
  membershipTier: "street",
  onboarded: false,
};

const KEY = "dcbd-estate-profile";

interface EstateContextValue {
  profile: EstateProfile;
  ready: boolean;
  save: (next: Partial<EstateProfile>) => void;
  grantXp: (amount: number) => void;
  addCards: (cardIds: string[], source: CardOwnership["source"]) => void;
}

const EstateContext = createContext<EstateContextValue | null>(null);

export function EstateProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<EstateProfile>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setProfile({ ...EMPTY, ...(JSON.parse(raw) as EstateProfile) });
    } catch {
      setProfile(EMPTY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(profile));
  }, [profile, ready]);

  const value = useMemo<EstateContextValue>(() => ({
    profile,
    ready,
    save: (next) => setProfile((current) => ({ ...current, ...next })),
    grantXp: (amount) =>
      setProfile((current) => ({
        ...current,
        xp: {
          current: current.xp.current + amount,
          earned: current.xp.earned + amount,
          spent: current.xp.spent,
        },
      })),
    addCards: (cardIds, source) =>
      setProfile((current) => {
        const collection = [...current.collection];
        for (const cardId of cardIds) {
          const existing = collection.find((item) => item.cardId === cardId);
          if (existing) {
            existing.quantity += 1;
            existing.duplicates += 1;
          } else {
            collection.push({
              id: `own-${cardId}-${Date.now()}`,
              cardId,
              ownerId: "local-estate-player",
              source,
              quantity: 1,
              duplicates: 0,
              collectionStatus: "owned",
              tradeStatus: "tradeable",
              life: "ready",
              creaseCount: 0,
              acquiredAt: new Date().toISOString(),
            });
          }
        }
        return { ...current, collection };
      }),
  }), [profile, ready]);

  return <EstateContext.Provider value={value}>{children}</EstateContext.Provider>;
}

export function useEstate() {
  const ctx = useContext(EstateContext);
  if (!ctx) throw new Error("useEstate must be used inside EstateProvider");
  return ctx;
}
