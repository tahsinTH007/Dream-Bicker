"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log error to console for debugging
    console.error("App boundary error caught:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-600 border border-red-200 shadow-md mb-6">
        <AlertTriangle className="h-10 w-10" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
        অপ্রত্যাশিত ত্রুটি
      </span>

      <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#142B3B] tracking-tight mb-4">
        কিছু একটা সমস্যা হয়েছে
      </h1>

      <p className="max-w-md text-base text-[#777777] leading-relaxed mb-8">
        পৃষ্ঠাটি লোড করতে একটি সাময়িক সমস্যা দেখা দিয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন অথবা হোমপেইজে ফিরে যান।
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => reset()} variant="default" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          পুনরায় চেষ্টা করুন
        </Button>
        <Button asChild variant="secondary">
          <Link href="/" className="gap-2">
            <Home className="h-4 w-4" />
            হোমপেইজে ফিরুন
          </Link>
        </Button>
      </div>
    </div>
  );
}
