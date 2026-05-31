# Cloudflare deployment

This repo includes **`wrangler.toml`** with production Supabase URL, anon key, and site URL. Cloudflare Pages should pick these up on the next Git deploy. You can still mirror them in the dashboard if needed.

Add these **environment variables** in your Cloudflare Pages project (Settings → Environment variables) if not using `wrangler.toml`:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ejlfcwjbmeczqtowsccm.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase **anon** key (Project Settings → API) |
| `NEXT_PUBLIC_SITE_URL` | Your live site URL (e.g. `https://mnyecom.pages.dev`) |
| `ADMIN_EMAIL` | Email you use to sign in for `/admin` access |

## Supabase Auth redirect

In [Supabase Dashboard](https://supabase.com/dashboard) → Authentication → URL configuration, add:

- **Site URL:** your Cloudflare URL
- **Redirect URLs:** `https://your-site.pages.dev/auth/callback`

## Admin access

1. Sign up / sign in on the site with your email.
2. In Supabase SQL Editor, run:

```sql
INSERT INTO public.admins (email) VALUES ('you@example.com')
ON CONFLICT (email) DO NOTHING;
```

Or set `ADMIN_EMAIL` in Cloudflare to match your login email.

## Redeploy

After saving env vars, trigger a new deployment so the build picks them up.
