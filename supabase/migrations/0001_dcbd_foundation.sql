-- DCBD foundation schema
-- Apply in Supabase SQL editor or via the CLI when the project is connected.
-- Do not invent benefit rules, card stats, XP rewards or game mechanics here.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Reference data
-- ---------------------------------------------------------------------------

create table if not exists public.membership_tiers (
  id text primary key check (id in ('free', 'estate', 'elite', 'founder')),
  display_name text not null,
  price_gbp_monthly numeric(10,2) not null check (price_gbp_monthly >= 0),
  sort_order integer not null unique
);

insert into public.membership_tiers (id, display_name, price_gbp_monthly, sort_order)
values
  ('free', 'Free', 0, 0),
  ('estate', 'Estate', 5.99, 1),
  ('elite', 'Elite', 12.99, 2),
  ('founder', 'Founder', 20.00, 3)
on conflict (id) do update
set display_name = excluded.display_name,
    price_gbp_monthly = excluded.price_gbp_monthly,
    sort_order = excluded.sort_order;

create table if not exists public.membership_benefits (
  id uuid primary key default gen_random_uuid(),
  tier_id text not null references public.membership_tiers(id) on delete cascade,
  key text not null,
  config jsonb not null default '{}'::jsonb,
  enabled boolean not null default false,
  unique (tier_id, key)
);

create table if not exists public.archetypes (
  id text primary key check (id in (
    'control',
    'attack',
    'defence',
    'control_attack',
    'control_defence',
    'attack_defence',
    'balanced'
  )),
  family text not null,
  label text not null
);

insert into public.archetypes (id, family, label)
values
  ('control', 'primary', 'Control'),
  ('attack', 'primary', 'Attack'),
  ('defence', 'primary', 'Defence'),
  ('control_attack', 'hybrid', 'Control / Attack'),
  ('control_defence', 'hybrid', 'Control / Defence'),
  ('attack_defence', 'hybrid', 'Attack / Defence'),
  ('balanced', 'hybrid', 'Balanced')
on conflict (id) do update
set family = excluded.family,
    label = excluded.label;

-- ---------------------------------------------------------------------------
-- Users / profiles
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_id uuid,
  membership_tier text not null default 'free' references public.membership_tiers(id),
  current_xp integer not null default 0 check (current_xp >= 0),
  earned_xp integer not null default 0 check (earned_xp >= 0),
  spent_xp integer not null default 0 check (spent_xp >= 0),
  archetype_id text references public.archetypes(id),
  active_deck_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tier text not null references public.membership_tiers(id),
  status text not null default 'active' check (status in ('inactive', 'active', 'past_due', 'cancelled')),
  started_at timestamptz not null default now(),
  current_period_end timestamptz,
  provider text,
  provider_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger memberships_set_updated_at
before update on public.memberships
for each row execute function public.set_updated_at();

create index if not exists memberships_user_id_idx on public.memberships (user_id);

-- ---------------------------------------------------------------------------
-- XP ledger
-- ---------------------------------------------------------------------------

create table if not exists public.xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount integer not null check (amount > 0),
  direction text not null check (direction in ('earn', 'spend')),
  source text not null check (source in (
    'onboarding',
    'community',
    'purchase',
    'flip',
    'victory',
    'event',
    'trading',
    'membership',
    'adjustment'
  )),
  reference_type text,
  reference_id text,
  note text,
  created_at timestamptz not null default now(),
  created_by uuid
);

create index if not exists xp_transactions_user_id_created_at_idx
  on public.xp_transactions (user_id, created_at desc);

