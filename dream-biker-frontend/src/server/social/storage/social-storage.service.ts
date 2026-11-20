import "server-only";
import { prisma, isDatabaseConfigured } from "@/lib/db/prisma";
import { serverEnv } from "@/lib/env/server";
import {
  NormalizedAccount,
  NormalizedVideo,
  NormalizedPost,
  NormalizedPhoto,
  SocialPlatform,
  ProviderStatus,
} from "../social.types";
import {
  demoYouTubeChannel,
  demoFacebookPage,
  demoYouTubeVideos,
  demoFacebookPosts,
  demoGalleryPhotos,
} from "@/data/placeholder.data";

// In-Memory & Fallback Cache Store
interface MemorySocialStore {
  accounts: NormalizedAccount[];
  videos: NormalizedVideo[];
  posts: NormalizedPost[];
  photos: NormalizedPhoto[];
  lastSyncedAt: Record<string, string>;
}

function initializeDefaultStore(): MemorySocialStore {
  const ytAccount: NormalizedAccount = {
    id: `yt-${demoYouTubeChannel.id}`,
    provider: "YOUTUBE",
    providerAccountId: demoYouTubeChannel.id,
    name: demoYouTubeChannel.title,
    username: demoYouTubeChannel.customUrl,
    profileImageUrl: demoYouTubeChannel.thumbnailUrl,
    profileUrl: `https://www.youtube.com/${demoYouTubeChannel.customUrl}`,
    subscriberCount: demoYouTubeChannel.subscriberCount,
    followerCount: null,
    totalViews: demoYouTubeChannel.viewCount,
    totalVideos: demoYouTubeChannel.videoCount,
    lastSyncedAt: new Date().toISOString(),
    bio: demoYouTubeChannel.description,
  };

  const fbAccount: NormalizedAccount = {
    id: `fb-${demoFacebookPage.id}`,
    provider: "FACEBOOK",
    providerAccountId: demoFacebookPage.id,
    name: demoFacebookPage.name,
    username: "BuydreambyHanif",
    profileImageUrl: demoFacebookPage.profilePictureUrl,
    profileUrl: demoFacebookPage.pageUrl,
    subscriberCount: null,
    followerCount: demoFacebookPage.followerCount,
    totalViews: null,
    totalVideos: null,
    lastSyncedAt: new Date().toISOString(),
    bio: "ড্রিম বাইকার অফিশিয়াল ফেসবুক পেজ",
  };

  const initialVideos: NormalizedVideo[] = demoYouTubeVideos.map((v) => ({
    id: `yt-vid-${v.id}`,
    provider: "YOUTUBE",
    externalId: v.id,
    title: v.title,
    description: v.description,
    url: v.videoUrl,
    thumbnailUrl: v.thumbnailUrl,
    publishedAt: v.publishedAt,
    duration: "12:45",
    viewCount: v.viewCount,
    likeCount: v.likeCount,
    commentCount: v.commentCount,
    isShortOrReel: false,
  }));

  const initialPosts: NormalizedPost[] = demoFacebookPosts.map((p) => ({
    id: `fb-post-${p.id}`,
    provider: "FACEBOOK",
    externalId: p.id,
    postType: p.imageUrl ? "PHOTO" : "TEXT",
    title: p.caption.slice(0, 80),
    content: p.caption,
    url: p.originalPostUrl,
    mediaUrls: p.imageUrl ? [p.imageUrl] : [],
    publishedAt: p.publishedAt,
    likeCount: p.reactionCount,
    commentCount: p.commentCount,
    shareCount: p.shareCount,
  }));

  const initialPhotos: NormalizedPhoto[] = [];

  // Add photos from Facebook posts
  demoFacebookPosts.forEach((post, idx) => {
    if (post.imageUrl) {
      initialPhotos.push({
        id: `fb-photo-${post.id}-${idx}`,
        provider: "FACEBOOK",
        externalId: `photo-${post.id}-${idx}`,
        sourcePostId: post.id,
        imageUrl: post.imageUrl,
        thumbnailUrl: post.imageUrl,
        caption: post.caption.slice(0, 100),
        sourceUrl: post.originalPostUrl,
        isThumbnail: false,
        publishedAt: post.publishedAt,
      });
    }
  });

  // Add thumbnails from YouTube videos
  demoYouTubeVideos.forEach((video) => {
    initialPhotos.push({
      id: `yt-thumb-${video.id}`,
      provider: "YOUTUBE",
      externalId: `thumb-${video.id}`,
      sourcePostId: video.id,
      imageUrl: video.thumbnailUrl,
      thumbnailUrl: video.thumbnailUrl,
      caption: `${video.title} (ইউটিউব থাম্বনেইল)`,
      sourceUrl: video.videoUrl,
      isThumbnail: true,
      publishedAt: video.publishedAt,
    });
  });

  // Add curated gallery photos
  demoGalleryPhotos.forEach((item, idx) => {
    initialPhotos.push({
      id: `gal-photo-${item.id}`,
      provider: "FACEBOOK",
      externalId: `gal-${idx}`,
      imageUrl: item.imageUrl,
      thumbnailUrl: item.imageUrl,
      caption: `${item.title}: ${item.caption} (${item.location}, ${item.date})`,
      sourceUrl: "https://www.facebook.com/BuydreambyHanif",
      isThumbnail: false,
      publishedAt: new Date(Date.now() - (idx + 1) * 86400000 * 3).toISOString(),
    });
  });

  return {
    accounts: [ytAccount, fbAccount],
    videos: initialVideos,
    posts: initialPosts,
    photos: initialPhotos,
    lastSyncedAt: {
      YOUTUBE: new Date().toISOString(),
      FACEBOOK: new Date().toISOString(),
    },
  };
}

