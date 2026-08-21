"use client";

import { useEffect, useMemo, useState } from "react";
import heroArt from "../assets/hero.svg";
import founderArt from "../assets/hero-founder.svg";
import membershipArt from "../assets/membership-card.svg";
import caliArt from "../assets/cali-extracts-grid.svg";
import classicsArt from "../assets/dam-classics-cards.svg";
import teaArt from "../assets/thca-herbal-teas-menu.svg";

const phone = "447763383729";
const email = "johnsingleton10000@gmail.com";
const membershipCheckout = "https://buy.stripe.com/8x2aEX4Kh3js3Li7S2cjS00";
const assetSrc = (asset) => asset?.src || asset;

const products = [
  { id: "p001", name: "Mango Kush Inspired Blend", category: "Herbal Tea", price: 24.99, color: "#f59e0b", note: "Sweet mango, citrus and smooth tropical notes." },
  { id: "p004", name: "Purple Haze Inspired Blend", category: "Herbal Tea", price: 24.99, color: "#8b5cf6", note: "Grape, berry and floral notes." },
  { id: "p002", name: "Tropic Thunder Blend", category: "Herbal Tea", price: 24.99, color: "#22c55e", note: "Pineapple, passionfruit and bright citrus." },
  { id: "p022", name: "Ketama Gold Style Tea", category: "Classic Tea", price: 16.99, color: "#c0843d", note: "Caramel, earth and nutty gold profile." },
  { id: "p027", name: "Afghan Cream Style Tea", category: "Classic Tea", price: 23.99, color: "#7c4a2d", note: "Dark chocolate, earth and creamy heritage profile." },
  { id: "p036", name: "Sunset Sherbet Art Card", category: "Collector Range", price: 35.99, color: "#fb7185", note: "Sweet berry, citrus and coastal sunset artwork." },
  { id: "p043", name: "Crystal Dream Art Card", category: "Collector Range", price: 29.99, color: "#a78bfa", note: "Clean crystal-inspired collector card style." },
  { id: "p051", name: "Black DCBD Hoodie", category: "Merch", price: 56, color: "#31313b", note: "Black hoodie concept with custom artwork placement." },
];

const cards = [
  { name: "Blueberry Slush", rarity: "Special Edition", image: "/images/blueberry-slush-card.svg" },
  { name: "Wedding Cake Reserve", rarity: "Founder Drop", image: "/images/wedding-cake-card.svg" },
  { name: "Temple Ball Reserve", rarity: "Legendary", image: "/images/temple-ball-card.svg" },
  { name: "Danish Crumble", rarity: "Rare Card", image: "/images/danish-crumble-card.svg" },
];

const questions = [
  { id: "war", title: "War question", prompt: "When the Estate goes to war, do you charge first or wait for the smoke to clear?", options: [{ label: "Charge the front line", value: "attack" }, { label: "Hold and read the room", value: "control" }, { label: "Protect the crew", value: "defence" }] },
  { id: "power", title: "Philosophy question", prompt: "Is power something you take by force, or something you grow by staying silent until the moment is perfect?", options: [{ label: "Take the moment", value: "attack" }, { label: "Build the wall", value: "defence" }, { label: "Wait, then move", value: "control" }] },
  { id: "society", title: "Society question", prompt: "In the streets of the Estate, do you believe the strong protect the weak, or does every man live by his own holster?", options: [{ label: "Strength sets the pace", value: "attack" }, { label: "Protect your own", value: "defence" }, { label: "Everybody plays a role", value: "control" }] },
];

const starterCards = [
  { name: "Estate Pressure", type: "Attack", power: 78 },
  { name: "Concrete Guard", type: "Defence", power: 64 },
  { name: "Smoke Screen", type: "Control", power: 71 },
  { name: "Street Informant", type: "Control", power: 59 },
];

function BrandMark() {
  return <a className="brand-mark" href="#home" aria-label="DCBD home"><span className="brand-crown">♛</span><span><b>DCBD</b><small>Da Coffeez Dank</small></span></a>;
}

function SectionHeading({ eyebrow, title, copy, action }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>{action}</div>;
}

