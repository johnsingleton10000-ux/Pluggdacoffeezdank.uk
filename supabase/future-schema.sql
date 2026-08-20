-- Planned DCBD tables. Do not apply until the matching system is built.
-- Relationships only — no invented game, shop or forum data.

-- blood_tests
--   id uuid pk
--   user_id uuid -> profiles.id
--   answers jsonb
--   control numeric
--   attack numeric
--   defence numeric
--   archetype_id text
--   created_at timestamptz

-- avatars
--   id text pk          -- stock slots avatar-slot-01..20
--   slot integer unique check (slot between 1 and 20)
--   name text           -- supplied later
--   artwork_url text    -- supplied later
--   archetype_id text
--   created_at timestamptz

-- player_avatars
--   id uuid pk
--   user_id uuid unique -> profiles.id
--   stock_avatar_id text -> avatars.id
--   archetype_id text    -- copied at selection; cosmetics must not change this
--   cosmetics jsonb
--   created_at timestamptz
--   updated_at timestamptz

-- decks
--   id uuid pk
--   user_id uuid -> profiles.id
--   name text
--   personality text
--   archetype_id text
--   is_starter boolean
--   created_at timestamptz
--   updated_at timestamptz

-- deck_cards
--   deck_id uuid -> decks.id
--   card_id uuid -> cards.id
--   quantity integer
--   primary key (deck_id, card_id)

-- deck_history
--   id uuid pk
--   deck_id uuid -> decks.id
--   kind text
--   detail text
--   created_at timestamptz

-- cards
--   id uuid pk
--   name text
--   artwork_url text
--   rarity text
--   category text
--   attack integer
--   defence integer
--   control integer
--   abilities jsonb
--   created_at timestamptz

-- card_ownership
--   id uuid pk
--   card_id uuid -> cards.id
--   owner_id uuid -> profiles.id
--   source text
--   collection_status text
--   trade_status text
--   acquired_at timestamptz

-- orders
--   id uuid pk
--   user_id uuid -> profiles.id
--   status text
--   total_gbp numeric
--   created_at timestamptz

-- order_lines
--   order_id uuid -> orders.id
--   product_id text
--   quantity integer
--   unit_price_gbp numeric

-- order_rewards
--   id uuid pk
--   order_id uuid -> orders.id
--   user_id uuid -> profiles.id
--   kind text
--   payload jsonb
--   created_at timestamptz

-- forum_profiles
--   id uuid pk
--   user_id uuid unique -> profiles.id
--   reputation integer default 0

-- forum_posts
--   id uuid pk
--   author_id uuid -> profiles.id
--   title text
--   body text
--   topic text
--   created_at timestamptz
--   updated_at timestamptz

-- forum_comments
--   id uuid pk
--   post_id uuid -> forum_posts.id
--   author_id uuid -> profiles.id
--   body text
--   created_at timestamptz

-- trades
--   id uuid pk
--   initiator_id uuid -> profiles.id
--   recipient_id uuid -> profiles.id
--   offered jsonb
--   requested jsonb
--   status text
--   created_at timestamptz
--   updated_at timestamptz

-- flip_matches
--   id uuid pk
--   player_one_id uuid -> profiles.id
--   player_two_id uuid -> profiles.id
--   player_one_deck_id uuid -> decks.id
--   player_two_deck_id uuid -> decks.id
--   status text
--   winner_id uuid -> profiles.id
--   created_at timestamptz
--   completed_at timestamptz
