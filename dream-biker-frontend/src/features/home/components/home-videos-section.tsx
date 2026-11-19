"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, ExternalLink, Eye, Clock } from "lucide-react";
import { FaYoutube, FaFacebookF } from "react-icons/fa";
import { NormalizedVideo } from "@/server/social/social.types";

interface HomeVideosSectionProps {
  videos: NormalizedVideo[];
}

export function HomeVideosSection({ videos }: HomeVideosSectionProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="relative py-12 sm:py-14 bg-[#0A1620] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#E97835]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F5A623]/30 bg-[#F5A623]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#F5A623] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5A623] animate-pulse" />
              ভিডিও ও রিলস আর্কাইভ
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              সর্বশেষ ভিডিও ও ডকুমেন্টারি
            </h2>
            <p className="mt-2 text-sm sm:text-base text-white/70 max-w-xl">
              ইউটিউব ও ফেসবুক থেকে সংগৃহীত মাঠপর্যায়ের মানবিক পরিভ্রমণের সাম্প্রতিক ভিডিও পর্বসমূহ।
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-white/15 hover:border-white/50 shrink-0 self-start sm:self-auto shadow-md"
            >
              <span>সব ভিডিও দেখুন</span>
              <ArrowRight className="h-4 w-4 text-[#F5A623]" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Video Grid with Staggered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videos.slice(0, 6).map((video, idx) => {
            const isYT = video.provider === "YOUTUBE";

            return (
              <motion.a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] } }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                whileHover={{ y: -8 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0E1F2C] transition-colors duration-300 hover:shadow-2xl ${isYT ? "hover:border-[#FF0000]/70 hover:shadow-[#FF0000]/15" : "hover:border-[#1877F2]/80 hover:shadow-[#1877F2]/20"}`}
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-black/50">
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Platform Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-md bg-black/70 border border-white/20">
                    {isYT ? (
                      <>
                        <FaYoutube className="h-3.5 w-3.5 text-red-500" />
                        <span>ইউটিউব</span>
                      </>
                    ) : (
                      <>
                        <FaFacebookF className="h-3 w-3 text-blue-400" />
                        <span>ফেসবুক</span>
                      </>
                    )}
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md bg-black/80 px-2 py-0.5 text-xs font-mono text-white/90 border border-white/10">
                      <Clock className="h-3 w-3 text-[#F5A623]" />
                      <span>{video.duration}</span>
                    </div>
                  )}

                  {/* Play Button Overlay with Pulse */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transform group-hover:scale-110 transition-transform ${isYT ? "bg-[#FF0000] shadow-[#FF0000]/40" : "bg-[#1877F2] shadow-[#1877F2]/40"}`}>
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className={`font-heading text-base font-bold text-white line-clamp-2 leading-snug transition-colors ${isYT ? "group-hover:text-[#FF8080]" : "group-hover:text-[#7DB3FF]"}`}>
                      {video.title}
                    </h3>
                    <p className="mt-2 text-xs text-white/65 line-clamp-2 leading-relaxed">
                      {video.description || "ড্রিম বাইকার মাঠপর্যায়ের মানবিক উদ্যোগ ও তথ্যচিত্র।"}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs text-white/60">
                    {video.viewCount !== null && video.viewCount !== undefined ? (
                      <span className="flex items-center gap-1.5 font-medium">
                        <Eye className="h-3.5 w-3.5 text-[#F5A623]" />
                        {video.viewCount.toLocaleString()} ভিউজ
                      </span>
                    ) : (
                      <span>সরাসরি দেখুন</span>
                    )}

                    <span className={`inline-flex items-center gap-1 font-semibold text-xs group-hover:underline ${isYT ? "text-[#FF8080]" : "text-[#7DB3FF]"}`}>
                      চালান
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
