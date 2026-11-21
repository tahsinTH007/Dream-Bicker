import "server-only";
import { after } from "next/server";
import { serverEnv } from "@/lib/env/server";
import { socialSync } from "./synchronization/social-sync.service";
import { socialStorage } from "./storage/social-storage.service";

/**
 * Keeps synced YouTube/Facebook content fresh without anyone triggering a sync.
 *
 * Pages call `ensureFreshSocialData()` before reading content:
 * - nothing synced yet (fresh start / new deploy): wait for one sync, capped at
 *   FIRST_LOAD_WAIT_MS, so the first visitor sees real content;
 * - older than the sync interval: serve what's there and refresh in the
 *   background with `after()` (runs once the response is sent);
 * - fresh: do nothing.
 * Only one sync runs at a time, and failures are retried at most every
 * RETRY_AFTER_FAILURE_MS so an API outage never slows every page down.
 * The Vercel cron (vercel.json) still works alongside this.
 */

export const FIRST_LOAD_WAIT_MS = 12_000;
export const RETRY_AFTER_FAILURE_MS = 5 * 60_000;

export type AutoSyncDecision = "skip" | "block" | "background";

/** Pure decision logic (unit-tested). Times are epoch ms; 0 = never. */
export function decideAutoSync(input: {
  now: number;
  lastSuccessAt: number;
  lastAttemptAt: number;
  inFlight: boolean;
  intervalMs: number;
}): AutoSyncDecision {
  const { now, lastSuccessAt, lastAttemptAt, inFlight, intervalMs } = input;
  const neverSynced = lastSuccessAt === 0;

  if (inFlight) return neverSynced ? "block" : "skip"; // join the running sync only if we have nothing to show
  if (!neverSynced && now - lastSuccessAt < intervalMs) return "skip"; // fresh
  if (lastAttemptAt > lastSuccessAt && now - lastAttemptAt < RETRY_AFTER_FAILURE_MS) return "skip"; // failed recently
  return neverSynced ? "block" : "background";
}

interface AutoSyncState {
  lastSuccessAt: number;
  lastAttemptAt: number;
  inFlight: Promise<void> | null;
}

// One state per server process (survives hot reload and separately compiled routes)
const globalForAutoSync = globalThis as unknown as { __dreamBikerAutoSync?: AutoSyncState };
const state = (globalForAutoSync.__dreamBikerAutoSync ??= { lastSuccessAt: 0, lastAttemptAt: 0, inFlight: null });

function runSync(): Promise<void> {
  if (!state.inFlight) {
    state.inFlight = socialSync
      .syncAll()
      .then((outcome) => {
        if (outcome.overallSuccess) state.lastSuccessAt = Date.now();
        else console.warn("⚠️ [auto-sync] sync finished without success:", outcome.results.map((r) => r.error || r.message));
      })
      .catch((error) => console.error("❌ [auto-sync] sync failed:", error))
      .finally(() => {
        state.lastAttemptAt = Date.now();
        state.inFlight = null;
      });
  }
  return state.inFlight;
}

export async function ensureFreshSocialData(): Promise<void> {
  if (!serverEnv.SOCIAL_SYNC_ENABLED || !socialSync.hasConfiguredProviders()) return;

  // With a database, a sync by another server instance (or the cron) also counts
  if (state.lastSuccessAt === 0) {
    const fromDb = await socialStorage.getLastSuccessfulSyncAt().catch(() => null);
    if (fromDb) state.lastSuccessAt = fromDb;
  }

  const decision = decideAutoSync({
    now: Date.now(),
    lastSuccessAt: state.lastSuccessAt,
    lastAttemptAt: state.lastAttemptAt,
    inFlight: state.inFlight !== null,
    intervalMs: serverEnv.SOCIAL_SYNC_INTERVAL_MINUTES * 60_000,
  });

  if (decision === "block") {
    await Promise.race([runSync(), new Promise((resolve) => setTimeout(resolve, FIRST_LOAD_WAIT_MS))]);
  } else if (decision === "background") {
    try {
      after(() => runSync());
    } catch {
      void runSync(); // outside a request scope (e.g. a script)
    }
  }
}
