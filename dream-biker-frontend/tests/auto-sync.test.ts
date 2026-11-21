import { describe, expect, it } from "vitest";
import { decideAutoSync, RETRY_AFTER_FAILURE_MS } from "@/server/social/auto-sync";

const NOW = 1_800_000_000_000;
const MIN = 60_000;
const base = { now: NOW, lastSuccessAt: 0, lastAttemptAt: 0, inFlight: false, intervalMs: 30 * MIN };

describe("decideAutoSync", () => {
  it("blocks for the first sync when nothing has been synced (fresh start / deploy)", () => {
    expect(decideAutoSync(base)).toBe("block");
  });

  it("joins a running first sync instead of starting another", () => {
    expect(decideAutoSync({ ...base, inFlight: true })).toBe("block");
  });

  it("skips while data is fresh", () => {
    expect(decideAutoSync({ ...base, lastSuccessAt: NOW - 10 * MIN, lastAttemptAt: NOW - 10 * MIN })).toBe("skip");
  });

  it("refreshes in the background once data is older than the interval", () => {
    expect(decideAutoSync({ ...base, lastSuccessAt: NOW - 31 * MIN, lastAttemptAt: NOW - 31 * MIN })).toBe("background");
  });

  it("does not start a second background sync while one is running", () => {
    expect(decideAutoSync({ ...base, lastSuccessAt: NOW - 31 * MIN, inFlight: true })).toBe("skip");
  });

  it("backs off after a failed attempt so an outage doesn't slow every page", () => {
    const failedRecently = { ...base, lastAttemptAt: NOW - 1 * MIN };
    expect(decideAutoSync(failedRecently)).toBe("skip");
    expect(decideAutoSync({ ...failedRecently, lastAttemptAt: NOW - RETRY_AFTER_FAILURE_MS - 1 })).toBe("block");
  });
});
