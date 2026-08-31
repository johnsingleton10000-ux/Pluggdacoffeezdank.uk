-- =============================================================================
-- DCBD University — Layer 1, Stage 1: Database & Server Models
-- E-commerce foundation for Supabase / PostgreSQL
-- =============================================================================
--
-- This migration is the Layer 1 commerce source of truth. TCG collectible
-- aesthetics and stats live on products (tier_label, starch_percentage,
-- power_rating, flavor_notes, companion card copy). Account progression
-- hooks live on customers (xp_points, level) so Layer 2 (FlixFree) and
-- Layer 3 (Forum) can attach later without rewriting orders or payments.
--
-- Apply with the Supabase CLI:
--   supabase db push
-- or paste into the Supabase SQL editor.
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- 1. Custom enum types
-- ---------------------------------------------------------------------------

create type public.order_status as enum (
  'PENDING_PAYMENT',
  'PAYMENT_PROCESSING',
  'PAID',
  'PAYMENT_FAILED',
  'PAYMENT_CANCELLED',
  'PAYMENT_EXPIRED',
  'REFUND_PENDING',
  'REFUNDED'
);

create type public.payment_status as enum (
  'PENDING',
  'AUTHORIZED',
  'COMPLETED',
  'FAILED',
  'CANCELLED'
);

create type public.product_category as enum (
  'FLOWER',
  'CONCENTRATE',
  'ELIQUID',
  'VAULT_SPECIAL'
);

-- ---------------------------------------------------------------------------
-- 2. Tables
-- ---------------------------------------------------------------------------

-- Guest-capable commerce identity. xp_points / level are the reserved
-- progression columns for Layer 2 (FlixFree) and Layer 3 (Forum) accounts.
create table public.customers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  xp_points int not null default 0,
  level int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint customers_xp_points_nonnegative check (xp_points >= 0),
  constraint customers_level_positive check (level >= 1)
);

comment on table public.customers is
  'Layer 1 customer records. xp_points and level are account-progression hooks for FlixFree (Layer 2) and Forum (Layer 3).';
comment on column public.customers.xp_points is
  'Collectible XP balance. Awarded by commerce rewards; consumed by later layers.';
comment on column public.customers.level is
  'Derived account level. Starts at 1 so later layers do not need a backfill.';

-- Catalogue rows carry both commerce fields and TCG card stats.
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category public.product_category not null,
  tier_label text,
  weight_options jsonb,
  price_gbp numeric(10, 2) not null,
  starch_percentage numeric(5, 2),
  power_rating int,
  flavor_notes text[],
  companion_card_title text,
  companion_card_effect text,
  inventory_quantity int not null default 0,
  status text not null default 'ACTIVE',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_price_gbp_nonnegative check (price_gbp >= 0),
  constraint products_inventory_nonnegative check (inventory_quantity >= 0),
  constraint products_starch_percentage_range
    check (
      starch_percentage is null
      or (starch_percentage >= 0 and starch_percentage <= 100)
    ),
  constraint products_power_rating_nonnegative
    check (power_rating is null or power_rating >= 0),
  constraint products_weight_options_array
    check (
      weight_options is null
      or jsonb_typeof(weight_options) = 'array'
    )
);

comment on table public.products is
  'Sellable catalogue with TCG collectible stats (tier, starch, power, flavour, companion card).';
comment on column public.products.tier_label is
  'Collector tier, e.g. PATELLA, SUGAR, VIRUS.';
comment on column public.products.weight_options is
  'JSONB array of weight/price variants, e.g. [{"weight": "1G", "price": 55}].';
comment on column public.products.starch_percentage is
  'TCG starch stat shown on the product card.';
comment on column public.products.power_rating is
  'TCG power stat shown on the product card.';
comment on column public.products.flavor_notes is
  'Flavour tags rendered on the collectible card.';
comment on column public.products.companion_card_title is
  'Paired companion card title unlocked with this product.';
