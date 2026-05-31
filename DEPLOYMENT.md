# Cloudflare deployment

This app deploys with **[@opennextjs/cloudflare](https://opennext.js.org/cloudflare)**. A plain `next build` is **not** enough for deploy.

## Pages / Workers build settings

In **Cloudflare → your project → Settings → Builds**:

| Setting | Recommended value |
|---------|-------------------|
| **Build command** | `npm run build` *(auto-runs OpenNext when `CF_PAGES=1`)* or `npm run build:cf` |
| **Deploy command** | `npm run deploy` **or** `npx opennextjs-cloudflare deploy` |
| **Build output directory** | *(leave empty)* |

### If you see “Could not find compiled Open Next config”

That means **deploy ran without an OpenNext build**. The build step ran `next build` only, or deploy ran in a separate step without `.open-next/`.

**Fix (pick one):**

1. **Two-step (default Cloudflare):**  
   - Build command: `npm run build` or `npm run build:cf`  
   - Deploy command: `npm run deploy` (not `npx wrangler deploy` alone)

2. **Single-step:**  
   - Build command: `npm run deploy`  
   - Deploy command: *(leave empty)*

`wrangler.toml` points at `.open-next/worker.js` and `.open-next/assets` — those folders are created only by `opennextjs-cloudflare build`.

## Environment variables

Set in the dashboard (or use `wrangler.toml` `[vars]`):

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ejlfcwjbmeczqtowsccm.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(see `wrangler.toml` or Supabase → API)* |
| `NEXT_PUBLIC_SITE_URL` | `https://mnyecom.pages.dev` |
| `ADMIN_EMAIL` | `mnysmartsolution@gmail.com` |

## Supabase Auth redirect

[URL Configuration](https://supabase.com/dashboard/project/ejlfcwjbmeczqtowsccm/auth/url-configuration):

- **Site URL:** `https://mnyecom.pages.dev`
- **Redirect URLs:** `https://mnyecom.pages.dev/auth/callback`

## Admin access

1. Sign up at `https://mnyecom.pages.dev/auth/signup` with **mnysmartsolution@gmail.com**
2. Open `https://mnyecom.pages.dev/admin`
