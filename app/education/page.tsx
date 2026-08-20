import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Panel } from "@/components/ui/Panel";

const ITEMS: Array<[string, string, string]> = [
  ["CBD", "Cannabidiol", "A well-known non-intoxicating hemp cannabinoid. Educational information only."],
  ["CBG", "Cannabigerol", "Often called a mother cannabinoid because many cannabinoids begin from CBG."],
  ["CBN", "Cannabinol", "A naturally occurring cannabinoid that develops as cannabinoids age."],
  ["THCA", "Raw plant compound", "A raw compound that is chemically different from THC in raw form."],
  ["THCP", "Newer cannabinoid", "A rare cannabinoid with developing research. Use caution and check current rules."],
  ["H4 CBD", "Emerging category", "An emerging cannabinoid category with developing research."],
];

export default function EducationPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <Badge tone="purple">Knowledge over hype</Badge>
      <h1 className="display mt-4 text-5xl sm:text-7xl">
        The Individual Cannabinoid Revolution
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--color-text-muted)]">
        This existing education page is preserved. It is not medical advice.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(([name, full, text]) => (
          <Panel key={name}>
            <p className="display text-4xl">{name}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]">{full}</p>
            <p className="mt-4 text-[var(--color-text-muted)]">{text}</p>
          </Panel>
        ))}
      </div>
      <div className="mt-10">
        <ButtonLink href="/" variant="ghost">
          Back home
        </ButtonLink>
      </div>
    </main>
  );
}