function ProductCard({ product, onAdd, added }) {
  return <article className="vault-product">
    <div className="product-art" style={{ "--art": product.color }}>
      <span className="product-stamp">DCBD / VAULT</span>
      <strong>{product.name.split(" ").slice(0, 2).join(" ")}</strong>
      <em>{product.category}</em>
    </div>
    <div className="product-content">
      <span className="micro-tag">{product.category}</span>
      <h3>{product.name}</h3>
      <p>{product.note}</p>
      <div className="product-footer"><b>£{product.price.toFixed(2)}</b><span>+ card draw</span></div>
      <button className={`button button-small ${added ? "button-success" : "button-gold"}`} onClick={() => onAdd(product)}>{added ? "In My Stash" : "Add to Stash"}</button>
    </div>
  </article>;
}

function CardImage({ card }) {
  const [broken, setBroken] = useState(false);
  return <article className="collectible-card">
    {!broken && <img src={card.image} alt={`${card.name} DCBD card artwork`} onError={() => setBroken(true)} />}
    {broken && <div className="card-fallback">DCBD</div>}
    <div className="card-overlay"><span>{card.rarity}</span><h3>{card.name}</h3></div>
  </article>;
}

function Nav({ stashCount, openMenu, setOpenMenu }) {
  const links = [["SHOP", "#vault"], ["MEMBERSHIP", "#membership"], ["MY DECK", "#deck"], ["CARDS", "#cards"], ["FLIP THREE", "#flip-three"], ["COMMUNITY", "#community"]];
  return <header className="site-header">
    <div className="nav-shell"><BrandMark />
      <nav className={openMenu ? "main-nav nav-open" : "main-nav"}>{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpenMenu(false)}>{label}</a>)}</nav>
      <div className="nav-actions"><a className="account-link" href="#account" aria-label="Account">◯</a><a className="stash-link" href="#stash">STASH <span>{stashCount}</span></a><button className="menu-toggle" onClick={() => setOpenMenu((value) => !value)} aria-label="Toggle navigation">{openMenu ? "×" : "☰"}</button></div>
    </div>
  </header>;
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [category, setCategory] = useState("All vaults");
  const [stash, setStash] = useState([]);
  const [answers, setAnswers] = useState({});
  const [alignment, setAlignment] = useState(null);
  const [xp, setXp] = useState(47);
  const [flipped, setFlipped] = useState([false, false, false]);
  const [posts, setPosts] = useState([{ name: "EstateBorn", text: "The first community vote opens when the next drop lands.", time: "2h ago" }, { name: "PandaProfessor", text: "Show off your rookie card collection here.", time: "1d ago" }]);
  const [postText, setPostText] = useState("");

  useEffect(() => {
    setEntered(window.localStorage.getItem("dcbdAgeOk") === "yes");
    const saved = JSON.parse(window.localStorage.getItem("dcbdStash") || "[]");
    setStash(saved);
  }, []);

  useEffect(() => {
    if (stash.length) window.localStorage.setItem("dcbdStash", JSON.stringify(stash));
  }, [stash]);

  const filteredProducts = useMemo(() => category === "All vaults" ? products : products.filter((product) => product.category === category), [category]);
  const stashCount = stash.reduce((total, item) => total + item.qty, 0);
  const stashTotal = stash.reduce((total, item) => total + item.price * item.qty, 0);
  const categories = ["All vaults", ...new Set(products.map((product) => product.category))];

  function enterUniverse() {
    window.localStorage.setItem("dcbdAgeOk", "yes");
    setEntered(true);
  }

  function addToStash(product) {
    setStash((current) => current.some((item) => item.id === product.id) ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...product, qty: 1 }]);
  }

  function removeFromStash(id) {
    setStash((current) => current.filter((item) => item.id !== id));
    if (stash.length === 1) window.localStorage.removeItem("dcbdStash");
  }

  function analyseAnswers() {
    const score = Object.values(answers).reduce((result, value) => ({ ...result, [value]: result[value] + 1 }), { attack: 0, defence: 0, control: 0 });
    const ordered = Object.entries(score).sort((a, b) => b[1] - a[1]);
    setAlignment(ordered[0][0]);
    setXp((current) => current + 25);
  }

  function reveal(index) {
    setFlipped((current) => current.map((value, cardIndex) => cardIndex === index ? true : value));
    setXp((current) => current + 10);
  }

  function postToCommunity() {
    if (!postText.trim()) return;
    setPosts((current) => [{ name: "You", text: postText.trim(), time: "Just now" }, ...current]);
    setPostText("");
  }

  if (!entered) return <main className="age-screen"><div className="age-art"><img src={assetSrc(heroArt)} alt="DCBD Estate artwork" /></div><div className="age-panel"><BrandMark /><p className="eyebrow">18+ gate · enter the Estate</p><h1>The world is waiting.</h1><p>DCBD is a connected universe of vaults, characters, cards and street-level strategy. Enter the Estate to explore.</p><button className="button button-gold" onClick={enterUniverse}>I am 18+ · Enter DCBD</button><a className="button button-outline" href="https://www.google.com">Leave site</a><small>18+ only. Responsible information only. No medical claims.</small></div></main>;

  return <main className="dcbd-app">
    <Nav stashCount={stashCount} openMenu={openMenu} setOpenMenu={setOpenMenu} />
    <section id="home" className="hero-section">
      <div className="hero-copy"><p className="eyebrow">Premium · potent · plugged in · est. 2020</p><h1>DaCoffeez<span>Dank</span><small>DCBD</small></h1><p className="hero-lede">A living Estate where your products, membership, character, deck and cards all connect.</p><div className="hero-actions"><a className="button button-pink" href="#vault">Shop the vault <span>↗</span></a><a className="button button-outline" href="#onboarding">Find your deck</a></div><div className="hero-stats"><span><b>08</b> vault lanes</span><span><b>20</b> core archetypes</span><span><b>∞</b> your progression</span></div></div>
      <div className="hero-visual"><img src={assetSrc(heroArt)} alt="DCBD Estate visual identity" /><div className="hero-badge">ENTER<br /><b>THE ESTATE</b></div></div>
    </section>
    <div className="marquee"><span>NO ORDINARY SHOP · BUILD YOUR DECK · OWN YOUR STORY · DCBD ESTATE LEGENDS · </span><span>NO ORDINARY SHOP · BUILD YOUR DECK · OWN YOUR STORY · DCBD ESTATE LEGENDS · </span></div>

    <section className="intro-section content-shell">
      <div className="intro-art"><img src={assetSrc(founderArt)} alt="DCBD founder artwork" /></div>
      <div className="intro-copy"><p className="eyebrow">The Estate is calling</p><h2>From the street<br /><span>to your screen.</span></h2><p>DCBD is not a checkout with a game bolted on. It is one account, one visual world and one loop: discover the vault, join the family, get read by the AI, build your deck and keep moving.</p><div className="loop-list"><span><b>01</b> Shop the vault</span><span><b>02</b> Get your character</span><span><b>03</b> Flip, collect, progress</span></div><a className="text-link" href="#membership">Explore the family →</a></div>
    </section>

    <section id="vault" className="vault-section content-shell section-pad">
      <SectionHeading eyebrow="The DCBD vault" title="Physical drops. Digital rewards." copy="The catalogue is commerce-backend ready. Current launch data is displayed here; prices are supplied by the catalogue rather than scattered through the UI." action={<a className="text-link" href="#stash">View my stash →</a>} />
      <div className="vault-rail">{[["Cali collection", caliArt], ["Dam classics", classicsArt], ["Herbal tea wall", teaArt]].map(([title, art]) => <a className="vault-banner" key={title} href="#products"><img src={assetSrc(art)} alt={`${title} artwork`} /><span>{title}<b>Explore →</b></span></a>)}</div>
      <div className="vault-toolbar"><div className="filter-row">{categories.map((item) => <button key={item} className={category === item ? "filter active" : "filter"} onClick={() => setCategory(item)}>{item}</button>)}</div><span className="catalog-status">Showing {filteredProducts.length} launch products</span></div>
      <div id="products" className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToStash} added={stash.some((item) => item.id === product.id)} />)}</div>
    </section>

    <section id="stash" className="stash-section content-shell section-pad">
      <div className="panel-header"><div><p className="eyebrow">My stash</p><h2>Your physical order, connected.</h2></div><span className="status-pill">● Commerce layer ready</span></div>
      <div className="stash-layout"><div className="stash-items">{stash.length === 0 ? <div className="empty-state"><span>✦</span><h3>Nothing in the stash yet.</h3><p>Pick a drop from the Vault and your order will appear here.</p><a className="text-link" href="#vault">Browse the vault →</a></div> : stash.map((item) => <div className="stash-row" key={item.id}><span className="stash-icon" style={{ background: item.color }}>✦</span><div><b>{item.name}</b><small>{item.category} · quantity {item.qty}</small></div><strong>£{(item.price * item.qty).toFixed(2)}</strong><button aria-label={`Remove ${item.name}`} onClick={() => removeFromStash(item.id)}>×</button></div>)}</div><aside className="stash-summary"><span className="eyebrow">Order snapshot</span><div><span>Items</span><b>{stashCount}</b></div><div><span>Rewards</span><b className="lime-text">{stashCount ? "+ card draw" : "—"}</b></div><div className="summary-total"><span>Catalogue total</span><b>£{stashTotal.toFixed(2)}</b></div><a className={`button ${stashCount ? "button-gold" : "button-disabled"}`} href={stashCount ? `https://wa.me/${phone}?text=${encodeURIComponent(`Hi DCBD, I would like to order from the Vault. My stash total is £${stashTotal.toFixed(2)}.`)}` : "#vault"} target={stashCount ? "_blank" : undefined} rel={stashCount ? "noopener noreferrer" : undefined}>{stashCount ? "Continue on WhatsApp" : "Add a product first"}</a><small>Final price, availability, rewards and eligibility are confirmed by the commerce backend.</small></aside></div>
    </section>

    <section id="membership" className="membership-section content-shell section-pad">
      <div className="membership-copy"><p className="eyebrow">Estate Born membership</p><h2>Access the<br /><span>wider universe.</span></h2><p>Membership is an entitlement layer, not just a payment. It can unlock customisation, private boards, exclusive drops, XP benefits and future deck functionality as the ecosystem grows.</p><a className="button button-gold" href={membershipCheckout} target="_blank" rel="noopener noreferrer">Join Estate Born+ · £8.99</a><small>Current catalogue price · configurable in the commerce backend.</small></div><div className="membership-art"><img src={assetSrc(membershipArt)} alt="DCBD membership card artwork" /></div></section>

    <section id="onboarding" className="onboarding-section content-shell section-pad">
      <SectionHeading eyebrow="AI onboarding / phase one" title="Find your Estate alignment." copy="Answer in your own language. The scoring engine turns the three responses into a starter direction — not a random draw." />
      <div className="onboarding-layout"><div className="question-stack">{questions.map((question, index) => <fieldset key={question.id} className="question-card"><legend><span>{index + 1}</span>{question.title}</legend><p>{question.prompt}</p><div className="option-grid">{question.options.map((option) => <label key={option.value}><input type="radio" name={question.id} value={option.value} checked={answers[question.id] === option.value} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} /><span>{option.label}</span></label>)}</div></fieldset>)}<button className="button button-pink" disabled={Object.keys(answers).length !== questions.length} onClick={analyseAnswers}>Read my energy ↗</button></div><aside className={`alignment-card ${alignment || ""}`}>{alignment ? <><span className="alignment-symbol">∞</span><p className="eyebrow">AI read complete</p><h3>{alignment} deck</h3><p>Your first direction is {alignment}. Your avatar and starter cards now have a place to begin.</p><div className="alignment-meta"><span>STARTER XP <b>+25</b></span><span>DECK ACCESS <b>OPEN</b></span></div><a className="text-link" href="#deck">Open your deck →</a></> : <><span className="alignment-symbol">∞</span><p className="eyebrow">Your unique deck</p><h3>Answer three questions.</h3><p>The Estate reads the energy behind your answers and assigns a starting identity.</p><div className="alignment-options"><span>ATTACK</span><span>DEFENCE</span><span>CONTROL</span></div></>}</aside></div>
    </section>

    <section id="deck" className="deck-section content-shell section-pad"><div className="deck-heading"><div><p className="eyebrow">My deck / {alignment || "unassigned"}</p><h2>Built from your story.</h2><p>Cards, avatar, XP and future trades live under one player account. This foundation keeps game state separate from commerce.</p></div><div className="xp-meter"><span>XP <b>{xp}</b></span><div><i style={{ width: `${Math.min(xp, 100)}%` }} /></div><small>next unlock · 100 XP</small></div></div><div className="deck-grid">{starterCards.map((card, index) => <article className={`deck-card deck-${card.type.toLowerCase()}`} key={card.name}><span>0{index + 1} / STARTER</span><b>{card.name}</b><small>{card.type} · power {card.power}</small><div className="card-bars"><i style={{ width: `${card.power}%` }} /></div></article>)}</div></section>

    <section id="cards" className="cards-section content-shell section-pad"><SectionHeading eyebrow="Digital collection" title="Own the pull." copy="Qualifying physical purchases can feed your collection. Ownership, rarity and trade status should be validated server-side as the collection layer comes online." action={<a className="text-link" href="#flip-three">Play Flip Three →</a>} /><div className="collection-stats"><span><b>04</b> cards shown</span><span><b>03</b> rarities</span><span><b>+10</b> XP per flip</span></div><div className="collection-grid">{cards.map((card) => <CardImage card={card} key={card.name} />)}</div></section>

    <section id="flip-three" className="flip-section content-shell section-pad"><div className="flip-top"><div><p className="eyebrow">Flip Three / game layer</p><h2>Three cards.<br /><span>One decision.</span></h2><p>Flip the hand, read the opponent, then build a strategy around your avatar and collection.</p></div><div className="opponent-card"><span>OPPONENT PROFILE</span><b>THE UNKNOWN</b><small>Risk level · high<br />Known for · all-in flips</small></div></div><div className="flip-table">{["ATTACK", "HIDDEN", "DEFENCE"].map((label, index) => <button key={label} className={flipped[index] ? "flip-card flipped" : "flip-card"} onClick={() => reveal(index)}><span>{flipped[index] ? starterCards[index].type : "∞"}</span><b>{flipped[index] ? starterCards[index].name : label}</b><small>{flipped[index] ? `+${starterCards[index].power} power` : "tap to flip"}</small></button>)}</div><div className="flip-footer"><span><b>SAFE MODE</b> · low risk</span><div className="risk-bar"><i /></div><span>MAX REWARD · <b>{xp + 30} XP</b></span></div></section>

    <section id="community" className="community-section content-shell section-pad"><div className="community-intro"><p className="eyebrow">Estate Born community</p><h2>Keep the loop alive.</h2><p>Member profiles, game talk, card talk, trade talk and announcements belong in the same world. Read the board, then leave your mark.</p><div className="community-form"><input aria-label="Community post" value={postText} onChange={(event) => setPostText(event.target.value)} placeholder="Drop a thought into the Estate..." /><button className="button button-pink" onClick={postToCommunity}>Post</button></div></div><div className="community-board">{posts.map((post, index) => <article key={`${post.name}-${index}`}><div className="avatar-dot">{post.name[0]}</div><div><b>{post.name}</b><p>{post.text}</p><small>{post.time} · Estate board</small></div></article>)}</div></section>

    <section id="account" className="account-section content-shell section-pad"><div className="account-panel"><div className="account-id"><span className="avatar-frame">DC</span><div><p className="eyebrow">Player account</p><h2>Guest / Estate entrant</h2><p>Sign-in and central account services connect membership, avatar, deck, collection, XP, purchases and game history.</p></div></div><div className="account-links"><a href="#onboarding">Start AI onboarding <span>→</span></a><a href="#deck">View my deck <span>→</span></a><a href="#cards">Open collection <span>→</span></a></div></div></section>

    <footer className="site-footer content-shell"><BrandMark /><div><p>DCBD Estate Legends · Own it. Control it. Live it.</p><small>18+ only · General information only · No medical claims · Prices and availability are controlled by the commerce backend.</small></div><a href={`mailto:${email}`}>Contact the Estate ↗</a></footer>
  </main>;
}
