# Cloudflare deployment

This repo includes **`wrangler.toml`** with production Supabase URL, anon key, site URL, and admin email. Cloudflare Pages should pick these up on the next Git deploy. You can still mirror them in the dashboard if needed.

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ejlfcwjbmeczqtowsccm.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(see `wrangler.toml` or Supabase → API)* |
| `NEXT_PUBLIC_SITE_URL` | `https://mnyecom.pages.dev` |
| `ADMIN_EMAIL` | `mnysmartsolution@gmail.com` |

## Supabase Auth redirect

Set these in [URL Configuration](https://supabase.com/dashboard/project/ejlfcwjbmeczqtowsccm/auth/url-configuration):

- **Site URL:** `https://mnyecom.pages.dev`
- **Redirect URLs:** `https://mnyecom.pages.dev/auth/callback`

**Automated option:** add a [personal access token](https://supabase.com/dashboard/account/tokens) to `.env.local` as `SUPABASE_ACCESS_TOKEN=sbp_...`, then run:

```bash
node scripts/set-supabase-auth-urls.mjs
```

## Admin access

Admin email is in the `public.admins` table and `ADMIN_EMAIL` in `wrangler.toml`.

1. Sign up or sign in at `https://mnyecom.pages.dev/auth/signup` with **mnysmartsolution@gmail.com**
2. Open **https://mnyecom.pages.dev/admin**

## Redeploy

After pulling the latest `main`, trigger a new Cloudflare Pages deployment so `ADMIN_EMAIL` is applied at build time.
