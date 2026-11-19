"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Heart, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const dynamicPhrases = [
  "প্রতিটি মানবিক কাজই",
  "অসহায়ের পাশে দাঁড়ানোই",
  "নিঃস্বার্থ ভালোবাসা ছড়ানোই",
  "তৃণমূল মানুষের সেবাই",
];

export function HeroSection() {
  const [phraseIndex, setPhraseIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % dynamicPhrases.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-[#07131D] text-white pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
      {/* 1. Full-Width Photographic Hero Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg_hanif.jpg"
          alt="ড্রিম বাইকার - মোহাম্মদ হানিফ"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[75%_center] sm:object-[78%_center] lg:object-[82%_center] xl:object-right select-none pointer-events-none"
        />

        {/* Desktop Left-to-Right Dark Gradient for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07131D]/95 via-[#07131D]/80 to-transparent lg:from-[#07131D]/95 lg:via-[#07131D]/70 lg:to-transparent pointer-events-none" />

        {/* Mobile & Tablet Vertical Gradient (Bottom-Up) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07131D] via-[#07131D]/75 to-transparent sm:hidden pointer-events-none" />

        {/* Top Navbar Shadow Fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#07131D]/80 via-transparent to-transparent pointer-events-none" />

        {/* Bottom Smooth Blend to Next Section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07131D] via-[#07131D]/40 to-transparent pointer-events-none" />
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl lg:max-w-2xl xl:max-w-3xl flex flex-col items-start text-left">
          {/* Creator & Humanitarian Badge with Motion */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E97835]/40 bg-[#E97835]/15 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold tracking-wider uppercase text-[#E97835] mb-5 sm:mb-6 shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#E97835] animate-pulse" />
            কন্টেন্ট ক্রিয়েটর | মানবসেবক
          </motion.div>

          {/* Main Heading with Staggered Entrance & Dynamic Rotating Text */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] sm:leading-[1.2] text-white"
          >
            প্রতিটি জীবনের একটি গল্প আছে।{" "}
            <span className="relative inline-block text-[#E97835]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={dynamicPhrases[phraseIndex]}
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                  className="inline-block"
                >
                  {dynamicPhrases[phraseIndex]}
                </motion.span>
              </AnimatePresence>
              <svg
                className="absolute -bottom-2 left-0 w-full text-[#E97835]/40"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 Q50,0 100,8"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            </span>{" "}
            মূল্যবান।
          </motion.h1>

          {/* Introduction Paragraph with Motion */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed font-normal max-w-xl sm:max-w-2xl"
          >
            আমি{" "}
            <strong className="text-white font-semibold">
              হানিফ (ড্রিম বাইকার)
            </strong>
            । দুই চাকার বাহন আর একটি ক্যামেরা নিয়ে আমি পরিভ্রমণ করি বাংলাদেশের
            প্রত্যন্ত জনপদে—অদেখা মানুষের জীবনের নীরব গল্প তুলে ধরতে, অসহায়
            মানুষের পাশে দাঁড়াতে এবং মানবতার আলো ছড়িয়ে দিতে।
          </motion.p>

          {/* Action CTA Buttons with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              asChild
              variant="orange"
              size="lg"
              className="rounded-full px-7 py-3 text-sm font-bold gap-2 shadow-xl shadow-[#E97835]/25 hover:scale-105 active:scale-95 transition-all"
            >
              <Link href="/about">
                আমার যাত্রা জানুন
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-7 py-3 text-sm font-bold gap-2 border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white hover:scale-105 active:scale-95 transition-all"
            >
              <Link href="/videos">
                <Play className="h-4 w-4 fill-current text-white" />
                ভিডিওগুলো দেখুন
              </Link>
            </Button>
          </motion.div>

          {/* Highlights Row with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/15 w-full max-w-xl sm:max-w-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/15">
                <Compass className="h-5 w-5 text-[#E97835]" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">তৃণমূল বাংলা</div>
                <div className="text-xs text-white/70">
                  প্রত্যন্ত অঞ্চলের ডায়েরি
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E97835] text-white shadow-md">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">মানবতা প্রথম</div>
                <div className="text-xs text-white/70">মর্যাদা ও কল্যাণ</div>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/15">
                <span className="font-bold text-xs text-[#E97835]">HD</span>
              </div>
              <div>
                <div className="text-sm font-bold text-white">ডকুমেন্টারি</div>
                <div className="text-xs text-white/70">বাস্তব জীবনের গল্প</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Accent Brand Tag on Large Screens */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex absolute bottom-8 right-8 xl:right-12 z-10 items-center gap-2.5 rounded-full bg-black/40 backdrop-blur-md px-4 py-2 border border-white/15 text-white/90"
      >
        <span className="h-2 w-2 rounded-full bg-[#E97835]" />
        <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em]">
          DREAM BIKER • মোহাম্মদ হানিফ
        </span>
      </motion.div>
    </section>
  );
}
