export interface YouTubeThumbnailItem {
  url: string;
  width?: number;
  height?: number;
}

export interface YouTubeThumbnails {
  default?: YouTubeThumbnailItem;
  medium?: YouTubeThumbnailItem;
  high?: YouTubeThumbnailItem;
  standard?: YouTubeThumbnailItem;
  maxres?: YouTubeThumbnailItem;
}

export interface YouTubeChannelItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl?: string;
    publishedAt: string;
    thumbnails: YouTubeThumbnails;
  };
  contentDetails: {
    relatedPlaylists: {
      uploads: string;
    };
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  };
}

export interface YouTubeChannelListResponse {
  kind: string;
  items?: YouTubeChannelItem[];
}

export interface YouTubePlaylistItem {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    resourceId: {
      kind: string;
      videoId: string;
    };
  };
}

export interface YouTubePlaylistItemListResponse {
  items?: YouTubePlaylistItem[];
  nextPageToken?: string;
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubeVideoItem {
  id: string;
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    tags?: string[];
    categoryId?: string;
  };
  contentDetails: {
    duration: string; // ISO 8601, e.g. PT14M22S
    caption?: string;
  };
  statistics: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
}

export interface YouTubeVideoListResponse {
  items?: YouTubeVideoItem[];
}
