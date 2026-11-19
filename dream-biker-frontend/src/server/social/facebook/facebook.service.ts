import "server-only";
import { FacebookClient } from "./facebook.client";
import {
  NormalizedAccount,
  NormalizedPost,
  NormalizedPhoto,
  NormalizedVideo,
} from "../social.types";

export class FacebookService {
  private client: FacebookClient;

  constructor() {
    this.client = new FacebookClient();
  }

  public isAvailable(): boolean {
    return this.client.isConfigured();
  }

  /**
   * Fetch and normalize Facebook Page Details
   */
  public async getPageInfo(): Promise<NormalizedAccount | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const page = await this.client.getPage();
      return {
        id: `fb-${page.id}`,
        provider: "FACEBOOK",
        providerAccountId: page.id,
        name: page.name || "Dream Biker",
        username: "BuydreambyHanif",
        profileImageUrl: page.picture?.data?.url || null,
        profileUrl: page.link || "https://www.facebook.com/BuydreambyHanif",
        subscriberCount: null,
        followerCount: page.followers_count || page.fan_count || null,
        totalViews: null,
        totalVideos: null,
        bio: page.about || null,
        lastSyncedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("❌ [FacebookService] getPageInfo error:", error);
      throw error;
    }
  }

  /**
   * Fetch recent posts and extract posts and gallery photos (including subattachments)
   */
  public async fetchRecentPosts(limit = 25): Promise<{
    posts: NormalizedPost[];
    photos: NormalizedPhoto[];
  }> {
    if (!this.isAvailable()) {
      return { posts: [], photos: [] };
    }

    try {
      const response = await this.client.getPosts(limit);
      const postItems = response.data || [];

      const normalizedPosts: NormalizedPost[] = [];
      const normalizedPhotos: NormalizedPhoto[] = [];

      for (const item of postItems) {
        const content = item.message || item.story || "";
        if (!content && (!item.attachments || !item.attachments.data?.length)) {
          continue;
        }

        const mediaUrls: string[] = [];
        let postType: "TEXT" | "PHOTO" | "VIDEO" | "LINK" = "TEXT";

        const attachments = item.attachments?.data || [];
        attachments.forEach((att, attIdx) => {
          if (att.type === "video_inline" || att.type === "video") {
            postType = "VIDEO";
          } else if (att.type === "photo") {
            postType = "PHOTO";
          }

          if (att.media?.image?.src) {
            mediaUrls.push(att.media.image.src);

            // Stable key: Facebook's own object id when present, otherwise the
            // attachment's position inside this post (never a global counter,
            // which shifts whenever new posts arrive and creates duplicates).
            const photoKey = `${item.id}-${att.target?.id || `a${attIdx}`}`;

            // Add main photo to gallery
            normalizedPhotos.push({
              id: `fb-photo-${photoKey}`,
              provider: "FACEBOOK",
              externalId: `photo-${photoKey}`,
              sourcePostId: item.id,
              imageUrl: att.media.image.src,
              thumbnailUrl: att.media.image.src,
              caption: content.slice(0, 150) || att.title || "ড্রিম বাইকার ফেসবুক ফটো",
              sourceUrl: item.permalink_url,
              isThumbnail: false,
              publishedAt: item.created_time,
            });
          }

          // Handle multi-photo album subattachments
          if (att.subattachments?.data) {
            postType = "PHOTO";
            att.subattachments.data.forEach((sub, subIdx) => {
              if (sub.media?.image?.src && !mediaUrls.includes(sub.media.image.src)) {
                mediaUrls.push(sub.media.image.src);

                const subKey = `${item.id}-${sub.target?.id || `a${attIdx}s${subIdx}`}`;

                normalizedPhotos.push({
                  id: `fb-subphoto-${subKey}`,
                  provider: "FACEBOOK",
                  externalId: `subphoto-${subKey}`,
                  sourcePostId: item.id,
                  imageUrl: sub.media.image.src,
                  thumbnailUrl: sub.media.image.src,
                  caption: content.slice(0, 150) || "ড্রিম বাইকার মাঠপর্যায়ের ছবি",
                  sourceUrl: sub.target?.url || item.permalink_url,
                  isThumbnail: false,
                  publishedAt: item.created_time,
                });
              }
            });
          }
        });

        normalizedPosts.push({
          id: `fb-post-${item.id}`,
          provider: "FACEBOOK",
          externalId: item.id,
          postType,
          title: content ? content.slice(0, 80) : null,
          content,
          url: item.permalink_url,
          mediaUrls,
          publishedAt: item.created_time,
          likeCount: item.reactions?.summary?.total_count || null,
          commentCount: item.comments?.summary?.total_count || null,
          shareCount: item.shares?.count || null,
        });
      }

      return { posts: normalizedPosts, photos: normalizedPhotos };
    } catch (error) {
      console.error("❌ [FacebookService] fetchRecentPosts error:", error);
      throw error;
    }
  }

  /**
   * Fetch recent videos & Reels from Facebook Page
   */
  public async fetchRecentVideos(limit = 25): Promise<NormalizedVideo[]> {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      const response = await this.client.getVideos(limit);
      const videoItems = response.data || [];

      return videoItems.map((item) => {
        const preferredThumb =
          item.thumbnails?.data?.find((t) => t.is_preferred)?.uri ||
          item.thumbnails?.data?.[0]?.uri ||
          item.picture ||
          "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80";

        // Duration formatting
        let durationStr = "00:00";
        if (item.length) {
          const mins = Math.floor(item.length / 60);
          const secs = Math.floor(item.length % 60);
          durationStr = `${mins}:${secs < 10 ? `0${secs}` : secs}`;
        }

        const isReel = (item.length !== undefined && item.length <= 90) || false;

        return {
          id: `fb-vid-${item.id}`,
          provider: "FACEBOOK",
          externalId: item.id,
          title: item.title || item.description?.slice(0, 80) || "ড্রিম বাইকার ফেসবুক ভিডিও",
          description: item.description || "",
          url: item.permalink_url,
          thumbnailUrl: preferredThumb,
          publishedAt: item.created_time,
          duration: durationStr,
          viewCount: item.views || null,
          likeCount: item.likes?.summary?.total_count || null,
          commentCount: item.comments?.summary?.total_count || null,
          isShortOrReel: isReel,
        };
      });
    } catch (error) {
      console.error("❌ [FacebookService] fetchRecentVideos error:", error);
      throw error;
    }
  }
}
