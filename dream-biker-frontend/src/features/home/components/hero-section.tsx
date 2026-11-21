"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Clapperboard, Eye, Play, Users, type LucideIcon } from "lucide-react";
import type { HeroStat, HeroStatKey } from "@/server/social/hero-stats";
import { CountUp } from "@/components/shared/count-up";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Warm sunrise palette used across the hero
const GOLD = "#FFC93C";
const ORANGE = "#FF6B2C";

// Chip colours follow the platform: YouTube red, Facebook blue
const statStyles: Record<HeroStatKey, { icon: LucideIcon; chip: string; glow: string }> = {
  youtubeSubscribers: {
    icon: Users,
    chip: "from-[#FF0000] to-[#FF5A5A]",
    glow: "shadow-[0_8px_24px_-6px_rgba(255,0,0,0.65)]",
  },
  youtubeViews: {
    icon: Eye,
    chip: "from-[#E00000] to-[#FF6B6B]",
    glow: "shadow-[0_8px_24px_-6px_rgba(255,0,0,0.65)]",
  },
  youtubeVideos: {
    icon: Clapperboard,
    chip: "from-[#C40000] to-[#FF4040]",
    glow: "shadow-[0_8px_24px_-6px_rgba(255,0,0,0.65)]",
  },
  facebookFollowers: {
    icon: Users,
    chip: "from-[#1877F2] to-[#5AA9FF]",
    glow: "shadow-[0_8px_24px_-6px_rgba(24,119,242,0.7)]",
  },
};

// One orchestrated entrance using only opacity + transform (GPU-friendly)
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

