import { NextResponse } from "next/server";
import { YouTubeService } from "@/server/social/youtube/youtube.service";

export async function GET() {
  try {
    const youtube = new YouTubeService();
    if (!youtube.isAvailable()) {
      return NextResponse.json({
        success: false,
        configured: false,
        message: "YouTube API key is not configured.",
      });
    }

    const channel = await youtube.getChannelInfo();
    return NextResponse.json({
      success: true,
      configured: true,
      data: channel,
    });
  } catch (error) {
    console.error("❌ [API /api/social/youtube/channel] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch YouTube channel.",
      },
      { status: 500 }
    );
  }
}
