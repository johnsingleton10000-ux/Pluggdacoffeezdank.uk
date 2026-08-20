import Link from "next/link";
import { SITE } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-[var(--color-line)] bg-[var(--color-matte-black)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>
          <strong className="text-[var(--color-text)]">{SITE.name}</strong> · {SITE.ageRestriction} only
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
          <Link href="/education" className="min-h-11 inline-flex items-center">
            Education
          </Link>
          <Link href="/privacy" className="min-h-11 inline-flex items-center">
            Privacy
          </Link>
          <Link href="/terms" className="min-h-11 inline-flex items-center">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