create or replace function public.record_xp_transaction(
  p_user_id uuid,
  p_amount integer,
  p_direction text,
  p_source text,
  p_reference_type text default null,
  p_reference_id text default null,
  p_note text default null,
  p_created_by uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
  current_balance integer;
begin
  if p_amount is null or p_amount <= 0 then
    raise exception 'XP amounts must be positive integers';
  end if;

  insert into public.xp_transactions (
    user_id, amount, direction, source, reference_type, reference_id, note, created_by
  ) values (
    p_user_id, p_amount, p_direction, p_source, p_reference_type, p_reference_id, p_note, p_created_by
  )
  returning id into new_id;

  if p_direction = 'earn' then
    update public.profiles
    set current_xp = current_xp + p_amount,
        earned_xp = earned_xp + p_amount,
        updated_at = now()
    where id = p_user_id;
  elsif p_direction = 'spend' then
    select current_xp into current_balance
    from public.profiles
    where id = p_user_id
    for update;

    if current_balance is null or current_balance < p_amount then
      raise exception 'XP spend exceeds current balance';
    end if;

    update public.profiles
    set current_xp = current_xp - p_amount,
        spent_xp = spent_xp + p_amount,
        updated_at = now()
    where id = p_user_id;
  else
    raise exception 'Unknown XP direction';
  end if;

  return new_id;
end;
$$;

revoke all on function public.record_xp_transaction(uuid, integer, text, text, text, text, text, uuid) from public;
revoke all on function public.record_xp_transaction(uuid, integer, text, text, text, text, text, uuid) from anon;
revoke all on function public.record_xp_transaction(uuid, integer, text, text, text, text, text, uuid) from authenticated;
grant execute on function public.record_xp_transaction(uuid, integer, text, text, text, text, text, uuid) to service_role;

-- ---------------------------------------------------------------------------
-- Blood Test, avatars, decks
-- ---------------------------------------------------------------------------

create table if not exists public.blood_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed')),
  answers jsonb not null default '[]'::jsonb,
  control_score integer,
  attack_score integer,
  defence_score integer,
  archetype_id text references public.archetypes(id),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger blood_tests_set_updated_at
before update on public.blood_tests
for each row execute function public.set_updated_at();

create table if not exists public.avatars (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text,
  artwork_url text,
  is_core_stock boolean not null default true,
  hybrid_family text references public.archetypes(id),
  control_bias integer,
  attack_bias integer,
  defence_bias integer,
  sort_order integer not null,
  created_at timestamptz not null default now()
);

create or replace function public.enforce_core_stock_avatar_limit()
returns trigger
language plpgsql
as $$
declare
  core_count integer;
begin
  if new.is_core_stock then
    select count(*) into core_count
    from public.avatars
    where is_core_stock = true
      and id is distinct from new.id;

    if core_count >= 20 then
      raise exception 'DCBD supports exactly 20 core stock avatars';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists avatars_core_stock_limit on public.avatars;
create trigger avatars_core_stock_limit
before insert or update on public.avatars
for each row execute function public.enforce_core_stock_avatar_limit();

create table if not exists public.player_avatars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  avatar_id uuid not null references public.avatars(id),
  customization jsonb not null default '{}'::jsonb,
  locked_archetype_id text references public.archetypes(id),
  selected_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger player_avatars_set_updated_at
before update on public.player_avatars
for each row execute function public.set_updated_at();

create table if not exists public.decks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  personality text,
  archetype_id text references public.archetypes(id),
  is_hybrid boolean not null default false,
  is_starter boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger decks_set_updated_at
before update on public.decks
for each row execute function public.set_updated_at();

create table if not exists public.deck_cards (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.decks(id) on delete cascade,
  card_id uuid not null,
  quantity integer not null default 1 check (quantity > 0),
  position integer,
  unique (deck_id, card_id)
);

create table if not exists public.deck_history (
  id uuid primary key default gen_random_uuid(),
  deck_id uuid not null references public.decks(id) on delete cascade,
  event text not null check (event in ('created', 'renamed', 'modified', 'archived')),
  note text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Cards and ownership
-- ---------------------------------------------------------------------------

create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  artwork_url text,
  rarity text,
  category text,
  attack integer,
  defence integer,
  control integer,
  abilities text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger cards_set_updated_at
before update on public.cards
for each row execute function public.set_updated_at();

create table if not exists public.card_ownership (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.cards(id),
  user_id uuid not null references public.profiles(id) on delete cascade,
  source text not null,
  collection_status text not null default 'owned' check (collection_status in ('unowned', 'owned', 'hidden')),
  trade_status text not null default 'not_eligible' check (trade_status in ('not_eligible', 'eligible', 'listed', 'locked')),
  acquired_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger card_ownership_set_updated_at
before update on public.card_ownership
for each row execute function public.set_updated_at();

create index if not exists card_ownership_user_id_idx on public.card_ownership (user_id);

-- ---------------------------------------------------------------------------
-- Ecommerce
-- ---------------------------------------------------------------------------

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft', 'pending', 'paid', 'fulfilled', 'cancelled', 'refunded')),
  total_gbp numeric(10,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  quantity integer not null check (quantity > 0),
  unit_price_gbp numeric(10,2) not null
);

create table if not exists public.order_rewards (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('xp', 'card', 'membership', 'other')),
  reference_id text,
  payload jsonb not null default '{}'::jsonb,
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Community, trading, Flip
-- ---------------------------------------------------------------------------

create table if not exists public.forum_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  topic text not null default 'general' check (topic in ('general', 'cards', 'flip', 'strategy', 'products', 'trades')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger forum_posts_set_updated_at
before update on public.forum_posts
for each row execute function public.set_updated_at();

create table if not exists public.forum_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.forum_posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger forum_comments_set_updated_at
before update on public.forum_comments
for each row execute function public.set_updated_at();

create table if not exists public.trades (
  id uuid primary key default gen_random_uuid(),
  initiator_user_id uuid not null references public.profiles(id) on delete cascade,
  counterparty_user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft', 'offered', 'accepted', 'declined', 'cancelled', 'completed')),
  offered jsonb not null default '[]'::jsonb,
  requested jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create trigger trades_set_updated_at
before update on public.trades
for each row execute function public.set_updated_at();

create table if not exists public.flip_matches (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'void')),
  participants jsonb not null default '[]'::jsonb,
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger flip_matches_set_updated_at
before update on public.flip_matches
for each row execute function public.set_updated_at();

-- Optional later FKs that would create circular table creation order
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_avatar_id_fkey'
  ) then
    alter table public.profiles
      add constraint profiles_avatar_id_fkey
      foreign key (avatar_id) references public.avatars(id);
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'profiles_active_deck_id_fkey'
  ) then
    alter table public.profiles
      add constraint profiles_active_deck_id_fkey
      foreign key (active_deck_id) references public.decks(id);
  end if;

  if not exists (
    select 1 from pg_constraint where conname = 'deck_cards_card_id_fkey'
  ) then
    alter table public.deck_cards
      add constraint deck_cards_card_id_fkey
      foreign key (card_id) references public.cards(id);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- New user bootstrap
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, membership_tier)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)), 'free');

  insert into public.memberships (user_id, tier, status)
  values (new.id, 'free', 'active');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- Users can read public reference data and their own records.
