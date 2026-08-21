import Image from "next/image";
import { AgeGate } from "../components/age-gate";
import { SiteHeader } from "../components/site-header";
import {
  ArrowIcon,
  Bolt,
  Crown,
  DcbdButton,
  InfinityMark,
  Kicker,
  RivetFrame,
  SectionTitle,
} from "../components/dcbd-ui";
import {
  alignments,
  collectibleCards,
  ecosystemSteps,
  footerNavigation,
  vaults,
} from "../lib/dcbd-world";

function HeroCard({ className, label, title, stat }) {
  return (
    <div className={`hero-card ${className}`}>
      <span>{label}</span>
      <strong>{title}</strong>
      <small>{stat}</small>
      <InfinityMark />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__splatter hero__splatter--pink" />
      <div className="hero__splatter hero__splatter--lime" />
      <div className="estate-container hero__layout">
        <div className="hero__copy">
          <Kicker tone="gold">Welcome to the DCBD Estate</Kicker>
          <h1>
            <span className="hero__line hero__line--pink">Da Coffeez</span>
            <span className="hero__line hero__line--cyan">Dank</span>
            <span className="hero__stamp">DCBD</span>
          </h1>
          <p className="hero__manifesto">Commerce. Characters. Cards. Culture.</p>
          <p className="hero__intro">
            A connected collectible world born from Manchester grit—where what you discover,
            collect and play all feeds one Estate identity.
          </p>
          <div className="hero__actions">
            <DcbdButton href="#vaults">Enter the vault <ArrowIcon /></DcbdButton>
            <DcbdButton href="#identity" tone="purple">Find your alignment</DcbdButton>
          </div>
          <div className="hero__proof">
            <span><InfinityMark /> One identity</span>
            <span><Bolt /> Earn & evolve</span>
            <span><Crown /> Estate born</span>
          </div>
        </div>

        <div className="hero__visual" aria-label="DCBD collectible world preview">
          <div className="hero__orbit hero__orbit--one" />
          <div className="hero__orbit hero__orbit--two" />
          <div className="hero__character">
            <div className="hero__hood" />
            <div className="hero__face">
              <span />
              <span />
            </div>
            <div className="hero__body">
              <Crown />
              <b>ESTATE</b>
            </div>
          </div>
          <HeroCard className="hero-card--left" label="Deck class" title="Control" stat="Silent strategist" />
          <HeroCard className="hero-card--right" label="Estate status" title="Founder" stat="Access unlocked" />
          <div className="hero__level">
            <span>Estate level</span>
            <strong>∞</strong>
            <i><b /></i>
          </div>
          <p className="hero__visual-caption">Your character. Your deck. Your story.</p>
        </div>
      </div>
      <a href="#ecosystem" className="scroll-cue" aria-label="Scroll to explore">
        <span>Enter the world</span>
        <i />
      </a>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="world-section ecosystem-section">
      <div className="estate-container">
        <SectionTitle
          eyebrow="One world • every move connected"
          title={<>The DCBD <em>cycle</em></>}
          copy="The store is the entrance, not the ending. Every system is designed to connect through one account while remaining technically independent."
          align="center"
        />
        <div className="ecosystem-grid">
          {ecosystemSteps.map((step) => (
            <article key={step.number} className={`ecosystem-card ecosystem-card--${step.tone}`}>
              <span className="ecosystem-card__number">{step.number}</span>
              <div className="ecosystem-card__icon">
                {step.number === "01" && "◇"}
                {step.number === "02" && <Crown />}
                {step.number === "03" && "♟"}
                {step.number === "04" && <Bolt />}
              </div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
              <i className="ecosystem-card__connector"><ArrowIcon /></i>
            </article>
          ))}
        </div>
        <div className="system-rail">
          <span>Product</span><i />
          <span>Reward card</span><i />
          <span>Collection</span><i />
          <span>Deck</span><i />
          <span>Play & progress</span>
        </div>
      </div>
    </section>
  );
}

function VaultVisual({ type }) {
  return (
    <div className={`vault-visual vault-visual--${type}`} aria-hidden="true">
      {type === "flower" && <><i /><i /><i /><i /><b /></>}
      {type === "crystal" && <><i /><i /><i /><i /><i /></>}
      {type === "herbal" && <><i /><i /><i /><b /></>}
      {type === "merch" && <><i /><b>DCBD</b></>}
    </div>
  );
}

