import { describe, expect, it } from "vitest";
import { formatYouTubeDuration, isYouTubeShort } from "@/server/social/youtube/youtube.client";

describe("formatYouTubeDuration", () => {
  it.each([
    ["PT18M42S", "18:42"],
    ["PT4M5S", "4:05"],
    ["PT45S", "0:45"],
    ["PT1H2M3S", "1:02:03"],
    ["PT2H", "2:00:00"],
    [undefined, "00:00"],
    ["garbage", "00:00"],
  ])("%s -> %s", (input, expected) => {
    expect(formatYouTubeDuration(input)).toBe(expected);
  });
});

describe("isYouTubeShort", () => {
  it("treats <= 60s as a Short", () => {
    expect(isYouTubeShort("PT59S")).toBe(true);
    expect(isYouTubeShort("PT1M")).toBe(true);
    expect(isYouTubeShort("PT1M1S")).toBe(false);
  });

  it("treats a #shorts tag as a Short regardless of length", () => {
    expect(isYouTubeShort("PT10M", "My trip #Shorts")).toBe(true);
    expect(isYouTubeShort("PT10M", "title", "desc #shorts")).toBe(true);
  });

  it("does not treat a zero/unknown duration as a Short", () => {
    expect(isYouTubeShort("PT0S")).toBe(false);
    expect(isYouTubeShort(undefined)).toBe(false);
  });
});
