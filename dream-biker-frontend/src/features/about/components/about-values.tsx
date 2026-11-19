"use client";

import { motion } from "framer-motion";
import { Heart, Eye, Users, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const values = [
  {
    icon: Heart,
    title: "ভিউয়ের চেয়ে সহমর্মিতা আগে",
    description:
      "ভাইরাল ভিউয়ের চেয়ে মানুষের নিরাপত্তা ও কল্যাণ সবসময় প্রাধান্য পায়। আমরা মানুষের পাশে দাঁড়াই আগে, গল্প প্রকাশ করি কেবল তাদের মর্যাদা সমুন্নত রেখে।",
  },
  {
    icon: Eye,
    title: "আপসহীন আত্মমর্যাদা",
    description:
      "আমরা কাউকে অসহায় বা করুণার পাত্র হিসেবে চিত্রিত করি না। প্রতিটি গল্পেই মানুষের নিজস্ব সংগ্রাম, সততা ও সাহসের প্রতি গভীর শ্রদ্ধা নিবেদন করা হয়।",
  },
  {
    icon: Users,
    title: "সামাজিক অন্তর্ভুক্তি",
    description:
      "প্রকৃত মানবসেবা ধর্ম, বর্ণ কিংবা ভৌগোলিক সীমারেখার ঊর্ধ্বে। নিঃস্বার্থ ভালোবাসা ও সহমর্মিতা কোনো বিশেষ পরিচয়ে সীমাবদ্ধ নয়।",
  },
  {
    icon: ShieldCheck,
    title: "বিনম্র মানবসেবা",
    description:
      "মোটরসাইকেল আমাদের মনে করিয়ে দেয় আমরা সবাই এই পৃথিবীর ক্ষণিকের মুসাফির। মানুষের জন্য কিছু করতে পারাটাই জীবনের প্রকৃত সার্থকতা।",
  },
];

export function AboutValues() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-[#0D1C26] text-white">
      {/* Background ambient decorative glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E97835]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="মূলনীতি ও মূল্যবোধ"
          title="যে আদর্শে পরিচালিত প্রতিটি পথচলা"
          description="নৈতিক মানদণ্ড বজায় রেখে প্রতিটি গল্প সহানুভূতি দিয়ে তুলে ধরা এবং স্বচ্ছতার সাথে মাঠপর্যায়ের কার্যক্রম পরিচালনা করা।"
          isDark
          align="center"
          className="mb-14 sm:mb-18"
        />

        {/* 4 Values Cards Grid with Staggered Entrance & Interactive Hover Motion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:border-[#E97835] hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-[#E97835]/10 flex flex-col justify-between"
              >
                <div>
                  {/* Floating Icon Box */}
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#E97835] text-white mb-6 shadow-lg shadow-[#E97835]/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-6 w-6 stroke-[2.2]" />
                  </div>

                  {/* Card Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#E97835] transition-colors">
                    {val.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-white/40 group-hover:text-[#E97835] transition-colors">
                  <span>মূল্যবোধ ০{idx + 1}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E97835] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
