import { ButtonLink } from "@/components/ui/ButtonLink";
import { Panel } from "@/components/ui/Panel";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Panel>
        <h1 className="display text-5xl">Terms</h1>
        <p className="mt-4 text-[var(--color-text-muted)]">
          DCBD is an independent brand ecosystem. Adults only. Product availability, compliance and legal
          status must be checked before sale. Nothing on this site is medical advice.
        </p>
        <div className="mt-8">
          <ButtonLink href="/" variant="ghost">
            Back home
          </ButtonLink>
        </div>
      </Panel>
    </main>
  );
}
