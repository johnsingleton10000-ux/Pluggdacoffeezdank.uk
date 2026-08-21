import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-4">
      <section className="text-center">
        <h1 className="graffiti-title text-6xl">Lost in the alley</h1>
        <p className="mt-3 text-muted">That page is not on the Estate map.</p>
        <ButtonLink href="/" variant="gold" className="mt-6">Return Home</ButtonLink>
      </section>
    </main>
  );
}
