import { ButtonLink } from "@/components/ui/ButtonLink";
import { Panel } from "@/components/ui/Panel";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Panel>
        <h1 className="display text-5xl">Privacy</h1>
        <p className="mt-4 text-[var(--color-text-muted)]">
          This foundation site does not collect payment details. If Supabase authentication is enabled,
          account emails are stored by the configured auth provider. Do not share sensitive medical or
          financial information through contact channels.
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
