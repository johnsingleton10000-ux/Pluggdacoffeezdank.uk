import Link from "next/link";

import { primaryNavigation } from "@/config/navigation";
import { Badge } from "@/components/ui/badge";
import { BrandMark } from "@/components/ui/brand-mark";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  const desktopItems = primaryNavigation.slice(0, 6);

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-line bg-canvas/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-shell items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Link
            aria-label="DCBD home"
            className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            href="/"
          >
            <BrandMark />
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {desktopItems.map((item) =>
              item.status === "active" ? (
                <Link
                  className="min-h-11 rounded-lg px-3 py-3 text-xs font-black uppercase tracking-[0.11em] text-primary transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-gold"
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="inline-flex min-h-11 cursor-not-allowed items-center gap-2 rounded-lg px-3 py-3 text-xs font-black uppercase tracking-[0.11em] text-secondary/60"
                  key={item.label}
                  title={`${item.label} is planned for a later build`}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-[0.55rem]">
                    ◆
                  </span>
                </span>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Badge className="hidden sm:inline-flex" tone="success">
              Foundation
            </Badge>
            <ButtonLink
              className="min-h-11 px-4 text-xs"
              disabled
              href="/account"
              variant="ghost"
            >
              Account soon
            </ButtonLink>
          </div>
        </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-line bg-canvas/95 px-[max(0.75rem,env(safe-area-inset-left))] pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {primaryNavigation.slice(0, 4).map((item, index) => (
            <li key={item.label}>
              {item.status === "active" ? (
                <Link
                  className="flex min-h-13 flex-col items-center justify-center gap-1 rounded-xl bg-purple-wash px-1 py-2 text-[0.62rem] font-black uppercase tracking-[0.08em] text-purple-soft focus-visible:outline-2 focus-visible:outline-gold"
                  href={item.href}
                >
                  <span aria-hidden="true" className="text-base">
                    {index === 0 ? "◆" : "◇"}
                  </span>
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="flex min-h-13 flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[0.62rem] font-black uppercase tracking-[0.08em] text-secondary/45"
                >
                  <span aria-hidden="true" className="text-base">
                    ◇
                  </span>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