-- XP, membership and ownership mutations are not granted to clients.
-- ---------------------------------------------------------------------------

alter table public.membership_tiers enable row level security;
alter table public.membership_benefits enable row level security;
alter table public.archetypes enable row level security;
alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.xp_transactions enable row level security;
alter table public.blood_tests enable row level security;
alter table public.avatars enable row level security;
alter table public.player_avatars enable row level security;
alter table public.decks enable row level security;
alter table public.deck_cards enable row level security;
alter table public.deck_history enable row level security;
alter table public.cards enable row level security;
alter table public.card_ownership enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_rewards enable row level security;
alter table public.forum_posts enable row level security;
alter table public.forum_comments enable row level security;
alter table public.trades enable row level security;
alter table public.flip_matches enable row level security;

create policy membership_tiers_read on public.membership_tiers for select using (true);
create policy archetypes_read on public.archetypes for select using (true);
create policy avatars_read on public.avatars for select using (true);
create policy cards_read on public.cards for select using (true);
create policy membership_benefits_read on public.membership_benefits for select using (true);

create or replace function public.protect_profile_economy_columns()
returns trigger
language plpgsql
as $$
begin
  if new.current_xp is distinct from old.current_xp
     or new.earned_xp is distinct from old.earned_xp
     or new.spent_xp is distinct from old.spent_xp
     or new.membership_tier is distinct from old.membership_tier then
    if current_user not in ('postgres', 'service_role', 'supabase_admin') then
      raise exception 'XP and membership must be changed server-side';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_economy on public.profiles;
create trigger profiles_protect_economy
before update on public.profiles
for each row execute function public.protect_profile_economy_columns();

create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy memberships_select_own on public.memberships
  for select using (auth.uid() = user_id);

create policy xp_transactions_select_own on public.xp_transactions
  for select using (auth.uid() = user_id);

create policy blood_tests_own on public.blood_tests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy player_avatars_own on public.player_avatars
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy decks_own on public.decks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy deck_cards_own on public.deck_cards
  for all using (
    exists (select 1 from public.decks d where d.id = deck_id and d.user_id = auth.uid())
  )
  with check (
    exists (select 1 from public.decks d where d.id = deck_id and d.user_id = auth.uid())
  );

create policy deck_history_own on public.deck_history
  for select using (
    exists (select 1 from public.decks d where d.id = deck_id and d.user_id = auth.uid())
  );

create policy card_ownership_select_own on public.card_ownership
  for select using (auth.uid() = user_id);

create policy orders_select_own on public.orders
  for select using (auth.uid() = user_id);

create policy order_items_select_own on public.order_items
  for select using (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );

create policy order_rewards_select_own on public.order_rewards
  for select using (auth.uid() = user_id);

create policy forum_posts_read on public.forum_posts for select using (true);
create policy forum_posts_insert_own on public.forum_posts
  for insert with check (auth.uid() = user_id);
create policy forum_posts_update_own on public.forum_posts
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy forum_comments_read on public.forum_comments for select using (true);
create policy forum_comments_insert_own on public.forum_comments
  for insert with check (auth.uid() = user_id);
create policy forum_comments_update_own on public.forum_comments
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy trades_participants on public.trades
  for select using (auth.uid() = initiator_user_id or auth.uid() = counterparty_user_id);

create policy flip_matches_read_own on public.flip_matches
  for select using (
    participants @> jsonb_build_array(jsonb_build_object('userId', auth.uid()::text))
    or participants @> jsonb_build_array(jsonb_build_object('user_id', auth.uid()::text))
  );
