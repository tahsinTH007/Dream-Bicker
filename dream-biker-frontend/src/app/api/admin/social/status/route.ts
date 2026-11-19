import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedSyncRequest } from "@/server/auth/sync-auth";
import { socialStorage } from "@/server/social/storage/social-storage.service";
import { isDatabaseConfigured } from "@/lib/db/prisma";

export async function GET(request: NextRequest) {
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
    const statuses = await socialStorage.getProviderStatuses();
    const accounts = await socialStorage.getAccounts();

    return NextResponse.json({
      success: true,
      databaseConnected: isDatabaseConfigured(),
      providers: statuses,
      accounts,
      serverTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ [API /api/admin/social/status] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve provider status.",
      },
      { status: 500 }
    );
  }
}
