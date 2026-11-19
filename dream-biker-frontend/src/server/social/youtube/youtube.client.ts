import "server-only";
import { serverEnv } from "@/lib/env/server";
import {
  YouTubeChannelListResponse,
  YouTubePlaylistItemListResponse,
  YouTubeVideoListResponse,
} from "./youtube.types";

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export class YouTubeClient {
  private apiKey: string;

  constructor() {
    this.apiKey = serverEnv.YOUTUBE_API_KEY || "";
  }

  public isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim() !== "");
  }

  /**
   * Safe fetch with standard timeout and error decoding
   */
  private async fetchApi<T>(endpoint: string, params: Record<string, string>): Promise<T> {
    if (!this.isConfigured()) {
      throw new Error("YOUTUBE_API_KEY is not configured in server environment.");
    }

    const url = new URL(`${YOUTUBE_API_BASE}/${endpoint}`);
    url.searchParams.set("key", this.apiKey);

    for (const [key, value] of Object.entries(params)) {
      if (value) {
        url.searchParams.set(key, value);
      }
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 300 }, // 5-minute Next.js cache
    });

    if (!response.ok) {
      let errorMessage = `YouTube API Error ${response.status}: ${response.statusText}`;
      try {
        const errorJson = await response.json();
        if (errorJson.error?.message) {
          errorMessage = `YouTube API: ${errorJson.error.message}`;
        }
      } catch {
        // ignore json parse error
      }
      throw new Error(errorMessage);
    }

    return (await response.json()) as T;
  }

  /**
   * Fetch Channel by ID or by handle (@DreamBiker532)
   */
  public async getChannel(channelIdOrHandle?: string): Promise<YouTubeChannelListResponse> {
    const handle = serverEnv.YOUTUBE_CHANNEL_HANDLE?.trim();
    const target =
      channelIdOrHandle ||
      serverEnv.YOUTUBE_CHANNEL_ID ||
      (handle ? (handle.startsWith("@") ? handle : `@${handle}`) : "") ||
      "@DreamBiker532";

    if (target.startsWith("@")) {
      return this.fetchApi<YouTubeChannelListResponse>("channels", {
        part: "snippet,contentDetails,statistics",
        forHandle: target,
      });
    }

    return this.fetchApi<YouTubeChannelListResponse>("channels", {
      part: "snippet,contentDetails,statistics",
      id: target,
    });
  }

  /**
   * Fetch uploaded video items from a playlist ID
   */
  public async getPlaylistItems(
    playlistId: string,
    maxResults = 50,
    pageToken?: string
  ): Promise<YouTubePlaylistItemListResponse> {
    return this.fetchApi<YouTubePlaylistItemListResponse>("playlistItems", {
      part: "snippet",
      playlistId,
      maxResults: maxResults.toString(),
      ...(pageToken ? { pageToken } : {}),
    });
  }

  /**
   * Batch fetch video statistics and content details by IDs (up to 50 at once)
   */
  public async getVideosByIds(videoIds: string[]): Promise<YouTubeVideoListResponse> {
    if (videoIds.length === 0) {
      return { items: [] };
    }

    return this.fetchApi<YouTubeVideoListResponse>("videos", {
      part: "snippet,contentDetails,statistics",
      id: videoIds.join(","),
      maxResults: "50",
    });
  }
}

/**
 * Parses ISO 8601 duration (e.g. PT1H12M34S, PT4M5S, PT45S) into standard mm:ss or hh:mm:ss
 */
export function formatYouTubeDuration(isoDuration?: string): string {
  if (!isoDuration) return "00:00";

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "00:00";

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  if (hours > 0) {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return `${minutes}:${formattedSeconds}`;
}

/**
 * Checks if a video duration qualifies as a Short (<= 60 seconds)
 */
export function isYouTubeShort(isoDuration?: string, title?: string, description?: string): boolean {
  if (title?.toLowerCase().includes("#shorts") || description?.toLowerCase().includes("#shorts")) {
    return true;
  }

  if (!isoDuration) return false;

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return false;

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds <= 60 && totalSeconds > 0;
}
