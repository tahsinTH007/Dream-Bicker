import { describe, expect, it, vi } from "vitest";
import type { NormalizedVideo } from "@/server/social/social.types";

// No database: exercise the in-memory store
delete process.env.DATABASE_URL;

const video = (id: string, publishedAt: string): NormalizedVideo => ({
  id: `yt-vid-${id}`,
  provider: "YOUTUBE",
  externalId: id,
  title: id,
  description: "",
  url: `https://www.youtube.com/watch?v=${id}`,
  thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  publishedAt,
  isShortOrReel: false,
});

describe("in-memory social store", () => {
  it("returns videos newest first, whatever order they were synced in", async () => {
    const { socialStorage } = await import("@/server/social/storage/social-storage.service");
    // YouTube returns newest first; the store used to reverse that
    await socialStorage.upsertVideos([
      video("newest", "2099-03-01T00:00:00Z"),
      video("middle", "2099-02-01T00:00:00Z"),
      video("oldest", "2099-01-01T00:00:00Z"),
    ]);
    const { items } = await socialStorage.getVideos({ platform: "youtube", limit: 3 });
    expect(items.map((v) => v.externalId)).toEqual(["newest", "middle", "oldest"]);
  });

  it("is shared by every copy of the module in one process (sync route vs. page route)", async () => {
    const first = await import("@/server/social/storage/social-storage.service");
    await first.socialStorage.upsertVideos([video("shared-check", "2099-06-01T00:00:00Z")]);

    vi.resetModules(); // simulate a separately compiled route loading its own copy
    const second = await import("@/server/social/storage/social-storage.service");
    expect(second).not.toBe(first);
    const { items } = await second.socialStorage.getVideos({ platform: "youtube", limit: 1 });
    expect(items[0].externalId).toBe("shared-check");
  });
});
