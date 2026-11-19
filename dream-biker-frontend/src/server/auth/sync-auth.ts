import "server-only";
import { timingSafeEqual } from "node:crypto";
import { NextRequest } from "next/server";
import { serverEnv } from "@/lib/env/server";

/** Minimum length for a configured secret; shorter values are ignored as unsafe. */
const MIN_SECRET_LENGTH = 16;

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function getAcceptedSecrets(): string[] {
  return [serverEnv.SYNC_SECRET_KEY, serverEnv.CRON_SECRET]
    .map((s) => (s || "").trim())
    .filter((s) => s.length >= MIN_SECRET_LENGTH);
}

/**
 * Authorizes protected sync/admin requests.
 * Accepts SYNC_SECRET_KEY (manual/admin use) or CRON_SECRET (sent by Vercel Cron).
 * If neither is configured (or both are too short), every request is rejected.
 */
export function isAuthorizedSyncRequest(request: NextRequest): boolean {
  const secrets = getAcceptedSecrets();
  if (secrets.length === 0) return false;

  const candidates: string[] = [];

  // 1. Authorization: Bearer <token>
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    candidates.push(authHeader.substring(7).trim());
  }

  // 2. x-sync-secret header
  const customHeader = request.headers.get("x-sync-secret");
  if (customHeader) candidates.push(customHeader.trim());

  // (No ?secret= query parameter: secrets in URLs end up in server, proxy and
  // analytics logs and in browser history. Use one of the headers above.)

  return candidates.some((candidate) => secrets.some((secret) => safeEqual(candidate, secret)));
}
