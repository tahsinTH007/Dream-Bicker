import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { BlogListClient } from "@/features/blog/components/blog-list-client";
import { socialStorage } from "@/server/social/storage/social-storage.service";

export const metadata: Metadata = {
  title: "ব্লগ ও সোশ্যাল ডায়েরি | ড্রিম বাইকার (হানিফ)",
  description:
    "ড্রিম বাইকার (হানিফ)-এর ফেসবুক পোস্ট, মাঠপর্যায়ের অভিজ্ঞতা এবং প্রকাশিত ভিডিও পাবলিকেশনসমূহ এক প্ল্যাটফর্মে পড়ুন।",
};

export const revalidate = 300;

export default async function BlogPage() {
  const result = await socialStorage.getPosts({ limit: 100 });

  return (
    <>
      <PageHeader
        badge="ব্লগ ও সোশ্যাল আপডেট"
        title="মাঠপর্যায়ের অভিজ্ঞতা ও সামাজিক ডায়েরি"
        description="ফেসবুক পেজ পোস্ট ও ইউটিউব প্রকাশিত তথ্যচিত্রের মাধ্যমে সাধারণ মানুষের দিনলিপি এবং মানবিক সহমর্মিতার ভাবনা।"
        breadcrumbs={[{ label: "ব্লগ" }]}
      />
      <BlogListClient initialPosts={result.items} />
    </>
  );
}
