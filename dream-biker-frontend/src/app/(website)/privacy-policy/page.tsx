import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedContent } from "@/components/shared/animated-content";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি | ড্রিম বাইকার",
  description:
    "ড্রিম বাইকার (হানিফ)-এর ব্যক্তিগত পোর্টফোলিও, মানবিক কার্যক্রম এবং ব্লগ প্ল্যাটফর্মের অফিশিয়াল গোপনীয়তা নীতি।",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        badge="আইন ও গোপনীয়তা"
        title="গোপনীয়তা নীতি"
        description="ব্যক্তিগত গোপনীয়তা রক্ষা, সম্মানজনক মানবিক ভিডিও নীতিমালা এবং তথ্য সুরক্ষায় আমাদের সুস্পষ্ট প্রতিশ্রুতি।"
        breadcrumbs={[{ label: "গোপনীয়তা নীতি" }]}
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="prose max-w-none text-[#222222]/85 space-y-8 leading-relaxed">
            <div>
              <p className="text-xs text-[#777777] mb-2 font-mono">
                কার্যকর তারিখ: নভেম্বর ২০২৬ | সর্বশেষ পরিমার্জন: ফেব্রুয়ারি ২০২৬
              </p>
              <p className="text-base sm:text-lg">
                <strong>ড্রিম বাইকার (হানিফ)</strong>-এর অফিসিয়াল প্ল্যাটফর্মে (dreambiker.com) আমরা আমাদের দর্শক, মাঠপর্যায়ের সাহায্যপ্রার্থী এবং শুভানুধ্যায়ীদের তথ্যের গোপনীয়তা ও নিরাপত্তাকে সর্বোচ্চ অগ্রাধিকার প্রদান করি। এই নথিতে আমাদের তথ্য সংগ্রহ, সংরক্ষণ ও মানবিক ভিডিও ধারণের নীতিমালা সুস্পষ্ট করা হলো।
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-3">
                ১. মানবিক চিত্রধারণ ও ব্যক্তিস্বার্থ সংরক্ষণ
              </h2>
              <p>
                আমাদের মূল দর্শন হলো মানুষের আত্মমর্যাদা। এই প্ল্যাটফর্মে বা সামাজিক যোগাযোগমাধ্যমে প্রকাশিত প্রতিটি ছবি, ভিডিও বা গল্প সংশ্লিষ্ট ব্যক্তিবর্গের মৌখিক বা লিখিত স্পষ্ট সম্মতির ভিত্তিতে গ্রহণ করা হয়। কোনো ব্যক্তির অসচেতন মুহূর্ত বা কাউকে ছোট করে উপস্থাপন করা আমাদের নৈতিক আদর্শ পরিপন্থী।
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-3">
                ২. সংগৃহীত তথ্যাবলি
              </h2>
              <p>
                আমাদের যোগাযোগ ফর্ম পূরণ কিংবা নিউজলেটারে সাবস্ক্রাইব করার সময় আপনি নাম, ইমেইল ও ফোন নম্বর প্রদান করতে পারেন। এই তথ্যগুলো কেবলমাত্র আপনার বার্তার উত্তর দেওয়া এবং গুরুত্বপূর্ণ মানবিক আপডেট প্রেরণের উদ্দেশ্যে নিরাপদে ব্যবহার করা হয়।
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-3">
                ৩. তৃতীয় পক্ষের সংযোগ ও সোশ্যাল মিডিয়া
              </h2>
              <p>
                আমাদের ওয়েবসাইটে ইউটিউব ও ফেসবুকের ভিডিও ও পোস্ট লিঙ্ক রয়েছে। উক্ত বাহ্যিক প্ল্যাটফর্মগুলো তাদের নিজস্ব গোপনীয়তা নীতিমালার অধীনে পরিচালিত হয়। সেখানে প্রবেশকালে তাদের নিজস্ব নিয়মাবলি প্রযোজ্য হবে।
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-3">
                ৪. তথ্যের নিরাপত্তা
              </h2>
              <p>
                আমরা কখনোই কোনো ব্যবহারকারী বা শুভানুধ্যায়ীর ব্যক্তিগত তথ্য কোনো বাণিজ্যিক প্রতিষ্ঠানের কাছে বিক্রি, ভাড়া বা হস্তান্তর করি না। সকল তথ্য সর্বোচ্চ সতর্কতার সাথে সুরক্ষিত রাখা হয়।
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-3">
                ৫. গোপনীয়তা সংক্রান্ত যোগাযোগ
              </h2>
              <p>
                এই নীতি সম্পর্কে কোনো জিজ্ঞাসা থাকলে কিংবা আপনার বা আপনার পরিবারের কোনো তথ্য বা ছবি সংশোধনের প্রয়োজন হলে আমাদের <a href="/contact" className="text-[#E97835] font-semibold underline">যোগাযোগ পেইজে</a> বার্তা পাঠাতে পারেন।
              </p>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  );
}
