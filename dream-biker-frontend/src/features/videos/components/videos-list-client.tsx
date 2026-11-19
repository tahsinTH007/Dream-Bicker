"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaYoutube, FaFacebookF } from "react-icons/fa";
import { Play, ExternalLink, Eye, ThumbsUp, MessageSquare, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NormalizedVideo } from "@/server/social/social.types";
import { cn } from "@/lib/utils";

interface VideosListClientProps {
  initialVideos: NormalizedVideo[];
}

export function VideosListClient({ initialVideos }: VideosListClientProps) {
  const [platformFilter, setPlatformFilter] = React.useState<"all" | "YOUTUBE" | "FACEBOOK">("all");
  const [page, setPage] = React.useState<number>(1);
  const itemsPerPage = 9;

  const filteredVideos = React.useMemo(() => {
    return initialVideos.filter((v) => {
      if (platformFilter === "all") return true;
      return v.provider === platformFilter;
    });
  }, [initialVideos, platformFilter]);

  const visibleVideos = filteredVideos.slice(0, page * itemsPerPage);

  const ytCount = initialVideos.filter((v) => v.provider === "YOUTUBE").length;
  const fbCount = initialVideos.filter((v) => v.provider === "FACEBOOK").length;

  const featuredVideo = filteredVideos[0];

  return (
    <div className="relative py-12 sm:py-20 bg-white overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-[#E97835]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Platform Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-10 border-b border-[#EAE6DB]"
        >
          <div className="flex items-center gap-2 rounded-2xl bg-[#F7F5EF] p-1.5 border border-[#EAE6DB]">
            {/* All */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPlatformFilter("all");
                setPage(1);
              }}
              className={cn(
                "rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-[color,background-color,border-color,box-shadow] cursor-pointer",
                platformFilter === "all"
                  ? "bg-[#142B3B] text-white shadow-sm"
                  : "text-[#222222]/80 hover:text-[#142B3B] hover:bg-white"
              )}
            >
              সব ভিডিও ({initialVideos.length})
            </motion.button>

            {/* YouTube */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPlatformFilter("YOUTUBE");
                setPage(1);
              }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-[color,background-color,border-color,box-shadow] cursor-pointer",
                platformFilter === "YOUTUBE"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-[#222222]/80 hover:text-red-600 hover:bg-white"
              )}
            >
              <FaYoutube className="h-4 w-4" />
              <span>ইউটিউব ({ytCount})</span>
            </motion.button>

            {/* Facebook */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPlatformFilter("FACEBOOK");
                setPage(1);
              }}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-[color,background-color,border-color,box-shadow] cursor-pointer",
                platformFilter === "FACEBOOK"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-[#222222]/80 hover:text-blue-600 hover:bg-white"
              )}
            >
              <FaFacebookF className="h-3.5 w-3.5" />
              <span>ফেসবুক ও রিলস ({fbCount})</span>
            </motion.button>
          </div>

          <div className="text-xs text-[#777777] font-medium">
            মোট <strong>{filteredVideos.length}</strong> টি ভিডিও প্রদর্শিত হচ্ছে
          </div>
        </motion.div>

        {/* Featured Video Spotlight */}
        {featuredVideo && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 rounded-[24px] bg-[#142B3B] p-6 sm:p-10 text-white shadow-2xl border border-[#1E3E54] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Media */}
              <div className="lg:col-span-7">
                <a
                  href={featuredVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-black/60 block"
                >
                  <Image
                    src={featuredVideo.thumbnailUrl}
                    alt={featuredVideo.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E97835] text-white shadow-2xl"
                    >
                      <Play className="h-7 w-7 fill-current ml-1" />
                    </motion.div>
                  </div>

                  {/* Platform badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold bg-black/70 border border-white/20">
                    {featuredVideo.provider === "YOUTUBE" ? (
                      <>
                        <FaYoutube className="h-4 w-4 text-red-500" />
                        <span>ইউটিউব ডকুমেন্টারি</span>
                      </>
                    ) : (
                      <>
                        <FaFacebookF className="h-3.5 w-3.5 text-blue-400" />
                        <span>ফেসবুক স্পেশাল</span>
                      </>
                    )}
                  </div>
                </a>
              </div>

              {/* Info */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-[#E97835]/20 px-2.5 py-1 text-xs font-bold text-[#E97835] uppercase tracking-wider mb-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E97835] animate-ping" />
                    ফিচার্ড ভিডিও
                  </span>

                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {featuredVideo.title}
                  </h2>

                  <p className="mt-4 text-sm text-white/75 leading-relaxed line-clamp-4">
                    {featuredVideo.description ||
                      "ড্রিম বাইকারের পরিভ্রমণ থেকে সংগৃহীত বিশেষ মানবিক ডকুমেন্টারি পর্ব।"}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-white/70">
                    {featuredVideo.viewCount && (
                      <span className="flex items-center gap-1.5 font-semibold">
                        <Eye className="h-4 w-4 text-[#E97835]" />
                        {featuredVideo.viewCount.toLocaleString()} ভিউজ
                      </span>
                    )}
                    {featuredVideo.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-white/50" />
                        {featuredVideo.duration}
                      </span>
                    )}
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    href={featuredVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#E97835] px-6 py-2.5 text-xs font-bold text-white transition-[color,background-color,border-color,box-shadow] hover:bg-[#D46624] shadow-lg shadow-[#E97835]/30"
                  >
                    <span>সরাসরি দেখুন</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Videos Grid with Animated Transitions */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`grid-${platformFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {visibleVideos.map((video, idx) => {
              const isYT = video.provider === "YOUTUBE";
              const formattedDate = new Date(video.publishedAt).toLocaleDateString("bn-BD", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <motion.a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: (idx % itemsPerPage) * 0.05, ease: [0.16, 1, 0.3, 1] } }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  whileHover={{ y: -8 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#EAE6DB] bg-white transition-[color,background-color,border-color,box-shadow] duration-300 hover:border-[#E97835]/50 hover:shadow-2xl cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    {/* Platform Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow bg-black/70 border border-white/20">
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
                        <Clock className="h-3 w-3 text-[#E97835]" />
                        <span>{video.duration}</span>
                      </div>
                    )}

                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E97835] text-white shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#777777] mb-2.5">
                        <Calendar className="h-3.5 w-3.5 text-[#E97835]" />
                        <span>{formattedDate}</span>
                      </div>

                      <h3 className="font-heading text-base font-bold text-[#142B3B] line-clamp-2 leading-snug group-hover:text-[#E97835] transition-colors">
                        {video.title}
                      </h3>

                      <p className="mt-2 text-xs text-[#222222]/70 line-clamp-2 leading-relaxed">
                        {video.description || "ড্রিম বাইকার মাঠপর্যায়ের মানবিক উদ্যোগ ও তথ্যচিত্র।"}
                      </p>
                    </div>

                    {/* Metrics Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-[#EAE6DB] pt-3.5 text-xs text-[#777777]">
                      <div className="flex items-center gap-3">
                        {video.viewCount !== null && video.viewCount !== undefined && (
                          <span className="flex items-center gap-1 font-semibold text-[#142B3B]">
                            <Eye className="h-3.5 w-3.5 text-[#E97835]" />
                            {video.viewCount.toLocaleString()}
                          </span>
                        )}
                        {video.likeCount !== null && video.likeCount !== undefined && (
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            {video.likeCount.toLocaleString()}
                          </span>
                        )}
                        {video.commentCount !== null && video.commentCount !== undefined && (
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3.5 w-3.5" />
                            {video.commentCount.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E97835] group-hover:underline">
                        চালান
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Load More Pagination */}
        {visibleVideos.length < filteredVideos.length && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-3 border-[#142B3B]/20 text-[#142B3B] hover:bg-[#142B3B] hover:text-white font-bold shadow-sm"
              >
                আরও ভিডিও লোড করুন ({filteredVideos.length - visibleVideos.length} টি বাকি)
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}