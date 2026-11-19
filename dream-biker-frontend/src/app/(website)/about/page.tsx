import type { Metadata } from "next";
import { AboutHero } from "@/features/about/components/about-hero";
import { AboutBio } from "@/features/about/components/about-bio";
import { AboutTimeline } from "@/features/about/components/about-timeline";
import { AboutValues } from "@/features/about/components/about-values";
import { AboutSocial } from "@/features/about/components/about-social";

export const metadata: Metadata = {
  title: "পরিচিতি",
  alternates: { canonical: "/about" },
  description:
    "ড্রিম বাইকার-এর পেছনের মানুষ হানিফ সম্পর্কে জানুন—তাঁর ব্যক্তিগত যাত্রা, মানবিক লক্ষ্য, মাইলফলক ও সহমর্মিতার জীবন দর্শন।",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutBio />
      <AboutTimeline />
      <AboutValues />
      <AboutSocial />
    </>
  );
}
