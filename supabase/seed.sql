insert into public.categories (name, slug)
values
  ('Tops', 'tops'),
  ('Denim', 'denim'),
  ('Dresses', 'dresses')
on conflict (slug) do update
set name = excluded.name;

insert into public.products (
  id,
  category_id,
  name,
  slug,
  price,
  original_price,
  description,
  flag,
  palette
)
values
  (
    '01',
    (select id from public.categories where slug = 'tops'),
    'Ribbed Off-Shoulder Top',
    'ribbed-off-shoulder-top',
    18,
    36,
    'A soft ribbed top with an easy off-shoulder neckline.',
    'Just In',
    array['#f7d9df', '#e08aa1']
  ),
  (
    '02',
    (select id from public.categories where slug = 'denim'),
    'Low Rise Wide Leg Jeans',
    'low-rise-wide-leg-jeans',
    49,
    98,
    'Relaxed low-rise denim with a wide leg and soft blue wash.',
    'Trending',
    array['#dfe6ea', '#8fa6b8']
  ),
  (
    '03',
    (select id from public.categories where slug = 'dresses'),
    'Satin Cowl Midi Dress',
    'satin-cowl-midi-dress',
    54,
    108,
    'A fluid satin midi dress with a softly draped cowl neck.',
    null,
    array['#e3d6ea', '#a985c2']
  ),
  (
    '04',
    (select id from public.categories where slug = 'tops'),
    'Boxy Varsity Sweatshirt',
    'boxy-varsity-sweatshirt',
    39,
    78,
    'An oversized cotton sweatshirt with a bold varsity graphic.',
    'Back In Stock',
    array['#e5e0c9', '#b7ab72']
  ),
  (
    '05',
    (select id from public.categories where slug = 'dresses'),
    'Tie Front Mini Dress',
    'tie-front-mini-dress',
    42,
    84,
    'A playful mini dress finished with a front tie detail.',
    'Just In',
    array['#f3d8c4', '#d69a6a']
  ),
  (
    '06',
    (select id from public.categories where slug = 'tops'),
    'Sheer Lace V-Neck Top',
    'sheer-lace-v-neck-top',
    22,
    44,
    'A sheer lace layer designed for styling over your favorite basics.',
    null,
    array['#d8e3dc', '#7fa38f']
  )
on conflict (id) do update
set
  category_id = excluded.category_id,
  name = excluded.name,
  slug = excluded.slug,
  price = excluded.price,
  original_price = excluded.original_price,
  description = excluded.description,
  flag = excluded.flag,
  palette = excluded.palette,
  is_active = true,
  updated_at = now();

with variant_seed (product_id, size, color_name, color_hex) as (
  values
    ('01', 'XS', 'Blush', '#f7d9df'),
    ('01', 'S',  'Blush', '#f7d9df'),
    ('01', 'M',  'Blush', '#f7d9df'),
    ('01', 'L',  'Blush', '#f7d9df'),
    ('01', 'XL', 'Blush', '#f7d9df'),
    ('02', 'XS', 'Blue Wash', '#dfe6ea'),
    ('02', 'S',  'Blue Wash', '#dfe6ea'),
    ('02', 'M',  'Blue Wash', '#dfe6ea'),
    ('02', 'L',  'Blue Wash', '#dfe6ea'),
    ('03', 'XS', 'Lavender', '#e3d6ea'),
    ('03', 'S',  'Lavender', '#e3d6ea'),
    ('03', 'M',  'Lavender', '#e3d6ea'),
    ('03', 'L',  'Lavender', '#e3d6ea'),
    ('04', 'S',  'Cream', '#e5e0c9'),
    ('04', 'M',  'Cream', '#e5e0c9'),
    ('04', 'L',  'Cream', '#e5e0c9'),
    ('04', 'XL', 'Cream', '#e5e0c9'),
    ('05', 'XS', 'Peach', '#f3d8c4'),
    ('05', 'S',  'Peach', '#f3d8c4'),
    ('05', 'M',  'Peach', '#f3d8c4'),
    ('05', 'L',  'Peach', '#f3d8c4'),
    ('06', 'XS', 'Sage', '#d8e3dc'),
    ('06', 'S',  'Sage', '#d8e3dc'),
    ('06', 'M',  'Sage', '#d8e3dc'),
    ('06', 'L',  'Sage', '#d8e3dc'),
    ('06', 'XL', 'Sage', '#d8e3dc')
)
insert into public.product_variants (product_id, sku, size, color_name, color_hex, inventory_quantity)
select
  product_id,
  product_id || '-' || lower(size),
  size,
  color_name,
  color_hex,
  20
from variant_seed
on conflict (sku) do update
set
  product_id = excluded.product_id,
  size = excluded.size,
  color_name = excluded.color_name,
  color_hex = excluded.color_hex,
  inventory_quantity = excluded.inventory_quantity;
