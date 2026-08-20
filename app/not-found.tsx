import { ButtonLink } from "@/components/ui/ButtonLink";
import { Panel } from "@/components/ui/Panel";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60dvh] max-w-xl items-center px-4 py-16">
      <Panel className="w-full text-center">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-ember">404</p>
        <h1 className="mt-3 font-display text-4xl uppercase">Not in the deck</h1>
        <p className="mt-4 text-muted">That route is not part of the current foundation.</p>
        <div className="mt-6 flex justify-center">
          <ButtonLink href="/">Return home</ButtonLink>
        </div>
      </Panel>
    </main>
  );
}
