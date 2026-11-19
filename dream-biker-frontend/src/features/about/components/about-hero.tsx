"use client";

import * as React from "react";
import Image from "next/image";
import { Compass, Heart, Shield, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";

const rotatingFocus = [
  "প্রতিটি মানবিক কাজই মূল্যবান",
  "অসহায়ের পাশে পথচলাই জীবনের সার্থকতা",
  "মানুষের মুখে অনাবিল হাসি ফোটানোই লক্ষ্য",
  "নিঃস্বার্থ ভালোবাসাই আমাদের শক্তি",
];

export function AboutHero() {
  const [focusIndex, setFocusIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % rotatingFocus.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <PageHeader
        badge="হানিফের পরিচিতি"
        title="মানবতার জন্য পরিভ্রমণ, আশার আলো ছড়ানো"
        description="একক মোটরসাইকেল যাত্রা থেকে দেশজুড়ে বিস্তৃত সমাজকল্যাণমূলক কার্যক্রম—ড্রিম বাইকারের পেছনের জীবনদর্শন ও মানবিক মূল্যবোধ।"
        breadcrumbs={[{ label: "পরিচিতি" }]}
      />

      <section className="py-16 sm:py-24 bg-white overflow-hidden">
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
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative rotating accent box */}
                <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-tr from-[#E97835]/15 to-[#F7F5EF] -rotate-2 -z-10 border border-[#EAE6DB]" />

                {/* Main Portrait Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[24px] border-4 border-white shadow-2xl bg-[#142B3B] group"
                >
                  <Image
                    src="/images/hd/hanif_portrait.jpg"
                    quality={90}
                    alt="হানিফ (ড্রিম বাইকার) প্রতিকৃতি"
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1620]/90 via-[#0A1620]/20 to-transparent" />
                  
                  {/* Bottom Portrait Card Info */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs uppercase font-bold tracking-wider text-[#E97835]">
                      প্রতিষ্ঠাতা ও নির্মাতা
                    </p>
                    <h3 className="font-heading text-2xl font-bold tracking-tight">
                      হানিফ (ড্রিম বাইকার)
                    </h3>
                    <p className="text-xs text-white/80 mt-1">
                      বাংলাদেশি কন্টেন্ট ক্রিয়েটর ও মানবসেবক
                    </p>
                  </div>
                </motion.div>

                {/* Floating Capsule Badge with Continuous Gentle Float */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-5 -left-5 rounded-2xl bg-[#E97835] text-white p-4 shadow-xl hidden sm:block border-2 border-white/20"
                >
                  <Sparkles className="h-5 w-5 mb-1 animate-pulse" />
                  <p className="text-xs font-bold">দুই চাকায়</p>
                  <p className="text-[10px] text-white/90">সীমাহীন ভালোবাসা</p>
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
                ব্যক্তিগত পরিচিতি
              </div>

              {/* Dynamic Animated Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#142B3B] tracking-tight leading-snug mb-6">
                &quot;প্রতিটি জীবনের একটি গল্প আছে।{" "}
                {/* All phrases share one grid cell: the invisible copies reserve the
                    space of the longest phrase, so the heading never reflows as they rotate. */}
                <span className="relative inline-grid text-[#E97835]">
                  {rotatingFocus.map((phrase) => (
                    <span key={phrase} aria-hidden="true" className="invisible [grid-area:1/1]">
                      {phrase}
                    </span>
                  ))}
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={rotatingFocus[focusIndex]}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="[grid-area:1/1]"
                    >
                      {rotatingFocus[focusIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full text-[#E97835]/40"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
                ।&quot;
              </h2>

              <div className="space-y-4 text-base text-[#222222]/80 leading-relaxed font-normal">
                <p>
                  আমার অফিশিয়াল ডিজিটাল ঠিকানায় আপনাকে স্বাগতম। আমি <strong className="text-[#142B3B] font-bold">মো. হানিফ হোসেন</strong>, দেশ ও সামাজিক যোগাযোগ মাধ্যমে পরিচিত <strong className="text-[#E97835] font-bold">ড্রিম বাইকার</strong> নামে।
                </p>
                <p>
                  আমার কাজ দীর্ঘ দূরত্বের মোটরসাইকেল ভ্রমণ ও মানবিক তথ্যচিত্র নির্মাণের এক অনুপম মেলবন্ধন। ব্যক্তিগত শখ হিসেবে শুরু হলেও পরে এটি রূপ নেয় এক মহৎ দায়িত্বে: আমাদের দেশের সবচেয়ে অনুপ্রেরণাদায়ী গল্পগুলো বড় শহরের ঝলমলে আলোয় থাকে না; সেগুলো লুকিয়ে থাকে প্রত্যন্ত গ্রাম, চরাঞ্চল আর নদীভাঙা পল্লি জনপদে।
                </p>
                <p>
                  আমি মোটরসাইকেল নিয়ে সরাসরি ছুটে যাই এসব অঞ্চলে—মানুষের কাছে বসতে, তাদের সুখ-দুঃখের কথা শুনতে, খাবার ভাগাভাগি করতে এবং পূর্ণ আত্মমর্যাদা সহকারে সহযোগিতার হাত বাড়িয়ে দিতে।
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
                  <span className="text-[10px] sm:text-xs text-[#777777]">তৃণমূল বাংলা</span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#EAE6DB] hover:border-[#E97835]/50 hover:bg-white hover:shadow-md cursor-default transition-colors"
                >
                  <Heart className="h-6 w-6 text-[#E97835] mb-1.5" />
                  <span className="text-xs sm:text-sm font-bold text-[#142B3B]">মানবসেবক</span>
                  <span className="text-[10px] sm:text-xs text-[#777777]">মাঠপর্যায়ের কল্যাণ</span>
                </motion.div>

                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#F7F5EF] border border-[#EAE6DB] hover:border-[#E97835]/50 hover:bg-white hover:shadow-md cursor-default transition-colors"
                >
                  <Shield className="h-6 w-6 text-[#E97835] mb-1.5" />
                  <span className="text-xs sm:text-sm font-bold text-[#142B3B]">গল্পকার</span>
                  <span className="text-[10px] sm:text-xs text-[#777777]">মর্যাদা প্রথম</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
