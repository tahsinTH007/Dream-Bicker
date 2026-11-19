import type { Metadata } from "next";
import { HeroSection } from "@/features/home/components/hero-section";
import { AboutIntroSection } from "@/features/home/components/about-intro-section";
import { HomeVideosSection } from "@/features/home/components/home-videos-section";
import { HomePostsSection } from "@/features/home/components/home-posts-section";
import { HomePhotosSection } from "@/features/home/components/home-photos-section";
import { SocialCtaSection } from "@/features/home/components/social-cta-section";
import { socialStorage } from "@/server/social/storage/social-storage.service";

export const metadata: Metadata = {
  title: "ড্রিম বাইকার (হানিফ) | কন্টেন্ট ক্রিয়েটর ও মানবসেবক",
  description:
    "প্রতিটি জীবনের একটি গল্প আছে। প্রতিটি মানবিক কাজই মূল্যবান। ড্রিম বাইকার (হানিফ)-এর অফিশিয়াল পোর্টফোলিও, ভিডিও ও সোশ্যাল মিডিয়া ব্লগ।",
};

export const revalidate = 300; // 5-minute incremental revalidation

export default async function HomePage() {
  // Fetch real synchronized social data on the server
  const [videosData, postsData, photosData] = await Promise.all([
    socialStorage.getVideos({ limit: 6 }),
    socialStorage.getPosts({ limit: 3 }),
    socialStorage.getPhotos({ limit: 8 }),
  ]);

  return (
    <>
      {/* 1. Cinematic Hero Section with Integrated Stats Bar */}
      <HeroSection />

      {/* 2. About Introduction Preview */}
      <AboutIntroSection />

      {/* 3. Latest Videos from YouTube & Facebook */}
      <HomeVideosSection videos={videosData.items} />

      {/* 4. Latest Posts from Social Media */}
      <HomePostsSection posts={postsData.items} />

      {/* 5. Recent Photographs Strip */}
      <HomePhotosSection photos={photosData.items} />

      {/* 6. Social Media Profiles & CTA */}
      <SocialCtaSection />
    </>
  );
}
