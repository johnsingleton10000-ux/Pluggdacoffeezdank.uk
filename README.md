# DCBD Estate

The active DCBD website is a Next.js App Router application that establishes the visual and structural foundation for the connected DCBD ecosystem.

## Current scope

This branch implements Phase 1 and Phase 2:

- reusable DCBD design system
- responsive site shell, navigation and age gate
- DCBD world homepage
- commerce vault architecture preview
- AI alignment and avatar onboarding preview
- collectible card and deck connection
- Flip Three arena preview
- membership entitlement preview
- community architecture preview

Live commerce, authentication, memberships, AI assignment, card ownership, XP, gameplay and community posting are intentionally deferred until their server-side systems are connected.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run build
npm audit
```

## Environment variables

Copy `.env.example` to `.env.local` and supply deployment values:

- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_FOUNDER_PRICE_ID`

Stripe prices remain authoritative in Stripe. The checkout route accepts a configured Stripe Price ID and does not trust or hard-code a browser-supplied amount.

## Deployment

Deploy with the Vercel **Next.js** framework preset. The committed `vercel.json` identifies the active application as Next.js.

The root-level `index.html`, `styles.css`, `app.js` and `products.js` belong to the earlier static storefront prototype. They remain in the repository as legacy reference material and are not the active deployment target.

## Product and pricing status

The legacy catalogue contains placeholders and must not be treated as authoritative inventory. The active UI deliberately avoids presenting placeholder products or prices as live. Future catalogue data, availability, discounts and reward eligibility must come from the configured commerce backend and be validated server-side.