function initializeEmptyStore(): MemorySocialStore {
  return { accounts: [], videos: [], posts: [], photos: [], lastSyncedAt: {} };
}

/**
 * Sample content (stock photos posing as videos/posts) is for development only.
 * In production the site shows real synced content or empty states, unless
 * SHOW_SAMPLE_CONTENT=true is set explicitly.
 */
export const showSampleContent: boolean =
  serverEnv.SHOW_SAMPLE_CONTENT ?? process.env.NODE_ENV !== "production";

/** Copy of `items` sorted by publishedAt, newest first. */
function newestFirst<T extends { publishedAt: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// One in-memory store per server process, kept on globalThis. Next compiles
// API routes and pages as separate bundles (and hot reload re-evaluates
// modules), so a plain module-level object would give each route its own
// copy: a sync would fill one copy while pages read another. Serverless
// hosts still run several processes, which is why production needs DATABASE_URL.
const globalForStore = globalThis as unknown as { __dreamBikerSocialStore?: MemorySocialStore };
const memoryStore: MemorySocialStore = (globalForStore.__dreamBikerSocialStore ??= showSampleContent
  ? initializeDefaultStore()
  : initializeEmptyStore());

export class SocialStorageService {
  /**
   * Save or update social account
   */
  public async upsertAccount(account: NormalizedAccount): Promise<void> {
    if (isDatabaseConfigured() && prisma) {
      await prisma.socialAccount.upsert({
        where: {
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
        create: {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          name: account.name,
          username: account.username,
          profileImageUrl: account.profileImageUrl,
          profileUrl: account.profileUrl,
          subscriberCount: account.subscriberCount,
          followerCount: account.followerCount,
          totalViews: account.totalViews ? BigInt(account.totalViews) : null,
          totalVideos: account.totalVideos,
          lastSyncedAt: account.lastSyncedAt ? new Date(account.lastSyncedAt) : new Date(),
        },
        update: {
          name: account.name,
          username: account.username,
          profileImageUrl: account.profileImageUrl,
          profileUrl: account.profileUrl,
          subscriberCount: account.subscriberCount,
          followerCount: account.followerCount,
          totalViews: account.totalViews ? BigInt(account.totalViews) : null,
          totalVideos: account.totalVideos,
          lastSyncedAt: new Date(),
        },
      });
    }

    // In-memory fallback
    const idx = memoryStore.accounts.findIndex(
      (a) => a.provider === account.provider && a.providerAccountId === account.providerAccountId
    );
    if (idx >= 0) {
      memoryStore.accounts[idx] = { ...account, lastSyncedAt: new Date().toISOString() };
    } else {
      memoryStore.accounts.push(account);
    }
    memoryStore.lastSyncedAt[account.provider] = new Date().toISOString();
  }

  /**
   * Save or update batch of videos
   */
  public async upsertVideos(videos: NormalizedVideo[]): Promise<void> {
    if (videos.length === 0) return;

    if (isDatabaseConfigured() && prisma) {
      for (const v of videos) {
        await prisma.socialVideo.upsert({
          where: {
            provider_externalId: {
              provider: v.provider,
              externalId: v.externalId,
            },
          },
          create: {
            provider: v.provider,
            externalId: v.externalId,
            title: v.title,
            description: v.description,
            url: v.url,
            thumbnailUrl: v.thumbnailUrl,
            publishedAt: new Date(v.publishedAt),
            duration: v.duration,
            viewCount: v.viewCount,
            likeCount: v.likeCount,
            commentCount: v.commentCount,
            isShortOrReel: v.isShortOrReel,
          },
          update: {
            title: v.title,
            description: v.description,
            url: v.url,
            thumbnailUrl: v.thumbnailUrl,
            publishedAt: new Date(v.publishedAt),
            duration: v.duration,
            viewCount: v.viewCount,
            likeCount: v.likeCount,
            commentCount: v.commentCount,
            isShortOrReel: v.isShortOrReel,
          },
        });
      }
    }

    // In-memory fallback
    for (const v of videos) {
      const idx = memoryStore.videos.findIndex(
        (existing) => existing.provider === v.provider && existing.externalId === v.externalId
      );
      if (idx >= 0) {
        memoryStore.videos[idx] = v;
      } else {
        memoryStore.videos.unshift(v);
      }
    }
  }

  /**
   * Save or update batch of posts
   */
  public async upsertPosts(posts: NormalizedPost[]): Promise<void> {
    if (posts.length === 0) return;

    if (isDatabaseConfigured() && prisma) {
      for (const p of posts) {
        await prisma.socialPost.upsert({
          where: {
            provider_externalId: {
              provider: p.provider,
              externalId: p.externalId,
            },
          },
          create: {
            provider: p.provider,
            externalId: p.externalId,
            postType: p.postType,
            title: p.title,
            content: p.content,
            url: p.url,
            mediaUrls: p.mediaUrls,
            publishedAt: new Date(p.publishedAt),
            likeCount: p.likeCount,
            commentCount: p.commentCount,
            shareCount: p.shareCount,
          },
          update: {
            postType: p.postType,
            title: p.title,
            content: p.content,
            url: p.url,
            mediaUrls: p.mediaUrls,
            likeCount: p.likeCount,
            commentCount: p.commentCount,
            shareCount: p.shareCount,
          },
        });
      }
    }

    // In-memory fallback
    for (const p of posts) {
      const idx = memoryStore.posts.findIndex(
        (existing) => existing.provider === p.provider && existing.externalId === p.externalId
      );
      if (idx >= 0) {
        memoryStore.posts[idx] = p;
      } else {
        memoryStore.posts.unshift(p);
      }
    }
  }

  /**
   * Save or update batch of photos
   */
  public async upsertPhotos(photos: NormalizedPhoto[]): Promise<void> {
    if (photos.length === 0) return;

    if (isDatabaseConfigured() && prisma) {
      for (const photo of photos) {
        await prisma.socialPhoto.upsert({
          where: {
            provider_externalId: {
              provider: photo.provider,
              externalId: photo.externalId,
            },
          },
          create: {
            provider: photo.provider,
            externalId: photo.externalId,
            sourcePostId: photo.sourcePostId,
            imageUrl: photo.imageUrl,
            thumbnailUrl: photo.thumbnailUrl,
            caption: photo.caption,
            sourceUrl: photo.sourceUrl,
            isThumbnail: photo.isThumbnail,
            publishedAt: new Date(photo.publishedAt),
          },
          update: {
            imageUrl: photo.imageUrl,
            thumbnailUrl: photo.thumbnailUrl,
            caption: photo.caption,
            sourceUrl: photo.sourceUrl,
            isThumbnail: photo.isThumbnail,
          },
        });
      }
    }

    // In-memory fallback
    for (const photo of photos) {
      const idx = memoryStore.photos.findIndex(
        (existing) => existing.provider === photo.provider && existing.externalId === photo.externalId
      );
      if (idx >= 0) {
        memoryStore.photos[idx] = photo;
      } else {
        memoryStore.photos.unshift(photo);
      }
    }
  }

  /**
   * Log synchronization run
   */
  public async logSync(
    provider: string,
    status: "SUCCESS" | "PARTIAL" | "FAILED",
    itemsSynced: number,
    message?: string,
    errorDetails?: string,
    durationMs?: number
  ): Promise<void> {
    if (isDatabaseConfigured() && prisma) {
      await prisma.socialSyncLog.create({
        data: {
          provider,
          status,
          itemsSynced,
          message,
          errorDetails,
          durationMs,
          completedAt: new Date(),
        },
      });
    }
  }

  /**
   * Read Accounts
   */
  public async getAccounts(): Promise<NormalizedAccount[]> {
    if (isDatabaseConfigured() && prisma) {
      const dbAccounts = await prisma.socialAccount.findMany();
      if (dbAccounts.length > 0) {
        return dbAccounts.map((a) => ({
          id: a.id,
          provider: a.provider,
          providerAccountId: a.providerAccountId,
          name: a.name,
          username: a.username,
          profileImageUrl: a.profileImageUrl,
          profileUrl: a.profileUrl,
          subscriberCount: a.subscriberCount,
          followerCount: a.followerCount,
          totalViews: a.totalViews ? Number(a.totalViews) : null,
          totalVideos: a.totalVideos,
          lastSyncedAt: a.lastSyncedAt?.toISOString() || null,
        }));
      }
    }
    return memoryStore.accounts;
  }

  /**
   * Read Videos (with platform filter, pagination)
   */
  public async getVideos(params: {
    platform?: string;
    page?: number;
    limit?: number;
  }): Promise<{ items: NormalizedVideo[]; total: number; page: number; limit: number; totalPages: number }> {
    const page = Math.max(1, params.page || 1);
    const limit = Math.max(1, Math.min(params.limit || 12, 100));
    const skip = (page - 1) * limit;

    const platformUpper = params.platform?.toUpperCase();
    const isPlatformFilter = platformUpper === "YOUTUBE" || platformUpper === "FACEBOOK";

    if (isDatabaseConfigured() && prisma) {
      const whereClause = isPlatformFilter
        ? { provider: platformUpper as SocialPlatform }
        : {};

      const [total, dbVideos] = await Promise.all([
        prisma.socialVideo.count({ where: whereClause }),
        prisma.socialVideo.findMany({
          where: whereClause,
          orderBy: { publishedAt: "desc" },
          skip,
          take: limit,
        }),
      ]);

      if (total > 0) {
        const items: NormalizedVideo[] = dbVideos.map((v) => ({
          id: v.id,
          provider: v.provider,
          externalId: v.externalId,
          title: v.title,
          description: v.description || "",
          url: v.url,
          thumbnailUrl: v.thumbnailUrl,
          publishedAt: v.publishedAt.toISOString(),
          duration: v.duration,
          viewCount: v.viewCount,
          likeCount: v.likeCount,
          commentCount: v.commentCount,
          isShortOrReel: v.isShortOrReel,
        }));

        return {
          items,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        };
      }
    }

    // In-memory fallback
    // newest first, same as the database path (orderBy publishedAt desc)
    let filtered = newestFirst(memoryStore.videos);
    if (isPlatformFilter) {
      filtered = filtered.filter((v) => v.provider === platformUpper);
    }

    const total = filtered.length;
    const items = filtered.slice(skip, skip + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Read Posts (with platform filter, pagination)
   */
  public async getPosts(params: {
    platform?: string;
    page?: number;
    limit?: number;
  }): Promise<{ items: NormalizedPost[]; total: number; page: number; limit: number; totalPages: number }> {
    const page = Math.max(1, params.page || 1);
    const limit = Math.max(1, Math.min(params.limit || 10, 100));
    const skip = (page - 1) * limit;

    const platformUpper = params.platform?.toUpperCase();
    const isPlatformFilter = platformUpper === "YOUTUBE" || platformUpper === "FACEBOOK";

    if (isDatabaseConfigured() && prisma) {
      const whereClause = isPlatformFilter
        ? { provider: platformUpper as SocialPlatform }
        : {};

      const [total, dbPosts] = await Promise.all([
        prisma.socialPost.count({ where: whereClause }),
        prisma.socialPost.findMany({
          where: whereClause,
          orderBy: { publishedAt: "desc" },
          skip,
          take: limit,
        }),
      ]);

      if (total > 0) {
        const items: NormalizedPost[] = dbPosts.map((p) => ({
          id: p.id,
          provider: p.provider,
          externalId: p.externalId,
          postType: p.postType,
          title: p.title,
          content: p.content,
          url: p.url,
          mediaUrls: (p.mediaUrls as string[]) || [],
          publishedAt: p.publishedAt.toISOString(),
          likeCount: p.likeCount,
          commentCount: p.commentCount,
          shareCount: p.shareCount,
        }));

        return {
          items,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        };
      }
    }

    // In-memory fallback
    // newest first, same as the database path (orderBy publishedAt desc)
    let filtered = newestFirst(memoryStore.posts);
    if (isPlatformFilter) {
      filtered = filtered.filter((p) => p.provider === platformUpper);
    }

    const total = filtered.length;
    const items = filtered.slice(skip, skip + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Read Photos for Gallery
   */
  public async getPhotos(params: {
    platform?: string;
    page?: number;
    limit?: number;
  }): Promise<{ items: NormalizedPhoto[]; total: number; page: number; limit: number; totalPages: number }> {
    const page = Math.max(1, params.page || 1);
    const limit = Math.max(1, Math.min(params.limit || 18, 120));
    const skip = (page - 1) * limit;

    const platformUpper = params.platform?.toUpperCase();
    const isPlatformFilter = platformUpper === "YOUTUBE" || platformUpper === "FACEBOOK";

    if (isDatabaseConfigured() && prisma) {
      const whereClause = isPlatformFilter
        ? { provider: platformUpper as SocialPlatform }
        : {};

      const [total, dbPhotos] = await Promise.all([
        prisma.socialPhoto.count({ where: whereClause }),
        prisma.socialPhoto.findMany({
          where: whereClause,
          orderBy: { publishedAt: "desc" },
          skip,
          take: limit,
        }),
      ]);

      if (total > 0) {
        const items: NormalizedPhoto[] = dbPhotos.map((p) => ({
          id: p.id,
          provider: p.provider,
          externalId: p.externalId,
          sourcePostId: p.sourcePostId,
          imageUrl: p.imageUrl,
          thumbnailUrl: p.thumbnailUrl,
          caption: p.caption,
          sourceUrl: p.sourceUrl,
          isThumbnail: p.isThumbnail,
          publishedAt: p.publishedAt.toISOString(),
        }));

        return {
          items,
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        };
      }
    }

    // In-memory fallback
    // newest first, same as the database path (orderBy publishedAt desc)
    let filtered = newestFirst(memoryStore.photos);
    if (isPlatformFilter) {
      filtered = filtered.filter((p) => p.provider === platformUpper);
    }

    const total = filtered.length;
    const items = filtered.slice(skip, skip + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get sync status for each provider
   */
  public async getProviderStatuses(): Promise<ProviderStatus[]> {
    return [
      {
        provider: "YOUTUBE",
        enabled: Boolean(serverEnv.YOUTUBE_API_KEY),
        configured: Boolean(serverEnv.YOUTUBE_API_KEY),
        lastSyncedAt: memoryStore.lastSyncedAt["YOUTUBE"] || null,
        itemCounts: {
          videos: memoryStore.videos.filter((v) => v.provider === "YOUTUBE").length,
          posts: memoryStore.posts.filter((p) => p.provider === "YOUTUBE").length,
          photos: memoryStore.photos.filter((p) => p.provider === "YOUTUBE").length,
        },
      },
      {
        provider: "FACEBOOK",
        enabled: Boolean(serverEnv.FACEBOOK_PAGE_ACCESS_TOKEN),
        configured: Boolean(serverEnv.FACEBOOK_PAGE_ACCESS_TOKEN && serverEnv.FACEBOOK_PAGE_ID),
        lastSyncedAt: memoryStore.lastSyncedAt["FACEBOOK"] || null,
        itemCounts: {
          videos: memoryStore.videos.filter((v) => v.provider === "FACEBOOK").length,
          posts: memoryStore.posts.filter((p) => p.provider === "FACEBOOK").length,
          photos: memoryStore.photos.filter((p) => p.provider === "FACEBOOK").length,
        },
      },
    ];
  }
}

export const socialStorage = new SocialStorageService();
