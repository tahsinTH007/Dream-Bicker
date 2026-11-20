import "server-only";
import { siteConfig } from "@/config/site.config";
import { YouTubeService } from "./youtube/youtube.service";
import { FacebookService } from "./facebook/facebook.service";

export type HeroStatKey = "youtubeSubscribers" | "youtubeViews" | "youtubeVideos" | "facebookFollowers";

export interface HeroStat {
  key: HeroStatKey;
  /** Number that the counter animates to (already scaled, e.g. 8.3 for ৮.৩ লাখ). */
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  /** true = fetched from the platform API just now (or within the 5-min cache). */
  live: boolean;
}

/**
 * Scale a count into Bengali units, rounding DOWN so the site never overstates:
 * 136,655,887 -> 13.6 কোটি+, 838,000 -> 8.3 লাখ+, 4,500,000 -> 45 লাখ+, 395 -> 395+.
 */
export function toBengaliCompact(n: number): Pick<HeroStat, "value" | "decimals" | "suffix"> {
  const floor1 = (x: number) => Math.floor(x * 10) / 10;
  const scaled = (x: number, unit: string) => {
    const v = floor1(x);
    return { value: v, decimals: Number.isInteger(v) ? 0 : 1, suffix: ` ${unit}+` };
  };
  if (n >= 10_000_000) return scaled(n / 10_000_000, "কোটি");
  if (n >= 100_000) return scaled(n / 100_000, "লাখ");
  if (n >= 1_000) return scaled(n / 1_000, "হাজার");
  return { value: n, decimals: 0, suffix: "+" };
}

/**
 * Numbers for the home hero stats bar: three from YouTube and one from Facebook.
 * Live from the APIs when configured (their fetches are cached for 5 minutes),
 * otherwise the last-known numbers in siteConfig.heroStatsFallback.
 */
export async function getHeroStats(): Promise<HeroStat[]> {
  const fallback = siteConfig.heroStatsFallback;

  const youtube = new YouTubeService();
  const facebook = new FacebookService();

  const [yt, fb] = await Promise.all([
    youtube.isAvailable() ? youtube.getChannelInfo().catch(() => null) : Promise.resolve(null),
    facebook.isAvailable() ? facebook.getPageInfo().catch(() => null) : Promise.resolve(null),
  ]);

  const pick = (liveValue: number | null | undefined, fallbackValue: number) =>
    liveValue != null && liveValue > 0 ? { n: liveValue, live: true } : { n: fallbackValue, live: false };

  const subs = pick(yt?.subscriberCount, fallback.youtubeSubscribers);
  const views = pick(yt?.totalViews, fallback.youtubeViews);
  const videos = pick(yt?.totalVideos, fallback.youtubeVideos);
  const followers = pick(fb?.followerCount, fallback.facebookFollowers);

  return [
    { key: "youtubeSubscribers", label: "ইউটিউব সাবস্ক্রাইবার", live: subs.live, ...toBengaliCompact(subs.n) },
    { key: "youtubeViews", label: "ইউটিউব ভিউ", live: views.live, ...toBengaliCompact(views.n) },
    { key: "youtubeVideos", label: "ইউটিউব ভিডিও", live: videos.live, ...toBengaliCompact(videos.n) },
    { key: "facebookFollowers", label: "ফেসবুক ফলোয়ার", live: followers.live, ...toBengaliCompact(followers.n) },
  ];
}
