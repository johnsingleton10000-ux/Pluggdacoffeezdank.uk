"use client";

import { useEffect, useMemo, useState } from "react";
import {
  activity,
  collectionCards,
  featuredVault,
  formatPrice,
  navigation,
} from "../lib/dcbd-data";

const phone = "447763383729";

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    bag: <><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    cards: <><rect x="6" y="3" width="13" height="17" rx="2" /><path d="m6 7-2 .5A2 2 0 0 0 2.5 10l2.2 8a2 2 0 0 0 2.4 1.4" /></>,
    close: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    crown: <><path d="m3 7 4 4 5-7 5 7 4-4-2 11H5L3 7Z" /><path d="M5 21h14" /></>,
    diamond: <><path d="m12 2 8 7-8 13L4 9l8-7Z" /><path d="m4 9 16 0" /><path d="m8 3 4 6 4-6" /></>,
    game: <><path d="M8 7h8a5 5 0 0 1 4.8 6.4l-1 3.5a2.5 2.5 0 0 1-4.2 1.1L14 16h-4l-1.6 2a2.5 2.5 0 0 1-4.2-1.1l-1-3.5A5 5 0 0 1 8 7Z" /><path d="M7 11v4M5 13h4M16 12h.01M18 14h.01" /></>,
    infinity: <path d="M18.2 7.8c-3-3-5.5.2-6.2 1.2-.7-1-3.2-4.2-6.2-1.2-3.7 3.7 1.4 8.2 3.5 5.5L12 10l2.7 3.3c2.1 2.7 7.2-1.8 3.5-5.5Z" />,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A8 8 0 1 1 21 15Z" />,
    profile: <><circle cx="12" cy="7" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    shield: <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />,
    spark: <><path d="m12 2 1.3 5.7L19 9l-5.7 1.3L12 16l-1.3-5.7L5 9l5.7-1.3L12 2Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>,
    swords: <><path d="m14.5 5.5 4-3 3 3-3 4" /><path d="m13 7 4 4" /><path d="M3 21 14.5 9.5" /><path d="m9.5 5.5-4-3-3 3 3 4" /><path d="m11 7-4 4" /><path d="M21 21 9.5 9.5" /></>,
    xp: <><circle cx="12" cy="12" r="9" /><path d="m8 8 8 8M16 8l-8 8" /></>,
  };

  return (
    <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function Logo({ compact = false }) {
  return (
    <a className={`brand ${compact ? "brand--compact" : ""}`} href="#home" aria-label="DCBD home">
      <span className="brand__crown"><Icon name="crown" size={compact ? 17 : 21} /></span>
      <span className="brand__word">DCBD</span>
      {!compact && <span className="brand__tag">Da Coffeez Dank</span>}
    </a>
  );
}

function AgeGate({ onEnter }) {
  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="age-gate__noise" />
      <div className="age-gate__card ornate-panel">
        <Logo />
        <p className="kicker">The estate is age restricted</p>
        <h1 id="age-title">Enter the<br /><em>DCBD world</em></h1>
        <p>You must be 18 or over to enter. DCBD is an adult-only collectible, education and lifestyle universe.</p>
        <div className="age-gate__actions">
          <button className="button button--gold" onClick={onEnter}>I am 18+ <Icon name="arrow" /></button>
          <a className="button button--ghost" href="https://www.google.com">Leave estate</a>
        </div>
        <small>Educational information only. No medical claims.</small>
      </div>
    </div>
  );
}

