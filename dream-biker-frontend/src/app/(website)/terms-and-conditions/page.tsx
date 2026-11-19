import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { AnimatedContent } from "@/components/shared/animated-content";

export const metadata: Metadata = {
  title: "ব্যবহারের শর্তাবলি",
  alternates: { canonical: "/terms-and-conditions" },
  description:
    "ড্রিম বাইকার (হানিফ)-এর ব্যক্তিগত পোর্টফোলিও, মানবিক কার্যক্রম এবং মিডিয়া প্ল্যাটফর্ম ব্যবহারের অফিশিয়াল শর্তাবলি।",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHeader
        badge="ব্যবহারের নিয়মাবলি"
        title="ব্যবহারের শর্তাবলি"
        description="ড্রিম বাইকার প্ল্যাটফর্ম ব্রাউজিং, মানবিক তথ্য ব্যবহার এবং মিডিয়া বিষয়ক সাধারণ নির্দেশনাবলি।"
      />

      <section className="py-10 sm:py-14 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedContent className="prose max-w-none text-[#222222]/85 space-y-8 leading-relaxed">
            <div>
              <p className="text-xs text-[#777777] mb-2 font-mono">
                কার্যকর তারিখ: নভেম্বর ২০২৬ | সর্বশেষ পরিমার্জন: ফেব্রুয়ারি ২০২৬
              </p>
              <p className="text-base sm:text-lg">
                <strong>ড্রিম বাইকার</strong> প্ল্যাটফর্ম (dreambiker.com) ব্রাউজ করার মাধ্যমে আপনি নিচের শর্তাবলি মেনে চলার বিষয়ে সম্মতি প্রকাশ করছেন।
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-3">
                ১. মেধাস্বত্ব ও মিডিয়া অধিকার
              </h2>
              <p>
                এই ওয়েবসাইটে প্রকাশিত সকল মৌলিক প্রবন্ধ, ডকুমেন্টারি প্রতিবেদন, আলোকচিত্র এবং ড্রিম বাইকার ব্র্যান্ডিং হানিফ ও ড্রিম বাইকার টিমের নিজস্ব বুদ্ধিবৃত্তিক সম্পদ। যেকোনো লেখার উদ্ধৃতি প্রকাশের ক্ষেত্রে যথাযথ কৃতজ্ঞতা স্বীকার এবং মূল লেখার লিঙ্ক প্রদান আবশ্যক। বাণিজ্যিক উদ্দেশ্যে পূর্বানুমতি ছাড়া যেকোনো ভিডিও বা ছবি পুনঃপ্রকাশ করা নিষেধ।
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-3">
                ২. মানবিক কার্যক্রম ও অনুদান সংক্রান্ত সতর্কতা
              </h2>
              <p>
                এখানে প্রদর্শিত সকল অতীত সেবামূলক কার্যক্রম ও ত্রাণ বিবরণী সাধারণ তথ্যচিত্র হিসেবে উপস্থাপিত। ড্রিম বাইকার কখনোই কোনো অননুমোদিত ব্যক্তি বা অযাচাইকৃত মাধ্যমের মাধ্যমে আর্থিক অনুদান সংগ্রহ করে না। যেকোনো আনুষ্ঠানিক কার্যক্রম সর্বদা অফিশিয়াল ভেরিফায়েড চ্যানেলে প্রকাশ করা হবে।
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-3">
                ৩. শালীন আচরণ
              </h2>
              <p>
                যোগাযোগ ফর্মের মাধ্যমে বার্তা প্রেরণের সময় পারস্পরিক শ্রদ্ধা ও শালীনতা বজায় রাখা প্রত্যাশিত। অশালীন, মানহানিকর বা ক্ষতিকর যেকোনো বার্তা তাৎক্ষণিকভাবে প্রত্যাখ্যান করা হবে।
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-3">
                ৪. সোশ্যাল মিডিয়া ও বাহ্যিক লিঙ্ক
              </h2>
              <p>
                আমাদের সাইট থেকে ইউটিউব বা ফেসবুকে যাওয়ার পর সেই সকল প্ল্যাটফর্মের নিজস্ব ব্যবহারের নীতিমালা ও শর্তাবলি প্রযোজ্য হবে।
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#142B3B] mb-3">
                ৫. শর্তাবলির পরিবর্তন
              </h2>
              <p>
                প্রয়োজন সাপেক্ষে আমরা এই শর্তাবলি পরিমার্জন বা সংশোধন করার অধিকার সংরক্ষণ করি। সংশোধিত শর্তাবলি ওয়েবসাইটে প্রকাশের পর থেকেই কার্যকর গণ্য হবে।
              </p>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  );
}
