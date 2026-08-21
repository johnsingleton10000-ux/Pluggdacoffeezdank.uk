"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/ecommerce";

export interface StashItem {
  id: string;
  name: string;
  qty: number;
  color: string;
}

interface StashContextValue {
  items: StashItem[];
  count: number;
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const StashContext = createContext<StashContextValue | null>(null);
const KEY = "dcbd-waistband";

export function StashProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<StashItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as StashItem[]);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<StashContextValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    add: (product, qty = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.id === product.id ? { ...item, qty: Math.min(20, item.qty + qty) } : item,
          );
        }
        return [...current, { id: product.id, name: product.name, qty, color: product.color }];
      });
    },
    remove: (id) => setItems((current) => current.filter((item) => item.id !== id)),
    clear: () => setItems([]),
  }), [items]);

  return <StashContext.Provider value={value}>{children}</StashContext.Provider>;
}

export function useStash() {
  const ctx = useContext(StashContext);
  if (!ctx) throw new Error("useStash must be used inside StashProvider");
  return ctx;
}