function Header({ stashCount }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <Logo compact />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="icon-button account-button" href="#estate" aria-label="Account"><Icon name="profile" /></a>
          <a className="stash-button" href="#vault"><Icon name="bag" /><span>Stash</span><b>{stashCount}</b></a>
          <button className="icon-button menu-button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </header>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{item.label}<Icon name="arrow" />
            </a>
          ))}
        </nav>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="hero world-section" id="home">
      <div className="hero__paint hero__paint--one" />
      <div className="hero__paint hero__paint--two" />
      <div className="hero__copy">
        <p className="kicker"><span>Premium</span> · Potent · Plugged in · Est. 2020</p>
        <h1 className="hero__title" aria-label="Da Coffeez Dank DCBD">
          <span className="hot">DaCoffeezDank</span>
          <span className="cool">DCBD</span>
        </h1>
        <p className="hero__intro">One account. One estate. A living world where products unlock cards, cards shape decks, and every flip builds your legend.</p>
        <div className="hero__actions">
          <a className="button button--pink" href="#vault">Enter the vault <Icon name="arrow" /></a>
          <a className="button button--acid" href="#onboarding">Find your deck</a>
        </div>
        <div className="hero__proof">
          <span><Icon name="diamond" /> Collectible rewards</span>
          <span><Icon name="xp" /> Connected progression</span>
          <span><Icon name="shield" /> One estate identity</span>
        </div>
      </div>
      <div className="hero__stage" aria-label="DCBD universe preview">
        <div className="hero-card hero-card--back">
          <span>∞</span><b>Estate<br />Legends</b>
        </div>
        <div className="hero-card hero-card--front">
          <span className="hero-card__rank">Founder 001</span>
          <div className="hooded-avatar">
            <span className="hooded-avatar__hood" />
            <i /><i />
          </div>
          <strong>Shadow</strong>
          <small>Control / Strategist</small>
          <div className="hero-card__stats"><span>ATK 47</span><span>CTRL 91</span></div>
        </div>
        <div className="orbit-badge orbit-badge--xp"><Icon name="xp" /><b>2,840</b><small>Estate XP</small></div>
        <div className="orbit-badge orbit-badge--cards"><Icon name="cards" /><b>47</b><small>Active flips</small></div>
      </div>
    </section>
  );
}

function VaultCard({ product, onAdd, selected }) {
  return (
    <article className="vault-card" style={{ "--accent": product.accent }}>
      <div className="vault-card__art">
        <span className="vault-card__code">{product.code}</span>
        <div className="vault-card__specimen">
          <span>{product.initials}</span>
        </div>
        <span className="vault-card__type">{product.type}</span>
      </div>
      <div className="vault-card__body">
        <p>{product.collection}</p>
        <h3>{product.name}</h3>
        <span className="vault-card__note">{product.note}</span>
        <div className="vault-card__buy">
          <strong>{formatPrice(product.price)}</strong>
          <button onClick={() => onAdd(product)} aria-label={`Add ${product.name} to stash`}>
            {selected ? "Added" : "Add"} <Icon name={selected ? "spark" : "bag"} size={17} />
          </button>
        </div>
        <div className="vault-card__reward"><Icon name="cards" size={16} /> Qualifying purchase can unlock a card reward</div>
      </div>
    </article>
  );
}

function SectionHeading({ label, title, copy, action }) {
  return (
    <div className="section-heading">
      <div>
        <p className="kicker">{label}</p>
        <h2>{title}</h2>
        {copy && <p className="section-heading__copy">{copy}</p>}
      </div>
      {action}
    </div>
  );
}

function CommerceLoop() {
  const steps = [
    ["bag", "Purchase", "A qualifying vault order is verified."],
    ["spark", "Reward", "The server issues the linked collectible."],
    ["cards", "Collect", "The card enters your owned collection."],
    ["game", "Play", "Build it into your deck and Flip Three."],
  ];
  return (
    <div className="commerce-loop" aria-label="Product to game reward flow">
      {steps.map(([icon, title, text], index) => (
        <div className="commerce-loop__step" key={title}>
          <span className="commerce-loop__number">0{index + 1}</span>
          <span className="commerce-loop__icon"><Icon name={icon} /></span>
          <div><strong>{title}</strong><small>{text}</small></div>
          {index < steps.length - 1 && <Icon name="arrow" />}
        </div>
      ))}
    </div>
  );
}

