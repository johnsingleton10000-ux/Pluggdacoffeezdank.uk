import { whatsappUrl } from "@/lib/config/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function WhatsAppBanner() {
  return (
    <section className="px-4 pb-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 rounded-2xl border border-[#25d366]/40 bg-black/70 px-5 py-6 sm:flex-row">
        <div>
          <p className="font-black uppercase tracking-[0.18em] text-[#25d366]">Talk to the Dank Plugz</p>
          <p className="text-muted">Real plugz. Real answers. 24/7.</p>
        </div>
        <ButtonLink href={whatsappUrl("Hi DCBD, I want to order from The Vault.")} variant="pink">WhatsApp Us</ButtonLink>
      </div>
    </section>
  );
}
