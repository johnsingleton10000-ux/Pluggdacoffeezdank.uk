-- DCBD foundation schema
-- Source of truth for account, membership and XP.
-- Additional ecosystem tables are planned in supabase/future-schema.sql.

create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text,
  display_name text,
  avatar_id text,
  membership_tier text not null default 'free'
    check (membership_tier in ('free', 'estate', 'elite', 'founder')),
  xp_current integer not null default 0 check (xp_current >= 0),
  xp_earned integer not null default 0 check (xp_earned >= 0),
  xp_spent integer not null default 0 check (xp_spent >= 0),
  archetype_id text,
  starter_deck_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index profiles_username_lower_idx
  on public.profiles (lower(username))
  where username is not null;

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  tier text not null check (tier in ('free', 'estate', 'elite', 'founder')),
  status text not null check (status in ('active', 'pending', 'cancelled', 'expired')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  provider text,
  provider_ref text,
  created_at timestamptz not null default now()
);

create index memberships_user_id_idx on public.memberships (user_id);

create table public.xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  amount integer not null check (amount > 0),
  direction text not null check (direction in ('earn', 'spend')),
  source text not null,
  source_ref text,
  note text,
  created_at timestamptz not null default now(),
  created_by text not null default 'system' check (created_by in ('system', 'admin'))
);

create index xp_transactions_user_id_created_at_idx
  on public.xp_transactions (user_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.record_xp_transaction(
  p_user_id uuid,
  p_amount integer,
  p_direction text,
  p_source text,
  p_source_ref text default null,
  p_note text default null,
  p_created_by text default 'system'
)
returns public.xp_transactions
language plpgsql
security definer
set search_path = public
as $$
declare
  txn public.xp_transactions;
  current_xp integer;
begin
  if p_amount is null or p_amount <= 0 then
    raise exception 'XP amount must be a positive integer';
  end if;

  if p_direction not in ('earn', 'spend') then
    raise exception 'Invalid XP direction';
  end if;

  select xp_current into current_xp
  from public.profiles
  where id = p_user_id
  for update;

  if current_xp is null then
    raise exception 'Profile not found';
  end if;

  if p_direction = 'spend' and current_xp < p_amount then
    raise exception 'Insufficient XP';
  end if;

  insert into public.xp_transactions (
    user_id, amount, direction, source, source_ref, note, created_by
  ) values (
    p_user_id, p_amount, p_direction, p_source, p_source_ref, p_note, coalesce(p_created_by, 'system')
  )
  returning * into txn;

  update public.profiles
  set
    xp_current = xp_current + case when p_direction = 'earn' then p_amount else -p_amount end,
    xp_earned = xp_earned + case when p_direction = 'earn' then p_amount else 0 end,
    xp_spent = xp_spent + case when p_direction = 'spend' then p_amount else 0 end
  where id = p_user_id;

  return txn;
end;
$$;

alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.xp_transactions enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "profiles_update_identity"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "memberships_select_own"
  on public.memberships for select
  to authenticated
  using (user_id = auth.uid());

create policy "xp_transactions_select_own"
  on public.xp_transactions for select
  to authenticated
  using (user_id = auth.uid());

revoke all on public.profiles from anon, authenticated;
revoke all on public.memberships from anon, authenticated;
revoke all on public.xp_transactions from anon, authenticated;

grant select on public.profiles to authenticated;
grant update (username, display_name) on public.profiles to authenticated;
grant select on public.memberships to authenticated;
grant select on public.xp_transactions to authenticated;

revoke execute on function public.record_xp_transaction(uuid, integer, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.record_xp_transaction(uuid, integer, text, text, text, text, text) to service_role;
