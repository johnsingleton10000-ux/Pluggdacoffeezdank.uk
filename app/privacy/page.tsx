import { ButtonLink } from "@/components/ui/ButtonLink";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="estate-title text-5xl">Privacy</h1>
      <p className="mt-4 text-muted">This starter website does not collect payment details in the browser. Customer enquiries are sent through WhatsApp or Stripe-hosted checkout. Do not share sensitive medical or financial information through community posts.</p>
      <ButtonLink href="/" variant="ghost" className="mt-6">Back home</ButtonLink>
    </main>
  );
}
