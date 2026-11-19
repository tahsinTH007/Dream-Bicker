"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaYoutube, FaFacebookF } from "react-icons/fa";
import { Play, ExternalLink, Eye, ThumbsUp, MessageSquare, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NormalizedVideo } from "@/server/social/social.types";
import { LatestSpotlight, type SpotlightItem } from "@/components/shared/latest-spotlight";
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

  // Latest-updates spotlight: newest videos from both platforms (ignores the filter tabs)
  const spotlightItems: SpotlightItem[] = React.useMemo(
    () =>
      initialVideos.map((v) => ({
        id: v.id,
        provider: v.provider,
        title: v.title,
        description: v.description,
        imageUrl: v.thumbnailUrl,
        url: v.url,
        publishedAt: v.publishedAt,
        stats: [
          ...(v.viewCount != null ? [{ icon: Eye, value: `${v.viewCount.toLocaleString("bn-BD")} ভিউ` }] : []),
          ...(v.duration ? [{ icon: Clock, value: v.duration }] : []),
        ],
      })),
    [initialVideos]
  );

  return (
    <div className="relative py-8 sm:py-12 bg-white overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-[#E97835]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LatestSpotlight
          items={spotlightItems}
          kind="video"
          heading="সর্বশেষ আপডেট"
          subheading="ইউটিউব ও ফেসবুকের সাম্প্রতিক ভিডিও"
          ctaLabel={(item) => (item.provider === "YOUTUBE" ? "ইউটিউবে দেখুন" : "ফেসবুকে দেখুন")}
        />

        {/* Platform Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#EAE6DB]"
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
            className="mt-10 text-center"
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