comment on column public.products.companion_card_effect is
  'Paired companion card effect text.';

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_id uuid references public.customers (id) on delete restrict,
  subtotal numeric(10, 2) not null,
  discount numeric(10, 2) not null default 0.00,
  shipping numeric(10, 2) not null default 0.00,
  total numeric(10, 2) not null,
  currency varchar(3) not null default 'GBP',
  status public.order_status not null default 'PENDING_PAYMENT',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_subtotal_nonnegative check (subtotal >= 0),
  constraint orders_discount_nonnegative check (discount >= 0),
  constraint orders_shipping_nonnegative check (shipping >= 0),
  constraint orders_total_nonnegative check (total >= 0)
);

comment on table public.orders is
  'Commerce orders. Status is payment-lifecycle oriented for TrueLayer.';
comment on column public.orders.order_number is
  'Public-facing unique order number generated by the server.';
comment on column public.orders.customer_id is
  'Nullable to allow guest checkout; ON DELETE RESTRICT preserves paid history.';

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  quantity int not null,
  unit_price numeric(10, 2) not null,
  total_price numeric(10, 2) not null,
  selected_weight text,
  created_at timestamptz not null default now(),
  constraint order_items_quantity_positive check (quantity > 0),
  constraint order_items_unit_price_nonnegative check (unit_price >= 0),
  constraint order_items_total_price_nonnegative check (total_price >= 0)
);

comment on table public.order_items is
  'Line items snapshot the unit price and selected weight at purchase time.';
comment on column public.order_items.selected_weight is
  'Chosen weight_options.weight value, e.g. 1G.';

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete restrict,
  provider text not null default 'TRUELAYER',
  provider_payment_id text,
  amount numeric(10, 2) not null,
  currency varchar(3) not null default 'GBP',
  status public.payment_status not null default 'PENDING',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  constraint payments_amount_nonnegative check (amount >= 0)
);

comment on table public.payments is
  'Provider payment attempts. provider_payment_id uniqueness makes retries idempotent.';
comment on column public.payments.provider_payment_id is
  'TrueLayer (or other provider) payment id. Unique index below prevents duplicate captures.';

create table public.payment_events (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null references public.payments (id) on delete cascade,
  provider_event_id text,
  event_type text not null,
  payload_hash varchar(64),
  processed boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table public.payment_events is
  'Append-style webhook log. provider_event_id uniqueness rejects duplicate webhooks.';
comment on column public.payment_events.payload_hash is
  'SHA-256 hex digest of the raw webhook body (64 chars).';

-- ---------------------------------------------------------------------------
-- 3. Constraints & indexes
-- ---------------------------------------------------------------------------

create index idx_orders_customer_id
  on public.orders (customer_id);

create index idx_order_items_order_id
  on public.order_items (order_id);

create index idx_payments_order_id
  on public.payments (order_id);

-- Unique index on payments(provider_payment_id) for idempotency.
-- NULLs are allowed (payment created before the provider assigns an id).
create unique index idx_payments_provider_payment_id
  on public.payments (provider_payment_id);

-- Unique index on payment_events(provider_event_id) for duplicate webhook prevention.
create unique index idx_payment_events_provider_event_id
  on public.payment_events (provider_event_id);

-- ---------------------------------------------------------------------------
-- 4. Functions & triggers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Reusable BEFORE UPDATE trigger: sets NEW.updated_at = now().';

create trigger customers_set_updated_at
  before update on public.customers
  for each row
  execute function public.set_updated_at();

create trigger products_set_updated_at
  before update on public.products
  for each row
  execute function public.set_updated_at();

create trigger orders_set_updated_at
  before update on public.orders
  for each row
  execute function public.set_updated_at();

create trigger payments_set_updated_at
  before update on public.payments
  for each row
  execute function public.set_updated_at();

-- Server-only access until Layer 1 API policies are defined.
-- With RLS on and no policies, only the service_role (Next.js server) can
-- read or write; the anon key cannot mutate payments from the browser.
alter table public.customers enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.payment_events enable row level security;
