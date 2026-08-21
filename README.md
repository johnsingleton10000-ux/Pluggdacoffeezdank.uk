# DCBD / Da Cofeez Dank

Connected ecosystem: shop, membership, AI onboarding, avatars, decks, Flip Three, XP, cards, trading and community. One account. One visual identity.

## Stack

- Next.js 14 + React + Tailwind + Framer Motion
- Vercel-compatible (`vercel.json` forces the Next.js framework)
- Optional Supabase for auth / ledger
- Stripe membership checkout
- WhatsApp product checkout with **server-side quotes**

## What is live in this build

- Age gate and global DCBD navigation
- Home universe (graffiti hero, vault carousel, Blood Seat dashboard)
- Shop vaults from the existing 52-product catalogue (prices unchanged)
- Product pages with linked collectible cards
- Waistband / My Stash + authoritative `/api/commerce/quote`
- Membership tiers (only Estate Born+ has a supplied £8.99 Stripe price)
- Personality Blood Test → avatar + starter deck (language scoring, not random)
- Collection, My Deck, Flip Three (server-resolved)
- Estate Born community board
- Trading state-machine scaffolding

## Environment

See `.env.example`. The site runs without Supabase. Set `STRIPE_SECRET_KEY` for `/api/checkout`. Estate Born+ also has the existing hosted Stripe link.

## Legal

18+ only. Educational product information. No medical claims. Digital cards have no cash value. Verify compliance before publishing.

## Legacy

The previous static storefront lives in `legacy/storefront/`.
