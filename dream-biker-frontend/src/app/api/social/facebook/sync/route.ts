import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedSyncRequest } from "@/server/auth/sync-auth";
import { socialSync } from "@/server/social/synchronization/social-sync.service";

export async function POST(request: NextRequest) {
  if (!isAuthorizedSyncRequest(request)) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized. Missing or invalid secret key in Authorization or x-sync-secret header.",
      },
      { status: 401 }
    );
  }

  try {
    const result = await socialSync.syncFacebook();
    return NextResponse.json({
      success: result.success,
      data: result,
    });
  } catch (error) {
    console.error("❌ [API /api/social/facebook/sync] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Facebook synchronization failed.",
      },
      { status: 500 }
    );
  }
}
