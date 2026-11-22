"use client";

import Image from "next/image";
import { Compass, Heart, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";

export function AboutHero() {
  return (
    <>
      <PageHeader
        badge="হানিফের পরিচিতি"
        title="মানবতার জন্য পরিভ্রমণ, আশার আলো ছড়ানো"
        description="একক মোটরসাইকেল যাত্রা থেকে দেশজুড়ে বিস্তৃত সমাজকল্যাণমূলক কার্যক্রম—ড্রিম বাইকারের পেছনের জীবনদর্শন ও মানবিক মূল্যবোধ।"
      />

      <section className="py-10 sm:py-14 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: Large Portrait Hero with Motion */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto w-full max-w-[280px] sm:max-w-sm lg:max-w-none">
                {/* Decorative rotating accent box */}
                <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-tr from-[#E97835]/15 to-[#F7F5EF] -rotate-2 -z-10 border border-[#EAE6DB]" />

                {/* Main Portrait Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[24px] border-4 border-white shadow-2xl bg-[#142B3B] group"
                >
                  <Image
                    src="/images/hd/hanif_portrait.jpeg"
                    quality={90}
                    alt="হানিফ (ড্রিম বাইকার) প্রতিকৃতি"
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 384px, 280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1620]/85 via-[#0A1620]/10 via-35% to-transparent" />
                  
                  {/* Bottom Portrait Card Info */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs uppercase font-bold tracking-wider text-[#E97835]">
                      প্রতিষ্ঠাতা ও নির্মাতা
                    </p>
                    {/* explicit text-white: the global h1-h6 rule would otherwise make it navy on the dark photo */}
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-white text-shadow-md">
                      হানিফ (ড্রিম বাইকার)
                    </h3>
                    <p className="text-xs text-white/85 mt-1 text-shadow-sm">
                      বাংলাদেশি কন্টেন্ট ক্রিয়েটর ও মানবসেবক
                    </p>
                  </div>
                </motion.div>

              </div>
            </motion.div>

            {/* Right: Personal Introduction with Staggered Entrance */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E97835]/15 border border-[#E97835]/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#E97835] mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E97835] animate-ping" />
                আমাদের পরিচয়
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#142B3B] tracking-tight leading-snug mb-6">
                <span className="text-[#E97835]">Dream Biker</span> – ভ্রমণের পথে মানুষের গল্প, মানবতার পাশে আমাদের পথচলা।
              </h2>

              <div className="space-y-4 text-base text-[#222222]/80 leading-relaxed font-normal">
                <p>
                  <strong className="text-[#142B3B] font-bold">Dream Biker</strong> একটি স্বতন্ত্র ডিজিটাল কনটেন্ট ও মানবিক উদ্যোগ, যার মূল লক্ষ্য বাংলাদেশের প্রত্যন্ত অঞ্চল, গ্রাম ও চরাঞ্চলের মানুষের জীবনসংগ্রাম, স্বপ্ন, সম্ভাবনা এবং বাস্তব চিত্র সবার সামনে তুলে ধরা।
                </p>
                <p>
                  আমাদের পথচলা শুরু হয়েছিল মোটরবাইক নিয়ে দেশ ঘুরে দেখার স্বপ্ন থেকে। কিন্তু সময়ের সঙ্গে সেই যাত্রা শুধু ভ্রমণ কিংবা ভিডিও কনটেন্ট তৈরির মধ্যে সীমাবদ্ধ থাকেনি। আমরা উপলব্ধি করেছি, দেশের আনাচে-কানাচে ছড়িয়ে আছে অসংখ্য মানুষের না-বলা গল্প, হারিয়ে যেতে বসা ঐতিহ্য, অসাধারণ প্রতিভা এবং প্রতিকূলতার সঙ্গে লড়াই করে বেঁচে থাকার অনুপ্রেরণামূলক ইতিহাস।
                </p>
                <p>
                  সেই গল্পগুলো মানুষের কাছে পৌঁছে দেওয়ার লক্ষ্যেই <strong className="text-[#E97835] font-bold">Dream Biker</strong> আজ কাজ করে যাচ্ছে।
                </p>
              </div>

              {/* Trait Cards with Interactive Motion */}
              <div className="mt-8 grid grid-cols-3 gap-4 w-full pt-6 border-t border-[#EAE6DB]">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#EAE6DB] hover:border-[#E97835]/50 hover:bg-white hover:shadow-md cursor-default transition-colors"
                >
                  <Compass className="h-6 w-6 text-[#E97835] mb-1.5" />
                  <span className="text-xs sm:text-sm font-bold text-[#142B3B]">অভিযাত্রী</span>
                  <span className="text-xs sm:text-xs text-[#777777]">তৃণমূল বাংলা</span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#EAE6DB] hover:border-[#E97835]/50 hover:bg-white hover:shadow-md cursor-default transition-colors"
                >
                  <Heart className="h-6 w-6 text-[#E97835] mb-1.5" />
                  <span className="text-xs sm:text-sm font-bold text-[#142B3B]">মানবসেবক</span>
                  <span className="text-xs sm:text-xs text-[#777777]">মাঠপর্যায়ের কল্যাণ</span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#EAE6DB] hover:border-[#E97835]/50 hover:bg-white hover:shadow-md cursor-default transition-colors"
                >
                  <Shield className="h-6 w-6 text-[#E97835] mb-1.5" />
                  <span className="text-xs sm:text-sm font-bold text-[#142B3B]">গল্পকার</span>
                  <span className="text-xs sm:text-xs text-[#777777]">মর্যাদা প্রথম</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
