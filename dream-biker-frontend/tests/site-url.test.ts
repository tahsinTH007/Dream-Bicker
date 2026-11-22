import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "@/config/site-url";

describe("resolveSiteUrl", () => {
  it("uses NEXT_PUBLIC_SITE_URL when set (trailing slash removed)", () => {
    expect(resolveSiteUrl({ explicit: "https://dreambiker.com.bd/", vercelProductionHost: "x.vercel.app" })).toBe(
      "https://dreambiker.com.bd"
    );
  });

  it("falls back to Vercel's production domain", () => {
    expect(resolveSiteUrl({ vercelProductionHost: "dream-biker.vercel.app" })).toBe("https://dream-biker.vercel.app");
  });

  it("ignores a localhost value copied into Vercel", () => {
    expect(resolveSiteUrl({ explicit: "http://localhost:3000", vercelProductionHost: "dream-biker.vercel.app" })).toBe(
      "https://dream-biker.vercel.app"
    );
  });

  it("keeps localhost for local development", () => {
    expect(resolveSiteUrl({ explicit: "http://localhost:3000" })).toBe("http://localhost:3000");
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
  });
});
