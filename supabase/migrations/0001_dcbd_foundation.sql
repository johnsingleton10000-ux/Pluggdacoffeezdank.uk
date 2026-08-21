-- DCBD foundation schema. Apply when Supabase credentials are configured.
-- Frontend never decides ownership; these tables are the source of truth.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  estate_name text unique,
  membership_tier text not null default 'free',
  created_at timestamptz not null default now()
);

create table if not exists public.xp_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  amount integer not null check (amount > 0),
  direction text not null check (direction in ('earn', 'spend')),
  source text not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.card_ownership (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  card_id text not null,
  qty integer not null default 0 check (qty >= 0),
  in_deck boolean not null default false,
  trade_listed boolean not null default false,
  unique (user_id, card_id)
);

create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  offering_user uuid not null references public.profiles (id),
  receiving_user uuid not null references public.profiles (id),
  offered_card_ids text[] not null,
  requested_card_ids text[] not null,
  status text not null check (status in ('offered', 'accepted', 'rejected', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id),
  product_ids text[] not null,
  total_gbp numeric(10,2) not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.xp_ledger enable row level security;
alter table public.card_ownership enable row level security;
alter table public.trades enable row level security;
alter table public.orders enable row level security;
