import { ButtonLink } from "@/components/ui/ButtonLink";

export default function SuccessPage() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-4">
      <section className="gold-frame max-w-3xl rounded-3xl bg-black/80 p-10 text-center">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">Complete</p>
        <h1 className="display mt-4 text-6xl">Welcome to the Inner Circle</h1>
        <p className="mt-4 text-muted">Your membership checkout completed. Return to the Estate for the next step.</p>
        <ButtonLink href="/account" variant="gold" className="mt-8">Open account</ButtonLink>
      </section>
    </main>
  );
}
