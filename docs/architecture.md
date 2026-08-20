# DCBD foundation architecture

## Intent

DCBD is one ecosystem, not a set of adjacent products. A single authenticated
user ID anchors profile, progression, membership, Blood Test, avatar, decks,
cards, purchases, community activity, trades and Flip history.

This foundation defines system boundaries without inventing product rules.

## Application boundaries

| Area | Location | Responsibility |
| --- | --- | --- |
| Routes and layouts | `app/` | Next.js composition, route states and metadata |
| Reusable interface | `components/` | Semantic UI primitives and composed sections |
| Product configuration | `config/` | Approved navigation, pricing and capabilities |
| Domain contracts | `domains/` | Business vocabulary and provider-neutral interfaces |
| Authentication | `auth/` | Authorization policy contracts |
| Data access | `data/` | Repository interfaces; no UI concerns |
| External services | `services/` | Replaceable provider adapters |
| Shared primitives | `types/`, `lib/` | IDs, timestamps and small utilities |
| Persistence | `supabase/` | Versioned schema and Row Level Security |

Dependencies should point inward: routes can use components and services;
components can use domain types; domains do not import visual components or
provider SDKs.

## Trusted state

The browser may request a change, but it never decides these values:

- membership tier or status;
- XP credits, debits or balance;
- card ownership or trade completion;
- paid-order rewards;
- Blood Test scores and assigned identity;
- Flip outcomes and progression.

Those operations belong in authenticated server actions or route handlers.
They must call a domain service, persist an auditable event and use an
idempotency key where a provider can retry.

## Foundation database

The initial migration creates only entities needed to anchor the first player
foundation:

- `profiles`;
- `membership_tiers` and `profile_memberships`;
- append-only `xp_transactions` plus a derived summary view;
- `blood_test_submissions` and server-produced `blood_test_results`.

The four approved membership prices are seeded, while `capabilities` remains
empty until benefits are specified. Future migrations should add archetypes,
avatars, decks, cards and ownership before adding trade or Flip records that
reference them.

## Planned relationship path

```text
auth.users
  └─ profiles
      ├─ profile_memberships ─ membership_tiers
      ├─ xp_transactions
      ├─ blood_test_submissions ─ blood_test_results
      ├─ player_avatars ─ avatar_definitions
      ├─ decks ─ deck_revisions ─ card_ownership ─ cards
      ├─ orders ─ order_rewards
      ├─ forum_profiles ─ posts/comments
      ├─ trades ─ card_ownership_events
      └─ flip_matches ─ match_participants
```

Ownership history should be event-based. A transfer updates current ownership
inside one database transaction and appends an immutable ownership event.

## AI and deterministic evaluation

`services/ai/identity-provider.ts` is the provider boundary. It does not select
a vendor. Store questionnaire, scoring and provider versions with every
result. Weighted scoring should remain deterministic where possible; an AI
provider may enrich names or personality text but must not bypass validated
archetype and avatar constraints.

## Adding a system

1. Confirm its business rules and authority model.
2. Extend the domain contract without importing a provider SDK.
3. Add a migration with ownership constraints, indexes and RLS.
4. Implement a repository or provider adapter.
5. Expose the smallest server-side operation.
6. Add UI states for loading, empty, error and success.
7. Test authorization and idempotency before enabling navigation.
