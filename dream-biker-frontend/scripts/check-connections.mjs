#!/usr/bin/env node
/**
 * Checks that the live site can still reach YouTube and Facebook.
 *
 *   SITE_URL=https://example.com SYNC_SECRET_KEY=... node scripts/check-connections.mjs
 *
 * Fails (exit 1) when:
 * - the YouTube channel can't be read (key revoked/restricted, quota, …)
 * - the Facebook token is invalid/expired, or token/data access ends within 14 days
 * Used by .github/workflows/connection-health.yml so GitHub emails you on failure.
 */
const site = (process.env.SITE_URL || "").replace(/\/+$/, "");
const secret = process.env.SYNC_SECRET_KEY || "";

if (!site || !secret) {
  console.log("SITE_URL / SYNC_SECRET_KEY not set — skipping the connection check.");
  process.exit(0);
}

const problems = [];

async function getJson(path, headers = {}) {
  const res = await fetch(`${site}${path}`, { headers });
  const text = await res.text();
  try {
    return { status: res.status, json: JSON.parse(text) };
  } catch {
    return { status: res.status, json: null };
  }
}

// YouTube: public endpoint that reads the channel live
const yt = await getJson("/api/social/youtube/channel");
if (yt.status === 200 && yt.json?.success && yt.json.data) {
  console.log(`✓ YouTube: ${yt.json.data.name} — ${yt.json.data.subscriberCount ?? "?"} subscribers`);
} else {
  problems.push(`YouTube: ${yt.json?.message || yt.json?.error || `HTTP ${yt.status}`}`);
}

// Facebook: token health from the protected status endpoint
const status = await getJson("/api/admin/social/status", { Authorization: `Bearer ${secret}` });
const fb = status.json?.facebookToken;
if (status.status !== 200 || !fb) {
  problems.push(`Status endpoint: HTTP ${status.status} ${status.json?.error ?? ""}`.trim());
} else if (fb.status === "ok") {
  console.log(`✓ Facebook: ${fb.message}${fb.dataAccessExpiresAt ? ` (data access until ${fb.dataAccessExpiresAt.slice(0, 10)})` : ""}`);
} else {
  problems.push(`Facebook (${fb.status}): ${fb.message}`);
}

if (problems.length) {
  for (const p of problems) console.log(`::error::${p}`);
  console.log("\nFix: see README → 'Keeping the Facebook token alive' (npm run facebook:token / System User).");
  process.exit(1);
}
console.log("\nAll connections healthy.");
