/**
 * Cloudflare Pages/Workers set CF_PAGES=1 during CI builds.
 * Use OpenNext there; use plain `next build` locally.
 */
import { execSync } from "node:child_process";

const onCloudflare =
  process.env.CF_PAGES === "1" ||
  typeof process.env.CF_PAGES_COMMIT_SHA === "string" ||
  process.env.WORKERS_CI === "1";

const command = onCloudflare ? "opennextjs-cloudflare build" : "next build";

console.log(`[build] Running: ${command}`);
execSync(command, { stdio: "inherit", env: process.env });