function Vaults() {
  return (
    <section id="vaults" className="world-section vault-section">
      <div className="estate-container">
        <div className="split-heading">
          <SectionTitle
            eyebrow="Physical goods • digital rewards"
            title={<>Enter the <em>vaults</em></>}
            copy="Explore the collection architecture. Live products, availability and authoritative pricing will come from the commerce backend—never from browser-controlled values."
          />
          <div className="vault-key">
            <span>Vault protocol</span>
            <strong>Purchase → Reward → Collection</strong>
          </div>
        </div>
        <div className="vault-grid">
          {vaults.map((vault) => (
            <article className="vault-card" key={vault.name}>
              <div className="vault-card__top">
                <span>{vault.code}</span>
                <small>{vault.status}</small>
              </div>
              <VaultVisual type={vault.visual} />
              <div className="vault-card__body">
                <p>{vault.description}</p>
                <h3>{vault.name}</h3>
                <span className="vault-card__action">Explore collection <ArrowIcon /></span>
              </div>
            </article>
          ))}
        </div>
        <p className="availability-note">
          <span>!</span> No placeholder products or prices are being presented as live inventory.
        </p>
      </div>
    </section>
  );
}

function Identity() {
  return (
    <section id="identity" className="world-section identity-section">
      <div className="estate-container">
        <SectionTitle
          eyebrow="AI onboarding • estate identity"
          title={<>What&apos;s in your <em>blood?</em></>}
          copy="Three behavioural directions form the foundation of each player profile. The production onboarding will score real answers and support hybrid alignments—it will not assign identities at random."
          align="center"
        />
        <div className="alignment-grid">
          {alignments.map((alignment, index) => (
            <RivetFrame className={`alignment-card alignment-card--${alignment.className}`} key={alignment.name}>
              <span className="alignment-card__index">0{index + 1}</span>
              <div className="alignment-card__sigil">
                {alignment.className === "attack" && <Bolt />}
                {alignment.className === "control" && <InfinityMark />}
                {alignment.className === "defence" && <span>⬟</span>}
              </div>
              <p>{alignment.subtitle}</p>
              <h3>{alignment.name}</h3>
              <div className="alignment-card__art">
                <i /><i /><i />
              </div>
              <p className="alignment-card__description">{alignment.description}</p>
              <ul>
                {alignment.stats.map((stat) => <li key={stat}>{stat}</li>)}
              </ul>
            </RivetFrame>
          ))}
        </div>
        <div className="identity-callout">
          <div>
            <Crown />
            <span>Estate blood test</span>
          </div>
          <p>Questions → alignment → stock avatar → starter deck identity</p>
          <DcbdButton disabled tone="purple">Onboarding coming next</DcbdButton>
        </div>
      </div>
    </section>
  );
}

function Cards() {
  return (
    <section id="cards" className="world-section cards-section">
      <div className="estate-container cards-layout">
        <div className="cards-copy">
          <Kicker tone="gold">DCBD collectibles</Kicker>
          <h2>Products open doors.<br /><em>Cards build legends.</em></h2>
          <p>
            Qualifying purchases can connect to verified digital rewards. Collection ownership,
            rarity, deck state and future trades belong to server-validated systems.
          </p>
          <ul className="feature-list">
            <li><span>01</span><div><strong>Collect</strong><small>Build a personal card vault</small></div></li>
            <li><span>02</span><div><strong>Build</strong><small>Shape a deck around your identity</small></div></li>
            <li><span>03</span><div><strong>Trade</strong><small>Future ownership-safe exchanges</small></div></li>
          </ul>
          <DcbdButton href="#deck" tone="purple">See how decks connect <ArrowIcon /></DcbdButton>
        </div>
        <div className="card-fan">
          {collectibleCards.slice(0, 3).map((card, index) => (
            <article className={`collectible collectible--${index + 1}`} key={card.name}>
              <Image src={card.image} alt={`${card.name} collectible card artwork`} fill sizes="(max-width: 760px) 45vw, 240px" />
              <span>{card.rarity}</span>
            </article>
          ))}
          <div className="card-fan__spark card-fan__spark--one">✦</div>
          <div className="card-fan__spark card-fan__spark--two">✦</div>
        </div>
      </div>
    </section>
  );
}

