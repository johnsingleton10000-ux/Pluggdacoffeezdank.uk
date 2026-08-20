import { Panel } from "@/components/ui/Panel";
import { site, whatsappUrl } from "@/lib/config/site";

const items = [
  ["CBD", "Cannabidiol", "A well-known non-intoxicating hemp cannabinoid. Educational information only."],
  ["CBG", "Cannabigerol", "Often called a mother cannabinoid because many cannabinoids begin from CBG."],
  ["CBN", "Cannabinol", "A naturally occurring cannabinoid that develops as cannabinoids age."],
  ["THCA", "Raw plant compound", "A raw compound that is chemically different from THC in raw form."],
  ["THCP", "Newer cannabinoid", "A rare cannabinoid with developing research. Use caution and check current rules."],
  ["H4 CBD", "Emerging category", "An emerging cannabinoid category with developing research."],
] as const;

export default function EducationPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">Knowledge over hype</p>
      <h1 className="mt-3 font-display text-4xl uppercase leading-none sm:text-6xl">
        The individual cannabinoid revolution
      </h1>
      <p className="mt-5 max-w-2xl text-muted">
        This page keeps the existing education content. It is not medical advice and makes no medical claims.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(([name, full, text]) => (
          <Panel key={name}>
            <p className="font-display text-4xl uppercase text-gold">{name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">{full}</p>
            <p className="mt-4 text-sm text-muted">{text}</p>
          </Panel>
        ))}
      </div>
      <Panel className="mt-8">
        <h2 className="font-display text-3xl uppercase">Safe. Secure. Responsible.</h2>
        <p className="mt-3 text-muted">
          Clear labels, 18+ access and no medical promises. Talk to {site.contact.founderHandle} for range questions.
        </p>
        <a
          className="mt-5 inline-flex min-h-touch items-center font-display uppercase text-gold"
          href={whatsappUrl(`Hi ${site.contact.founderHandle}, I'd like to ask about the cannabinoid range.`)}
        >
          WhatsApp the team
        </a>
      </Panel>
    </main>
  );
}
