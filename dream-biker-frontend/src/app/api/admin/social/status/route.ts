import { NextRequest, NextResponse } from "next/server";
import { isAuthorizedSyncRequest } from "@/server/auth/sync-auth";
import { socialStorage } from "@/server/social/storage/social-storage.service";
import { isDatabaseConfigured } from "@/lib/db/prisma";
import { getFacebookTokenHealth } from "@/server/social/facebook/facebook-token-health";

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
    const [statuses, accounts, facebookToken] = await Promise.all([
      socialStorage.getProviderStatuses(),
      socialStorage.getAccounts(),
      getFacebookTokenHealth(),
    ]);

    return NextResponse.json({
      success: true,
      databaseConnected: isDatabaseConfigured(),
      providers: statuses,
      // valid / expiry / days left for the Facebook page token (warns 14 days ahead)
      facebookToken,
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
