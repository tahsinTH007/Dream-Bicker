"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

interface MilestoneItem {
  step: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
}

const milestones: MilestoneItem[] = [
  {
    step: "১",
    year: "২০২১",
    title: "যাত্রার সূচনা ও একক পরিভ্রমণ",
    subtitle: "আশার নতুন দিগন্ত",
    description:
      "১৬ সেপ্টেম্বর ২০২১ তারিখে দুই চাকার বাহনে চড়ে মানুষের ভালোবাসা ও সেবার সন্ধানে মোঃ হানিফ হোসেনের একক পরিভ্রমণের আনুষ্ঠানিক সূচনা। মহাসড়ক পেরিয়ে মেঠোপথের অদেখা মানুষের দ্বারে পৌঁছানো।",
  },
  {
    step: "২",
    year: "২০২৩",
    title: "মাঠপর্যায়ের অভিজ্ঞতা ও তৃণমূল ডায়েরি",
    subtitle: "বাস্তব জীবনের প্রতিচ্ছবি",
    description:
      "বাংলাদেশের প্রত্যন্ত জনপদ ও নদী চরাঞ্চলে ঘুরে ঘুরে ক্যামেরার লেন্সে প্রান্তিক মানুষের জীবনের সংগ্রাম, অপ্রকাশিত দুঃখ এবং অমলিন হাসির গল্প তুলে ধরা। ভিডিও কন্টেন্টের মাধ্যমে দেশজুড়ে জনসচেতনতা সৃষ্টি।",
  },
  {
    step: "৩",
    year: "২০২৫",
    title: "৮ লক্ষাধিক শুভাকাঙ্ক্ষী ও স্থায়ী পুনর্বাসন",
    subtitle: "বৃহৎ মানবিক আন্দোলন",
    description:
      "ইউটিউব ও ফেসবুকে ৮ লক্ষাধিক মানুষের ভালোবাসার পরিবারে পরিণত হওয়া। তাৎক্ষণিক সাহায্যের পাশাপাশি গৃহহীন বৃদ্ধ বাবা ও সংগ্রামী মায়েদের পাকা ঘর এবং মুদি দোকান তৈরি করে দিয়ে স্থায়ীভাবে স্বাবলম্বী করা।",
  },
  {
    step: "৪",
    year: "২০২৬ ও ভবিষ্যৎ",
    title: "টেকসই সামাজিক উদ্যোগ ও শান্তির বার্তা",
    subtitle: "মানবতার অবিরাম পথচলা",
    description:
      "'মানবতাই শান্তির প্রতীক' মূলমন্ত্রে শিশুদের শিক্ষা সহায়তা, প্রবীণদের নিয়মিত স্বাস্থ্য সুরক্ষা ও চিকিৎসা সেবা প্রদান এবং প্রাকৃতিক দুর্যোগে ক্ষতিগ্রস্তদের স্থায়ী নিরাপদ আশ্রয়ের পরিধি দেশজুড়ে বিস্তৃত করা।",
  },
];

export function AboutTimeline() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Scroll-driven line progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineHeightSpring = useSpring(lineHeight, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section className="py-12 sm:py-16 bg-[#FCFBF8] border-y border-[#EAE6DB]/60 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="যাত্রার পথপরিক্রমা"
          title="পথচলার গুরুত্বপূর্ণ মাইলফলক"
          description="একক মোটরসাইকেল যাত্রা থেকে শুরু করে দেশজুড়ে বিস্তৃত এক নির্ভরযোগ্য মানবিক আন্দোলনে রূপ নেওয়ার ইতিহাস।"
          align="center"
          className="mb-10 sm:mb-12"
        />

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          {/* Background Static Line Track */}
          <div className="absolute left-[19px] sm:left-[21px] top-[24px] bottom-[24px] w-[2px] bg-[#EAE6DB]" />

          {/* Animated Orange Progress Fill Line */}
          <motion.div
            style={{ height: lineHeightSpring }}
            className="absolute left-[19px] sm:left-[21px] top-[24px] w-[2px] bg-[#E97835] origin-top shadow-[0_0_10px_rgba(233,120,53,0.45)]"
          />

          {/* Milestones Flow */}
          <div className="space-y-10 sm:space-y-12">
            {milestones.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex items-start gap-6 sm:gap-9 group"
              >
                {/* 1. Left: Numbered Node with Outer Soft Halo Aura (matching reference design) */}
                <div className="relative shrink-0 flex items-center justify-center mt-1">
                  {/* Outer glowing halo ring */}
                  <span className="absolute -inset-2 sm:-inset-2.5 rounded-full bg-[#E97835]/15 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#E97835]/25" />

                  {/* Inner solid circle with number */}
                  <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#E97835] text-white font-heading font-extrabold text-sm sm:text-base shadow-md transition-transform duration-300 group-hover:scale-105">
                    {item.step}
                  </span>
                </div>

                {/* 2. Right: Content Block */}
                <div className="flex-1 pt-0.5">
                  {/* Year & Milestone Badge */}
                  <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#E97835]/10 border border-[#E97835]/25 px-3 py-1 text-xs font-bold text-[#E97835]">
                    <Calendar className="h-3 w-3" />
                    <span>{item.year}</span>
                    {item.subtitle && (
                      <span className="text-[#142B3B]/60 font-medium">
                        • {item.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Title (matching large bold heading style in reference) */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#142B3B] tracking-tight leading-snug group-hover:text-[#E97835] transition-colors">
                    {item.title}
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="mt-3 text-sm sm:text-base text-[#555555] leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
