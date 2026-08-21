-- DCBD foundation schema. Apply when Supabase is connected.
-- Ownership, XP and trades are server-authoritative.

create table if not exists profiles (
  id uuid primary key,
  estate_name text,
  membership_tier text not null default 'street',
  xp_current integer not null default 0,
  xp_earned integer not null default 0,
  xp_spent integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id),
  amount integer not null,
  direction text not null check (direction in ('earn', 'spend')),
  source text not null,
  source_ref text,
  note text,
  created_at timestamptz not null default now(),
  created_by text not null default 'system'
);

create table if not exists card_ownership (
  id uuid primary key default gen_random_uuid(),
  card_id text not null,
  owner_id uuid not null references profiles(id),
  source text not null,
  quantity integer not null default 1,
  trade_status text not null default 'tradeable',
  acquired_at timestamptz not null default now()
);

create table if not exists trades (
  id uuid primary key default gen_random_uuid(),
  initiator_id uuid not null references profiles(id),
  recipient_id uuid not null references profiles(id),
  offered jsonb not null default '[]',
  requested jsonb not null default '[]',
  status text not null default 'proposed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists flip_matches (
  id uuid primary key default gen_random_uuid(),
  player_one_id uuid not null references profiles(id),
  status text not null default 'in_progress',
  winner_id uuid,
  payload jsonb not null default '{}',
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
