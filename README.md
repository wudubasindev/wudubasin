# Wudu Basin Store

Backend for an online shopping store, built on **Supabase** (Postgres + Auth) and deployed on **Vercel**.

## Stack

- Frontend: (your choice — e.g. Next.js, built locally with VS Code)
- Database & Auth: Supabase
- Hosting: Vercel

## Database

The database schema lives in [`supabase/schema.sql`](supabase/schema.sql) and has already been applied to the Supabase project. It contains:

| Table | Purpose |
| --- | --- |
| `categories` | Product categories |
| `products` | Store products (seeded with 5 items) |
| `cart_items` | Per-user shopping cart |
| `orders` | Customer orders |
| `order_items` | Line items within an order |

Row Level Security (RLS) is enabled on every table:

- Anyone can read `products` and `categories`.
- Logged-in users can only read/write their own `cart_items`, `orders`, and `order_items`.

Auth is handled by Supabase Auth (`auth.users`).

## Local setup

1. Clone the repo and install dependencies (once you scaffold your app):
   ```bash
   npm install
   ```
2. Copy the env template and fill in your keys:
   ```bash
   cp .env.example .env.local
   ```
3. Get your keys from the Supabase Dashboard under **Project Settings > API**:
   - `NEXT_PUBLIC_SUPABASE_URL` — your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public anon key (safe for the browser)
   - `SUPABASE_SERVICE_ROLE_KEY` — server-side only, never expose to the browser
4. Run the dev server:
   ```bash
   npm run dev
   ```

## Deployment (Vercel)

1. Import this GitHub repo into Vercel.
2. Add the three environment variables above in the Vercel project settings.
3. Deploy.

## Security notes

- Never commit `.env.local` or any real keys — `.gitignore` already excludes them.
- The service role key bypasses RLS, so only use it in server-side code.
