"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ThumbsUp,
  MessageSquare,
  Share2,
  Calendar,
  FileText,
  Camera,
  Video,
  Link2,
} from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { NormalizedPost } from "@/server/social/social.types";
import { cn } from "@/lib/utils";

interface BlogListClientProps {
  initialPosts: NormalizedPost[];
}

export function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [platformFilter, setPlatformFilter] = React.useState<"all" | "FACEBOOK" | "YOUTUBE">("all");
  const [page, setPage] = React.useState<number>(1);
  const itemsPerPage = 9;

  const filteredPosts = React.useMemo(() => {
    return initialPosts.filter((p) => {
      if (platformFilter === "all") return true;
      return p.provider === platformFilter;
    });
  }, [initialPosts, platformFilter]);

  const visiblePosts = filteredPosts.slice(0, page * itemsPerPage);

  const fbCount = initialPosts.filter((p) => p.provider === "FACEBOOK").length;
  const ytCount = initialPosts.filter((p) => p.provider === "YOUTUBE").length;

  return (
    <div className="relative py-12 sm:py-20 bg-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-24 left-1/4 h-96 w-96 rounded-full bg-[#E97835]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filters */}
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
              সব পোস্ট ({initialPosts.length})
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
              <span>ফেসবুক পেজ পোস্ট ({fbCount})</span>
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
              <span>ইউটিউব পাবলিকেশন ({ytCount})</span>
            </motion.button>
          </div>

          <div className="text-xs text-[#777777] font-medium">
            মোট <strong>{filteredPosts.length}</strong> টি পোস্ট
          </div>
        </motion.div>

        {/* Posts Grid with Animated Transitions */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`blog-grid-${platformFilter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {visiblePosts.map((post, idx) => {
              const isFB = post.provider === "FACEBOOK";
              const isYT = post.provider === "YOUTUBE";
              const hasMedia = post.mediaUrls && post.mediaUrls.length > 0;

              const formattedDate = new Date(post.publishedAt).toLocaleDateString("bn-BD", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              // Post type label and icon
              let typeLabel = "টেক্সট পোস্ট";
              let TypeIcon = FileText;
              if (isYT) {
                typeLabel = "ইউটিউব ভিডিও পাবলিকেশন";
                TypeIcon = Video;
              } else if (post.postType === "PHOTO") {
                typeLabel = "ছবি সহ পোস্ট";
                TypeIcon = Camera;
              } else if (post.postType === "LINK") {
                typeLabel = "লিংক পোস্ট";
                TypeIcon = Link2;
              }

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: (idx % itemsPerPage) * 0.05, ease: [0.16, 1, 0.3, 1] } }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  whileHover={{ y: -8 }}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EAE6DB] bg-white transition-[color,background-color,border-color,box-shadow] duration-300 hover:shadow-2xl hover:border-[#E97835]/40"
                >
                  <div>
                    {/* Media Preview (Photo / YouTube Thumbnail) */}
                    {hasMedia && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F7F5EF]">
                        <Image
                          src={post.mediaUrls[0]}
                          alt={post.title || "পোস্টের ছবি"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Platform & Type Badge */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow bg-black/75 border border-white/20">
                          {isFB ? (
                            <>
                              <FaFacebookF className="h-3 w-3 text-blue-400" />
                              <span>{typeLabel}</span>
                            </>
                          ) : (
                            <>
                              <FaYoutube className="h-3.5 w-3.5 text-red-500" />
                              <span>{typeLabel}</span>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Body Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-[#777777] mb-3">
                        <div className="flex items-center gap-2">
                          <div className="relative h-6 w-6 rounded-full overflow-hidden border border-[#E97835]/40 shrink-0">
                            <Image
                              src="/images/author/hanif_avatar.png"
                              alt="হানিফ"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-semibold text-[#142B3B]">হানিফ</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-[#E97835]" />
                            {formattedDate}
                          </span>

                          {!hasMedia && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-[#F7F5EF] px-2 py-0.5 text-xs font-bold text-[#142B3B]">
                              <TypeIcon className="h-3 w-3" />
                              {typeLabel}
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-[#142B3B] line-clamp-2 leading-snug group-hover:text-[#E97835] transition-colors mb-3">
                        {post.title || post.content.slice(0, 80)}
                      </h3>

                      <p className="text-sm text-[#222222]/80 line-clamp-4 leading-relaxed whitespace-pre-line">
                        {post.content}
                      </p>
                    </div>
                  </div>

                  {/* Footer Reactions & Outbound Link */}
                  <div className="flex items-center justify-between border-t border-[#EAE6DB] px-6 py-4 bg-[#F7F5EF]/30 text-xs text-[#777777]">
                    <div className="flex items-center gap-4">
                      {post.likeCount !== null && post.likeCount !== undefined && (
                        <span className="flex items-center gap-1 font-semibold text-[#142B3B]">
                          <ThumbsUp className="h-3.5 w-3.5 text-[#E97835]" />
                          {post.likeCount.toLocaleString()}
                        </span>
                      )}
                      {post.commentCount !== null && post.commentCount !== undefined && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" />
                          {post.commentCount.toLocaleString()}
                        </span>
                      )}
                      {post.shareCount !== null && post.shareCount !== undefined && (
                        <span className="flex items-center gap-1">
                          <Share2 className="h-3.5 w-3.5" />
                          {post.shareCount.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-[#142B3B] group-hover:text-[#E97835] transition-colors"
                    >
                      <span>{isYT ? "ভিডিও দেখুন" : "ফেসবুকে পড়ুন"}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Load More Pagination */}
        {visiblePosts.length < filteredPosts.length && (
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
                আরও পোস্ট লোড করুন ({filteredPosts.length - visiblePosts.length} টি বাকি)
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}