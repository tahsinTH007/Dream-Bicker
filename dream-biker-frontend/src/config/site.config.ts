import { siteUrl } from "@/config/site-url";

export const siteConfig = {
  name: "ড্রিম বাইকার",
  nameEn: "Dream Biker",
  author: "মো. হানিফ হোসেন",
  authorEn: "Md. Hanif Hossain",
  title: "ড্রিম বাইকার (হানিফ) | কন্টেন্ট ক্রিয়েটর ও মানবসেবক",
  description:
    "ড্রিম বাইকার (হানিফ)-এর অফিশিয়াল পোর্টফোলিও ও মানবিক প্ল্যাটফর্ম। 'মানবতাই শান্তির প্রতীক'—সমগ্র বাংলাদেশের প্রত্যন্ত অঞ্চলের মানুষের পাশে দাঁড়ানো এবং মানবিক গল্প তুলে ধরা।",
  tagline: "প্রতিটি জীবনের একটি গল্প আছে। প্রতিটি মানবিক কাজই মূল্যবান।",
  impactMessage: "মানবতাই শান্তির প্রতীক (Humanity is a Symbol of Peace)",
  label: "কন্টেন্ট ক্রিয়েটর | মানবসেবক",
  url: siteUrl,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api",
  // Last-known raw numbers for the home hero stats bar. The live numbers come
  // from the YouTube / Facebook APIs (src/server/social/hero-stats.ts); these
  // are only shown when an API isn't configured or a request fails.
  heroStatsFallback: {
    youtubeSubscribers: 838_000, // YouTube API, Nov 2026
    youtubeViews: 136_655_887, // YouTube API, Nov 2026
    youtubeVideos: 395, // YouTube API, Nov 2026
    facebookFollowers: 4_522_566, // Facebook Graph API, Nov 2026
  },
  contact: {
    email: "md.hanifhossan6991@gmail.com",
    location: "বাংলাদেশ",
    availability: "মানবিক কার্যক্রমের সহযোগিতা, পুনর্বাসন উদ্যোগ ও জরুরি সহায়তার জন্য উন্মুক্ত",
  },
} as const;

export type SiteConfig = typeof siteConfig;
