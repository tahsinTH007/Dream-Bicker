import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { BlogListClient } from "@/features/blog/components/blog-list-client";
import { socialStorage } from "@/server/social/storage/social-storage.service";
import { ensureFreshSocialData } from "@/server/social/auto-sync";

export const metadata: Metadata = {
  title: "ব্লগ ও সোশ্যাল ডায়েরি",
  alternates: { canonical: "/blog" },
  description:
    "ড্রিম বাইকার (হানিফ)-এর ফেসবুক পেজের পোস্ট, মাঠপর্যায়ের অভিজ্ঞতা ও মানবিক কার্যক্রমের দিনলিপি এক জায়গায় পড়ুন।",
};

export const revalidate = 300;

export default async function BlogPage() {
  // sync from YouTube/Facebook if data is missing or stale (see server/social/auto-sync.ts)
  await ensureFreshSocialData();
  const result = await socialStorage.getPosts({ platform: "facebook", limit: 100 });

  return (
    <>
      <PageHeader
        badge="ব্লগ ও সোশ্যাল আপডেট"
        title="মাঠপর্যায়ের অভিজ্ঞতা ও সামাজিক ডায়েরি"
        description="ফেসবুক পেজের পোস্টে সাধারণ মানুষের দিনলিপি, মাঠপর্যায়ের অভিজ্ঞতা এবং মানবিক সহমর্মিতার ভাবনা।"
      />
      <BlogListClient initialPosts={result.items} />
    </>
  );
}
