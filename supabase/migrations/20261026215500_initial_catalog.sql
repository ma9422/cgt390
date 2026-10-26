create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now(),
  constraint categories_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create table public.products (
  id text primary key,
  category_id uuid not null references public.categories (id) on delete restrict,
  name text not null,
  slug text not null unique,
  price numeric(10, 2) not null check (price >= 0),
  original_price numeric(10, 2) not null check (original_price >= price),
  description text not null,
  flag text,
  palette text[] not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  constraint products_palette_length check (cardinality(palette) = 2)
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id text not null references public.products (id) on delete cascade,
  sku text not null unique,
  size text not null,
  color_name text not null,
  color_hex text not null,
  inventory_quantity integer not null default 0 check (inventory_quantity >= 0),
  created_at timestamptz not null default now(),
  constraint product_variants_color_hex_format check (color_hex ~ '^#[0-9A-Fa-f]{6}$'),
  constraint product_variants_product_size_color_unique unique (product_id, size, color_name)
);

create index products_category_id_idx on public.products (category_id);
create index product_variants_product_id_idx on public.product_variants (product_id);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;

grant select on public.categories, public.products, public.product_variants to anon, authenticated;

create policy "Categories are readable by storefront visitors"
  on public.categories for select
  to anon, authenticated
  using (true);

create policy "Active products are readable by storefront visitors"
  on public.products for select
  to anon, authenticated
  using (is_active);

create policy "Variants of active products are readable by storefront visitors"
  on public.product_variants for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.products
      where products.id = product_variants.product_id
        and products.is_active
    )
  );
