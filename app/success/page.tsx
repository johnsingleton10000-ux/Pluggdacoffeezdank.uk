import { ButtonLink } from "@/components/ui/ButtonLink";

export default function SuccessPage() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4">
      <section className="gold-frame max-w-3xl rounded-3xl p-8 text-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Complete</p>
        <h1 className="estate-title mt-4 text-5xl sm:text-7xl">Welcome to the Inner Circle</h1>
        <p className="mt-4 text-muted">Checkout completed. Return to your Blood Seat for the next step.</p>
        <ButtonLink href="/account" variant="pink" className="mt-6">Open Account</ButtonLink>
      </section>
    </main>
  );
}
