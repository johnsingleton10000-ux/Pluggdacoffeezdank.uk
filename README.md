# DCBD ecosystem

The production foundation for a connected DCBD player, progression, card,
community, commerce, and future Flip experience. It is intentionally a
foundation, not placeholder implementations of unspecified features.

## Stack

- Next.js App Router, React, and strict TypeScript
- Tailwind CSS with central design tokens
- Provider-neutral authentication, data, and AI service contracts
- Supabase-ready SQL with Row Level Security
- Vitest and ESLint

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## Quality checks

```bash
npm run check
npm run build
```

## Configuration

`NEXT_PUBLIC_SITE_URL` is the only value needed for the current interface.
Supabase variables in `.env.example` are intentionally empty until a project
and authentication stage are approved. Never place service-role, payment, AI,
or webhook secrets in a `NEXT_PUBLIC_*` variable.

## Architecture

See [`docs/architecture.md`](docs/architecture.md) for system boundaries,
persistence scope, security rules, planned relationships, and explicitly
deferred decisions.

The existing static storefront source and supplied artwork remain in the
repository as legacy/reference material. The active application is under
`src/`.
