# ShopNext

A modern ecommerce storefront built with **Next.js 15**, **Tailwind CSS 4**, and **Supabase**.

## Features

- Responsive storefront with hero, featured products, and category browsing
- Product catalog, category pages, and product detail pages with JSON-LD
- Shopping cart (persisted in localStorage via Zustand)
- Checkout flow with order storage in Supabase
- Email/password authentication (Supabase Auth)
- Admin dashboard (overview, product stock, order status)
- SEO: metadata API, `sitemap.xml`, `robots.txt`, Open Graph

## Quick start (demo mode)

Without Supabase credentials, the app runs with **built-in demo data**:

```bash
cd Projects/shop-next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env.local` and add your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. In the Supabase SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql).
4. Sign up in the app, then promote your user to admin:

```sql
update public.profiles set is_admin = true where email = 'you@example.com';
```

5. In Supabase Auth settings, add `http://localhost:3000/auth/callback` as a redirect URL.

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm start`    | Start production server  |

## Project structure

```
src/
  app/           # App Router pages & API routes
  components/    # UI, layout, product, cart, admin
  lib/           # Supabase clients, data fetching, utils
  store/         # Cart state (Zustand)
  types/         # TypeScript types
supabase/
  schema.sql     # Database schema, RLS, seed data
```

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Postgres, Auth, RLS)
- [Zustand](https://zustand.docs.pmnd.dev/) (cart persistence)

## Notes

- Checkout is a **demo flow** (no Stripe/payment processor). Orders are saved as `pending`.
- Install [Node.js 20+](https://nodejs.org/) if `npm` is not available on your machine.
