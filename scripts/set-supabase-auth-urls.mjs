/**
 * Updates Supabase Auth URL configuration via Management API.
 *
 * Usage:
 *   1. Create a token at https://supabase.com/dashboard/account/tokens
 *   2. Add to .env.local: SUPABASE_ACCESS_TOKEN=sbp_...
 *   3. Run: node scripts/set-supabase-auth-urls.mjs
 */

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRef = "ejlfcwjbmeczqtowsccm";
const siteUrl = "https://mnyecom.pages.dev";

function loadToken() {
  if (process.env.SUPABASE_ACCESS_TOKEN) {
    return process.env.SUPABASE_ACCESS_TOKEN.trim();
  }
  const envPath = resolve(__dirname, "../.env.local");
  if (!existsSync(envPath)) return null;
  const match = readFileSync(envPath, "utf8").match(
    /^SUPABASE_ACCESS_TOKEN=(.+)$/m,
  );
  return match?.[1]?.trim() ?? null;
}

const token = loadToken();
if (!token) {
  console.error(
    "Missing SUPABASE_ACCESS_TOKEN. Add it to .env.local or your environment.",
  );
  console.error("Create a token: https://supabase.com/dashboard/account/tokens");
  process.exit(1);
}

const body = {
  site_url: siteUrl,
  uri_allow_list: [
    `${siteUrl}/auth/callback`,
    `${siteUrl}/**`,
    "http://localhost:3000/**",
    "http://127.0.0.1:3000/**",
  ].join("\n"),
};

const res = await fetch(
  `https://api.supabase.com/v1/projects/${projectRef}/config/auth`,
  {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  },
);

const text = await res.text();
if (!res.ok) {
  console.error(`Failed (${res.status}):`, text);
  process.exit(1);
}

console.log("Supabase Auth URLs updated:");
console.log("  Site URL:", siteUrl);
console.log("  Redirects:", body.uri_allow_list.replace(/\n/g, ", "));
