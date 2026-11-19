import { NextResponse } from "next/server";
import { socialStorage } from "@/server/social/storage/social-storage.service";

export async function GET() {
  try {
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
