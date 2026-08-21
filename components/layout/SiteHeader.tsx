"use client";

import Link from "next/link";
import { useState } from "react";
import { Crown } from "@/components/ui/Marks";
import { PRIMARY_NAV } from "@/config/navigation";
import { useStash } from "@/lib/stash";
import { cn } from "@/utils/format";

export function SiteHeader() {
  const { count } = useStash();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Crown className="h-7 w-7" />
          <span className="leading-none">
            <strong className="block font-display text-lg tracking-[0.2em] text-pink-neon">DCBD</strong>
            <span className="hidden text-[0.6rem] font-black uppercase tracking-[0.18em] text-cream sm:block">Da Cofeez Dank</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-4 lg:flex">
          {PRIMARY_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs font-black uppercase tracking-[0.16em] text-cream/80 hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative min-h-touch min-w-touch rounded-full border border-[var(--line)] px-4 py-2 text-xs font-black uppercase">
            Waistband
            <span className="ml-2 rounded-full bg-pink-neon px-2 py-0.5 text-black">{count}</span>
          </Link>
          <button
            type="button"
            className="min-h-touch min-w-touch rounded-xl border border-white/20 px-3 font-black uppercase lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </div>
      <div className={cn("border-t border-white/10 bg-black lg:hidden", !open && "hidden")}>
        <nav className="grid px-4 py-3">
          {PRIMARY_NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="min-h-touch py-3 text-sm font-black uppercase tracking-[0.16em]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
