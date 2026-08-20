import { ButtonLink } from "@/components/ui/ButtonLink";
import { Panel } from "@/components/ui/Panel";

export default function SuccessPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Panel className="max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-gold)]">Complete</p>
        <h1 className="display mt-4 text-5xl sm:text-7xl">You are in</h1>
        <p className="mt-4 text-[var(--color-text-muted)]">
          This route is reserved for later checkout and onboarding callbacks.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/">Back home</ButtonLink>
        </div>
      </Panel>
    </main>
  );
}
