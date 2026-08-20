import Link from "next/link";

import { BrandMark } from "@/components/ui/brand-mark";
import { StatusIndicator } from "@/components/ui/status-indicator";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-line bg-ink pb-28 pt-10 lg:pb-10">
      <div className="mx-auto flex max-w-shell flex-col gap-7 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-md text-sm leading-6 text-secondary">
            One player identity connecting progression, collecting, community,
            commerce and competitive play.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <StatusIndicator label="Foundation established" status="online" />
          <Link
            className="text-sm font-bold text-secondary underline decoration-line-strong underline-offset-4 hover:text-primary"
            href="#blueprint"
          >
            View technical blueprint
          </Link>
          <p className="text-xs text-secondary/70">
            © {new Date().getFullYear()} DCBD
          </p>
        </div>
      </div>
    </footer>
  );
}
