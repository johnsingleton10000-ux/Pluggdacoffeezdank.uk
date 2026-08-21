import { SITE } from "@/config/site";
import { waLink } from "@/utils/format";

const ITEMS = [
  ["CBD", "Cannabidiol", "A well-known non-intoxicating hemp cannabinoid. Educational information only."],
  ["CBG", "Cannabigerol", "Often called a mother cannabinoid because many cannabinoids begin from CBG."],
  ["CBN", "Cannabinol", "A naturally occurring cannabinoid that develops as cannabinoids age."],
  ["THCA", "Raw plant compound", "A raw compound that is chemically different from THC in raw form."],
] as const;

export default function EducationPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-neon">Knowledge over hype</p>
      <h1 className="display mt-4 text-6xl">The Individual Cannabinoid Revolution</h1>
      <p className="mt-4 max-w-2xl text-muted">Responsible, education-first wording. No medical claims.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {ITEMS.map(([name, full, text]) => (
          <article key={name} className="rounded-2xl border border-white/10 bg-black/50 p-6">
            <h2 className="font-display text-4xl">{name}</h2>
            <p className="text-xs uppercase tracking-[0.16em] text-gold">{full}</p>
            <p className="mt-4 text-muted">{text}</p>
          </article>
        ))}
      </div>
      <a href={waLink(SITE.whatsapp, "Hi ElCastroPlugged, I'd like to ask about the cannabinoid range.")} className="mt-10 inline-flex min-h-touch rounded-xl bg-green-neon px-6 py-3 font-black uppercase text-black">
        Talk to ElCastroPlugged
      </a>
    </main>
  );
}
