"use client";

import { useState } from "react";

const phone = "447763383729";
const email = "johnsingleton10000@gmail.com";

const cards = [
  { name: "Blueberry Slush", label: "Special Edition", image: "/images/blueberry-slush-card.svg", emoji: "🫐" },
  { name: "Wedding Cake Reserve", label: "Founder Drop", image: "/images/wedding-cake-card.svg", emoji: "🍰" },
  { name: "Temple Ball Reserve", label: "Legendary", image: "/images/temple-ball-card.svg", emoji: "🟤" },
  { name: "Danish Crumble", label: "Rare Card", image: "/images/danish-crumble-card.svg", emoji: "💎" },
];

function CardImage({ card }) {
  const [broken, setBroken] = useState(false);
  return (
    <div className="relative h-80 overflow-hidden rounded-[2rem] border border-white/10 bg-black card-glow">
      {!broken && <img src={card.image} alt={`${card.name} artwork`} onError={() => setBroken(true)} className="absolute inset-0 h-full w-full object-cover" />}
      {broken && <div className="absolute inset-0 flex items-center justify-center text-7xl">{card.emoji}</div>}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-xs font-black uppercase tracking-[0.35em] text-orange-300">{card.label}</p>
        <h3 className="mt-2 text-3xl font-black uppercase leading-none">{card.name}</h3>
      </div>
    </div>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return (
      <main className="min-h-screen bg-[#050505] text-[#F8F5F0] overflow-hidden">
        <section className="min-h-screen flex items-center justify-center px-5 py-16 bg-black grit-bg">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative min-h-[470px] rounded-[2rem] border border-white/10 bg-gradient-to-br from-orange-500/40 via-purple-600/30 to-black card-glow overflow-hidden">
              <div className="absolute inset-0 grit-bg opacity-70" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <p className="text-orange-300 tracking-[0.4em] uppercase font-black text-sm">18GATE</p>
                <h2 className="mt-5 text-6xl md:text-8xl font-black uppercase leading-none">Adult Entry</h2>
                <p className="mt-6 max-w-lg text-zinc-300">DCBD artwork gallery, founder story and adult-only brand universe.</p>
              </div>
            </div>
            <div className="rounded-[2rem] border border-orange-500/30 bg-black/80 p-8 md:p-12 card-glow backdrop-blur-xl">
              <p className="text-orange-400 tracking-[0.4em] uppercase font-black text-sm">18+ Entry • DCBD Universe</p>
              <h1 className="mt-5 text-5xl md:text-7xl font-black uppercase leading-none">Pluggd Coffee & Dank</h1>
              <p className="mt-6 text-zinc-300 text-lg md:text-2xl max-w-3xl">Manchester grit, Amsterdam lounge energy, collectible artwork cards and The Individual Cannabinoid Revolution.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button onClick={() => setEntered(true)} className="rounded-full bg-orange-500 px-8 py-4 text-black font-black uppercase hover:bg-orange-400 transition">I Am 18+ Enter</button>
                <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-purple-400 bg-purple-500/10 px-8 py-4 font-black uppercase text-center">WhatsApp</a>
              </div>
              <p className="mt-6 text-xs text-zinc-500">18+ only. Responsible information only. No medical claims.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#F8F5F0] overflow-hidden">
      <nav className="sticky top-0 z-50 bg-black/85 backdrop-blur border-b border-white/10 px-5 py-4 flex items-center justify-between">
        <a href="#top" className="font-black tracking-widest uppercase">DCBD</a>
        <div className="hidden md:flex gap-6 text-sm uppercase text-zinc-300 font-bold">
          <a href="#story">Story</a>
          <a href="#gallery">Gallery</a>
          <a href="/catalog" className="text-lime-400">Catalog</a>
          <a href="#membership">Membership</a>
          <a href="#contact">Contact</a>
        </div>
        <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-500 px-4 py-2 text-black font-black">WhatsApp</a>
      </nav>

      <section id="top" className="min-h-[92vh] flex items-center px-5 py-20 bg-black grit-bg">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-orange-400 tracking-[0.35em] uppercase font-black text-sm">Manchester Grit × Amsterdam Lounge</p>
            <h1 className="mt-5 text-6xl md:text-8xl font-black uppercase leading-none">Pluggd Coffee <br />& Dank</h1>
            <p className="mt-7 text-zinc-300 text-xl md:text-2xl max-w-3xl">More than a plain website. Every card is education, every artwork has a story, and every visitor enters the DCBD universe.</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a href="#gallery" className="rounded-full bg-orange-500 px-8 py-4 text-black font-black uppercase text-center">View Artwork</a>
              <a href="#story" className="rounded-full border border-white/20 bg-white/5 px-8 py-4 font-black uppercase text-center">Read The Story</a>
            </div>
          </div>
          <div className="relative min-h-[470px] rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-600/40 via-orange-500/30 to-black card-glow overflow-hidden">
            <div className="absolute inset-0 grit-bg opacity-70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <p className="text-orange-300 uppercase tracking-[0.4em] font-black">Hero Visual</p>
              <h2 className="mt-4 text-5xl md:text-7xl font-black uppercase">DCBD Universe</h2>
              <p className="mt-5 max-w-lg text-zinc-300">Built from founder story, community energy and collectible card-style artwork.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="story" className="px-5 py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-800 via-purple-950 to-black p-8 card-glow">
            <p className="text-yellow-400 uppercase tracking-[0.3em] font-bold">Founder Story</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase">CastroPlugger</h2>
            <p className="mt-6 text-zinc-300 text-lg">Born from real life, pain, long nights, learning and the drive to build something different — not another faceless site.</p>
          </div>
          <div>
            <p className="text-yellow-400 uppercase tracking-[0.3em] font-bold">The Original Route</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase leading-tight">From Story To Card To Community</h2>
            <p className="mt-6 text-zinc-300 text-lg">DCBD turns information into artwork. Every card has a style, rarity, story direction and responsible adult-only wording.</p>
          </div>
        </div>
      </section>

      <section id="gallery" className="px-5 py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <p className="text-yellow-400 uppercase tracking-[0.3em] font-bold">Integrated Artwork</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase">The Card Wall</h2>
          <p className="mt-5 text-zinc-400 max-w-3xl">These images are now committed inside the repo at public/images, so Vercel can deploy them with the site.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card) => <CardImage key={card.name} card={card} />)}
          </div>
          <div className="mt-10">
            <a href="/catalog" className="inline-flex rounded-full bg-gradient-to-r from-orange-500 via-lime-400 to-purple-500 px-8 py-4 text-black font-black uppercase tracking-wide">Open The Flip Three Catalog →</a>
          </div>
        </div>
      </section>

      <section id="membership" className="px-5 py-24 bg-[#080808]">
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-orange-400/30 bg-black/80 p-8 md:p-12 card-glow">
          <p className="text-orange-400 uppercase tracking-[0.3em] font-bold">Private Member Access</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase">DCBD Inner Circle</h2>
          <p className="mt-5 text-zinc-300 max-w-3xl">Members help influence artwork, community direction and future DCBD universe updates.</p>
        </div>
      </section>

      <section id="contact" className="px-5 py-24 bg-[#050505] grit-bg">
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-white/10 bg-black/80 p-8 md:p-12 card-glow">
          <p className="text-orange-400 uppercase tracking-[0.35em] font-black">Contact & Direct Service</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase leading-tight">Talk To ElCastroPlugged</h2>
          <p className="mt-6 text-zinc-300 text-lg max-w-3xl">Direct support, clear communication and personal service.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a href={`https://wa.me/${phone}?text=Hi%20ElCastroPlugged,%20I'd%20like%20to%20talk.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-green-500 px-8 py-4 text-black font-black uppercase tracking-wide">WhatsApp</a>
            <a href={`mailto:${email}?subject=DCBD%20Enquiry`} className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-white font-black uppercase tracking-wide">Email The Team</a>
          </div>
          <p className="mt-5 text-sm text-zinc-500">18+ only. General information only and not medical advice.</p>
        </div>
      </section>
    </main>
  );
}
