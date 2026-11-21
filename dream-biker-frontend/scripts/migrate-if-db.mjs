#!/usr/bin/env node
/**
 * Runs `prisma migrate deploy` before `next build`, but only when a database is
 * configured. Without DATABASE_URL (local dev, CI) it does nothing.
 *
 * Vercel Postgres (Neon) gives a pooled DATABASE_URL for the app plus a direct
 * one; migrations need the direct connection, so that one is used when present.
 */
import { spawnSync } from "node:child_process";

const pooled = process.env.DATABASE_URL?.trim();
if (!pooled) {
  console.log("[migrate] DATABASE_URL not set — skipping database migrations.");
  process.exit(0);
}

const direct =
  process.env.DATABASE_URL_UNPOOLED?.trim() ||
  process.env.POSTGRES_URL_NON_POOLING?.trim() ||
  pooled;

console.log("[migrate] Applying database migrations…");
const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: { ...process.env, DATABASE_URL: direct },
});
process.exit(result.status ?? 1);
