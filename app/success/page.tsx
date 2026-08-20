import { ButtonLink } from "@/components/ui/ButtonLink";
import { Panel } from "@/components/ui/Panel";

export default function SuccessPage() {
  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-3xl items-center px-4 py-16">
      <Panel className="w-full text-center">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">Complete</p>
        <h1 className="mt-4 font-display text-5xl uppercase leading-none">Checkout recorded</h1>
        <p className="mt-5 text-muted">
          If a payment was completed, this is the return page. Membership subscriptions are not implemented in this foundation.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/">Back home</ButtonLink>
        </div>
      </Panel>
    </main>
  );
}
