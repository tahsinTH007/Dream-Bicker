"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { DreamBikerStory } from "@/components/shared/dream-biker-story";

export function AboutIntroSection() {
  return (
    <section className="relative py-12 sm:py-16 bg-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-[#E97835]/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Portrait & Decorative Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Offset Decorative Background with continuous subtle float */}
              <motion.div
                animate={{ rotate: [-2, -3, -2], y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 rounded-[28px] bg-[#F7F5EF] -z-10 border border-[#EAE6DB]"
              />

              {/* Portrait Image Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[3/4] overflow-hidden rounded-[24px] border border-[#EAE6DB] shadow-xl bg-[#142B3B]"
              >
                <Image
                  src="/images/hd/hanif_avatar.jpg"
                  quality={90}
                  alt="হানিফ, ড্রিম বাইকারের প্রতিষ্ঠাতা"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </motion.div>

              {/* Quote Capsule with Entrance and Stagger */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                whileHover={{ y: -4 }}
                className="absolute -bottom-6 -right-6 rounded-2xl bg-[#142B3B] p-5 text-white shadow-xl max-w-xs hidden sm:block border border-white/10"
              >
                <Quote className="h-5 w-5 text-[#E97835] mb-2" />
                <p className="text-xs leading-relaxed italic text-white/90">
                  শুধু পথের গল্প নয়, মানুষের জীবনের গল্প। ভ্রমণের প্রতিটি পথে, মানবতার পাশে।
                </p>
                <span className="mt-2 block text-xs font-bold uppercase tracking-wider text-[#E97835]">
                  — Dream Biker
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <SectionHeading
              label="আমাদের পরিচয়"
              title="Dream Biker – ভ্রমণের পথে মানুষের গল্প"
              description="মানবতার পাশে আমাদের পথচলা।"
              className="mb-6"
            />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-base text-[#222222]/80 leading-relaxed"
            >
              <p>
                Dream Biker একটি স্বতন্ত্র ডিজিটাল কনটেন্ট ও মানবিক উদ্যোগ, যার মূল লক্ষ্য বাংলাদেশের প্রত্যন্ত অঞ্চল, গ্রাম ও চরাঞ্চলের মানুষের জীবনসংগ্রাম, স্বপ্ন, সম্ভাবনা এবং বাস্তব চিত্র সবার সামনে তুলে ধরা।
              </p>
              <p>
                আমাদের পথচলা শুরু হয়েছিল মোটরবাইক নিয়ে দেশ ঘুরে দেখার স্বপ্ন থেকে। কিন্তু সময়ের সঙ্গে সেই যাত্রা শুধু ভ্রমণ কিংবা ভিডিও কনটেন্ট তৈরির মধ্যে সীমাবদ্ধ থাকেনি। আমরা উপলব্ধি করেছি, দেশের আনাচে-কানাচে ছড়িয়ে আছে অসংখ্য মানুষের না-বলা গল্প, হারিয়ে যেতে বসা ঐতিহ্য, অসাধারণ প্রতিভা এবং প্রতিকূলতার সঙ্গে লড়াই করে বেঁচে থাকার অনুপ্রেরণামূলক ইতিহাস।
              </p>
              <p>
                সেই গল্পগুলো মানুষের কাছে পৌঁছে দেওয়ার লক্ষ্যেই Dream Biker আজ কাজ করে যাচ্ছে।
              </p>
            </motion.div>

            {/* Core Values Bullets with Hover Lift & Stagger */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-[#EAE6DB] bg-[#F7F5EF]/50 p-4 transition-colors hover:border-[#E97835]"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="h-4 w-4 text-[#E97835]" />
                  <h4 className="font-heading text-sm font-bold text-[#142B3B]">
                    মানবিক কার্যক্রম
                  </h4>
                </div>
                <p className="text-xs text-[#777777] leading-relaxed">
                  গল্প তুলে ধরার পাশাপাশি অসহায়, সুবিধাবঞ্চিত ও প্রান্তিক মানুষের প্রয়োজনে পাশে দাঁড়ানো।
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-[#EAE6DB] bg-[#F7F5EF]/50 p-4 transition-colors hover:border-[#E97835]"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Heart className="h-4 w-4 text-[#E97835]" />
                  <h4 className="font-heading text-sm font-bold text-[#142B3B]">
                    মর্যাদা ও সম্মান
                  </h4>
                </div>
                <p className="text-xs text-[#777777] leading-relaxed">
                  প্রতিটি উদ্যোগে মানুষের আত্মসম্মান, ব্যক্তিগত মর্যাদা ও অনুভূতির প্রতি সর্বোচ্চ শ্রদ্ধা।
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex items-center gap-4"
            >
              <Button
                asChild
                variant="default"
                size="lg"
                className="rounded-2xl gap-2 shadow-lg shadow-[#E97835]/20 hover:shadow-[#E97835]/35 hover:-translate-y-0.5 transition-all"
              >
                <Link href="/about">
                  সম্পূর্ণ পরিচিতি পড়ুন
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* The full Dream Biker story, section by section (closing lines are on the photo badge above) */}
        <DreamBikerStory className="mt-14 sm:mt-16" showClosing={false} />
      </div>
    </section>
  );
}
