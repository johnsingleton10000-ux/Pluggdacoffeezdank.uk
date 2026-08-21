# DCBD Estate

DCBD is a Next.js application that connects the brand's commerce, membership,
AI onboarding, collectible cards, deck identity, Flip Three and community
concepts through one visual system.

## Current build

This iteration delivers the Foundation and Home stages:

- responsive DCBD navigation and 18+ entry gate
- reusable dark-luxury, graffiti and collectible-card design system
- featured Vault catalogue sourced from the supplied product data
- product-to-card-to-game reward-flow explanation
- deterministic onboarding/profile preview for Attack, Control and Defence
- Estate identity and progression dashboard
- collectible card collection and interactive Flip Three preview
- backend-configured membership presentation
- community activity and direct WhatsApp contact
- reduced-motion and touchscreen-friendly responsive states

Authentication, persistent card ownership, XP transactions, AI generation,
authoritative checkout, trading and multiplayer game state are intentionally
left for their respective backend phases. The browser does not determine final
prices, entitlement, ownership or reward issuance.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

The application uses the Next.js App Router and is Vercel-compatible. Configure
server-side secrets in the deployment environment; never expose secret keys in
client-side environment variables.

## Project map

- `app/` — routes, metadata, global design system and server endpoints
- `components/DcbdWorld.js` — interactive ecosystem sections
- `lib/dcbd-data.js` — shared navigation, product and collection data
- `public/images/` — repository-hosted collectible artwork
- `app/api/checkout/route.js` — server-only Stripe session example

## Compliance

All product names, claims, payment routes and delivery methods must be reviewed
against current UK law and platform policies before public release. The site is
18+ and makes no medical claims.
