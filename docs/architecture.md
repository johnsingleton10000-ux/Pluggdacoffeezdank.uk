# DCBD foundation architecture

## Boundaries

- `src/app`: routes, route-level loading and error states, global styles.
- `src/components`: reusable visual components and layout only.
- `src/features`: domain types and rules grouped by ecosystem capability.
- `src/auth`: authentication contracts. No provider is selected yet.
- `src/data`: repository contracts between domain services and persistence.
- `src/services`: server-side orchestration and provider abstractions.
- `src/config`: product-owner configuration such as membership prices and navigation.
- `src/types` and `src/utils`: shared primitives without business policy.
- `supabase/migrations`: opt-in database foundation and Row Level Security.

Visual components do not own membership, XP, game, card, or commerce rules.
Provider-specific code should implement the existing contracts rather than leaking
SDK objects through the application.

## Initial persistence scope

The first migration creates only the account and progression records needed by
the foundation:

- `profiles`: public player identity fields, linked one-to-one to `auth.users`.
- `memberships`: authoritative, historical membership state.
- `xp_transactions`: append-only, idempotent progression ledger.
- `blood_tests`: versioned answers and weighted result payloads.

Clients can read only their own records. Clients cannot write membership, XP, or
Blood Test results. Profile writes are restricted to `username` and
`display_name`; avatar and archetype assignment remain server-owned.

The migration is not applied automatically. Supabase project details and an
authentication flow must be agreed before deployment.

## Planned relationships

The following entities are intentionally represented by TypeScript contracts or
this relationship plan, not speculative tables:

```text
auth.users
  └─ profile
      ├─ memberships
      ├─ xp_transactions
      ├─ blood_tests ─ archetype assignment ─ avatar
      ├─ decks ─ deck_revisions ─ card_ownership ─ cards
      ├─ orders ─ order_rewards ─ XP/cards/membership
      ├─ forum_profile ─ posts ─ comments
      ├─ trades ─ card_ownership transfers
      └─ flip_matches ─ deck_revision + avatar + progression events
```

Tables should be added with the feature that needs them, once lifecycle rules
and permissions are specified. IDs should be UUIDs, timestamps should be UTC,
and history-bearing records should be appended or versioned rather than
silently overwritten.

## Security model

1. Supabase Auth (if selected) owns identity; a profile references that identity.
2. Row Level Security is mandatory for every user-owned table.
3. Privileged writes happen in server-only services or atomic database
   functions. A browser-supplied XP balance, tier, ownership ID, or reward is
   never authoritative.
4. Reward-producing events use idempotency keys and references to their source.
5. Order rewards, ownership transfers, and match outcomes must commit
   atomically when those systems are introduced.
6. Public environment variables contain only values safe for browsers. Service
   role keys, payment secrets, webhooks, and AI credentials stay server-side.

## Decisions deliberately deferred

- Blood Test questions, weight values, and archetype thresholds.
- Names, artwork, and score profiles for the 20 stock avatars.
- Card rarity taxonomy, statistics, abilities, and probabilities.
- Starter-deck composition and Flip rules.
- Membership benefits and capability mapping.
- Product catalogue, rewards, payments, and subscriptions.
- Forum reputation and XP rules.
- Trading eligibility and settlement rules.
- AI provider and model.
