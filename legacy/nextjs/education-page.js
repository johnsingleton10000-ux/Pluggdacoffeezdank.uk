const phone = '447763383729';
const email = 'johnsingleton10000@gmail.com';

const items = [
  ['CBD', 'Cannabidiol', 'A well-known non-intoxicating hemp cannabinoid. Educational information only.'],
  ['CBG', 'Cannabigerol', 'Often called a mother cannabinoid because many cannabinoids begin from CBG.'],
  ['CBN', 'Cannabinol', 'A naturally occurring cannabinoid that develops as cannabinoids age.'],
  ['THCA', 'Raw plant compound', 'A raw compound that is chemically different from THC in raw form.'],
  ['THCP', 'Newer cannabinoid', 'A rare cannabinoid with developing research. Use caution and check current rules.'],
  ['H4 CBD', 'Emerging category', 'An emerging cannabinoid category with developing research.']
];

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <section className="px-5 py-20 grit-bg">
        <div className="max-w-7xl mx-auto">
          <nav className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-14">
            <a href="/" className="text-3xl font-black text-lime-400">DCBD</a>
            <div className="flex flex-wrap gap-5 text-sm uppercase tracking-widest text-zinc-300">
              <a href="/#story">Story</a><a href="/education" className="text-lime-400">Education</a><a href="/#products">Products</a><a href="/#checkout">Checkout</a>
            </div>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div><p className="text-purple-300 uppercase tracking-[0.35em] font-black">Knowledge Over Hype</p><h1 className="mt-5 text-5xl md:text-7xl font-black uppercase leading-none">The Individual <span className="text-lime-400">Cannabinoid</span> Revolution</h1><p className="mt-6 text-zinc-300 text-lg max-w-2xl">Most people hear one word and stop there. This page explains the wider cannabinoid family with responsible, education-first wording.</p></div>
            <div className="rounded-[2rem] border border-lime-400/30 bg-black/70 p-8 card-glow"><h2 className="text-3xl font-black uppercase">Safe. Secure. Responsible.</h2><p className="mt-4 text-zinc-300">Clear labels, lab-focused information, 18+ access, transparent contact and no medical promises.</p></div>
          </div>
          <section className="mt-20"><h2 className="text-center text-3xl md:text-5xl font-black uppercase">The Cannabinoids We Discuss</h2><div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">{items.map(([name, full, text]) => <div key={name} className="rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-zinc-950 to-black p-6 card-glow"><div className="h-32 rounded-2xl border border-lime-400/30 bg-lime-400/10 flex items-center justify-center"><div className="text-center"><p className="text-5xl font-black">{name}</p><p className="text-xs text-zinc-400 uppercase tracking-widest">{full}</p></div></div><p className="mt-5 text-zinc-300">{text}</p><p className="mt-5 text-sm text-zinc-500">Educational information only. No medical claims.</p></div>)}</div></section>
          <section className="mt-20 grid lg:grid-cols-2 gap-6"><div className="rounded-[2rem] border border-yellow-400/30 bg-yellow-400/5 p-8"><h2 className="text-4xl font-black uppercase text-yellow-300">CBD Concentrate</h2><p className="mt-5 text-zinc-300">CBD concentrate may be chosen by people interested in a non-intoxicating hemp-derived option as part of a personal lifestyle routine. Individual experiences vary.</p></div><div className="rounded-[2rem] border border-purple-400/30 bg-purple-500/5 p-8"><h2 className="text-4xl font-black uppercase text-purple-300">Transparency Matters</h2><p className="mt-5 text-zinc-300">Clear lab information, responsible labelling, traceable sourcing and honest communication matter.</p><a href={`https://wa.me/${phone}?text=Hi%20ElCastroPlugged,%20I'd%20like%20to%20ask%20about%20the%20cannabinoid%20range.`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-lime-400 via-yellow-400 to-purple-500 px-8 py-4 text-black font-black uppercase">Talk To ElCastroPlugged</a></div></section>
          <footer className="mt-20 border-t border-white/10 pt-8 text-sm text-zinc-500 flex flex-col md:flex-row gap-4 justify-between"><p>18+ only. Educational purposes only. No medical claims.</p><p>WhatsApp: 07763 383729 • Email: {email}</p></footer>
        </div>
      </section>
    </main>
  );
}
