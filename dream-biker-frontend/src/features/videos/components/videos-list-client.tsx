"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { FaYoutube, FaFacebookF } from "react-icons/fa";
import { Play, ExternalLink, Eye, ThumbsUp, MessageSquare, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NormalizedVideo } from "@/server/social/social.types";
import { LatestSpotlight, type SpotlightItem } from "@/components/shared/latest-spotlight";
import { cn, formatSocialUrl } from "@/lib/utils";

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

  // Data for the per-platform "latest updates" spotlights (independent of the filter tabs)
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
        {/* Latest updates, one section per platform (a platform with no videos is hidden) */}
        <LatestSpotlight
          provider="YOUTUBE"
          items={spotlightItems}
          kind="video"
          heading="ইউটিউবের সর্বশেষ"
          subheading="চ্যানেলের সাম্প্রতিক ভিডিও"
          ctaLabel="ইউটিউবে দেখুন"
        />
        <LatestSpotlight
          provider="FACEBOOK"
          items={spotlightItems}
          kind="video"
          heading="ফেসবুকের সর্বশেষ"
          subheading="পেজের সাম্প্রতিক ভিডিও ও রিলস"
          ctaLabel="ফেসবুকে দেখুন"
        />

        {/* Platform Filter Tabs */}
        <div
          className="anim-rise flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-[#EAE6DB]"
          style={{ animationDuration: "0.5s" }}
        >
          <div className="grid w-full grid-cols-3 gap-1 rounded-2xl border border-[#EAE6DB] bg-[#F7F5EF] p-1.5 sm:flex sm:w-auto sm:items-center sm:gap-2">
            {/* All */}
            <m.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPlatformFilter("all");
                setPage(1);
              }}
              className={cn(
                "flex items-center justify-center whitespace-nowrap rounded-xl px-2 py-2 text-xs font-bold sm:px-4 sm:text-sm transition-[color,background-color,border-color,box-shadow] cursor-pointer",
                platformFilter === "all"
                  ? "bg-[#142B3B] text-white shadow-sm"
                  : "text-[#222222]/80 hover:text-[#142B3B] hover:bg-white"
              )}
            >
              <span className="sm:hidden">সব ({initialVideos.length})</span>
              <span className="hidden sm:inline">সব ভিডিও ({initialVideos.length})</span>
            </m.button>

            {/* YouTube */}
            <m.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPlatformFilter("YOUTUBE");
                setPage(1);
              }}
              className={cn(
                "flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-2 py-2 text-xs font-bold sm:gap-2 sm:px-4 sm:text-sm transition-[color,background-color,border-color,box-shadow] cursor-pointer",
                platformFilter === "YOUTUBE"
                  ? "bg-[#FF0000] text-white shadow-sm"
                  : "text-[#222222]/80 hover:text-[#FF0000] hover:bg-white"
              )}
            >
              <FaYoutube className="h-4 w-4" />
              <span>ইউটিউব ({ytCount})</span>
            </m.button>

            {/* Facebook */}
            <m.button
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPlatformFilter("FACEBOOK");
                setPage(1);
              }}
              className={cn(
                "flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-2 py-2 text-xs font-bold sm:gap-2 sm:px-4 sm:text-sm transition-[color,background-color,border-color,box-shadow] cursor-pointer",
                platformFilter === "FACEBOOK"
                  ? "bg-[#1877F2] text-white shadow-sm"
                  : "text-[#222222]/80 hover:text-[#1877F2] hover:bg-white"
              )}
            >
              <FaFacebookF className="h-3.5 w-3.5" />
              <span className="sm:hidden">ফেসবুক ({fbCount})</span>
              <span className="hidden sm:inline">ফেসবুক ও রিলস ({fbCount})</span>
            </m.button>
          </div>

          <div className="text-xs text-[#777777] font-medium">
            মোট <strong>{filteredVideos.length}</strong> টি ভিডিও প্রদর্শিত হচ্ছে
          </div>
        </div>

        {filteredVideos.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#EAE6DB] bg-[#F7F5EF]/50 px-6 py-14 text-center">
            <p className="text-base font-semibold text-[#142B3B]">এখনো কোনো ভিডিও যুক্ত হয়নি।</p>
            <p className="mt-1 text-sm text-[#777777]">ইউটিউব ও ফেসবুক থেকে ভিডিও শীঘ্রই এখানে দেখা যাবে।</p>
          </div>
        )}

        {/* Videos Grid with Animated Transitions */}
        <AnimatePresence mode="wait" initial={false}>
          <m.div
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
                <m.a
                  key={video.id}
                  href={formatSocialUrl(video.url, video.provider)}
                  target="_blank"
                  rel="noopener noreferrer"
                  // CSS entrance (visible without JavaScript); framer only does the hover lift
                  style={{ animationDelay: `${(idx % itemsPerPage) * 0.05}s`, animationDuration: "0.4s" }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  whileHover={{ y: -8 }}
                  className={`anim-rise group flex flex-col overflow-hidden rounded-2xl border border-[#EAE6DB] bg-white transition-[color,background-color,border-color,box-shadow] duration-300 hover:shadow-2xl cursor-pointer ${isYT ? "hover:border-[#FF0000]/60 hover:shadow-[#FF0000]/15" : "hover:border-[#1877F2]/60 hover:shadow-[#1877F2]/15"}`}
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
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transform ${isYT ? "bg-[#FF0000]" : "bg-[#1877F2]"} group-hover:scale-110 transition-transform`}>
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

                      <h3 className={`font-heading text-base font-bold text-[#142B3B] line-clamp-2 leading-snug transition-colors ${isYT ? "group-hover:text-[#CC0000]" : "group-hover:text-[#1877F2]"}`}>
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

                      <span className={`inline-flex items-center gap-1 text-xs font-bold group-hover:underline ${isYT ? "text-[#CC0000]" : "text-[#1877F2]"}`}>
                        চালান
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </m.a>
              );
            })}
          </m.div>
        </AnimatePresence>

        {/* Load More Pagination */}
        {visibleVideos.length < filteredVideos.length && (
          <div className="anim-rise mt-10 text-center">
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-3 border-[#142B3B]/20 text-[#142B3B] hover:bg-[#142B3B] hover:text-white font-bold shadow-sm"
              >
                আরও ভিডিও লোড করুন ({filteredVideos.length - visibleVideos.length} টি বাকি)
              </Button>
            </m.div>
          </div>
        )}
      </div>
    </div>
  );
}