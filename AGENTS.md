<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SLAY Project Roadmap

SLAY is a fictional fashion e-commerce prototype using Next.js, TypeScript, Vercel, and Supabase.

## Stack

- Next.js App Router for the frontend, routing, server components, and API route handlers.
- TypeScript with strict type checking.
- Supabase PostgreSQL for product, cart, wishlist, and newsletter data.
- Supabase Auth for optional customer accounts.
- Supabase Storage for product images if real image assets are added.
- Vercel for deployment and server-side execution.

## Implementation Steps

1. **Initialize the Next.js foundation**
	- Keep the runnable Next.js app at the repository root.
	- Confirm `npm run build` succeeds before moving on.

2. **Migrate the SLAY homepage**
	- Move the existing visual direction into reusable Next.js components.
	- Preserve the ticker, sticky navigation, hero, promo tiles, product carousel, newsletter section, and responsive styling.
	- Keep the existing pink, lime, ink, and neutral design system.

3. **Create the typed product catalog**
	- Define TypeScript types for products, categories, variants, sizes, colors, prices, and sale labels.
	- Create the initial fictional catalog with products for New In, Best Sellers, Denim, Tops, Dresses, and Sale.
	- Use stable slugs for product detail URLs.

4. **Connect Supabase**
	- Create the Supabase project and database migrations.
	- Add `categories`, `products`, and `product_variants` tables first.
	- Add seed data for the fictional catalog.
	- Keep the Supabase service role key server-only.

5. **Build product browsing**
	- Create category routes for `/new-in`, `/best-sellers`, `/denim`, `/tops`, `/dresses`, and `/sale`.
	- Add server-side product queries for category filtering, searching, sorting, size, color, and sale status.
	- Render products through a shared product-card and product-grid component.

6. **Add product details**
	- Create `/products/[slug]`.
	- Show product information, variants, sizes, colors, pricing, sale status, quantity, wishlist, and add-to-bag controls.

7. **Add guest cart behavior**
	- Create cart and cart-item support.
	- Use a browser cookie or local storage for a guest cart.
	- Support adding items, changing quantities, removing items, and displaying the bag count.

8. **Add accounts and wishlists**
	- Add Supabase Auth only after browsing and guest cart behavior work.
	- Add `wishlists` and `wishlist_items` tables.
	- Merge a guest cart into the signed-in customer cart after login.
	- Protect customer-owned data with Supabase Row Level Security policies.

9. **Add newsletter signup**
	- Add a validated newsletter subscription route.
	- Prevent duplicate email subscriptions.

10. **Deploy and verify on Vercel**
	 - Configure development, preview, and production environment variables.
	 - Test navigation, product queries, filters, cart persistence, authentication, and responsive layouts.
	 - Confirm no secret Supabase credentials are exposed in client-side code.

## First Supabase Milestone

The first backend milestone is a typed product query that loads fictional products from Supabase on the homepage. Verify it by changing a seeded product in Supabase and confirming the updated product appears without changing frontend source code.

## Working Rules

- Prefer server components and server-side Supabase queries for catalog data.
- Use client components only for interactive controls such as filters, search input, wishlist buttons, and cart actions.
- Keep shared UI in `components/`, Supabase clients and queries in `lib/`, types in `types/`, and migrations or seed data in `supabase/`.
- Do not add authentication, payments, or order processing until the catalog and cart flows are working.
- Use fictional product data only unless the project explicitly adds permitted image assets.
