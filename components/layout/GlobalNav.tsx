"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { futureNav, isNavLive, primaryNav } from "@/lib/config/navigation";
import { cn } from "@/lib/utils/cn";

export function GlobalNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b-3 border-ink bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/" className="font-display text-2xl uppercase tracking-[0.18em] text-gold">
            DCBD
          </Link>
          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-touch items-center rounded-xl border-3 px-4 font-display text-sm uppercase tracking-[0.12em]",
                    active ? "border-gold bg-purple-deep text-cream" : "border-line bg-panel text-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => setMoreOpen(true)}
              className="inline-flex min-h-touch items-center rounded-xl border-3 border-line bg-panel px-4 font-display text-sm uppercase tracking-[0.12em] text-muted"
            >
              Later
            </button>
          </nav>
          <Link
            href="/account"
            className="inline-flex min-h-touch items-center rounded-xl border-3 border-gold bg-gold px-4 font-display text-sm uppercase tracking-[0.12em] text-ink shadow-stamp md:hidden"
          >
            Account
          </Link>
        </div>
      </header>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t-3 border-ink bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
        aria-label="Mobile"
      >
        <div className="grid grid-cols-3 gap-2 px-3 py-2">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "inline-flex min-h-touch items-center justify-center rounded-xl border-3 font-display text-sm uppercase",
                  active ? "border-gold bg-purple-deep" : "border-line bg-panel text-muted",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className="inline-flex min-h-touch items-center justify-center rounded-xl border-3 border-line bg-panel font-display text-sm uppercase text-muted"
          >
            More
          </button>
        </div>
      </nav>

      <Modal open={moreOpen} title="Coming later" onClose={() => setMoreOpen(false)}>
        <p className="mb-4 text-sm text-muted">
          These sections are reserved in the architecture and will be built one system at a time.
        </p>
        <ul className="space-y-3">
          {futureNav.map((item) => (
            <li key={item.id} className="rounded-xl border-3 border-line bg-raised p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-lg uppercase">{item.label}</p>
                <Badge tone="muted">Later</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
              <StatusIndicator className="mt-3" label={isNavLive(item) ? "Live" : "Not built yet"} tone="later" />
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
