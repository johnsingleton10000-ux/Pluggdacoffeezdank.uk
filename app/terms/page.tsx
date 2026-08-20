import Link from "next/link";
import { Panel } from "@/components/ui/Panel";
import { site } from "@/lib/config/site";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Panel>
        <h1 className="font-display text-4xl uppercase">Terms</h1>
        <p className="mt-4 text-muted">
          {site.name} / {site.legalName} is an independent brand website. Adults only. Product availability,
          compliance and legal status must be checked before sale. Nothing on this site is medical advice.
        </p>
        <Link href="/" className="mt-6 inline-flex min-h-touch items-center text-gold">
          Back home
        </Link>
      </Panel>
    </main>
  );
}
