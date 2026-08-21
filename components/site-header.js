"use client";

import { useState } from "react";
import { Crown } from "./dcbd-ui";

const navigation = [
  ["Home", "#top"],
  ["Shop", "#vaults"],
  ["Membership", "#membership"],
  ["My Deck", "#deck"],
  ["Cards", "#cards"],
  ["Flip Three", "#flip-three"],
  ["Community", "#community"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="DCBD home">
          <Crown className="wordmark__crown" />
          <span className="wordmark__name">DCBD</span>
          <span className="wordmark__tag">DA COFFEEZ DANK</span>
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigation.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="#account" className="icon-button" aria-label="Account">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
            </svg>
          </a>
          <button
            type="button"
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
            <b className="sr-only">Menu</b>
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navigation.map(([label, href], index) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{label}
            </a>
          ))}
          <a href="#account" onClick={() => setOpen(false)}><span>08</span>Account</a>
        </nav>
        <p>Estate access • one account • one world</p>
      </div>

      <nav className="mobile-dock" aria-label="Quick navigation">
        <a href="#vaults"><span aria-hidden="true">◇</span>Shop</a>
        <a href="#cards"><span aria-hidden="true">✦</span>Cards</a>
        <a href="#top" className="mobile-dock__home"><Crown />Home</a>
        <a href="#flip-three"><span aria-hidden="true">Ⅲ</span>Play</a>
        <a href="#account"><span aria-hidden="true">◉</span>Account</a>
      </nav>
    </>
  );
}