function GamePreview() {
  return (
    <section id="flip-three" className="world-section game-section">
      <div className="estate-container">
        <div className="game-stage">
          <div className="game-stage__city" />
          <div className="game-stage__heading">
            <Kicker tone="pink">Manchester warzone • arena preview</Kicker>
            <h2>Flip <strong>Three</strong></h2>
            <p>Read the hand. Read the rival. Own the moment.</p>
          </div>
          <div className="game-stage__table">
            <div className="fighter fighter--left">
              <div className="fighter__head"><i /><i /></div>
              <span>Estate player</span>
              <strong>100 HP</strong>
            </div>
            <div id="deck" className="flip-hand" aria-label="Three card hand preview">
              {[1, 2, 3].map((card) => (
                <div className="flip-card" key={card}>
                  <span>F3</span>
                  <InfinityMark />
                  <small>Flip to reveal</small>
                </div>
              ))}
            </div>
            <div className="fighter fighter--right">
              <div className="fighter__head"><i /><i /></div>
              <span>Street rival</span>
              <strong>100 HP</strong>
            </div>
          </div>
          <div className="game-rules">
            <span><b>1</b> Draw three</span>
            <span><b>2</b> Attack or defend</span>
            <span><b>3</b> Read the rival</span>
            <span><b>4</b> Win & progress</span>
          </div>
          <div className="game-stage__footer">
            <span>Game state and rewards will be server-authoritative</span>
            <DcbdButton disabled>Arena in development</DcbdButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Membership() {
  return (
    <section id="membership" className="world-section membership-section">
      <div className="estate-container">
        <RivetFrame className="membership-panel">
          <div className="membership-panel__mark"><InfinityMark /><Crown /></div>
          <div className="membership-panel__copy">
            <Kicker tone="gold">Your blood seat awaits</Kicker>
            <h2>Join the<br /><em>DCBD Estate</em></h2>
            <p>
              Membership is the entitlement layer connecting identity, access, cards,
              progression and community—configured centrally as benefits evolve.
            </p>
            <div className="membership-benefits">
              <span>Estate profile</span>
              <span>AI onboarding</span>
              <span>Deck identity</span>
              <span>Member vaults</span>
              <span>Community access</span>
              <span>XP benefits</span>
            </div>
          </div>
          <div className="membership-panel__pass">
            <span>DCBD Estate pass</span>
            <InfinityMark />
            <strong>Membership options<br />configured at launch</strong>
            <small>No price is hard-coded in this interface.</small>
            <DcbdButton disabled>Membership setup pending</DcbdButton>
          </div>
        </RivetFrame>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="world-section community-section">
      <div className="estate-container community-grid">
        <div>
          <Kicker tone="pink">Estate radio • community layer</Kicker>
          <h2>The world gets<br /><em>louder together.</em></h2>
        </div>
        <div className="community-topics">
          <article><span>01</span><h3>Deck Lab</h3><p>Builds, strategy and Flip Three talk.</p></article>
          <article><span>02</span><h3>Trade Floor</h3><p>Future verified card offers and exchanges.</p></article>
          <article><span>03</span><h3>Estate Feed</h3><p>Announcements, releases and member activity.</p></article>
        </div>
        <div className="community-status">
          <span className="status-light" />
          <p><strong>Community architecture reserved</strong>Forum posting and trade actions remain disabled until authentication and server-side moderation are connected.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="account" className="site-footer">
      <div className="estate-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Crown />
            <strong>DCBD</strong>
            <p>Da Coffeez Dank<br />Estate born. Future built.</p>
          </div>
          {footerNavigation.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
            </nav>
          ))}
          <div className="footer-contact">
            <h3>Direct line</h3>
            <p>Real support. Real answers.</p>
            <a href="https://wa.me/447763383729" target="_blank" rel="noreferrer">WhatsApp the Estate <ArrowIcon /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DCBD. 18+ only.</span>
          <span>Responsible information • No medical claims</span>
          <a href="/education">Education</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="dcbd-world">
      <AgeGate />
      <SiteHeader />
      <Hero />
      <Ecosystem />
      <Vaults />
      <Identity />
      <Cards />
      <GamePreview />
      <Membership />
      <Community />
      <Footer />
    </main>
  );
}
