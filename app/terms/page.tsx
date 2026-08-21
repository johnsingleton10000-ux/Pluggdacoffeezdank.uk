import { ButtonLink } from "@/components/ui/ButtonLink";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="estate-title text-5xl">Terms</h1>
      <p className="mt-4 text-muted">DCBD / Da Cofeez Dank is an independent brand website. Adults only. Product availability, compliance and legal status must be checked before sale. Nothing on this site is medical advice. Card rewards have no cash value.</p>
      <ButtonLink href="/" variant="ghost" className="mt-6">Back home</ButtonLink>
    </main>
  );
}
