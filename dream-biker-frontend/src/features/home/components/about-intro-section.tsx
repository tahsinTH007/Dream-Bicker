"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";

export function AboutIntroSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
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
                  src="/images/author/hanif_avatar.png"
                  alt="হানিফ, ড্রিম বাইকারের প্রতিষ্ঠাতা"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </motion.div>

              {/* Quote Capsule with Entrance and Stagger */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="absolute -bottom-6 -right-6 rounded-2xl bg-[#142B3B] p-5 text-white shadow-xl max-w-xs hidden sm:block border border-white/10 backdrop-blur-md"
              >
                <Quote className="h-5 w-5 text-[#E97835] mb-2" />
                <p className="text-xs leading-relaxed italic text-white/90">
                  &quot;আমি শুধু নতুন জায়গা দেখার জন্য ঘুরি না; ঘুরি মানুষের
                  হৃদয়ের গভীরের ভালোবাসা প্রত্যক্ষ করতে।&quot;
                </p>
                <span className="mt-2 block text-[10px] font-bold uppercase tracking-wider text-[#E97835]">
                  — হানিফ (ড্রিম বাইকার)
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
              label="হেলমেটের পেছনের মানুষটি"
              title="দুই চাকায় পরিভ্রমণ, হৃদয়ে মানবসেবা।"
              description="ডিজিটাল যোগাযোগকে ব্যবহার করে বাংলাদেশের প্রত্যন্ত গ্রাম ও চরাঞ্চলের মানুষের পাশে দাঁড়ানোর এক অবিরাম প্রচেষ্টা।"
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
                ড্রিম বাইকার কেবল একটি সাধারণ মোটরবাইক ব্লগ হিসেবে শুরু হয়নি; এর
                পেছনে ছিল সাধারণ ক্যামেরা যেখানে সচরাচর যায় না, সেখানে যাওয়ার এক
                তীব্র তাগিদ। দেশের বড় বড় হাইওয়ে পেরিয়ে মাটির মেঠোপথে ছড়িয়ে থাকা
                প্রবীণ কারিগর, সংগ্রামী মা আর স্বপ্নবাজ তরুণদের জীবনগাথা তুলে
                ধরাই আমাদের প্রধান ব্রত।
              </p>
              <p>
                সময়ের সাথে সাথে আমাদের এই পরিভ্রমণ রূপ নিয়েছে এক দায়িত্বশীল
                মানবিক আন্দোলনে। শীতে কুয়াশাচ্ছন্ন সকালে বয়োবৃদ্ধদের কাছে উষ্ণ
                কম্বল পৌঁছে দেওয়া, ঝড়ে ক্ষতিগ্রস্ত বাড়ি মেরামত, কিংবা শিশুদের
                হাতে স্কুল ব্যাগ তুলে দেওয়া—সবকিছুই করা হয় সর্বোচ্চ শ্রদ্ধা ও
                ভালোবাসা বজায় রেখে।
              </p>
            </motion.div>

            {/* Core Values Bullets with Hover Lift & Stagger */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -4, borderColor: "#E97835" }}
                className="rounded-xl border border-[#EAE6DB] bg-[#F7F5EF]/50 p-4 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="h-4 w-4 text-[#E97835]" />
                  <h4 className="font-heading text-sm font-bold text-[#142B3B]">
                    অকৃত্রিম ও সৎ গল্পবলা
                  </h4>
                </div>
                <p className="text-xs text-[#777777] leading-relaxed">
                  কোনো কৃত্রিম নাটকীয়তা নয়, বাস্তব মানুষের সত্যিকারের লড়াই ও
                  আশাকে তুলে ধরা।
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -4, borderColor: "#E97835" }}
                className="rounded-xl border border-[#EAE6DB] bg-[#F7F5EF]/50 p-4 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Heart className="h-4 w-4 text-[#E97835]" />
                  <h4 className="font-heading text-sm font-bold text-[#142B3B]">
                    মর্যাদাপূর্ণ মানবিক কাজ
                  </h4>
                </div>
                <p className="text-xs text-[#777777] leading-relaxed">
                  সাহায্যগ্রহীতার আত্মসম্মান রক্ষা করে ভালোবাসা ও আন্তরিকতার
                  সাথে পাশে থাকা।
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
      </div>
    </section>
  );
}
