"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { FaYoutube, FaFacebookF } from "react-icons/fa";
import { socialConfig } from "@/config/social.config";
import type { HeroStat } from "@/server/social/hero-stats";

interface SocialCardItem {
  platform: "youtube" | "facebook";
  topText: string;
  title: string;
  subtitle: string;
  url: string;
  accentBg: string;
  defaultBgGradient: string;
  borderColor: string;
  badgeBg: string;
  badgeTextColor: string;
  icon: typeof FaYoutube | typeof FaFacebookF;
}

const socialCards: SocialCardItem[] = [
  {
    platform: "youtube",
    topText: "ইউটিউব চ্যানেল • @DreamBiker532",
    title: "ইউটিউব ডকুমেন্টারি",
    subtitle: "{subscribers} সাবস্ক্রাইবারের সাথে যুক্ত হয়ে তৃণমূল মানুষের মানবিক গল্পগুলো দেখুন।",
    url: socialConfig.youtube.url,
    accentBg: "#FF0000",
    defaultBgGradient: "bg-gradient-to-br from-[#1E080A] via-[#130405] to-[#0A0203]",
    borderColor: "border-red-500/25 hover:border-red-500/50",
    badgeBg: "bg-red-600/20 text-red-500 border border-red-500/30",
    badgeTextColor: "text-red-400",
    icon: FaYoutube,
  },
  {
    platform: "facebook",
    topText: "অফিশিয়াল পেজ • BuydreambyHanif",
    title: "ফেসবুক ডায়েরি ও রিলস",
    subtitle: "{followers} ফলোয়ারের সাথে মাঠপর্যায়ের লাইভ আপডেট, চরাঞ্চলের দৃশ্য ও ভিডিও রিলস দেখতে ফলো করুন।",
    url: socialConfig.facebook.url,
    accentBg: "#1877F2",
    defaultBgGradient: "bg-gradient-to-br from-[#091629] via-[#060F1C] to-[#03070E]",
    borderColor: "border-blue-500/25 hover:border-blue-500/50",
    badgeBg: "bg-blue-600/20 text-blue-400 border border-blue-500/30",
    badgeTextColor: "text-blue-400",
    icon: FaFacebookF,
  },
];

/** "৮.৩ লাখ+" style text for a live stat (same numbers as the hero stats bar). */
function statText(stat: HeroStat | undefined): string {
  if (!stat) return "";
  const n = new Intl.NumberFormat("bn-BD", { minimumFractionDigits: stat.decimals, maximumFractionDigits: stat.decimals });
  return n.format(stat.value) + stat.suffix;
}

export function SocialCtaSection({ stats }: { stats: HeroStat[] }) {
  const subscribers = statText(stats.find((s) => s.key === "youtubeSubscribers"));
  const followers = statText(stats.find((s) => s.key === "facebookFollowers"));
  const cards = socialCards.map((card) => ({
    ...card,
    subtitle: card.subtitle.replace("{subscribers}", subscribers).replace("{followers}", followers),
  }));
  return (
    <section className="relative overflow-hidden bg-[#070D12] py-10 sm:py-12 text-white">
      {/* Subtle ambient light gradient behind cards */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-red-600/5 via-transparent to-blue-600/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white/80">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E97835]" />
            আন্দোলনে যুক্ত হোন
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            সোশ্যাল মিডিয়ায় ড্রিম বাইকারের সাথে থাকুন
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm leading-relaxed text-white/70">
            ইউটিউবে পূর্ণদৈর্ঘ্য মানবিক ডকুমেন্টারিগুলো উপভোগ করুন এবং ফেসবুকে আমাদের দৈনন্দিন পথের ডায়েরি দেখতে ফলো করুন।
          </p>
        </div>

        {/* 2-Column Medium-Sized Cards Grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2">
          {cards.map((card) => {
            const IconComponent = card.icon;

            return (
              <a
                key={card.platform}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`circle-expand-card group block min-h-[250px] sm:min-h-[270px] w-full border ${card.borderColor} ${card.defaultBgGradient} shadow-2xl transition-all duration-300 hover:-translate-y-1 select-none`}
              >
                {/* 1. Base Layer (Default State: Brand-Tinted Dark Background, Crisp Typography) */}
                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
                  {/* Top Row: Brand Icon Badge, Platform Text + Spacer for Top-Right Button */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${card.badgeBg}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${card.badgeTextColor}`}>
                        {card.topText}
                      </span>
                    </div>

                    {/* Spacer matching the circle expand button */}
                    <div className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" />
                  </div>

                  {/* Bottom: Title & Subtitle */}
                  <div className="flex flex-col mt-6">
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-white/75">
                      {card.subtitle}
                    </p>
                  </div>
                </div>

                {/* 2. Expanding Circle Overlay Layer (Hover State: Floods entire card with brand color) */}
                {/* Non-hovered: visible as a circular button at top-right with white arrow */}
                {/* Hovered: expands to 150% circle filling the card with #FF0000 or #1877F2! */}
                <div
                  style={{ backgroundColor: card.accentBg }}
                  className="circle-expand-overlay pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-7 text-white"
                >
                  {/* Top Row: White Brand Badge + White Arrow in Button */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                        {card.topText}
                      </span>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                      <ArrowUpRight className="h-6 w-6 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Bottom: White Title & Subtitle */}
                  <div className="flex flex-col mt-6">
                    <h3 className="font-heading text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs sm:text-sm font-medium leading-relaxed text-white/90">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