function Onboarding() {
  const [answer, setAnswer] = useState(null);
  const profiles = {
    attack: { title: "Aggressor", subtitle: "Cracked Obelisk", icon: "swords", text: "Pressure first. Read the room after it moves." },
    control: { title: "Controlled", subtitle: "Silent Strategist", icon: "infinity", text: "Watch, wait, then own the state of play." },
    defence: { title: "Fortress", subtitle: "Protected Power", icon: "shield", text: "Build position. Absorb pressure. Outlast." },
  };

  return (
    <section className="onboarding world-section" id="onboarding">
      <SectionHeading label="AI blood test · starter identity" title="Three instincts. One deck." copy="The full onboarding analyses multiple answers. This first signal previews the behavioural system without making a random assignment." />
      <div className="onboarding__grid">
        <div className="question-panel ornate-panel">
          <div className="question-panel__head"><span>Question 01 / 03</span><b>War question</b></div>
          <h3>When the estate goes live, do you charge the front line or read the smoke first?</h3>
          <div className="answer-grid">
            <button className={answer === "attack" ? "active" : ""} onClick={() => setAnswer("attack")}><Icon name="swords" /><span><b>Charge</b><small>Set the pressure</small></span></button>
            <button className={answer === "control" ? "active" : ""} onClick={() => setAnswer("control")}><Icon name="infinity" /><span><b>Read</b><small>Own the timing</small></span></button>
            <button className={answer === "defence" ? "active" : ""} onClick={() => setAnswer("defence")}><Icon name="shield" /><span><b>Hold</b><small>Build the position</small></span></button>
          </div>
          <p className="question-panel__note"><Icon name="spark" size={17} /> AI assignment uses the full answer set, entitlement and starter-deck rules.</p>
        </div>
        <div className={`profile-result ${answer ? "profile-result--active" : ""}`}>
          {answer ? (
            <>
              <span className="profile-result__signal"><Icon name={profiles[answer].icon} size={40} /></span>
              <p>Signal detected</p>
              <h3>{profiles[answer].title}</h3>
              <strong>{profiles[answer].subtitle}</strong>
              <span>{profiles[answer].text}</span>
              <div className="profile-result__meter"><i style={{ width: answer === "control" ? "88%" : answer === "attack" ? "76%" : "81%" }} /></div>
              <small>Provisional result · 2 questions remain</small>
            </>
          ) : (
            <>
              <span className="profile-result__signal"><Icon name="infinity" size={44} /></span>
              <p>AI reads your energy</p>
              <h3>Unknown</h3>
              <strong>Your estate signal is waiting</strong>
              <span>Choose the instinct closest to your real move.</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function DeckCard({ card, index }) {
  return (
    <article className={`collectible-card collectible-card--${index + 1}`}>
      <div className="collectible-card__shine" />
      <img src={card.image} alt={`${card.name} collectible artwork`} />
      <div className="collectible-card__overlay">
        <span>{card.rarity}</span>
        <strong>{card.name}</strong>
        <div><b>ATK {card.attack}</b><b>CTRL {card.control}</b></div>
      </div>
    </article>
  );
}

function EstatePanel() {
  return (
    <section className="estate world-section" id="estate">
      <div className="estate__frame ornate-panel">
        <div className="estate__title"><Icon name="crown" size={36} /><div><span>Your living identity</span><h2>DCBD Estate — Blood Seat</h2></div><b>Founder circle</b></div>
        <div className="estate__meta">
          <span><small>Estate name</small>Shadow I</span>
          <span><small>Rank</small>Founder Circle</span>
          <span><small>Deck</small>Caesar&apos;s Hand</span>
          <span><small>Archetype</small>Control / Strategist</span>
        </div>
        <div className="estate__body">
          <div className="estate__identity">
            <div className="hooded-avatar hooded-avatar--large"><span className="hooded-avatar__hood" /><i /><i /></div>
            <div><small>Who did the AI find?</small><h3>Julius Caesar — Caesar&apos;s Hand</h3><p>“I came, I saw, I flipped the table.”</p></div>
          </div>
          <div className="estate__stats">
            <div><small>Live flip table</small><strong>47</strong><span>active flips this cycle</span></div>
            <div className="mini-bars">{[42, 58, 47, 74, 68, 91].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div>
          </div>
          <div className="estate__access">
            <small>Street control</small>
            {["Product access", "Discount realm", "Exclusive drops", "Referral empire", "Governance vote"].map(item => <span key={item}>✓ {item}</span>)}
            <b>Full access <Icon name="shield" /></b>
          </div>
        </div>
        <div className="estate__log"><strong>Blood log / Estate feed</strong><span><b>Shadow I</b> just flipped a table.</span><span><b>New recruit</b> joined the family.</span><span><b>Caesar&apos;s Hand</b> is active.</span></div>
      </div>
    </section>
  );
}

function FlipThree() {
  const [flipped, setFlipped] = useState([]);
  const toggle = (index) => setFlipped(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index]);

  return (
    <section className="flip world-section" id="flip-three">
      <SectionHeading label="The core game · strategic collection" title="Flip Three. Own the moment." copy="Your avatar, cards, XP and deck meet in one fast tactical layer." action={<span className="status-pill"><i /> Arena preview</span>} />
      <div className="flip__board">
        <aside className="flip__rules">
          <span className="side-label">Manchester warzone</span>
          <h3>Expert rules</h3>
          {[
            ["01", "Draw 3", "Fill three cards from your holster."],
            ["02", "Attack or defend", "Read the pressure and choose your line."],
            ["03", "Negotiate", "Bluff, counter or change the field."],
            ["04", "Win & unlock", "Earn XP and progress your Estate."],
          ].map(([number, title, text]) => <div key={number}><b>{number}</b><span><strong>{title}</strong><small>{text}</small></span></div>)}
        </aside>
        <div className="flip__arena">
          <div className="flip__cards">
            {[0, 1, 2].map(index => (
              <button key={index} className={flipped.includes(index) ? "is-flipped" : ""} onClick={() => toggle(index)} aria-label={`Flip card ${index + 1}`}>
                <span className="flip-card__inner">
                  <span className="flip-card__back"><Icon name="infinity" size={44} /><b>F3</b><small>Tap to flip</small></span>
                  <span className="flip-card__front"><img src={collectionCards[index].image} alt="" /><strong>{collectionCards[index].name}</strong><small>ATK {collectionCards[index].attack}</small></span>
                </span>
              </button>
            ))}
          </div>
          <div className="battle-meter"><span><b>You</b> 100 HP</span><div><i style={{ width: "58%" }} /><i style={{ width: "42%" }} /></div><span><b>Rival</b> 100 HP</span></div>
          <p>One flick. One read. One move can change the whole estate.</p>
        </div>
        <aside className="opponent">
          <span className="side-label">Outthink. Outflick. Win.</span>
          <div className="opponent__avatar"><Icon name="crown" size={32} /><span><i /><i /></span></div>
          <h3>Street Boss</h3>
          <dl><div><dt>Playstyle</dt><dd>Aggressive bluffer</dd></div><div><dt>Risk level</dt><dd>High</dd></div><div><dt>Known for</dt><dd>All-in flips</dd></div></dl>
          <strong>Decisive intel.<br />Make the right call.</strong>
        </aside>
      </div>
    </section>
  );
}

function Membership() {
  const tiers = [
    { name: "Estate Born", label: "Discover", features: ["Core estate profile", "Starter collection", "Community access"], tone: "purple" },
    { name: "Founder Circle", label: "Build", features: ["Enhanced customisation", "XP boost entitlement", "Advanced deck tools"], tone: "gold", featured: true },
    { name: "Blood Seat", label: "Control", features: ["Elite access rules", "Exclusive collectible pool", "Governance eligibility"], tone: "pink" },
  ];
  return (
    <section className="membership world-section" id="membership">
      <SectionHeading label="Membership · configurable entitlements" title="Choose your seat in the estate." copy="Benefits and pricing are loaded from the membership service at launch. Nothing shown here invents a checkout price." />
      <div className="membership__tiers">
        {tiers.map(tier => (
          <article key={tier.name} className={`membership-card membership-card--${tier.tone} ${tier.featured ? "featured" : ""}`}>
            {tier.featured && <span className="membership-card__flag">Most plugged in</span>}
            <Icon name={tier.featured ? "crown" : "infinity"} size={31} />
            <p>{tier.label}</p><h3>{tier.name}</h3>
            <div className="membership-card__price"><b>Backend configured</b><span>Price & billing period</span></div>
            <ul>{tier.features.map(feature => <li key={feature}>✓ {feature}</li>)}</ul>
            <button className="button button--ghost">Explore access <Icon name="arrow" /></button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Community() {
  return (
    <section className="community world-section" id="community">
      <div className="community__intro">
        <p className="kicker">Community · Estate transmission</p>
        <h2>The streets are talking.</h2>
        <p>Game calls, card pulls, vault stories and Estate announcements — all inside the same visual world.</p>
        <a className="button button--acid" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">Talk to the Dank Plugz <Icon name="message" /></a>
      </div>
      <div className="community__feed">
        <div className="community__feed-head"><span>Blood log · live signals</span><b>03 transmissions</b></div>
        {activity.map((item, index) => (
          <article key={item.user}>
            <span className={`community__avatar community__avatar--${index + 1}`}>{item.user.slice(0, 1)}</span>
            <div><strong>{item.user}</strong><p>{item.action}</p><small>{item.meta}</small></div><time>{item.time}</time>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div><Logo /><p>A connected commerce, collection and game universe born in Manchester.</p></div>
      <div className="site-footer__links"><strong>Enter the world</strong>{navigation.slice(1).map(item => <a key={item.label} href={item.href}>{item.label}</a>)}</div>
      <div className="site-footer__signal"><p className="kicker">Direct line · 24/7</p><h3>Talk to the Dank Plugz</h3><a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">WhatsApp us <Icon name="arrow" /></a></div>
      <div className="site-footer__bottom"><span>© 2026 DCBD Estate</span><span>18+ only · Educational information · No medical claims</span><span>Manchester, UK</span></div>
    </footer>
  );
}

export default function DcbdWorld() {
  const [ageAccepted, setAgeAccepted] = useState(null);
  const [stash, setStash] = useState([]);

  useEffect(() => {
    setAgeAccepted(window.localStorage.getItem("dcbd-age") === "accepted");
  }, []);

  const selectedIds = useMemo(() => new Set(stash.map(item => item.code)), [stash]);
  const addToStash = product => {
    if (!selectedIds.has(product.code)) setStash(current => [...current, product]);
  };

  return (
    <main>
      {ageAccepted === false && <AgeGate onEnter={() => { window.localStorage.setItem("dcbd-age", "accepted"); setAgeAccepted(true); }} />}
      <Header stashCount={stash.length} />
      <Hero />
      <div className="world-ticker" aria-hidden="true"><span>DCBD Estate</span><b>∞</b><span>Own it</span><b>∞</b><span>Control it</span><b>∞</b><span>Live it</span><b>∞</b><span>Flip Three</span></div>
      <section className="vault world-section" id="vault">
        <SectionHeading label="The vault · physical meets digital" title="Products with a place in the world." copy="Featured from the supplied DCBD catalogue. Prices remain sourced from catalogue data and final checkout values must be verified server-side." action={<a className="text-link" href="#cards">View collection <Icon name="arrow" /></a>} />
        <div className="vault__grid">{featuredVault.map(product => <VaultCard key={product.code} product={product} onAdd={addToStash} selected={selectedIds.has(product.code)} />)}</div>
        <CommerceLoop />
      </section>
      <Onboarding />
      <EstatePanel />
      <section className="collection world-section" id="cards">
        <SectionHeading label="Your collection · cards with consequence" title="Collect. Build. Trade. Play." copy="Every card carries identity, rarity, ownership state and a purpose inside the deck." action={<span className="collection-count"><b>04</b> preview cards</span>} />
        <div className="collection__fan">{collectionCards.map((card, index) => <DeckCard key={card.name} card={card} index={index} />)}</div>
      </section>
      <FlipThree />
      <Membership />
      <Community />
      <Footer />
    </main>
  );
}
