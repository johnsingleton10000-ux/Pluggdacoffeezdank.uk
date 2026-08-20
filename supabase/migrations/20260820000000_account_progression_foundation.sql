create extension if not exists pgcrypto;

create type public.membership_tier as enum (
  'FREE',
  'ESTATE',
  'ELITE',
  'FOUNDER'
);

create type public.membership_status as enum (
  'active',
  'inactive',
  'past_due',
  'cancelled'
);

create type public.xp_transaction_kind as enum ('credit', 'debit');
create type public.blood_test_status as enum ('in_progress', 'completed');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  username text not null unique check (char_length(username) between 3 and 30),
  display_name text not null check (char_length(display_name) between 1 and 60),
  avatar_id uuid,
  archetype_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  tier public.membership_tier not null default 'FREE',
  status public.membership_status not null default 'inactive',
  current_period_ends_at timestamptz,
  provider_reference text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index one_current_membership_per_user
  on public.memberships (user_id)
  where status in ('active', 'past_due');

create table public.xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind public.xp_transaction_kind not null,
  amount bigint not null check (amount between 1 and 9007199254740991),
  source text not null,
  reason text not null check (char_length(reason) > 0),
  reference_id uuid,
  idempotency_key text not null unique,
  balance_after bigint not null check (
    balance_after between 0 and 9007199254740991
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index xp_transactions_user_created_idx
  on public.xp_transactions (user_id, created_at desc);

create table public.blood_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  questionnaire_version text not null,
  status public.blood_test_status not null default 'in_progress',
  answers jsonb not null default '[]'::jsonb,
  strategy_scores jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  check (jsonb_typeof(answers) = 'array'),
  check (
    strategy_scores is null
    or case
      when (
        jsonb_typeof(strategy_scores) = 'object'
        and strategy_scores ?& array['control', 'attack', 'defence']
        and jsonb_typeof(strategy_scores -> 'control') = 'number'
        and jsonb_typeof(strategy_scores -> 'attack') = 'number'
        and jsonb_typeof(strategy_scores -> 'defence') = 'number'
      )
      then (
        (strategy_scores ->> 'control')::numeric >= 0
        and (strategy_scores ->> 'attack')::numeric >= 0
        and (strategy_scores ->> 'defence')::numeric >= 0
      )
      else false
    end
  ),
  check (
    (
      status = 'in_progress'
      and strategy_scores is null
      and completed_at is null
    )
    or (
      status = 'completed'
      and strategy_scores is not null
      and completed_at is not null
    )
  )
);

create index blood_tests_user_created_idx
  on public.blood_tests (user_id, created_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create function public.prevent_xp_ledger_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception using
    errcode = '55000',
    message = 'XP ledger entries are immutable; append a correcting transaction';
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger memberships_set_updated_at
before update on public.memberships
for each row execute function public.set_updated_at();

create trigger blood_tests_set_updated_at
before update on public.blood_tests
for each row execute function public.set_updated_at();

create trigger xp_transactions_are_append_only
before update or delete on public.xp_transactions
for each row execute function public.prevent_xp_ledger_mutation();

revoke execute on function public.set_updated_at() from public, anon, authenticated;
revoke execute on function public.prevent_xp_ledger_mutation()
  from public, anon, authenticated;

alter table public.profiles enable row level security;
alter table public.memberships enable row level security;
alter table public.xp_transactions enable row level security;
alter table public.blood_tests enable row level security;

revoke all privileges on public.profiles from anon, authenticated;
revoke all privileges on public.memberships from anon, authenticated;
revoke all privileges on public.xp_transactions from anon, authenticated;
revoke all privileges on public.blood_tests from anon, authenticated;

grant select on public.profiles to authenticated;
grant select on public.memberships to authenticated;
grant select on public.xp_transactions to authenticated;
grant select on public.blood_tests to authenticated;
grant update (username, display_name) on public.profiles to authenticated;

create policy "Profiles are visible to their owner"
on public.profiles for select
using ((select auth.uid()) = user_id);

create policy "Owners can update safe profile fields"
on public.profiles for update
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Memberships are visible to their owner"
on public.memberships for select
using ((select auth.uid()) = user_id);

create policy "XP ledger is visible to its owner"
on public.xp_transactions for select
using ((select auth.uid()) = user_id);

create policy "Blood Tests are visible to their owner"
on public.blood_tests for select
using ((select auth.uid()) = user_id);

comment on table public.xp_transactions is
  'Append-only XP audit ledger. Writes must use a privileged server transaction.';

comment on table public.memberships is
  'Authoritative membership state. Clients have read-only access through RLS.';

comment on table public.blood_tests is
  'Versioned weighted onboarding results. Write policies are deferred to the assessment service.';
