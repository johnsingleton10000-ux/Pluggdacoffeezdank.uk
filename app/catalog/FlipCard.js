import CardArtwork from './CardArtwork';
import { TIERS } from './catalogData';

function Lock() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/50 py-3">
      <span className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-zinc-400">{label}</span>
      <span className="mt-1 text-3xl font-black leading-none tabular-nums" style={{ color }}>{value}</span>
    </div>
  );
}

export default function FlipCard({ card, total }) {
  const tier = TIERS[card.tier];
  const pageNo = String(card.no).padStart(2, '0');

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-[2rem] border ${tier.ring} bg-gradient-to-br from-zinc-950 via-black to-black card-glow`}
    >
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <span className="text-[0.62rem] font-black uppercase tracking-[0.3em] text-zinc-500">
          Page {pageNo} / {String(total).padStart(2, '0')}
        </span>
        <span
          className="rounded-full border px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.28em]"
          style={{ color: tier.accent, borderColor: `${tier.accent}66`, backgroundColor: `${tier.accent}14` }}
        >
          {tier.label}
        </span>
      </div>

      <div className="relative mx-5 aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
        <CardArtwork
          uid={card.id}
          name={card.name}
          tierLabel={tier.label}
          colorA={card.art.colorA}
          colorB={card.art.colorB}
          motif={card.art.motif}
          className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.2em] text-white backdrop-blur">
          Grade {tier.grade}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.62rem] font-black uppercase tracking-[0.3em]" style={{ color: tier.accent }}>
          {card.category}
        </p>
        <h3 className="mt-1 text-2xl font-black uppercase leading-none">{card.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300">{card.description}</p>

        <div className="mt-4">
          <p className="text-[0.6rem] font-black uppercase tracking-[0.28em] text-zinc-500">Flavour / Terpene Profile</p>
          <p className="mt-1 text-sm italic text-zinc-200">{card.flavour}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {card.characteristics.map((c) => (
            <span key={c} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.66rem] font-bold uppercase tracking-wider text-zinc-300">
              {c}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <div className="grid grid-cols-3 gap-2">
            <Stat label="Attack" value={card.attack} color="#fb7185" />
            <Stat label="Defense" value={card.defense} color="#38bdf8" />
            <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-amber-400/30 bg-amber-400/[0.06] py-3">
              <span className="flex items-center gap-1 text-[0.6rem] font-black uppercase tracking-[0.22em] text-amber-300">
                <Lock /> Ability
              </span>
              <span className="mt-1 select-none text-base font-black uppercase leading-none text-amber-100/90 blur-[5px]" aria-hidden="true">
                {card.ability.name}
              </span>
              <span className="mt-1 text-[0.5rem] font-bold uppercase tracking-[0.15em] text-amber-300/70">Locked</span>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-2xl border border-amber-400/20 bg-black/40 px-4 py-3">
            <span className="mt-0.5 text-amber-300"><Lock /></span>
            <p className="text-[0.72rem] leading-snug text-amber-100/80">
              <span className="font-black uppercase tracking-wider text-amber-300">Hidden Ability</span>{' '}
              — {card.ability.hint} Unlocks when the{' '}
              <span className="font-black text-amber-200">Flip Three</span> game system goes live.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
