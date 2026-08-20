-- DCBD foundation schema.
-- Trusted writes to membership, XP and Blood Test results are server-only.

create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  display_name text not null,
  avatar_asset_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_username_length check (char_length(username) between 3 and 32),
  constraint profiles_display_name_length check (char_length(display_name) between 1 and 64)
);

create table public.membership_tiers (
  id text primary key,
  name text not null unique,
  monthly_price_pence integer not null check (monthly_price_pence >= 0),
  currency text not null default 'GBP' check (currency = 'GBP'),
  capabilities jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint membership_tiers_known_id
    check (id in ('free', 'estate', 'elite', 'founder'))
);

insert into public.membership_tiers
  (id, name, monthly_price_pence, capabilities)
values
  ('free', 'Free', 0, '{}'),
  ('estate', 'Estate', 599, '{}'),
  ('elite', 'Elite', 1299, '{}'),
  ('founder', 'Founder', 2000, '{}')
on conflict (id) do update
set
  name = excluded.name,
  monthly_price_pence = excluded.monthly_price_pence,
  updated_at = now();

create table public.profile_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  tier_id text not null references public.membership_tiers (id),
  status text not null,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  provider_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profile_memberships_status
    check (status in ('active', 'paused', 'cancelled', 'expired')),
  constraint profile_memberships_dates
    check (ends_at is null or ends_at >= starts_at)
);

create unique index profile_memberships_one_active
  on public.profile_memberships (user_id)
  where status = 'active';

create table public.xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  amount integer not null check (amount <> 0),
  source text not null,
  source_reference_id uuid,
  reason_code text not null,
  metadata jsonb not null default '{}'::jsonb,
  idempotency_key text not null unique,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint xp_transactions_source
    check (
      source in (
        'onboarding',
        'community',
        'commerce',
        'flip',
        'event',
        'trade',
        'membership',
        'adjustment'
      )
    ),
  constraint xp_transactions_reason_code
    check (char_length(reason_code) between 1 and 80)
);

create index xp_transactions_user_created
  on public.xp_transactions (user_id, created_at desc);

create view public.xp_account_summaries
with (security_invoker = true)
as
select
  user_id,
  coalesce(sum(amount), 0)::bigint as current_xp,
  coalesce(sum(amount) filter (where amount > 0), 0)::bigint as lifetime_earned,
  abs(coalesce(sum(amount) filter (where amount < 0), 0))::bigint as lifetime_spent
from public.xp_transactions
group by user_id;

create table public.blood_test_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  questionnaire_version text not null,
  answers jsonb not null default '[]'::jsonb,
  status text not null default 'draft',
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blood_test_submissions_status
    check (status in ('draft', 'submitted', 'evaluated', 'invalid')),
  constraint blood_test_submissions_answers_array
    check (jsonb_typeof(answers) = 'array')
);

create table public.blood_test_results (
  submission_id uuid primary key
    references public.blood_test_submissions (id) on delete cascade,
  control_score numeric(7, 4) not null check (control_score >= 0),
  attack_score numeric(7, 4) not null check (attack_score >= 0),
  defence_score numeric(7, 4) not null check (defence_score >= 0),
  primary_archetype_key text not null,
  secondary_archetype_key text,
  evaluator_version text not null,
  evaluated_at timestamptz not null default now()
);

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

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute procedure public.set_updated_at();

create trigger membership_tiers_set_updated_at
before update on public.membership_tiers
for each row execute procedure public.set_updated_at();

create trigger profile_memberships_set_updated_at
before update on public.profile_memberships
for each row execute procedure public.set_updated_at();

create trigger blood_test_submissions_set_updated_at
before update on public.blood_test_submissions
for each row execute procedure public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    'player_' || substring(replace(new.id::text, '-', '') from 1 for 12),
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), 'New player')
  );

  insert into public.profile_memberships (user_id, tier_id, status)
  values (new.id, 'free', 'active');

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.membership_tiers enable row level security;
alter table public.profile_memberships enable row level security;
alter table public.xp_transactions enable row level security;
alter table public.blood_test_submissions enable row level security;
alter table public.blood_test_results enable row level security;

create policy "Membership tiers are readable"
on public.membership_tiers for select
to anon, authenticated
using (is_active = true);

create policy "Players can read their profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

create policy "Players can update their profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Players can read their membership"
on public.profile_memberships for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Players can read their XP ledger"
on public.xp_transactions for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Players can read their Blood Test submissions"
on public.blood_test_submissions for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Players can read their Blood Test results"
on public.blood_test_results for select
to authenticated
using (
  exists (
    select 1
    from public.blood_test_submissions submission
    where submission.id = blood_test_results.submission_id
      and submission.user_id = (select auth.uid())
  )
);

revoke insert, update, delete
  on public.membership_tiers,
     public.profile_memberships,
     public.xp_transactions,
     public.blood_test_submissions,
     public.blood_test_results
  from anon, authenticated;

grant select on public.membership_tiers to anon, authenticated;
grant select on public.profiles,
                public.profile_memberships,
                public.xp_transactions,
                public.xp_account_summaries,
                public.blood_test_submissions,
                public.blood_test_results
  to authenticated;
grant update (username, display_name, avatar_asset_url)
  on public.profiles
  to authenticated;
