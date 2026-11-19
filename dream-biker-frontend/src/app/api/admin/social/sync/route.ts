import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedSyncRequest } from "@/server/auth/sync-auth";
import { socialSync } from "@/server/social/synchronization/social-sync.service";

export async function POST(request: NextRequest) {
  if (!isAuthorizedSyncRequest(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized. Provide valid Authorization: Bearer <secret> or x-sync-secret header.",
      },
      { status: 401 }
    );
  }

  try {
    const outcome = await socialSync.syncAll();
    return NextResponse.json({
      success: outcome.overallSuccess,
      data: outcome,
    });
  } catch (error) {
    console.error("❌ [API /api/admin/social/sync] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Master synchronization failed.",
      },
      { status: 500 }
    );
  }
}

// Allow GET for Vercel Cron verification with Authorization Bearer header
export async function GET(request: NextRequest) {
  return POST(request);
}
