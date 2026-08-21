import Link from "next/link";
import { HoodSilhouette } from "@/components/ui/Marks";
import { SITE } from "@/config/site";
import { waLink } from "@/utils/format";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-10">
      <div className="border-y border-green-neon/30 bg-black/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row">
          <p className="text-center text-xs font-black uppercase tracking-[0.18em] text-cream">
            Talk to the Dank Plugz — real plugz. real answers. 24/7
          </p>
          <a
            href={waLink(SITE.whatsapp, "Hi DCBD, I want to talk to the Dank Plugz.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-touch items-center rounded-xl bg-pink-neon px-6 py-3 text-sm font-black uppercase text-black shadow-neonPink"
          >
            WhatsApp us
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row">
        <div className="flex items-center gap-3">
          <HoodSilhouette />
          <strong className="font-display text-xl text-cream">DCBD Estate Legends — Own it. Control it. Live it.</strong>
          <HoodSilhouette />
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/education">Education</Link>
        </div>
      </div>
    </footer>
  );
}
