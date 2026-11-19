import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[#142B3B] text-[#E97835] shadow-xl mb-6">
        <Compass className="h-10 w-10 animate-spin-slow" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-[#E97835] mb-2">
        ত্রুটি ৪০৪
      </span>

      <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#142B3B] tracking-tight mb-4">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="max-w-md text-base text-[#777777] leading-relaxed mb-8">
        আপনি যে পৃষ্ঠা, গল্প বা ভিডিও খুঁজছেন তা এই ঠিকানায় নেই অথবা অন্য কোনো ঠিকানায় সরিয়ে নেওয়া হয়েছে।
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="default">
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            হোমপেইজে ফিরুন
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/blog">মানবিক গল্প দেখুন</Link>
        </Button>
      </div>
    </div>
  );
}
