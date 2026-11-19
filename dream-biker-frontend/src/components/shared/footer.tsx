"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { mainNavItems } from "@/config/navigation.config";
import { socialConfig } from "@/config/social.config";
import { siteConfig } from "@/config/site.config";

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden text-white border-t border-white/15 shadow-2xl min-h-[170px] sm:min-h-[190px] flex items-center">
      {/* 1. Full-Width Background Road Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer_bg_road.jpg"
          alt="Dream Biker Motorcycle on Scenic Highway"
          fill
          priority={false}
          quality={95}
          sizes="100vw"
          className="object-cover object-center select-none pointer-events-none"
        />

        {/* Subtle top border highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
      </div>

      {/* 2. Main Footer Bar Content (Matching the reference single-bar layout) */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 lg:gap-8">
          {/* Left Column: Brand Logo & Title */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            <Link
              href="/"
              className="group flex items-center gap-3 select-none transition-opacity hover:opacity-95"
            >
              <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo/dream_biker_emblem.png"
                  alt="Dream Biker Logo"
                  width={64}
                  height={54}
                  className="h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(233,120,53,0.35)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[#E97835] transition-colors drop-shadow">
                  Dream Biker
                </span>
                <span className="text-[11px] font-medium text-white/70 drop-shadow-sm">
                  মো. হানিফ হোসেন
                </span>
              </div>
            </Link>

            {/* Vertical Divider Line (Desktop) */}
            <div className="hidden md:block h-12 w-[1px] bg-white/25 mx-2 lg:mx-4 shrink-0" />
          </div>

          {/* Middle Column: Exactly 6 Navigation Links & Copyright Notice */}
          <div className="flex flex-col gap-2 md:flex-1 md:px-2">
            {/* Top Row: Navigation Links */}
            <nav
              aria-label="Footer Navigation"
              className="flex items-center flex-wrap gap-x-5 lg:gap-x-7 gap-y-1.5 text-sm font-semibold text-white/90 drop-shadow-sm"
            >
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-[#E97835]"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Bottom Row: Copyright Notice */}
            <p className="text-xs text-white/70 tracking-wide drop-shadow-sm">
              &copy; 2026 Dream Biker (হানিফ). সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>

          {/* Right Column: Social Media Icons (Facebook & YouTube) & Support Contact */}
          <div className="flex flex-col md:items-end gap-2 shrink-0 border-t border-white/15 pt-4 md:border-0 md:pt-0">
            {/* Top Row: Social Icons (Only Facebook & YouTube) */}
            <div className="flex items-center gap-5 text-white/85">
              <a
                href={socialConfig.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="transition-all hover:text-[#1877F2] hover:scale-115 active:scale-95 drop-shadow"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>

              <a
                href={socialConfig.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="transition-all hover:text-[#FF0000] hover:scale-115 active:scale-95 drop-shadow"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>

            {/* Bottom Row: Support Contact Link */}
            <div className="text-xs text-white/75 drop-shadow-sm">
              <span>Support: </span>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-white hover:text-[#E97835] transition-colors underline-offset-2 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
