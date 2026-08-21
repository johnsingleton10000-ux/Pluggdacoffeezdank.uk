import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div>
        <p className="graffiti text-6xl">404</p>
        <p className="mt-4 text-muted">This corner of the Estate does not exist yet.</p>
        <ButtonLink href="/" variant="pink" className="mt-8">Back home</ButtonLink>
      </div>
    </main>
  );
}
