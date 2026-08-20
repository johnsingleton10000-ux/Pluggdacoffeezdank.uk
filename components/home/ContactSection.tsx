import { ButtonLink } from "@/components/ui/ButtonLink";
import { Panel } from "@/components/ui/Panel";
import { site, mailtoUrl, whatsappUrl } from "@/lib/config/site";

export function ContactSection() {
  return (
    <section id="contact" className="px-4 py-12">
      <Panel className="mx-auto max-w-6xl">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">Contact</p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">
          Talk to {site.contact.founderHandle}
        </h2>
        <p className="mt-4 max-w-2xl text-muted">Direct support and personal service. 18+ only.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={whatsappUrl(`Hi ${site.contact.founderHandle}, I'd like to talk.`)} size="lg">
            WhatsApp
          </ButtonLink>
          <ButtonLink href={mailtoUrl("DCBD enquiry")} size="lg" variant="ghost">
            Email the team
          </ButtonLink>
        </div>
      </Panel>
    </section>
  );
}
