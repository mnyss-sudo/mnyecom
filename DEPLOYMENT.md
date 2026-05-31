# Cloudflare deployment

This app deploys with **[@opennextjs/cloudflare](https://opennext.js.org/cloudflare)** (not plain `next build` + static export).

## Pages build settings

In **Cloudflare Pages → your project → Settings → Builds**, set:

| Setting | Value |
|---------|--------|
| **Build command** | `npm run build:cf` |
| **Build output directory** | *(leave empty — `wrangler.toml` defines the worker + assets)* |

If the dashboard still runs `wrangler deploy` after the build, that is expected once `.open-next/` exists.

`wrangler.toml` also sets production env vars (`NEXT_PUBLIC_*`, `ADMIN_EMAIL`). You can mirror them under **Environment variables** if needed.

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
