"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CrownMark } from "@/components/ui/Marks";
import { primaryNav, vaultNav } from "@/lib/config/navigation";
import { usePlayer } from "@/lib/state/player";
import { cn } from "@/lib/utils";

export function GlobalNav() {
  const pathname = usePathname();
  const { cartCount } = usePlayer();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-black/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-gold">
          <CrownMark className="h-7 w-7" />
          <span className="leading-none">
            <b className="display block text-2xl text-cream">DCBD</b>
            <small className="text-[0.6rem] uppercase tracking-[0.22em] text-muted">Da Cofeez Dank</small>
          </span>
        </Link>
        <nav className="hidden items-center gap-4 lg:flex">
          {vaultNav.map((item) => (
            <Link key={item.href + item.label} href={item.href} className="text-xs font-black uppercase tracking-[0.16em] text-cream/90 hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/account" className="btn btn-ghost px-3" aria-label="Account">♛</Link>
          <Link href="/stash" className="btn btn-ghost px-3">
            Stash <span className="rounded-full bg-pink px-2 py-0.5 text-xs text-black">{cartCount}</span>
          </Link>
          <button className="btn btn-ghost px-3 lg:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu">
            Menu
          </button>
        </div>
      </div>
      <div className="hidden border-t border-white/5 bg-black/70 lg:block">
        <nav className="mx-auto flex max-w-7xl gap-5 px-4 py-2">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("text-[0.7rem] font-black uppercase tracking-[0.18em] text-muted hover:text-cream", pathname === item.href && "text-gold")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      {open ? (
        <nav className="grid gap-2 border-t border-gold/20 bg-black px-4 py-4 lg:hidden">
          {[...vaultNav, ...primaryNav].map((item) => (
            <Link key={item.href + item.label} href={item.href} className="min-h-11 py-2 text-sm font-black uppercase tracking-widest" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
