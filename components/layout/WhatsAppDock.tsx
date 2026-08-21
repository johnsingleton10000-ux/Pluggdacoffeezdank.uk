import { whatsappUrl } from "@/lib/config/site";

export function WhatsAppDock() {
  return (
    <a
      href={whatsappUrl("Hi DCBD, talk to the Dank Plugz.")}
      className="fixed bottom-4 right-4 z-40 rounded-full bg-[var(--dcbd-whatsapp)] px-5 py-3 font-black uppercase tracking-wide text-black shadow-[0_0_24px_#25d366] min-h-12"
    >
      WhatsApp
    </a>
  );
}
