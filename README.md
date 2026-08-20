# DCBD

DCBD is a connected ecosystem: ecommerce, membership, community, XP, collectible cards, trading and Flip.

This repository currently contains the **technical foundation only**. Shop checkout, forum, Flip rules, Blood Test questions, the 20 avatars, card mechanics, trading and subscriptions are not implemented yet.

## Stack

- Next.js 14 App Router
- TypeScript (strict)
- Tailwind CSS with design tokens
- Supabase-ready auth and Postgres schema
- Stripe route preserved from the previous storefront, unused by the new UI

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run typecheck
npm run lint
npm run build
```

## What this foundation includes

- Design system: colours, type, buttons, panels, cards, badges, nav, modals, forms, XP display, rarity indicators
- Mobile-first shell with live Home / Account navigation and later sections listed, not built
- Domain modules under `domains/` for membership, XP ledger, Blood Test scoring, avatars, decks, cards, ecommerce rewards hooks, forum, trading, Flip and an AI provider abstraction
- Server-side services that refuse to trust client XP, membership or ownership
- Supabase SQL + RLS in `supabase/migrations/0001_dcbd_foundation.sql`
- Existing artwork, product placeholders and the previous static storefront kept under `legacy/` and `assets/`

## Configuration still required

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` | Auth and database |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` | Browser/server user client |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local` (server only) | XP ledger writes and privileged jobs |
| `STRIPE_SECRET_KEY` | `.env.local` (server only) | Existing `/api/checkout` route |
| `NEXT_PUBLIC_SITE_URL` | `.env.local` | Checkout return URLs |

After creating a Supabase project, run `supabase/migrations/0001_dcbd_foundation.sql` in the SQL editor.

The app boots without these values. Authentication, profiles and XP persistence stay inactive until they are set.

## Layout for later agents

```
app/                 routes and API
components/ui/       design system
components/layout/   shell, nav, age gate
domains/             business logic, no UI
lib/auth/            Supabase clients and session
lib/data/            server data access
lib/services/        XP, membership, profile
lib/security/        authorization helpers
lib/config/          site, nav, feature flags
supabase/migrations  database and RLS
legacy/              previous static storefront, preserved
```

Do not invent game rules, membership benefits, XP amounts, Blood Test questions, avatars or product prices in later work unless the product owner specifies them.
