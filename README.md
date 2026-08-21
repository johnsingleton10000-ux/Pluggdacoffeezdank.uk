# DCBD / Da Cofeez Dank

Connected ecosystem site for **PluggdaCoffeezDank.uk**.

This is not a generic shop template. The live site is a DCBD world: Vault commerce, Estate membership, AI Blood Test, avatars, decks, cards, XP, Flip Three, trading and community — one visual language.

## What is live

- 18+ age gate
- Home universe (graffiti hero, vault carousel, Blood Seat plaque)
- Shop + vaults using the original 52-product launch catalogue and prices
- Product pages as collectible cards
- My Stash / waistband with **server-priced** WhatsApp checkout
- Estate Born+ membership at **£8.99/month** (existing Stripe link)
- Personality Blood Test (server-side scoring → avatar + starter deck)
- Account, My Deck, Cards, Flip Three, Community, Trading
- Education, privacy, terms
- Existing DCBD SVG artwork preserved in `public/`

## What was preserved

Legacy storefront files live in `legacy/storefront/` (do not delete). Catalogue prices were copied from `products.js`, not invented.

## Architecture

```
USER
├── MEMBERSHIP
├── PROFILE / ESTATE NAME
├── AVATAR (Blood Test)
├── DECK
├── CARD COLLECTION
├── XP LEDGER
├── PURCHASE HISTORY (WhatsApp / Stripe)
├── REWARDS
├── TRADES
└── GAME HISTORY
```

Shop, game, membership, cards and XP are separate modules. The shop still works if Flip Three is idle.

Prices, checkout totals and Blood Test results are computed on the server. The browser can display them; it is not the source of truth.

## Stack

Next.js 14 · React 18 · Tailwind CSS · Framer Motion · Stripe (membership) · WhatsApp (product orders)

Supabase schema is in `supabase/migrations/` for when credentials are attached. Local player state currently persists in the browser so the loop is playable without a database.

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build
npm run typecheck
```

## Environment

See `.env.example`. `STRIPE_SECRET_KEY` is only required for the programmatic Stripe session route. The live Estate Born+ payment link already exists.

## Compliance

18+ only. Follow UK law. Product claims, payment routes and delivery methods must be verified before public sale.
