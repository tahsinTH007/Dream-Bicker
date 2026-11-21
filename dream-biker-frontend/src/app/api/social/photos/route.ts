import { NextRequest, NextResponse } from "next/server";
import { socialStorage } from "@/server/social/storage/social-storage.service";
import { ensureFreshSocialData } from "@/server/social/auto-sync";

export async function GET(request: NextRequest) {
  try {
    // sync from YouTube/Facebook if data is missing or stale (see server/social/auto-sync.ts)
    await ensureFreshSocialData();
    const searchParams = request.nextUrl.searchParams;
    const platform = searchParams.get("platform") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "18", 10);

    const result = await socialStorage.getPhotos({ platform, page, limit });

    return NextResponse.json({
      success: true,
      data: result.items,
      pagination: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error("❌ [API /api/social/photos] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve social photos.",
      },
      { status: 500 }
    );
  }
}
