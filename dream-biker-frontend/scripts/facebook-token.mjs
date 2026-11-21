#!/usr/bin/env node
/**
 * Turn a short-lived Facebook token into a long-lived Page token and save it.
 *
 *   npm run facebook:token
 *
 * Reads .env.local:
 *   FACEBOOK_APP_ID, FACEBOOK_APP_SECRET   of the Meta app that issued the token
 *   FACEBOOK_PAGE_ID                       the Dream Biker page
 *   FACEBOOK_USER_ACCESS_TOKEN (preferred) a System User token from Meta Business Settings
 *                                          (never expires) or a user token from Graph API Explorer, or
 *   FACEBOOK_PAGE_ACCESS_TOKEN             the current (short-lived) page token
 *
 * It exchanges the token for a long-lived one, fetches the page token for
 * FACEBOOK_PAGE_ID, verifies it with Meta's debugger, writes it back to
 * FACEBOOK_PAGE_ACCESS_TOKEN and removes FACEBOOK_USER_ACCESS_TOKEN.
 * Tokens are never printed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const ENV_PATH = resolve(process.cwd(), ".env.local");
const raw = readFileSync(ENV_PATH, "utf8");
const env = Object.fromEntries(
  raw
    .split(/\r?\n/)
    .map((l) => l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2].trim().replace(/^['"]|['"]$/g, "")])
);

const VERSION = env.FACEBOOK_GRAPH_API_VERSION || "v22.0";
const { FACEBOOK_APP_ID: appId, FACEBOOK_APP_SECRET: appSecret, FACEBOOK_PAGE_ID: pageId } = env;
const userToken = env.FACEBOOK_USER_ACCESS_TOKEN;
const pageToken = env.FACEBOOK_PAGE_ACCESS_TOKEN;

const fail = (msg) => {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
};
const when = (s) =>
  !s ? "never" : `${new Date(s * 1000).toISOString().slice(0, 10)} (in ${Math.round((s * 1000 - Date.now()) / 86_400_000)} days)`;

async function graph(path, params) {
  const url = new URL(`https://graph.facebook.com/${VERSION}/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url);
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json;
}

async function debug(token) {
  const { data } = await graph("debug_token", { input_token: token, access_token: `${appId}|${appSecret}` });
  return data;
}

if (!appId || !appSecret) fail("FACEBOOK_APP_ID and FACEBOOK_APP_SECRET must be set in .env.local.");
if (!pageId) fail("FACEBOOK_PAGE_ID must be set in .env.local.");
const input = userToken || pageToken;
if (!input) fail("Set FACEBOOK_USER_ACCESS_TOKEN (preferred) or FACEBOOK_PAGE_ACCESS_TOKEN in .env.local.");

console.log(`Using ${userToken ? "FACEBOOK_USER_ACCESS_TOKEN" : "FACEBOOK_PAGE_ACCESS_TOKEN"} with app ${appId} …`);

// 1. Check the app credentials and the input token belong together
let info;
try {
  info = await debug(input);
} catch (e) {
  fail(`Meta rejected the app ID/secret: ${e.message}\n  Use the ID and secret of the app that issued the token (developers.facebook.com → your app → App settings → Basic).`);
}
if (!info.is_valid) fail(`The token is no longer valid (${info.error?.message ?? "expired"}). Generate a new one in Graph API Explorer and run this again.`);
if (info.app_id !== appId) fail(`The token was issued by app "${info.application}" (${info.app_id}), not ${appId}. Put that app's ID and secret in .env.local.`);

// 2. Exchange for a long-lived token (System User tokens are already permanent: no exchange)
const isSystemUser = info.type === "SYSTEM_USER";
let longLived = isSystemUser ? input : undefined;
if (!isSystemUser) try {
  ({ access_token: longLived } = await graph("oauth/access_token", {
    grant_type: "fb_exchange_token",
    client_id: appId,
    client_secret: appSecret,
    fb_exchange_token: input,
  }));
} catch (e) {
  fail(`Token exchange failed: ${e.message}`);
}

// 3. Long-lived USER / SYSTEM_USER token -> its never-expiring PAGE token
let finalToken = longLived;
const exchangedInfo = isSystemUser ? info : await debug(longLived);
if (exchangedInfo.type === "USER" || exchangedInfo.type === "SYSTEM_USER") {
  const { data: pages } = await graph("me/accounts", { fields: "id,name,access_token", access_token: longLived });
  const page = pages.find((p) => p.id === pageId);
  if (!page) fail(`This account has no access to page ${pageId}. Pages found: ${pages.map((p) => `${p.name} (${p.id})`).join(", ") || "none"}.`);
  finalToken = page.access_token;
}

// 4. Verify before saving
const final = await debug(finalToken);
if (!final.is_valid || final.type !== "PAGE" || final.profile_id !== pageId) {
  fail(`Result is not a valid page token for ${pageId} (type ${final.type}, page ${final.profile_id}). Nothing was saved.`);
}

// 5. Save: replace the page token, drop the temporary user token
const lines = raw.split(/\r?\n/).filter((l) => !/^\s*FACEBOOK_USER_ACCESS_TOKEN\s*=/.test(l));
const idx = lines.findIndex((l) => /^\s*FACEBOOK_PAGE_ACCESS_TOKEN\s*=/.test(l));
if (idx >= 0) lines[idx] = `FACEBOOK_PAGE_ACCESS_TOKEN=${finalToken}`;
else lines.push(`FACEBOOK_PAGE_ACCESS_TOKEN=${finalToken}`);
writeFileSync(ENV_PATH, lines.join("\n"));

console.log(`\n✓ Saved a long-lived page token for ${final.profile_id} to .env.local`);
console.log(`  expires           : ${when(final.expires_at)}`);
console.log(`  data access until : ${when(final.data_access_expires_at)}`);
console.log(`  scopes            : ${(final.scopes || []).join(", ")}`);
if (final.expires_at) {
  // Exchanging a PAGE token only yields ~60 days; a never-expiring page token
  // must be derived from a long-lived USER token via me/accounts.
  console.log(
    "\n  This token still expires. For one that never expires, put a fresh Graph API Explorer USER token in" +
      "\n  FACEBOOK_USER_ACCESS_TOKEN and run `npm run facebook:token` again."
  );
}
if (final.data_access_expires_at) {
  console.log(
    "\n  Note: Meta still ends data access on the date above unless the page admin logs into the app again" +
      "\n  (or you switch to a System User token, which has no such limit). /api/admin/social/status shows the countdown."
  );
}
console.log("\nRestart the dev server (or redeploy) so the site picks up the new token.\n");
