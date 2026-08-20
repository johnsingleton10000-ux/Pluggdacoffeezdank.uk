# DCBD ecosystem

The production foundation for one connected DCBD player journey across
identity, progression, collecting, community, commerce and Flip.

This stage intentionally does **not** implement final game rules, membership
benefits, rewards, products, payments, the complete Blood Test or an AI
provider.

## Stack

- Next.js App Router
- React and strict TypeScript
- Tailwind CSS with semantic design tokens
- Supabase-ready SQL and Row Level Security
- Provider-neutral domain and service contracts

## Start locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

No environment values are required to view the foundation page. Supabase and
AI variables are reserved for later stages.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Structure

```text
app/          routes, layouts and route states
auth/         authorization contracts
components/   reusable UI and composed foundation sections
config/       approved product configuration
data/         repository interfaces
domains/      account, XP, membership, cards, decks and future systems
services/     replaceable external-provider boundaries
supabase/     versioned schema and RLS policies
types/        shared primitives
docs/         architecture decisions and extension guidance
```

See [`docs/architecture.md`](docs/architecture.md) for trust boundaries,
database staging and the process for adding each future system.

## Legacy files

The root-level static prototype (`index.html`, `app.js`, `products.js`,
`styles.css` and `assets/`) is retained for source history and asset recovery.
The deployable application is the Next.js project under `app/`.
