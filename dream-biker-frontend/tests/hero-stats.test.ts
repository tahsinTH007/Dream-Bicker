import { describe, expect, it } from "vitest";
import { toBengaliCompact } from "@/server/social/hero-stats";

describe("toBengaliCompact (hero stats)", () => {
  it.each([
    [136_655_887, { value: 13.6, decimals: 1, suffix: " কোটি+" }],
    [140_000_000, { value: 14, decimals: 0, suffix: " কোটি+" }],
    [838_000, { value: 8.3, decimals: 1, suffix: " লাখ+" }],
    [4_500_000, { value: 45, decimals: 0, suffix: " লাখ+" }],
    [12_500, { value: 12.5, decimals: 1, suffix: " হাজার+" }],
    [395, { value: 395, decimals: 0, suffix: "+" }],
  ])("%d -> %o", (input, expected) => {
    expect(toBengaliCompact(input)).toEqual(expected);
  });

  it("rounds down so the site never overstates (8.39 lakh shows as 8.3)", () => {
    expect(toBengaliCompact(839_999).value).toBe(8.3);
  });
});
