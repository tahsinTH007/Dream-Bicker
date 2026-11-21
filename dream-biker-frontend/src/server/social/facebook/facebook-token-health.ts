import "server-only";
import { serverEnv } from "@/lib/env/server";

export type TokenHealthStatus = "ok" | "warning" | "expired" | "invalid" | "not_configured" | "error";

export interface FacebookTokenHealth {
  status: TokenHealthStatus;
  message: string;
  type?: string;
  pageId?: string;
  /** ISO date, or null when the token itself never expires */
  expiresAt?: string | null;
  /** ISO date when Meta stops returning data until the admin logs in again (null = no limit) */
  dataAccessExpiresAt?: string | null;
  daysLeft?: number | null;
  scopes?: string[];
}

/** Warn this many days before the token or its data access runs out. */
export const WARNING_DAYS = 14;

interface DebugData {
  is_valid: boolean;
  type?: string;
  profile_id?: string;
  expires_at?: number;
  data_access_expires_at?: number;
  scopes?: string[];
  error?: { message?: string };
}

/** Pure classification of a debug_token result (unit-tested). */
export function classifyTokenHealth(d: DebugData, now = Date.now()): FacebookTokenHealth {
  const toIso = (s?: number) => (s ? new Date(s * 1000).toISOString() : null);
  const days = (s?: number) => (s ? Math.floor((s * 1000 - now) / 86_400_000) : null);

  const base = {
    type: d.type,
    pageId: d.profile_id,
    expiresAt: toIso(d.expires_at),
    dataAccessExpiresAt: toIso(d.data_access_expires_at),
    scopes: d.scopes,
  };

  if (!d.is_valid) {
    return { ...base, status: "invalid", daysLeft: 0, message: d.error?.message || "Token is not valid." };
  }

  // The earliest of "token expires" and "data access ends" is what actually stops the sync
  const deadlines = [d.expires_at, d.data_access_expires_at].filter((x): x is number => !!x && x > 0);
  const earliest = deadlines.length ? Math.min(...deadlines) : undefined;
  const daysLeft = days(earliest);

  if (earliest && earliest * 1000 <= now) {
    return { ...base, status: "expired", daysLeft: 0, message: "Token or its data access has expired. Generate a new token." };
  }
  if (daysLeft !== null && daysLeft < WARNING_DAYS) {
    return {
      ...base,
      status: "warning",
      daysLeft,
      message: `Facebook access ends in ${daysLeft} day(s). Renew the token (npm run facebook:token) before then.`,
    };
  }
  return {
    ...base,
    status: "ok",
    daysLeft,
    message: earliest ? `Facebook access is valid for ${daysLeft} more days.` : "Token has no expiry.",
  };
}

/** Ask Meta about the configured page token (the token can inspect itself). */
export async function getFacebookTokenHealth(): Promise<FacebookTokenHealth> {
  const token = serverEnv.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!token) return { status: "not_configured", message: "FACEBOOK_PAGE_ACCESS_TOKEN is not set." };

  try {
    const url = new URL(`https://graph.facebook.com/${serverEnv.FACEBOOK_GRAPH_API_VERSION || "v22.0"}/debug_token`);
    url.searchParams.set("input_token", token);
    url.searchParams.set("access_token", token);
    const res = await fetch(url, { cache: "no-store" });
    const json = (await res.json()) as { data?: DebugData; error?: { message?: string } };
    if (json.error || !json.data) {
      return { status: "error", message: json.error?.message || "Could not inspect the token." };
    }
    return classifyTokenHealth(json.data);
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : "Could not reach Facebook." };
  }
}
