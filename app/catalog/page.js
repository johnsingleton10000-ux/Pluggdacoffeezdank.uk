import FlipCard from './FlipCard';
import { CATALOG } from './catalogData';

const phone = '447763383729';
const email = 'johnsingleton10000@gmail.com';

export const metadata = {
  title: 'DCBD Premium Catalog — Flip Three Collectible Cards',
  description:
    'A 20-page premium DCBD collectible catalog. Every product is a catalogue item, a collectible card and a future Flip Three game asset with Attack, Defense and a hidden ability.',
};

export default function CatalogPage() {
  const total = CATALOG.length;

  return (
    <main className="min-h-screen bg-[#050505] text-[#F8F5F0] overflow-hidden">
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/85 px-5 py-4 backdrop-blur">
        <a href="/" className="text-2xl font-black uppercase tracking-widest text-lime-400">DCBD</a>
        <div className="hidden gap-6 text-sm font-bold uppercase tracking-widest text-zinc-300 md:flex">
          <a href="/#story">Story</a>
          <a href="/catalog" className="text-lime-400">Catalog</a>
          <a href="/education">Education</a>
          <a href="/#products">Products</a>
        </div>
        <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-500 px-4 py-2 font-black text-black">WhatsApp</a>
      </nav>

      <section className="grit-bg px-5 pb-16 pt-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-black uppercase tracking-[0.4em] text-orange-400">Premium Collectible Catalog</p>
          <h1 className="mt-5 text-5xl font-black uppercase leading-none md:text-8xl">
            The DCBD <span className="text-lime-400">Flip Three</span> Vault
          </h1>
          <p className="mt-7 max-w-3xl text-lg text-zinc-300 md:text-2xl">
            A 20-page premium catalog where every product is engineered from the start as a collectible card and a
            future Flip Three game asset. Each card carries <span className="font-black text-rose-300">Attack</span>,{' '}
            <span className="font-black text-sky-300">Defense</span> and a{' '}
            <span className="font-black text-amber-300">hidden ability</span> waiting to be unlocked.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-rose-400/30 bg-rose-500/[0.06] p-5">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-rose-300">Attack</p>
              <p className="mt-2 text-sm text-zinc-300">Offensive strength — how decisively a card can strike in a Flip Three round.</p>
            </div>
            <div className="rounded-[1.5rem] border border-sky-400/30 bg-sky-500/[0.06] p-5">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-300">Defense</p>
              <p className="mt-2 text-sm text-zinc-300">Defensive strength — how well a card withstands an opponent's attack.</p>
            </div>
            <div className="rounded-[1.5rem] border border-amber-400/30 bg-amber-500/[0.06] p-5">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-amber-300">Hidden Ability</p>
              <p className="mt-2 text-sm text-zinc-300">A small, mysterious power — concealed now, activated later through Flip Three.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-black/50 p-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm text-zinc-300">
              <span className="font-black uppercase tracking-wider text-lime-400">Store → Flip Three:</span> qualifying
              physical orders mint digital cards into circulation — a reward event feeds new cards straight into your
              collection and holster.
            </p>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-3xl font-black text-lime-400">£50</p>
                <p className="text-xs uppercase tracking-widest text-zinc-500">8 cards</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-lime-400">£100</p>
                <p className="text-xs uppercase tracking-widest text-zinc-500">22 cards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CATALOG.map((card) => (
              <FlipCard key={card.id} card={card} total={total} />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-zinc-500 md:flex-row">
          <p>18+ only. Collectible artwork and game concept. General information only — no medical claims.</p>
          <p>WhatsApp: 07763 383729 • Email: {email}</p>
        </div>
      </footer>
    </main>
  );
}
