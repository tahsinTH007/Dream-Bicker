import "server-only";
import { YouTubeService } from "../youtube/youtube.service";
import { FacebookService } from "../facebook/facebook.service";
import { socialStorage } from "../storage/social-storage.service";
import { SyncResult } from "../social.types";
import { isDatabaseConfigured } from "@/lib/db/prisma";

export class SocialSyncService {
  private youtube: YouTubeService;
  private facebook: FacebookService;

  constructor() {
    this.youtube = new YouTubeService();
    this.facebook = new FacebookService();
  }

  /** true when at least one platform has credentials, i.e. a sync can fetch anything */
  public hasConfiguredProviders(): boolean {
    return this.youtube.isAvailable() || this.facebook.isAvailable();
  }

  /**
   * Synchronize YouTube Channel & Videos
   */
  public async syncYouTube(): Promise<SyncResult> {
    const startTime = Date.now();
    try {
      if (!this.youtube.isAvailable()) {
        return {
          provider: "YOUTUBE",
          success: false,
          itemsSynced: 0,
          message: "YouTube API credentials are not configured in environment variables.",
          timestamp: new Date().toISOString(),
          durationMs: Date.now() - startTime,
        };
      }

      // 1. Fetch channel info
      const channel = await this.youtube.getChannelInfo();
      if (channel) {
        await socialStorage.upsertAccount(channel);
      }

      // 2. Fetch videos, thumbnails, and documentary articles
      const { videos, photos } = await this.youtube.fetchRecentVideos(50);

      await Promise.all([
        socialStorage.upsertVideos(videos),
        socialStorage.upsertPhotos(photos),
      ]);

      const totalItems = videos.length + photos.length;
      const durationMs = Date.now() - startTime;

      await socialStorage.logSync(
        "YOUTUBE",
        "SUCCESS",
        totalItems,
        `Synchronized ${videos.length} videos and ${photos.length} thumbnails.`,
        undefined,
        durationMs
      );

      return {
        provider: "YOUTUBE",
        success: true,
        itemsSynced: totalItems,
        message: `Successfully synchronized ${videos.length} YouTube videos and assets.`,
        timestamp: new Date().toISOString(),
        durationMs,
      };
    } catch (error) {
      const durationMs = Date.now() - startTime;
      const errorMsg = error instanceof Error ? error.message : "Unknown YouTube sync error";
      console.error("❌ [SocialSyncService] YouTube sync failed:", errorMsg);

      await socialStorage.logSync("YOUTUBE", "FAILED", 0, "YouTube sync failed", errorMsg, durationMs);

      return {
        provider: "YOUTUBE",
        success: false,
        itemsSynced: 0,
        message: "YouTube synchronization encountered an error.",
        error: errorMsg,
        timestamp: new Date().toISOString(),
        durationMs,
      };
    }
  }

  /**
   * Synchronize Facebook Page Posts, Photos, and Videos
   */
  public async syncFacebook(): Promise<SyncResult> {
    const startTime = Date.now();
    try {
      if (!this.facebook.isAvailable()) {
        return {
          provider: "FACEBOOK",
          success: false,
          itemsSynced: 0,
          message: "Facebook Graph API credentials are not configured in environment variables.",
          timestamp: new Date().toISOString(),
          durationMs: Date.now() - startTime,
        };
      }

      // 1. Fetch page details
      const page = await this.facebook.getPageInfo();
      if (page) {
        await socialStorage.upsertAccount(page);
      }

      // 2. Fetch posts and photos (including subattachments)
      const { posts, photos } = await this.facebook.fetchRecentPosts(30);

      // 3. Fetch uploaded videos / Reels
      const videos = await this.facebook.fetchRecentVideos(25);

      await Promise.all([
        socialStorage.upsertPosts(posts),
        socialStorage.upsertPhotos(photos),
        socialStorage.upsertVideos(videos),
      ]);

      const totalItems = posts.length + photos.length + videos.length;
      const durationMs = Date.now() - startTime;

      await socialStorage.logSync(
        "FACEBOOK",
        "SUCCESS",
        totalItems,
        `Synchronized ${posts.length} posts, ${photos.length} photos, ${videos.length} videos.`,
        undefined,
        durationMs
      );

      return {
        provider: "FACEBOOK",
        success: true,
        itemsSynced: totalItems,
        message: `Successfully synchronized ${posts.length} Facebook posts and media.`,
        timestamp: new Date().toISOString(),
        durationMs,
      };
    } catch (error) {
      const durationMs = Date.now() - startTime;
      const errorMsg = error instanceof Error ? error.message : "Unknown Facebook sync error";
      console.error("❌ [SocialSyncService] Facebook sync failed:", errorMsg);

      await socialStorage.logSync("FACEBOOK", "FAILED", 0, "Facebook sync failed", errorMsg, durationMs);

      return {
        provider: "FACEBOOK",
        success: false,
        itemsSynced: 0,
        message: "Facebook synchronization encountered an error.",
        error: errorMsg,
        timestamp: new Date().toISOString(),
        durationMs,
      };
    }
  }

  /**
   * Synchronize All Connected Social Providers with Independent Failure Isolation
   */
  public async syncAll(): Promise<{
    results: SyncResult[];
    overallSuccess: boolean;
    totalItems: number;
    durationMs: number;
    persisted: boolean;
    warning?: string;
  }> {
    const startTime = Date.now();

    // Run in parallel with Promise.allSettled so one provider's failure never blocks the other
    const [ytResult, fbResult] = await Promise.allSettled([
      this.syncYouTube(),
      this.syncFacebook(),
    ]);

    const results: SyncResult[] = [];

    if (ytResult.status === "fulfilled") {
      results.push(ytResult.value);
    } else {
      results.push({
        provider: "YOUTUBE",
        success: false,
        itemsSynced: 0,
        message: "YouTube synchronization threw an unhandled exception.",
        error: String(ytResult.reason),
        timestamp: new Date().toISOString(),
        durationMs: 0,
      });
    }

    if (fbResult.status === "fulfilled") {
      results.push(fbResult.value);
    } else {
      results.push({
        provider: "FACEBOOK",
        success: false,
        itemsSynced: 0,
        message: "Facebook synchronization threw an unhandled exception.",
        error: String(fbResult.reason),
        timestamp: new Date().toISOString(),
        durationMs: 0,
      });
    }

    const totalItems = results.reduce((acc, r) => acc + r.itemsSynced, 0);
    const overallSuccess = results.some((r) => r.success);
    const durationMs = Date.now() - startTime;
    const persisted = isDatabaseConfigured();

    return {
      results,
      overallSuccess,
      totalItems,
      durationMs,
      persisted,
      ...(persisted
        ? {}
        : {
            warning:
              "DATABASE_URL is not configured: synced data is held only in this server instance's memory. " +
              "On serverless hosts (e.g. Vercel) other instances start empty and everything is lost on restart.",
          }),
    };
  }
}

export const socialSync = new SocialSyncService();
