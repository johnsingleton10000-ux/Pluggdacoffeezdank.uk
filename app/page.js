"use client";

import { useState } from "react";

const phone = "447763383729";
const email = "johnsingleton10000@gmail.com";

const products = [
  {
    name: "Blueberry Slush",
    type: "Herbal Tea Collectible",
    price: "From £30",
    rarity: "Special Edition",
    emoji: "🫐",
    gradient: "from-blue-500/40 via-purple-500/30 to-black",
  },
  {
    name: "Wedding Cake Reserve",
    type: "Lab-Tested Collection",
    price: "From £35",
    rarity: "Founder Drop",
    emoji: "🍰",
    gradient: "from-orange-500/40 via-amber-300/20 to-black",
  },
  {
    name: "Temple Ball Reserve",
    type: "Classic Collection",
    price: "From £40",
    rarity: "Legendary",
    emoji: "🟤",
    gradient: "from-yellow-700/50 via-orange-500/20 to-black",
  },
  {
    name: "Danish Crumble",
    type: "87% Card Series",
    price: "From £35",
    rarity: "Rare Card",
    emoji: "💎",
    gradient: "from-cyan-400/40 via-purple-500/30 to-black",
  },
];

const steps = [
  ["Story", "Real life, pain, learning, curiosity and a shop born with a voice."],
  ["Education", "The Individual Cannabinoid Revolution without hype or medical claims."],
  ["Card", "Every product becomes collectible artwork, not a plain shop tile."],
  ["Product", "Clear pricing, direct service and adult-only compliant wording."],
  ["Membership", "Inner Circle members help shape flavours, artwork and game direction."],
  ["Checkout", "WhatsApp, email, card payments and bank transfer support."],
];

