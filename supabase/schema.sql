-- ShopNext database schema
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Categories
create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

-- Products
create table if not exists public.products (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2) check (compare_at_price >= 0),
  image_url text,
  category_id text references public.categories (id) on delete set null,
  stock integer not null default 0 check (stock >= 0),
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Orders
create type public.order_status as enum (
  'pending',
  'paid',
  'shipped',
  'delivered',
  'cancelled'
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status public.order_status not null default 'pending',
  total numeric(10, 2) not null check (total >= 0),
  shipping_name text not null,
  shipping_email text not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_postal text not null,
  shipping_country text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id text not null references public.products (id),
  product_name text not null,
  product_slug text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10, 2) not null check (unit_price >= 0)
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public read for catalog
create policy "Categories are viewable by everyone"
  on public.categories for select using (true);

create policy "Products are viewable by everyone"
  on public.products for select using (true);

-- Profiles
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Orders: users see own orders
create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);

create policy "Users can create own orders"
  on public.orders for insert with check (auth.uid() = user_id);

create policy "Users can view own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Users can insert own order items"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

-- Admin policies (is_admin on profiles)
create policy "Admins can manage products"
  on public.products for all
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

create policy "Admins can view all orders"
  on public.orders for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

create policy "Admins can update orders"
  on public.orders for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

create policy "Admins can view all order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- Seed data
insert into public.categories (id, name, slug, description, image_url) values
  ('cat-electronics', 'Electronics', 'electronics', 'Headphones, speakers, and smart gear.', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80'),
  ('cat-apparel', 'Apparel', 'apparel', 'Modern essentials for everyday wear.', 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80'),
  ('cat-home', 'Home', 'home', 'Elevate your living space.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80')
on conflict (slug) do nothing;

insert into public.products (id, name, slug, description, price, compare_at_price, image_url, category_id, stock, featured) values
  ('prod-1', 'Aurora Wireless Headphones', 'aurora-wireless-headphones', 'Premium noise-cancelling headphones with 40-hour battery life.', 249.99, 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'cat-electronics', 42, true),
  ('prod-2', 'Nimbus Smart Speaker', 'nimbus-smart-speaker', 'Room-filling sound with voice assistant and multi-room sync.', 129.00, null, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80', 'cat-electronics', 28, true),
  ('prod-3', 'Linen Blend Overshirt', 'linen-blend-overshirt', 'Relaxed fit overshirt in breathable linen-cotton blend.', 89.00, 110.00, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80', 'cat-apparel', 65, true),
  ('prod-4', 'Merino Crew Sweater', 'merino-crew-sweater', 'Ultra-soft merino wool sweater for all-season comfort.', 118.00, null, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80', 'cat-apparel', 33, false),
  ('prod-5', 'Ceramic Table Lamp', 'ceramic-table-lamp', 'Hand-glazed ceramic base with warm dimmable LED bulb.', 74.50, null, 'https://images.unsplash.com/photo-1507473885762-e6ed057f782c?w=800&q=80', 'cat-home', 19, true),
  ('prod-6', 'Wool Throw Blanket', 'wool-throw-blanket', 'Chunky knit wool throw — cozy and sustainable.', 95.00, 120.00, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', 'cat-home', 24, false)
on conflict (slug) do nothing;

-- Make yourself admin (replace with your user UUID after signup):
-- update public.profiles set is_admin = true where email = 'you@example.com';
