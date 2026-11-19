export type SocialPlatform = "youtube" | "facebook" | "instagram";

export interface YouTubeChannel {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  customUrl: string;
  subscriberCount: number | null;
  viewCount: number | null;
  videoCount: number | null;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  publishedAt: string;
  viewCount: number | null;
  likeCount: number | null;
  commentCount: number | null;
}

export interface FacebookPage {
  id: string;
  name: string;
  profilePictureUrl: string;
  pageUrl: string;
  followerCount: number | null;
  likeCount: number | null;
}

export interface FacebookPost {
  id: string;
  caption: string;
  imageUrl?: string;
  videoThumbnailUrl?: string;
  reactionCount: number | null;
  commentCount: number | null;
  shareCount: number | null;
  publishedAt: string;
  originalPostUrl: string;
  isVideo?: boolean;
}

export interface InstagramPreview {
  id: string;
  caption: string;
  imageUrl: string;
  permalink: string;
  publishedAt: string;
}

export interface HumanitarianActivity {
  id: string;
  title: string;
  category: "Helping Poor Families" | "Children's Welfare" | "Supporting Elderly People" | "Community Development";
  description: string;
  impactSummary: string;
  imageUrl: string;
  date: string;
  location: string;
  beneficiariesCount?: number;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  introduction: string;
  content: string[];
  coverImage: string;
  supportingImages: string[];
  publishedAt: string;
  location: string;
  relatedVideoUrl?: string;
  relatedStoriesSlugs?: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  platform: "youtube" | "facebook";
  thumbnailUrl: string;
  videoUrl: string;
  publishedAt: string;
  views?: string;
  category: string;
  duration?: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: {
    heading?: string;
    paragraph?: string;
    quote?: string;
    imageUrl?: string;
    imageCaption?: string;
  }[];
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  category: string;
  coverImage: string;
  publishedAt: string;
  readingTime: string;
  tags: string[];
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  category: "Milestone" | "Recognition" | "Community Initiative" | "Media Coverage";
  description: string;
  note: string;
  imageUrl?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: "Personal Moments" | "Humanitarian Activities" | "Events" | "Behind the Scenes";
  imageUrl: string;
  location: string;
  date: string;
  width?: number;
  height?: number;
}

export type InquiryType =
  | "General Inquiry"
  | "Collaboration"
  | "Media and Press"
  | "Humanitarian Support"
  | "Business Opportunities"
  | "Other";

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  inquiryType: InquiryType;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
