create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_id uuid,
  membership_tier text not null default 'FREE'
    check (membership_tier in ('FREE', 'ESTATE', 'ELITE', 'FOUNDER')),
  xp_balance integer not null default 0 check (xp_balance >= 0),
  archetype text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tier text not null check (tier in ('FREE', 'ESTATE', 'ELITE', 'FOUNDER')),
  price_in_pence integer not null default 0 check (price_in_pence >= 0),
  status text not null default 'ACTIVE'
    check (status in ('ACTIVE', 'CANCELLED', 'PAST_DUE', 'INCOMPLETE')),
  provider_customer_id text,
  provider_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount integer not null check (amount <> 0),
  balance_after integer not null check (balance_after >= 0),
  source text not null,
  reference_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.blood_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  questionnaire_version integer not null check (questionnaire_version > 0),
  answers jsonb not null default '[]'::jsonb,
  scores jsonb,
  primary_archetype text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.archetypes (
  code text primary key,
  name text not null,
  description text,
  metadata jsonb not null default '{}'::jsonb
);

create table public.avatars (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  archetype text not null,
  artwork_url text,
  is_core_avatar boolean not null default true,
  customization_schema jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles
  add constraint profiles_avatar_id_fkey
  foreign key (avatar_id) references public.avatars(id) on delete set null;

create table public.player_avatars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  avatar_id uuid not null references public.avatars(id),
  customization jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id)
);

create table public.decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text,
  personality text,
  archetype text,
  version integer not null default 1 check (version > 0),
  is_starter_deck boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cards (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  artwork_url text,
  rarity text,
  category text,
  attack integer,
  defence integer,
  control integer,
  abilities jsonb not null default '[]'::jsonb,
  source text,
  created_at timestamptz not null default now()
);

create table public.card_ownership (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.cards(id),
  owner_id uuid not null references auth.users(id) on delete cascade,
  collection_status text not null default 'COLLECTED'
    check (collection_status in ('COLLECTED', 'IN_DECK', 'ARCHIVED')),
  trade_status text not null default 'LOCKED'
    check (trade_status in ('LOCKED', 'ELIGIBLE', 'LISTED', 'IN_TRADE')),
  acquired_from text,
  acquired_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  provider_order_id text unique,
  status text not null default 'PENDING'
    check (status in ('PENDING', 'PAID', 'FULFILLED', 'CANCELLED', 'REFUNDED')),
  total_in_pence integer check (total_in_pence >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_rewards (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  reward_type text not null,
  reward_reference_id text,
  granted_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.forum_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.forum_posts(id) on delete cascade,
  author_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.trades (
  id uuid primary key default gen_random_uuid(),
  initiator_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'DRAFT'
    check (status in ('DRAFT', 'PROPOSED', 'ACCEPTED', 'DECLINED', 'CANCELLED', 'COMPLETED')),
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.flip_matches (
  id uuid primary key default gen_random_uuid(),
  player_one_id uuid not null references auth.users(id) on delete cascade,
  player_two_id uuid references auth.users(id) on delete set null,
  player_one_deck_id uuid references public.decks(id) on delete set null,
  player_two_deck_id uuid references public.decks(id) on delete set null,
  status text not null default 'PENDING'
    check (status in ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  winner_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index xp_transactions_user_created_idx on public.xp_transactions(user_id, created_at desc);
create index card_ownership_owner_idx on public.card_ownership(owner_id);
create index forum_comments_post_idx on public.forum_comments(post_id, created_at);
create index trades_participants_idx on public.trades(initiator_id, recipient_id);

alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.xp_transactions enable row level security;
alter table public.blood_tests enable row level security;
alter table public.archetypes enable row level security;
alter table public.avatars enable row level security;
alter table public.player_avatars enable row level security;
alter table public.decks enable row level security;
alter table public.cards enable row level security;
alter table public.card_ownership enable row level security;
alter table public.orders enable row level security;
alter table public.order_rewards enable row level security;
alter table public.forum_posts enable row level security;
alter table public.forum_comments enable row level security;
alter table public.trades enable row level security;
alter table public.flip_matches enable row level security;

create policy "profiles are readable by their owner"
  on public.profiles for select using (auth.uid() = id);
create policy "profiles are editable by their owner"
  on public.profiles for update using (auth.uid() = id);

create policy "memberships are readable by their owner"
  on public.memberships for select using (auth.uid() = user_id);
create policy "xp transactions are readable by their owner"
  on public.xp_transactions for select using (auth.uid() = user_id);
create policy "blood tests are owned by their player"
  on public.blood_tests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "archetypes are public reference data"
  on public.archetypes for select using (true);
create policy "avatars are public reference data"
  on public.avatars for select using (true);
create policy "cards are public reference data"
  on public.cards for select using (true);

create policy "player avatars are owned by their player"
  on public.player_avatars for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "decks are owned by their player"
  on public.decks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "card ownership is readable by its owner"
  on public.card_ownership for select using (auth.uid() = owner_id);
create policy "orders are readable by their owner"
  on public.orders for select using (auth.uid() = user_id);
create policy "order rewards are readable by their owner"
  on public.order_rewards for select using (auth.uid() = user_id);

create policy "forum posts are public to read"
  on public.forum_posts for select using (true);
create policy "players create their own forum posts"
  on public.forum_posts for insert with check (auth.uid() = author_id);
create policy "players edit their own forum posts"
  on public.forum_posts for update using (auth.uid() = author_id);
create policy "forum comments are public to read"
  on public.forum_comments for select using (true);
create policy "players create their own comments"
  on public.forum_comments for insert with check (auth.uid() = author_id);
create policy "players edit their own comments"
  on public.forum_comments for update using (auth.uid() = author_id);

create policy "trade participants can read trades"
  on public.trades for select using (auth.uid() in (initiator_id, recipient_id));
create policy "initiators create trades"
  on public.trades for insert with check (auth.uid() = initiator_id);
create policy "participants update trades"
  on public.trades for update using (auth.uid() in (initiator_id, recipient_id));
create policy "match participants can read matches"
  on public.flip_matches for select
  using (auth.uid() in (player_one_id, player_two_id));
