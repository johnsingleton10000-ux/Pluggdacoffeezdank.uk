import Link from "next/link";

import { Badge } from "@/components/ui/indicators";
import { PRIMARY_NAVIGATION } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-line bg-ink/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link
          aria-label="DCBD home"
          className="font-display text-2xl tracking-[-0.04em] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
          href="/"
        >
          DCBD<span className="text-purple-300">.</span>
        </Link>

        <nav aria-label="Primary" className="ml-auto flex items-center gap-2">
          <Link
            className="hidden min-h-11 items-center rounded-md px-3 text-sm font-black uppercase tracking-[0.12em] text-white hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-purple-300 sm:inline-flex"
            href="/"
          >
            Home
          </Link>

          <details className="group relative">
            <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-md border border-line bg-surface px-3 text-sm font-black uppercase tracking-[0.12em] text-white hover:border-purple-300 focus-visible:outline-2 focus-visible:outline-purple-300">
              Ecosystem
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.65rem)] w-[min(21rem,calc(100vw-2rem))] rounded-lg border-2 border-line bg-surface p-2 shadow-hard">
              <p className="px-3 pb-2 pt-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-text-subtle">
                Foundation navigation
              </p>
              <ul className="grid gap-1">
                {PRIMARY_NAVIGATION.map((item) => (
                  <li key={item.label}>
                    {item.status === "available" ? (
                      <Link
                        className="flex min-h-11 items-center justify-between rounded-md px-3 font-bold text-white hover:bg-surface-raised"
                        href={item.href}
                      >
                        {item.label}
                        <Badge tone="positive">Live</Badge>
                      </Link>
                    ) : (
                      <span
                        aria-disabled="true"
                        className="flex min-h-11 items-center justify-between rounded-md px-3 font-bold text-text-muted"
                      >
                        {item.label}
                        <Badge>Planned</Badge>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
