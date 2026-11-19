import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { VideosListClient } from "@/features/videos/components/videos-list-client";
import { socialStorage } from "@/server/social/storage/social-storage.service";

export const metadata: Metadata = {
  title: "ভিডিও ও রিলস | ড্রিম বাইকার (হানিফ)",
  description:
    "ড্রিম বাইকার (হানিফ)-এর ইউটিউব ও ফেসবুক থেকে সংগৃহীত মাঠপর্যায়ের মানবিক তথ্যচিত্র, ভ্রমণ ডায়েরি এবং জনপ্রিয় রিলস ভিডিও উপভোগ করুন।",
};

export const revalidate = 300;

export default async function VideosPage() {
  const result = await socialStorage.getVideos({ limit: 100 });

  return (
    <>
      <PageHeader
        badge="ভিডিও সংগ্রহশালা"
        title="ডকুমেন্টারি পর্ব ও ভিডিও রিলস"
        description="ইউটিউব ও ফেসবুক থেকে সংগৃহীত বাস্তব জীবনের গল্প, চরাঞ্চলের মানুষের স্পন্দন এবং দুই চাকার মানবিক পরিভ্রমণ।"
        breadcrumbs={[{ label: "ভিডিও" }]}
      />
      <VideosListClient initialVideos={result.items} />
    </>
  );
}
