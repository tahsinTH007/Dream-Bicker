import { NextResponse } from "next/server";
import { socialStorage } from "@/server/social/storage/social-storage.service";
import { ensureFreshSocialData } from "@/server/social/auto-sync";

export async function GET() {
  try {
    // sync from YouTube/Facebook if data is missing or stale (see server/social/auto-sync.ts)
    await ensureFreshSocialData();
    const accounts = await socialStorage.getAccounts();
    return NextResponse.json({
      success: true,
      data: accounts,
    });
  } catch (error) {
    console.error("❌ [API /api/social/accounts] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve social accounts.",
      },
      { status: 500 }
    );
  }
}
