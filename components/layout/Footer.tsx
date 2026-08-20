import Link from "next/link";
import { site, whatsappUrl, mailtoUrl } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="border-t-3 border-ink bg-ink px-4 py-10 pb-24 md:pb-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-muted sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.16em] text-gold">{site.name}</p>
          <p className="mt-2 max-w-md">{site.tagline}</p>
          <p className="mt-3">18+ only. Educational and brand information only. No medical claims.</p>
        </div>
        <div className="flex flex-col gap-2">
          <a href={whatsappUrl(`Hi ${site.contact.founderHandle}, I'd like to talk.`)}>WhatsApp</a>
          <a href={mailtoUrl("DCBD enquiry")}>Email</a>
          <Link href="/education">Education</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
