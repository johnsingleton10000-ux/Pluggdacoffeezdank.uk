import { site, whatsappUrl } from "@/lib/config/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="estate-title text-2xl">{site.name} ESTATE LEGENDS</p>
          <p className="mt-2 text-purple-neon">Own it. Control it. Live it.</p>
          <p className="mt-3 max-w-xl text-sm text-muted">18+ only • Legal compliance required • Product claims must be verified before publishing</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={whatsappUrl("Hi DCBD, I want to talk to the Dank Plugz.")} variant="lime">WhatsApp Us</ButtonLink>
          <ButtonLink href="/privacy" variant="ghost">Privacy</ButtonLink>
          <ButtonLink href="/terms" variant="ghost">Terms</ButtonLink>
          <ButtonLink href="/education" variant="ghost">Education</ButtonLink>
        </div>
      </div>
    </footer>
  );
}
