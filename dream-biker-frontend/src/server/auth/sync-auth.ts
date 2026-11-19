import "server-only";
import { NextRequest } from "next/server";
import { serverEnv } from "@/lib/env/server";

export function isAuthorizedSyncRequest(request: NextRequest): boolean {
  const secretKey = serverEnv.SYNC_SECRET_KEY;
  if (!secretKey) return false;

  // 1. Check Authorization: Bearer <token>
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    if (token === secretKey) return true;
  }

  // 2. Check custom x-sync-secret header
  const customHeader = request.headers.get("x-sync-secret");
  if (customHeader && customHeader.trim() === secretKey) {
    return true;
  }

  // 3. Check ?secret= query parameter (for easy webhook / testing)
  const querySecret = request.nextUrl.searchParams.get("secret");
  if (querySecret && querySecret.trim() === secretKey) {
    return true;
  }

  return false;
}
