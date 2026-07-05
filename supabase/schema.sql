-- ============================================
-- E-commerce schema for wudubasin store
-- Reference copy of the schema applied to Supabase.
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================

create table public.categories (
  id bigint generated always as identity primary key,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.products (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  stock integer not null default 0 check (stock >= 0),
  category_id bigint references public.categories(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.orders (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending',
  total numeric(10,2) not null default 0 check (total >= 0),
  created_at timestamptz not null default now()
);

create table public.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  product_id bigint references public.products(id) on delete set null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null check (unit_price >= 0)
);

create table public.cart_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.cart_items enable row level security;

create policy "Public can read categories" on public.categories for select using (true);
create policy "Public can read products" on public.products for select using (true);
create policy "Users manage own cart" on public.cart_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users read own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users create own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Users read own order items" on public.order_items for select using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "Users create own order items" on public.order_items for insert with check (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

insert into public.categories (name, slug) values ('General', 'general');

insert into public.products (name, description, price, image_url, stock, category_id) values
  ('Classic Tee', 'Soft cotton t-shirt in a classic fit.', 19.99, 'https://placehold.co/400x400?text=Classic+Tee', 100, 1),
  ('Canvas Sneakers', 'Everyday low-top canvas sneakers.', 49.99, 'https://placehold.co/400x400?text=Sneakers', 50, 1),
  ('Leather Wallet', 'Slim bifold leather wallet.', 34.50, 'https://placehold.co/400x400?text=Wallet', 75, 1),
  ('Coffee Mug', 'Ceramic 12oz mug, dishwasher safe.', 12.00, 'https://placehold.co/400x400?text=Mug', 200, 1),
  ('Tote Bag', 'Reusable heavy-duty cotton tote.', 15.99, 'https://placehold.co/400x400?text=Tote', 120, 1);

-- ============================================
-- WuduBasin.ca booking/lead-gen form
-- Submissions from the site's booking form (name, phone, email,
-- address, preferred install date, notes). Written server-side only
-- via the service role key, so RLS is enabled with no public policies.
-- ============================================

create table public.bookings (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text not null,
  address text not null,
  preferred_date date,
  message text,
  created_at timestamptz not null default now(),
  stripe_checkout_session_id text,
  deposit_paid boolean not null default false,
  deposit_paid_at timestamptz
);

alter table public.bookings enable row level security;