function ArtPanel({ label, title, emoji, gradient = "from-orange-500/40 via-purple-500/30 to-black", large = false }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${gradient} ${large ? "min-h-[470px]" : "h-72"} card-glow`}>
      <div className="absolute inset-0 grit-bg opacity-60" />
      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-purple-600/25 blur-3xl" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <span className={`${large ? "text-8xl" : "text-6xl"}`}>{emoji}</span>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.35em] text-orange-300">{label}</p>
        <h3 className={`${large ? "text-4xl md:text-6xl" : "text-3xl"} mt-3 font-black uppercase leading-none`}>{title}</h3>
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
            <ArtPanel large label="18GATE" title="Adult Entry" emoji="🔞" gradient="from-orange-500/40 via-purple-600/30 to-black" />
            <div className="rounded-[2rem] border border-orange-500/30 bg-black/80 p-8 md:p-12 card-glow backdrop-blur-xl">
              <p className="text-orange-400 tracking-[0.4em] uppercase font-black text-sm">18+ Entry • DCBD Universe</p>
              <h1 className="mt-5 text-5xl md:text-7xl font-black uppercase leading-none">Pluggd Coffee & Dank</h1>
              <p className="mt-6 text-zinc-300 text-lg md:text-2xl max-w-3xl">The Individual Cannabinoid Revolution: education, collectible product cards, direct service and a future community universe built from the ground up.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button onClick={() => setEntered(true)} className="rounded-full bg-orange-500 px-8 py-4 text-black font-black uppercase hover:bg-orange-400 transition">I Am 18+ Enter</button>
                <a href={`https://wa.me/${phone}?text=Hi%20ElCastroPlugged,%20I'd%20like%20to%20talk.`} target="_blank" rel="noopener noreferrer" className="rounded-full border border-purple-400 bg-purple-500/10 px-8 py-4 font-black uppercase text-center">WhatsApp</a>
              </div>
              <p className="mt-6 text-xs text-zinc-500">18+ only. No medical claims. Product details must remain compliant and lab-focused.</p>
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
          <a href="#education">Education</a>
          <a href="#products">Products</a>
          <a href="#membership">Membership</a>
        </div>
        <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-500 px-4 py-2 text-black font-black">WhatsApp</a>
      </nav>

      <section id="top" className="min-h-[92vh] flex items-center px-5 py-20 bg-black grit-bg">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-orange-400 tracking-[0.35em] uppercase font-black text-sm">Manchester Grit × Amsterdam Lounge</p>
            <h1 className="mt-5 text-6xl md:text-8xl font-black uppercase leading-none">Pluggd Coffee <br />& Dank</h1>
            <p className="mt-7 text-zinc-300 text-xl md:text-2xl max-w-3xl">More than a checkout. Every product is education, every drop is a collectible, and every customer becomes part of the DCBD universe.</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a href="#products" className="rounded-full bg-orange-500 px-8 py-4 text-black font-black uppercase text-center">Shop Collection</a>
              <a href="#story" className="rounded-full border border-white/20 bg-white/5 px-8 py-4 font-black uppercase text-center">Read The Story</a>
            </div>
          </div>
          <ArtPanel large label="Hero Visual" title="DCBD Universe" emoji="☕" gradient="from-purple-600/40 via-orange-500/30 to-black" />
        </div>
      </section>

      <section id="story" className="px-5 py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <ArtPanel label="Founder Story" title="CastroPlugger" emoji="♿" gradient="from-zinc-700/40 via-purple-500/20 to-black" />
          <div>
            <p className="text-yellow-400 uppercase tracking-[0.3em] font-bold">The Original Route</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase leading-tight">From Story To Card To Product</h2>
            <p className="mt-6 text-zinc-300 text-lg">DCBD was born from real life: long nights, rehabilitation, curiosity and a need for education over hype. Every product starts with a story. Every story becomes artwork. Every artwork becomes a card. Every card becomes part of the wider DCBD universe.</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-400 uppercase tracking-[0.3em] font-bold">The Six-Part Website</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase">The Journey</h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map(([title, text], i) => (
              <div key={title} className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-6 hover:border-orange-500/40 transition">
                <p className="text-orange-400 font-black text-sm tracking-widest">0{i + 1}</p>
                <h3 className="mt-3 text-2xl font-black uppercase">{title}</h3>
                <p className="mt-3 text-zinc-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="px-5 py-24 bg-[#070707] grit-bg">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-purple-300 uppercase tracking-[0.3em] font-bold">Knowledge Over Hype</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase leading-tight">Individual Cannabinoid Revolution</h2>
            <p className="mt-6 text-zinc-300 text-lg">Most people hear one word and stop there. The wider hemp plant contains a family of cannabinoids and plant compounds. We keep the language responsible: no medical promises, no fake guarantees, just education and transparency.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {["Lab-focused", "Clear labels", "18+ only", "No medical claims"].map((x) => (
              <div key={x} className="rounded-2xl border border-orange-400/30 bg-orange-400/10 p-5"><p className="text-orange-300 font-black uppercase">{x}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="px-5 py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <p className="text-yellow-400 uppercase tracking-[0.3em] font-bold">Collectible Product Cards</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase">The Menu Wall</h2>
          <p className="mt-5 text-zinc-400 max-w-3xl">Product pages are built like collectible cards with rarity, artwork, story, education and direct WhatsApp ordering while the full checkout grows.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <div key={product.name} className="rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-zinc-950 to-black p-5 card-glow hover:border-orange-500/50 transition">
                <ArtPanel label={product.rarity} title={product.name} emoji={product.emoji} gradient={product.gradient} />
                <p className="mt-5 text-sm text-orange-400 uppercase tracking-widest font-bold">{product.type}</p>
                <h3 className="mt-2 text-2xl font-black">{product.name}</h3>
                <p className="mt-2 text-yellow-300 font-black">{product.price}</p>
                <p className="mt-3 text-sm text-zinc-400">Education-first product card. Lab information should be checked before ordering.</p>
                <a href={`https://wa.me/${phone}?text=Hi%20ElCastroPlugged,%20I'd%20like%20to%20order%20${encodeURIComponent(product.name)}.`} target="_blank" rel="noopener noreferrer" className="mt-5 block text-center rounded-full bg-purple-600 py-3 font-black uppercase">Order</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="membership" className="px-5 py-24 bg-[#080808]">
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-orange-400/30 bg-black/80 p-8 md:p-12 card-glow">
          <p className="text-orange-400 uppercase tracking-[0.3em] font-bold">Private Member Access</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase">DCBD Inner Circle</h2>
          <p className="mt-5 text-zinc-300 max-w-3xl">Members help influence flavours, artwork, product direction and the future game universe as the shop grows from an infant idea into a long-term movement.</p>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-yellow-400/30 bg-yellow-400/5 p-6"><h3 className="text-2xl font-black">Founder Entry</h3><p className="mt-3 text-6xl font-black">£25</p><p className="mt-4 text-zinc-300">Includes a discount voucher and Inner Circle access.</p></div>
            <div className="rounded-3xl border border-purple-400/30 bg-purple-500/5 p-6"><h3 className="text-2xl font-black">Then Monthly</h3><p className="mt-3 text-6xl font-black">£9.99</p><p className="mt-4 text-zinc-300">Stay inside the private group and help shape drops, artwork and the future universe.</p></div>
          </div>
          <a href={`https://wa.me/${phone}?text=Hi%20ElCastroPlugged,%20I'd%20like%20to%20join%20the%20DCBD%20Inner%20Circle.`} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex rounded-full bg-gradient-to-r from-orange-500 via-yellow-400 to-purple-500 px-8 py-4 text-black font-black uppercase">Join Inner Circle</a>
        </div>
      </section>

      <section id="checkout" className="px-5 py-24 bg-[#050505] grit-bg">
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-white/10 bg-black/80 p-8 md:p-12 card-glow">
          <p className="text-orange-400 uppercase tracking-[0.35em] font-black">Checkout & Direct Service</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black uppercase leading-tight">Talk To ElCastroPlugged</h2>
          <p className="mt-6 text-zinc-300 text-lg max-w-3xl">This is not a faceless checkout. It is direct support, clear communication and personal service from order to door.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a href={`https://wa.me/${phone}?text=Hi%20ElCastroPlugged,%20I'd%20like%20to%20place%20an%20order.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-green-500 px-8 py-4 text-black font-black uppercase tracking-wide">WhatsApp Order</a>
            <a href={`mailto:${email}?subject=DCBD%20Order%20Enquiry`} className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-white font-black uppercase tracking-wide">Email The Team</a>
          </div>
          <p className="mt-5 text-sm text-zinc-500">18+ only. Product information is general information only and is not medical advice. We do not make medical claims.</p>
        </div>
      </section>
    </main>
  );
}
