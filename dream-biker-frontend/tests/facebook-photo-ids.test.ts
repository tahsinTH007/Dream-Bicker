import { beforeEach, describe, expect, it, vi } from "vitest";
import type { FacebookPostItem } from "@/server/social/facebook/facebook.types";

// Replace the Graph API client with a stub whose posts each test controls
let stubPosts: FacebookPostItem[] = [];
vi.mock("@/server/social/facebook/facebook.client", () => ({
  FacebookClient: class {
    isConfigured() {
      return true;
    }
    async getPosts() {
      return { data: stubPosts };
    }
  },
}));

const { FacebookService } = await import("@/server/social/facebook/facebook.service");

const albumPost: FacebookPostItem = {
  id: "page_111",
  message: "Album post",
  created_time: "2026-01-10T10:00:00+0000",
  permalink_url: "https://facebook.com/page/posts/111",
  attachments: {
    data: [
      {
        type: "album",
        media: { image: { src: "https://scontent.fbcdn.net/cover.jpg" } },
        target: { id: "album_9", url: "https://facebook.com/album/9" },
        subattachments: {
          data: [
            { media: { image: { src: "https://scontent.fbcdn.net/a.jpg" } }, target: { id: "photo_1", url: "u1" } },
            { media: { image: { src: "https://scontent.fbcdn.net/b.jpg" } } }, // no target id
          ],
        },
      },
    ],
  },
};

const otherPost: FacebookPostItem = {
  id: "page_222",
  message: "Newer post",
  created_time: "2026-01-12T10:00:00+0000",
  permalink_url: "https://facebook.com/page/posts/222",
  attachments: { data: [{ type: "photo", media: { image: { src: "https://scontent.fbcdn.net/c.jpg" } } }] },
};

async function photoIdsFor(posts: FacebookPostItem[]) {
  stubPosts = posts;
  const { photos } = await new FacebookService().fetchRecentPosts();
  return photos.filter((p) => p.sourcePostId === "page_111").map((p) => p.externalId);
}

describe("Facebook photo IDs", () => {
  beforeEach(() => {
    stubPosts = [];
  });

  it("are stable when newer posts appear before them (no duplicates on re-sync)", async () => {
    const alone = await photoIdsFor([albumPost]);
    const afterNewPost = await photoIdsFor([otherPost, albumPost]);
    expect(afterNewPost).toEqual(alone);
  });

  it("use Facebook's object id when present, else the position inside the post", async () => {
    const ids = await photoIdsFor([albumPost]);
    expect(ids).toEqual(["photo-page_111-album_9", "subphoto-page_111-photo_1", "subphoto-page_111-a0s1"]);
  });

  it("are unique within a sync", async () => {
    stubPosts = [otherPost, albumPost];
    const { photos } = await new FacebookService().fetchRecentPosts();
    const ids = photos.map((p) => p.externalId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
