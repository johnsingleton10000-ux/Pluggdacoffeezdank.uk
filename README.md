# DCBD

Connected ecosystem foundation for membership, XP, collection, community and Flip.

This repository is no longer a static HTML storefront. The live application is a Next.js App Router app with TypeScript, Tailwind CSS and a domain-service architecture. The previous storefront and JavaScript Next.js pages are preserved under `legacy/`.

## Current stage

Foundation only.

Live routes:

- `/` Home
- `/account` Account sign-in and identity
- `/education` Preserved education page
- `/privacy` and `/terms`

These sections are reserved in navigation and are not built yet:

Membership, Blood Test, My Avatar, My Deck, Collection, Flip, Community, Trading, Shop.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run typecheck
npm run lint
npm run build
```

## Required configuration

Authentication and the account profile need a Supabase project.

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the project URL and anon key into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Put the service role key in `SUPABASE_SERVICE_ROLE_KEY`. Never expose this key to the browser.
4. Run `supabase/migrations/0001_foundation.sql` in the Supabase SQL editor.
5. Set `NEXT_PUBLIC_SITE_URL` to the deployed origin.

Until those values are present, the site still runs. Account shows a configuration empty state.

`STRIPE_SECRET_KEY` is reserved for a later ecommerce stage. Checkout currently returns HTTP 501.

## Architecture

```
app/                 Routes and server actions
components/          UI design system, layout, page sections
config/              Membership tiers, navigation, archetypes, avatar slots
types/               Domain contracts
services/            Auth, membership, XP, Blood Test, avatar, deck, cards,
                     ecommerce, forum, trading, Flip, AI
lib/                 Supabase clients, env, security
data/                Preserved launch catalogue (not a live shop)
supabase/            Foundation migration and planned schema
legacy/              Previous static storefront and JS pages
public/              Existing artwork and assets
```

Business rules live in `services/` and `config/`. Visual components read tokens from CSS variables, so colours are not locked inside individual components.

## Security

- XP, membership and card ownership must be changed server-side.
- Row Level Security is included in the foundation migration.
- `record_xp_transaction` is a security-definer function granted only to `service_role`.
- Clients may update username and display name only.

## Design tokens

Colours, type and radii are CSS variables in `app/globals.css`. Tailwind maps those variables rather than hard-coding brand colours in components.

## Vercel

This is a Next.js app. In each Vercel project connected to this repo:

1. Framework Preset: **Next.js**
2. Build Command: `next build` (or leave the Next.js default)
3. Output Directory: leave empty / default (do not set `public` or `.`)
4. Install Command: `npm install`
5. Turn **off** dashboard overrides that were used for the old static HTML storefront

A `vercel.json` in the repo forces the Next.js framework and build command so preview deploys are not treated as static HTML.

## Legal

18+ only. Educational copy is not medical advice. Product claims, payment routes and delivery methods must be checked before any shop launch.
