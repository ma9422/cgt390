# Supabase catalog database

This database stores the fictional product catalog and size/color variants. The storefront can read active catalog records without exposing a service-role key. Public database roles have no write policies.

## Set up the database

1. Create a Supabase project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. In the project, open **SQL Editor** and run `migrations/20261026215500_initial_catalog.sql`.
3. Run `seed.sql` in the SQL Editor to load the six fictional products and their variants.
4. Verify the setup by querying `public.products`, joining `public.categories` on `category_id`, and checking `public.product_variants`.

The seed script can be run again safely; it updates the existing catalog records rather than duplicating them.

## Tables

- `categories`: product categories such as Tops, Denim, and Dresses.
- `products`: product details, pricing, sale labels, and display palettes.
- `product_variants`: a product's size/color combinations, SKU, and prototype inventory count.

Row Level Security is enabled. Anonymous and authenticated storefront visitors can read categories, active products, and variants for active products. Writes are intentionally restricted until a trusted server-side write flow is implemented.

This creates the catalog schema and data only. The app's current add-to-bag interaction still stores its cart in browser local storage; it does not write cart data to Supabase.
