"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CATALOG } from "@/lib/data/catalog";
import { ALL_CARDS, getCard, type DcbdCard } from "@/lib/data/cards";
import type { MembershipTierId } from "@/lib/config/membership";
import { XP_CONFIG } from "@/lib/config/xp";
import type { BloodTestResult } from "@/lib/domains/blood-test";
import { applyXp, emptyXp, type XpBalance, type XpTransaction } from "@/lib/domains/xp";
import type { CartLine } from "@/lib/domains/ecommerce";
import type { TradeOffer } from "@/lib/domains/trading";

export type OwnedCard = {
  cardId: string;
  qty: number;
  inDeck: boolean;
  tradeListed: boolean;
};

export type CommunityPost = {
  id: string;
  name: string;
  text: string;
  time: string;
  board: "announcements" | "game" | "cards" | "trading";
};

export type FlipHistoryItem = {
  id: string;
  cardName: string;
  outcome: string;
  createdAt: string;
};

export type PlayerState = {
  estateName: string | null;
  membershipTier: MembershipTierId;
  bloodTest: BloodTestResult | null;
  xp: XpBalance;
  ledger: XpTransaction[];
  collection: OwnedCard[];
  cart: CartLine[];
  posts: CommunityPost[];
  trades: TradeOffer[];
  flipHistory: FlipHistoryItem[];
  ageOk: boolean;
};

const STORAGE_KEY = "dcbd-player-v1";

const DEFAULT_POSTS: CommunityPost[] = [
  { id: "d1", name: "EstateBorn", text: "Member voting board opens after the first product drop.", time: "2d ago", board: "announcements" },
  { id: "d2", name: "PandaProfessor", text: "Show off your rookie card collection here.", time: "1d ago", board: "cards" },
  { id: "d3", name: "SmokeKing23", text: "What flavour should return next month?", time: "2h ago", board: "announcements" },
];

function defaultState(): PlayerState {
  return {
    estateName: null,
    membershipTier: "free",
    bloodTest: null,
    xp: emptyXp(),
    ledger: [],
    collection: ALL_CARDS.filter((card) => !card.lockedByDefault).map((card) => ({
      cardId: card.id,
      qty: 0,
      inDeck: false,
      tradeListed: false,
    })),
    cart: [],
    posts: [],
    trades: [],
    flipHistory: [],
    ageOk: false,
  };
}

function loadState(): PlayerState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState(), ageOk: localStorage.getItem("dcbdAgeOk") === "yes" };
    const parsed = JSON.parse(raw) as PlayerState;
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

type PlayerContextValue = {
  state: PlayerState;
  ready: boolean;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setAgeOk: () => void;
  grantBloodTest: (result: BloodTestResult, estateName: string) => void;
  addPost: (name: string, text: string, board: CommunityPost["board"]) => void;
  grantCard: (cardId: string, qty?: number) => void;
  toggleDeck: (cardId: string) => void;
  toggleTrade: (cardId: string) => void;
  recordFlip: (item: Omit<FlipHistoryItem, "id" | "createdAt">) => void;
  awardXp: (amount: number, source: string, note?: string) => void;
  markMember: () => void;
  ownedCards: DcbdCard[];
  deckCards: DcbdCard[];
  cartCount: number;
  catalogSize: number;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadState());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  const value = useMemo<PlayerContextValue>(() => {
    const awardXp = (amount: number, source: string, note?: string) => {
      setState((current) => {
        try {
          const tx: XpTransaction = {
            id: `xp-${Date.now()}`,
            amount,
            direction: "earn",
            source,
            createdAt: new Date().toISOString(),
            note,
          };
          return { ...current, xp: applyXp(current.xp, amount, "earn"), ledger: [tx, ...current.ledger] };
        } catch {
          return current;
        }
      });
    };

    const grantCard = (cardId: string, qty = 1) => {
      setState((current) => {
        const existing = current.collection.find((item) => item.cardId === cardId);
        const collection = existing
          ? current.collection.map((item) => (item.cardId === cardId ? { ...item, qty: item.qty + qty } : item))
          : [...current.collection, { cardId, qty, inDeck: false, tradeListed: false }];
        return { ...current, collection };
      });
    };

    return {
      state,
      ready,
      catalogSize: CATALOG.length,
      cartCount: state.cart.reduce((sum, line) => sum + line.qty, 0),
      ownedCards: state.collection.filter((item) => item.qty > 0).map((item) => getCard(item.cardId)).filter(Boolean) as DcbdCard[],
      deckCards: state.collection.filter((item) => item.inDeck && item.qty > 0).map((item) => getCard(item.cardId)).filter(Boolean) as DcbdCard[],
      addToCart: (productId) => {
        setState((current) => {
          const existing = current.cart.find((line) => line.productId === productId);
          const cart = existing
            ? current.cart.map((line) => (line.productId === productId ? { ...line, qty: line.qty + 1 } : line))
            : [...current.cart, { productId, qty: 1 }];
          return { ...current, cart };
        });
      },
      removeFromCart: (productId) => setState((current) => ({ ...current, cart: current.cart.filter((line) => line.productId !== productId) })),
      clearCart: () => setState((current) => ({ ...current, cart: [] })),
      setAgeOk: () => {
        localStorage.setItem("dcbdAgeOk", "yes");
        setState((current) => ({ ...current, ageOk: true }));
      },
      grantBloodTest: (result, estateName) => {
        setState((current) => {
          const collection = current.collection.map((item) =>
            result.starterCardIds.includes(item.cardId) ? { ...item, qty: Math.max(item.qty, 1), inDeck: true } : item,
          );
          result.starterCardIds.forEach((cardId) => {
            if (!collection.some((item) => item.cardId === cardId)) {
              collection.push({ cardId, qty: 1, inDeck: true, tradeListed: false });
            }
          });
          const tx: XpTransaction = {
            id: `xp-onboard-${Date.now()}`,
            amount: XP_CONFIG.onboardingComplete,
            direction: "earn",
            source: "onboarding",
            createdAt: new Date().toISOString(),
          };
          return {
            ...current,
            estateName,
            bloodTest: result,
            collection,
            xp: applyXp(current.xp, XP_CONFIG.onboardingComplete, "earn"),
            ledger: [tx, ...current.ledger],
          };
        });
      },
      addPost: (name, text, board) => {
        const post: CommunityPost = {
          id: `p-${Date.now()}`,
          name: name || "Guest",
          text,
          time: "Just now",
          board,
        };
        setState((current) => ({ ...current, posts: [post, ...current.posts] }));
        awardXp(XP_CONFIG.communityPost, "community", "Board post");
      },
      grantCard,
      toggleDeck: (cardId) => {
        setState((current) => ({
          ...current,
          collection: current.collection.map((item) => (item.cardId === cardId && item.qty > 0 ? { ...item, inDeck: !item.inDeck } : item)),
        }));
      },
      toggleTrade: (cardId) => {
        setState((current) => ({
          ...current,
          collection: current.collection.map((item) => (item.cardId === cardId && item.qty > 0 ? { ...item, tradeListed: !item.tradeListed } : item)),
        }));
      },
      recordFlip: (item) => {
        setState((current) => ({
          ...current,
          flipHistory: [{ id: `f-${Date.now()}`, createdAt: new Date().toISOString(), ...item }, ...current.flipHistory].slice(0, 20),
        }));
      },
      awardXp,
      markMember: () => setState((current) => ({ ...current, membershipTier: "estate_born_plus" })),
    };
  }, [ready, state]);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}
