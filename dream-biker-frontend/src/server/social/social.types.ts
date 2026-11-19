export type SocialPlatform = "YOUTUBE" | "FACEBOOK";

export interface NormalizedAccount {
  id: string;
  provider: SocialPlatform;
  providerAccountId: string;
  name: string;
  username?: string | null;
  profileImageUrl?: string | null;
  profileUrl: string;
  subscriberCount?: number | null;
  followerCount?: number | null;
  totalViews?: number | null;
  totalVideos?: number | null;
  lastSyncedAt?: string | null;
  bio?: string | null;
}

export interface NormalizedVideo {
  id: string;
  provider: SocialPlatform;
  externalId: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  publishedAt: string;
  duration?: string | null;
  viewCount?: number | null;
  likeCount?: number | null;
  commentCount?: number | null;
  isShortOrReel: boolean;
}

export interface NormalizedPost {
  id: string;
  provider: SocialPlatform;
  externalId: string;
  postType: "TEXT" | "PHOTO" | "VIDEO" | "LINK";
  title?: string | null;
  content: string;
  url: string;
  mediaUrls: string[];
  publishedAt: string;
  likeCount?: number | null;
  commentCount?: number | null;
  shareCount?: number | null;
}

export interface NormalizedPhoto {
  id: string;
  provider: SocialPlatform;
  externalId: string;
  sourcePostId?: string | null;
  imageUrl: string;
  thumbnailUrl?: string | null;
  caption?: string | null;
  sourceUrl: string;
  isThumbnail: boolean;
  publishedAt: string;
}

export interface SyncResult {
  provider: SocialPlatform | "ALL";
  success: boolean;
  itemsSynced: number;
  message: string;
  error?: string;
  timestamp: string;
  durationMs: number;
}

export interface ProviderStatus {
  provider: SocialPlatform;
  enabled: boolean;
  configured: boolean;
  lastSyncedAt?: string | null;
  itemCounts: {
    videos: number;
    posts: number;
    photos: number;
  };
  error?: string | null;
}
