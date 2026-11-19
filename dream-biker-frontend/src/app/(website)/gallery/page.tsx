import type { Metadata } from "next";
import { GalleryView } from "@/features/gallery/components/gallery-view";
import { socialStorage } from "@/server/social/storage/social-storage.service";

export const metadata: Metadata = {
  title: "ফটোগ্যালারি | ড্রিম বাইকার (হানিফ)",
  description:
    "বাংলাদেশের প্রত্যন্ত অঞ্চলে ড্রিম বাইকার (হানিফ)-এর মানবিক কার্যক্রম, মেঠোপথের যাত্রা এবং ফেসবুক ও ইউটিউব থেকে সংগৃহীত ছবির অ্যালবাম।",
};

export const revalidate = 300;

export default async function GalleryPage() {
  const result = await socialStorage.getPhotos({ limit: 120 });

  return <GalleryView initialPhotos={result.items} />;
}
