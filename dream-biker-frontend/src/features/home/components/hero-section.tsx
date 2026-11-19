"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Heart, Play, Star, Users, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site.config";

const ACCENT = "#F5B427";
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const statIcons: Record<string, LucideIcon> = {
  followers: Users,
  views: Play,
  recommend: Heart,
  reviews: Star,
};

// One orchestrated entrance: children rise in sequence using only opacity +
// transform (GPU-friendly, no blur/filter animation).
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-[#0B1410] text-white sm:min-h-[700px] lg:min-h-[92vh]">
      {/* Background photo */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <Image
          src="/images/hero_bg_hanif.jpg"
          alt="ড্রিম বাইকার - মো. হানিফ হোসেন"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="pointer-events-none select-none object-cover object-[72%_30%] sm:object-[70%_30%]"
        />
      </motion.div>

      {/* Readability overlays: left fade for text, top fade for navbar, bottom fade for stats */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#0B1410]/95 via-[#0B1410]/60 to-transparent sm:via-[#0B1410]/45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-[#0B1410] via-[#0B1410]/50 to-transparent sm:hidden" />

      {/* Main content */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          <motion.p
            variants={rise}
            className="mb-4 flex items-center gap-3 font-[family-name:var(--font-manrope)] text-xs font-extrabold uppercase tracking-[0.25em]"
            style={{ color: ACCENT }}
          >
            A Journey of Humanity
            <span className="h-px w-10" style={{ backgroundColor: ACCENT }} />
          </motion.p>

          <motion.h1
            variants={rise}
            className="font-[family-name:var(--font-manrope)] text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Humanity Is a
            <br />
            Symbol of{" "}
            <span
              className="inline-block font-[family-name:var(--font-script)] font-normal"
              style={{ color: ACCENT }}
            >
              Peace.
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-md font-[family-name:var(--font-manrope)] text-base leading-relaxed text-white/85 sm:text-lg"
          >
            Let&apos;s spread kindness, support the needy, and make this world a better place
            together.
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3 font-[family-name:var(--font-manrope)] text-sm font-bold text-[#1A1405] shadow-lg shadow-black/25 transition-[transform,background-color] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0"
              style={{ backgroundColor: ACCENT }}
            >
              Explore My Journey
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>

            <Link
              href="/videos"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/70 px-6 py-3 font-[family-name:var(--font-manrope)] text-sm font-bold text-white backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white/10 active:translate-y-0"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0B1410]">
                <Play className="ml-px h-2.5 w-2.5 fill-current" />
              </span>
              Watch Videos
            </Link>
          </motion.div>
        </motion.div>

        {/* "Dream Biker" signature */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE_OUT }}
          className="pointer-events-none absolute right-6 top-[38%] hidden -rotate-12 select-none md:block lg:right-12"
          aria-hidden="true"
        >
          <span className="block font-[family-name:var(--font-signature)] text-6xl leading-none text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] lg:text-7xl">
            Dream Biker
          </span>
          <svg viewBox="0 0 200 20" className="ml-auto -mt-1 h-4 w-40" fill="none">
            <motion.path
              d="M4 14 C 60 4, 130 4, 196 10"
              stroke={ACCENT}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1.3, ease: EASE_OUT }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: EASE_OUT }}
        className="relative border-t border-white/10 bg-[#141414]/80 backdrop-blur-md"
      >
        <ul className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {siteConfig.heroStats.map((stat, idx) => {
            const Icon = statIcons[stat.icon] ?? Star;
            return (
              <li
                key={stat.label}
                className={[
                  "flex items-center justify-center gap-3 py-5 sm:py-6",
                  // vertical dividers between items (2 per row on mobile, 4 on desktop)
                  idx % 2 === 1 ? "border-l border-white/15" : "",
                  idx === 2 ? "md:border-l md:border-white/15" : "",
                  idx >= 2 ? "border-t border-white/10 md:border-t-0" : "",
                ].join(" ")}
              >
                <Icon
                  className={`h-6 w-6 shrink-0 sm:h-7 sm:w-7 ${stat.icon === "reviews" ? "" : "text-white"}`}
                  style={stat.icon === "reviews" ? { color: ACCENT } : undefined}
                  strokeWidth={1.8}
                />
                <div className="font-[family-name:var(--font-manrope)]">
                  <p className="text-xl font-extrabold leading-none text-white sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-white/70 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}
