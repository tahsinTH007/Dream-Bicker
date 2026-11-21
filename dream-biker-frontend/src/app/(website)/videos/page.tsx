import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { VideosListClient } from "@/features/videos/components/videos-list-client";
import { socialStorage } from "@/server/social/storage/social-storage.service";
import { ensureFreshSocialData } from "@/server/social/auto-sync";

export const metadata: Metadata = {
  title: "ভিডিও ও রিলস",
  alternates: { canonical: "/videos" },
  description:
    "ড্রিম বাইকার (হানিফ)-এর ইউটিউব ও ফেসবুক থেকে সংগৃহীত মাঠপর্যায়ের মানবিক তথ্যচিত্র, ভ্রমণ ডায়েরি এবং জনপ্রিয় রিলস ভিডিও উপভোগ করুন।",
};

export const revalidate = 3600; // data syncs daily; pages pick it up within an hour

export default async function VideosPage() {
  // sync from YouTube/Facebook if data is missing or stale (see server/social/auto-sync.ts)
  await ensureFreshSocialData();
  const result = await socialStorage.getVideos({ limit: 100 });

  return (
    <>
      <PageHeader
        badge="ভিডিও সংগ্রহশালা"
        title="ডকুমেন্টারি পর্ব ও ভিডিও রিলস"
        description="ইউটিউব ও ফেসবুক থেকে সংগৃহীত বাস্তব জীবনের গল্প, চরাঞ্চলের মানুষের স্পন্দন এবং দুই চাকার মানবিক পরিভ্রমণ।"
      />
      <VideosListClient initialVideos={result.items} />
    </>
  );
}
