# DCBD foundation architecture

This repository currently contains an existing storefront and the first DCBD
ecosystem foundation. The storefront assets and legacy routes remain in place;
the foundation dashboard is available at `/foundation`.

## Boundaries

- `app/` owns route composition and page-level rendering.
- `components/` owns reusable visual components and layouts.
- `config/` owns brand tokens and product-owner configuration.
- `types/` owns shared domain contracts.
- `lib/auth/` owns the authentication/session boundary.
- `lib/data/` owns repository and database integration boundaries.
- `lib/domains/` owns feature-specific contracts and server-side domain logic.
- `lib/services/` owns replaceable cross-domain services such as AI and XP.
- `supabase/migrations/` contains the reviewed database foundation and RLS policies.

Domain code should not import React components. Components should call
server-side actions or services rather than changing XP, membership, ownership or
reward state directly.

## Deliberate non-features

The foundation does not include Blood Test questions, avatar artwork, card
mechanics, game rules, membership benefits, payment processing, trading
execution or an AI provider. Their contracts exist so those systems can be
added without rewriting the account model.

## Data safety

XP transactions are append-only from the product perspective and should be
written by trusted server-side code. Card ownership, paid order state and
membership status must be verified server-side. The Supabase migration enables
RLS on every user-related table; service-role operations should only run in
server-side workflows.

## Next configuration steps

1. Create a Supabase project and apply the migration.
2. Add local environment values from `.env.example`.
3. Add a Supabase client package and implement the repository/session adapters.
4. Define product-owner rules for entitlements, assessment questions, cards and
   Flip before implementing those flows.
