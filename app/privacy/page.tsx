import Link from "next/link";
import { Panel } from "@/components/ui/Panel";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Panel>
        <h1 className="font-display text-4xl uppercase">Privacy</h1>
        <p className="mt-4 text-muted">
          This foundation site does not collect payment details in the browser. When authentication is enabled,
          account data is stored in Supabase under row-level security. Do not share sensitive medical or financial
          information through WhatsApp or email enquiry links.
        </p>
        <Link href="/" className="mt-6 inline-flex min-h-touch items-center text-gold">
          Back home
        </Link>
      </Panel>
    </main>
  );
}
