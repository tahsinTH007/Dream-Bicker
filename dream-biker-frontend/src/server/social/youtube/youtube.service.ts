import "server-only";
import { YouTubeClient, formatYouTubeDuration, isYouTubeShort } from "./youtube.client";
import {
  NormalizedAccount,
  NormalizedVideo,
  NormalizedPhoto,
  NormalizedPost,
} from "../social.types";

export class YouTubeService {
  private client: YouTubeClient;

  constructor() {
    this.client = new YouTubeClient();
  }

  public isAvailable(): boolean {
    return this.client.isConfigured();
  }

  /**
   * Retrieve and normalize YouTube channel details
   */
  public async getChannelInfo(): Promise<NormalizedAccount | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const response = await this.client.getChannel();
      const channel = response.items?.[0];
      if (!channel) return null;

      const profileImage =
        channel.snippet.thumbnails.high?.url ||
        channel.snippet.thumbnails.medium?.url ||
        channel.snippet.thumbnails.default?.url;

      const customUrl = channel.snippet.customUrl
        ? `https://www.youtube.com/${channel.snippet.customUrl}`
        : `https://www.youtube.com/channel/${channel.id}`;

      return {
        id: `yt-${channel.id}`,
        provider: "YOUTUBE",
        providerAccountId: channel.id,
        name: channel.snippet.title,
        username: channel.snippet.customUrl || "@DreamBiker532",
        profileImageUrl: profileImage || null,
        profileUrl: customUrl,
        subscriberCount: channel.statistics.hiddenSubscriberCount
          ? null
          : parseInt(channel.statistics.subscriberCount, 10) || null,
        followerCount: null,
        totalViews: parseInt(channel.statistics.viewCount, 10) || null,
        totalVideos: parseInt(channel.statistics.videoCount, 10) || null,
        bio: channel.snippet.description || null,
        lastSyncedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("❌ [YouTubeService] getChannelInfo error:", error);
      throw error;
    }
  }

  /**
   * Retrieve all recent uploads using uploads playlist + batch videos.list
   */
  public async fetchRecentVideos(maxResults = 50): Promise<{
    videos: NormalizedVideo[];
    photos: NormalizedPhoto[];
    posts: NormalizedPost[];
  }> {
    if (!this.isAvailable()) {
      return { videos: [], photos: [], posts: [] };
    }

    try {
      // 1. Get channel details to find uploads playlist ID
      const channelResponse = await this.client.getChannel();
      const channel = channelResponse.items?.[0];
      const uploadsPlaylistId = channel?.contentDetails?.relatedPlaylists?.uploads;

      if (!uploadsPlaylistId) {
        throw new Error("Could not find uploads playlist for YouTube channel.");
      }

      // 2. Fetch items from uploads playlist
      const playlistResponse = await this.client.getPlaylistItems(uploadsPlaylistId, maxResults);
      const playlistItems = playlistResponse.items || [];

      if (playlistItems.length === 0) {
        return { videos: [], photos: [], posts: [] };
      }

      // 3. Extract video IDs
      const videoIds = playlistItems
        .map((item) => item.snippet.resourceId.videoId)
        .filter(Boolean);

      // 4. Batch fetch video details & statistics
      const videosResponse = await this.client.getVideosByIds(videoIds);
      const videoMap = new Map(videosResponse.items?.map((item) => [item.id, item]) || []);

      // 5. Normalize
      const normalizedVideos: NormalizedVideo[] = [];
      const normalizedPhotos: NormalizedPhoto[] = [];
      const normalizedPosts: NormalizedPost[] = [];

      for (const item of playlistItems) {
        const videoId = item.snippet.resourceId.videoId;
        const details = videoMap.get(videoId);

        const title = details?.snippet.title || item.snippet.title;
        const description = details?.snippet.description || item.snippet.description;
        const publishedAt = details?.snippet.publishedAt || item.snippet.publishedAt;

        const bestThumb =
          details?.snippet.thumbnails.maxres?.url ||
          details?.snippet.thumbnails.high?.url ||
          details?.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.high?.url ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        const durationStr = details?.contentDetails.duration;
        const formattedDuration = formatYouTubeDuration(durationStr);
        const isShort = isYouTubeShort(durationStr, title, description);

        const viewCount = details?.statistics.viewCount
          ? parseInt(details.statistics.viewCount, 10)
          : null;
        const likeCount = details?.statistics.likeCount
          ? parseInt(details.statistics.likeCount, 10)
          : null;
        const commentCount = details?.statistics.commentCount
          ? parseInt(details.statistics.commentCount, 10)
          : null;

        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        // Normalized Video
        normalizedVideos.push({
          id: `yt-vid-${videoId}`,
          provider: "YOUTUBE",
          externalId: videoId,
          title,
          description: description || "",
          url: videoUrl,
          thumbnailUrl: bestThumb,
          publishedAt,
          duration: formattedDuration,
          viewCount,
          likeCount,
          commentCount,
          isShortOrReel: isShort,
        });

        // Normalized Photo (HD Thumbnail for gallery with isThumbnail: true)
        normalizedPhotos.push({
          id: `yt-thumb-${videoId}`,
          provider: "YOUTUBE",
          externalId: `thumb-${videoId}`,
          sourcePostId: videoId,
          imageUrl: bestThumb,
          thumbnailUrl: bestThumb,
          caption: `${title} (ভিডিও থাম্বনেইল)`,
          sourceUrl: videoUrl,
          isThumbnail: true,
          publishedAt,
        });

        // Normalized Post (for Blog feed, clearly marked as YouTube Documentary Article)
        if (!isShort) {
          normalizedPosts.push({
            id: `yt-post-${videoId}`,
            provider: "YOUTUBE",
            externalId: `post-${videoId}`,
            postType: "VIDEO",
            title,
            content: description || title,
            url: videoUrl,
            mediaUrls: [bestThumb],
            publishedAt,
            likeCount,
            commentCount,
            shareCount: null,
          });
        }
      }

      return {
        videos: normalizedVideos,
        photos: normalizedPhotos,
        posts: normalizedPosts,
      };
    } catch (error) {
      console.error("❌ [YouTubeService] fetchRecentVideos error:", error);
      throw error;
    }
  }
}