export function HeroSection({ stats }: { stats: HeroStat[] }) {
  return (
    <section className="relative isolate flex min-h-[700px] flex-col overflow-hidden bg-[#07100C] text-white sm:min-h-[740px] lg:min-h-svh">
      {/* Photo starts BELOW the navbar (72px mobile / 80px desktop) and is pinned
          to its top edge, so his head is never hidden behind the navbar,
          whatever the screen's width-to-height ratio. On large screens it
          occupies the right part only and the left melts into the dark bg. */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT }}
        className="absolute inset-x-0 bottom-0 top-[72px] -z-20 origin-top will-change-transform sm:top-[80px] lg:left-auto lg:w-[72%]"
      >
        <Image
          src="/images/hd/hero_bg_hanif.jpg"
          alt="ড্রিম বাইকার - মো. হানিফ হোসেন"
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 72vw, 100vw"
          className="pointer-events-none select-none object-cover object-[68%_top] lg:object-[60%_top]"
        />
        {/* soft top edge under the navbar */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#07100C] to-transparent" />
        {/* left edge melts into the background (large screens) */}
        <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-gradient-to-r from-[#07100C] via-[#07100C]/70 to-transparent lg:block" />
      </motion.div>

      {/* Text readability on small/medium screens where text sits over the photo */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#07100C]/95 via-[#07100C]/75 to-[#07100C]/10 lg:from-[#07100C]/60 lg:via-transparent lg:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-[#07100C] via-[#07100C]/60 to-transparent" />

      {/* Colour glows: warm sunrise light behind the headline */}
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-[#FF6B2C]/25 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/4 top-10 -z-10 h-[360px] w-[360px] rounded-full bg-[#FFC93C]/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 -z-10 hidden h-[420px] w-[420px] rounded-full bg-[#10B981]/10 blur-[140px] lg:block" />

      {/* Main content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-12 pt-32 sm:px-6 sm:pt-36 lg:px-8 [@media(min-width:1024px)_and_(max-height:780px)]:pb-8 [@media(min-width:1024px)_and_(max-height:780px)]:pt-24">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          {/* Eyebrow pill */}
          <motion.div variants={rise}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#FFC93C]/35 bg-gradient-to-r from-[#FFC93C]/15 to-[#FF6B2C]/10 px-4 py-1.5 text-sm font-semibold text-[#FFD970] shadow-[0_0_30px_-8px_rgba(255,201,60,0.6)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FFC93C] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FFC93C]" />
              </span>
              শুধু পথের গল্প নয়, মানুষের জীবনের গল্প
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={rise}
            className="mt-6 text-4xl font-extrabold leading-[1.3] tracking-tight text-white sm:text-5xl xl:text-6xl [@media(min-width:1024px)_and_(max-height:780px)]:mt-4 [@media(min-width:1024px)_and_(max-height:780px)]:text-4xl"
          >
            ভ্রমণের পথে মানুষের গল্প,
            <span className="relative mt-1 block w-fit pb-3">
              <span
                className="bg-clip-text font-[family-name:var(--font-bengali-display)] font-normal leading-[1.35] text-transparent drop-shadow-[0_4px_24px_rgba(255,120,40,0.35)]"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${GOLD} 0%, #FFA53C 45%, ${ORANGE} 100%)`,
                }}
              >
                মানবতার পাশে আমাদের পথচলা।
              </span>
              {/* hand-drawn underline */}
              <svg
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                className="absolute -bottom-0.5 left-0 h-3 w-full sm:h-4"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="heroUnderline" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor={GOLD} />
                    <stop offset="100%" stopColor={ORANGE} />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M3 11 C 80 3, 200 3, 297 9"
                  stroke="url(#heroUnderline)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 0.9, ease: EASE_OUT }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 [@media(min-width:1024px)_and_(max-height:780px)]:mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
          >
            বাংলাদেশের প্রত্যন্ত অঞ্চল, গ্রাম ও চরাঞ্চলের মানুষের জীবনসংগ্রাম, স্বপ্ন, সম্ভাবনা এবং বাস্তব চিত্র
            সবার সামনে তুলে ধরাই আমাদের লক্ষ্য।
          </motion.p>

          {/* CTAs */}
          <motion.div variants={rise} className="mt-9 [@media(min-width:1024px)_and_(max-height:780px)]:mt-6 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3.5 text-base font-bold text-[#2A1300] shadow-[0_12px_32px_-10px_rgba(255,107,44,0.85)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(255,107,44,1)] active:translate-y-0"
              style={{ backgroundImage: `linear-gradient(100deg, ${GOLD} 0%, #FFA53C 55%, ${ORANGE} 100%)` }}
            >
              {/* light sweep on hover */}
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[420%]" />
              <span className="relative">আমাদের পথচলা জানুন</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>

            <Link
              href="/videos"
              className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 py-2 pl-2 pr-6 text-base font-bold text-white transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 active:translate-y-0"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-white shadow-[0_6px_18px_-4px_rgba(255,45,85,0.8)] transition-transform duration-300 ease-out group-hover:scale-110"
                style={{ backgroundImage: "linear-gradient(135deg, #FF2D55, #FF8A3D)" }}
              >
                <Play className="ml-0.5 h-4 w-4 fill-current" />
              </span>
              ভিডিও দেখুন
            </Link>
          </motion.div>
        </motion.div>

        {/* "Dream Biker" autograph over the photo */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE_OUT }}
          className="pointer-events-none absolute right-6 top-[46%] hidden -rotate-12 select-none md:block lg:right-14"
          aria-hidden="true"
        >
          <span className="block font-[family-name:var(--font-signature)] text-6xl leading-none text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] lg:text-7xl">
            Dream Biker
          </span>
          <svg viewBox="0 0 200 20" className="-mt-1 ml-auto h-4 w-40" fill="none">
            <motion.path
              d="M4 14 C 60 4, 130 4, 196 10"
              stroke={GOLD}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.4, ease: EASE_OUT }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.75, ease: EASE_OUT }}
        className="relative border-t border-white/10 bg-[#0B1511]/90"
      >
        {/* glowing gradient edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFC93C] to-transparent opacity-70" />

        <ul className="mx-auto grid max-w-7xl grid-cols-2 px-2 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((stat, idx) => {
            const style = statStyles[stat.key];
            const Icon = style.icon;
            return (
              <li
                key={stat.key}
                className={[
                  "group flex items-center justify-center gap-3 px-2 py-5 sm:gap-4 sm:py-6 [@media(min-width:1024px)_and_(max-height:780px)]:py-4",
                  idx % 2 === 1 ? "border-l border-white/10" : "",
                  idx === 2 ? "md:border-l md:border-white/10" : "",
                  idx >= 2 ? "border-t border-white/10 md:border-t-0" : "",
                ].join(" ")}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white transition-transform duration-300 ease-out group-hover:-translate-y-1 sm:h-12 sm:w-12 ${style.chip} ${style.glow}`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
                </span>
                <div>
                  <p className="text-xl font-extrabold leading-tight text-white sm:text-2xl">
                    {/* starts as the stats bar fades in, slightly staggered */}
                    <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals} duration={2.2} delay={0.6 + idx * 0.12} />
                  </p>
                  <p className="text-xs font-medium text-white/80 sm:text-sm">{stat.label}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}
