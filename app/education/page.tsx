const phone = "447763383729";
const email = "johnsingleton10000@gmail.com";

const items = [
  ["CBD", "Cannabidiol", "A well-known non-intoxicating hemp cannabinoid. Educational information only."],
  ["CBG", "Cannabigerol", "Often called a mother cannabinoid because many cannabinoids begin from CBG."],
  ["CBN", "Cannabinol", "A naturally occurring cannabinoid that develops as cannabinoids age."],
  ["THCA", "Raw plant compound", "A raw compound that is chemically different from THC in raw form."],
  ["THCP", "Newer cannabinoid", "A rare cannabinoid with developing research. Use caution and check current rules."],
  ["H4 CBD", "Emerging category", "An emerging cannabinoid category with developing research."],
];

export default function EducationPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-purple-neon">Knowledge over hype</p>
      <h1 className="display mt-3 text-5xl sm:text-7xl">The Individual <span className="text-lime">Cannabinoid</span> Revolution</h1>
      <p className="mt-4 max-w-2xl text-muted">Most people hear one word and stop there. This page explains the wider cannabinoid family with responsible, education-first wording.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(([name, full, text]) => (
          <article key={name} className="gold-frame rounded-2xl p-5">
            <p className="display text-4xl text-lime">{name}</p>
            <p className="text-xs uppercase tracking-widest text-muted">{full}</p>
            <p className="mt-3 text-sm text-muted">{text}</p>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">18+ only. Educational purposes only. No medical claims. WhatsApp: {phone} · {email}</p>
    </main>
  );
}
