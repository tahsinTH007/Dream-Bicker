import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const SYNC = "sync_secret_long_enough_123";
const CRON = "cron_secret_long_enough_456";

/** serverEnv is read once at import, so load a fresh copy per environment. */
async function loadAuth(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const key of ["SYNC_SECRET_KEY", "CRON_SECRET"]) delete process.env[key];
  Object.assign(process.env, env);
  return (await import("@/server/auth/sync-auth")).isAuthorizedSyncRequest;
}

const req = (headers: Record<string, string> = {}, query = "") =>
  new NextRequest(`http://localhost/api/admin/social/sync${query}`, { method: "POST", headers });

afterEach(() => {
  delete process.env.SYNC_SECRET_KEY;
  delete process.env.CRON_SECRET;
});

describe("isAuthorizedSyncRequest", () => {
  it("rejects everything when no secret is configured (no built-in default)", async () => {
    const auth = await loadAuth({});
    expect(auth(req({ authorization: "Bearer dream_biker_sync_secret_dev" }))).toBe(false);
    expect(auth(req())).toBe(false);
  });

  it("accepts SYNC_SECRET_KEY as Bearer token or x-sync-secret header", async () => {
    const auth = await loadAuth({ SYNC_SECRET_KEY: SYNC });
    expect(auth(req({ authorization: `Bearer ${SYNC}` }))).toBe(true);
    expect(auth(req({ "x-sync-secret": SYNC }))).toBe(true);
  });

  it("accepts CRON_SECRET (what Vercel Cron sends)", async () => {
    const auth = await loadAuth({ SYNC_SECRET_KEY: SYNC, CRON_SECRET: CRON });
    expect(auth(req({ authorization: `Bearer ${CRON}` }))).toBe(true);
  });

  it("rejects wrong secrets and a missing header", async () => {
    const auth = await loadAuth({ SYNC_SECRET_KEY: SYNC });
    expect(auth(req({ authorization: "Bearer wrong_secret_value_1234" }))).toBe(false);
    expect(auth(req({ authorization: SYNC }))).toBe(false); // no "Bearer " prefix
    expect(auth(req())).toBe(false);
  });

  it("does not accept the secret as a ?secret= query parameter", async () => {
    const auth = await loadAuth({ SYNC_SECRET_KEY: SYNC });
    expect(auth(req({}, `?secret=${SYNC}`))).toBe(false);
  });

  it("ignores secrets shorter than 16 characters", async () => {
    const auth = await loadAuth({ SYNC_SECRET_KEY: "short" });
    expect(auth(req({ authorization: "Bearer short" }))).toBe(false);
  });
});
