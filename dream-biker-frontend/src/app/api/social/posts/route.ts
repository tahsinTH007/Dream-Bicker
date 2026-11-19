import { NextRequest, NextResponse } from "next/server";
import { socialStorage } from "@/server/social/storage/social-storage.service";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const platform = searchParams.get("platform") || "all";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const result = await socialStorage.getPosts({ platform, page, limit });

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
    console.error("❌ [API /api/social/posts] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve social posts.",
      },
      { status: 500 }
    );
  }
}
