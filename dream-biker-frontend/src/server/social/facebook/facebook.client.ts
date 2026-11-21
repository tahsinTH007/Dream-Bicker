import "server-only";
import { serverEnv } from "@/lib/env/server";
import {
  FacebookPageResponse,
  FacebookPostListResponse,
  FacebookVideoListResponse,
} from "./facebook.types";

const GRAPH_BASE = "https://graph.facebook.com";

export class FacebookClient {
  private pageAccessToken: string;
  private pageId: string;
  private version: string;

  constructor() {
    this.pageAccessToken = serverEnv.FACEBOOK_PAGE_ACCESS_TOKEN || "";
    this.pageId = serverEnv.FACEBOOK_PAGE_ID || "";
    this.version = serverEnv.FACEBOOK_GRAPH_API_VERSION || "v22.0";
  }

  public isConfigured(): boolean {
    return Boolean(
      this.pageAccessToken &&
        this.pageAccessToken.trim() !== "" &&
        this.pageId &&
        this.pageId.trim() !== ""
    );
  }

  public getPageId(): string {
    return this.pageId;
  }

  /**
   * Safe Graph API fetch wrapper
   */
  private async fetchGraph<T>(path: string, params: Record<string, string>): Promise<T> {
    if (!this.isConfigured()) {
      throw new Error(
        "FACEBOOK_PAGE_ACCESS_TOKEN or FACEBOOK_PAGE_ID is not configured in server environment."
      );
    }

    const url = new URL(`${GRAPH_BASE}/${this.version}/${path}`);
    url.searchParams.set("access_token", this.pageAccessToken);

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
      next: { revalidate: 300 }, // 5-minute cache
    });

    if (!response.ok) {
      let errorMessage = `Facebook Graph API Error ${response.status}: ${response.statusText}`;
      try {
        const errorJson = await response.json();
        if (errorJson.error?.message) {
          const code = errorJson.error.code ? ` (Code ${errorJson.error.code})` : "";
          errorMessage = `Facebook Graph API: ${errorJson.error.message}${code}`;
        }
      } catch {
        // ignore json parse error
      }
      throw new Error(errorMessage);
    }

    return (await response.json()) as T;
  }

  /**
   * Fetch Facebook Page Details
   */
  public async getPage(): Promise<FacebookPageResponse> {
    return this.fetchGraph<FacebookPageResponse>(this.pageId, {
      fields: "id,name,link,picture.type(large),followers_count,fan_count,about,phone,emails,whatsapp_number",
    });
  }

  /**
   * Fetch Facebook Page Published Posts
   */
  public async getPosts(limit = 25): Promise<FacebookPostListResponse> {
    return this.fetchGraph<FacebookPostListResponse>(`${this.pageId}/posts`, {
      fields:
        "id,message,story,created_time,permalink_url,attachments{media,type,title,description,subattachments},reactions.summary(true),comments.summary(true),shares",
      limit: limit.toString(),
    });
  }

  /**
   * Fetch Facebook Page Uploaded Videos & Reels
   */
  public async getVideos(limit = 25): Promise<FacebookVideoListResponse> {
    return this.fetchGraph<FacebookVideoListResponse>(`${this.pageId}/videos`, {
      fields:
        "id,title,description,created_time,permalink_url,thumbnails,picture,length,views,likes.summary(true),comments.summary(true)",
      limit: limit.toString(),
    });
  }
}
