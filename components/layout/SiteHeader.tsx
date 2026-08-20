"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PRIMARY_NAV } from "@/config/navigation";
import { SITE } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-[var(--color-line)] bg-[var(--color-matte-black)]/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="display text-2xl text-[var(--color-gold)] sm:text-3xl">
          {SITE.name}
        </Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {PRIMARY_NAV.filter((item) => item.status === "live").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "min-h-12 inline-flex items-center text-sm font-bold uppercase tracking-wide",
                pathname === item.href ? "text-[var(--color-gold)]" : "text-[var(--color-text-muted)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          type="button"
          variant="ghost"
          className="lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </Button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t-2 border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-4 lg:hidden">
          <ul className="grid gap-2">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                {item.status === "live" ? (
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center justify-between rounded-[var(--radius-control)] border-2 border-[var(--color-line)] px-4 font-bold uppercase"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="flex min-h-12 items-center justify-between rounded-[var(--radius-control)] border-2 border-[var(--color-line)] px-4 font-bold uppercase text-[var(--color-text-muted)]">
                    {item.label}
                    <Badge tone="muted">Later</Badge>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
