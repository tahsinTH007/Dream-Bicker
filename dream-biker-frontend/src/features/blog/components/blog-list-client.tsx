"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
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
import { LatestSpotlight, type SpotlightItem } from "@/components/shared/latest-spotlight";
import { formatSocialUrl } from "@/lib/utils";

interface BlogListClientProps {
  initialPosts: NormalizedPost[];
}

export function BlogListClient({ initialPosts }: BlogListClientProps) {
  const [page, setPage] = React.useState<number>(1);
  const itemsPerPage = 9;

  // The blog shows Facebook page posts only. (YouTube Community posts aren't
  // available through the YouTube API, and videos belong on the Videos page.)
  const filteredPosts = React.useMemo(
    () => initialPosts.filter((p) => p.provider === "FACEBOOK"),
    [initialPosts]
  );

  const visiblePosts = filteredPosts.slice(0, page * itemsPerPage);

  // Data for the "latest from Facebook" spotlight
  const spotlightItems: SpotlightItem[] = React.useMemo(
    () =>
      filteredPosts.map((p) => ({
        id: p.id,
        provider: p.provider,
        title: p.title || p.content.slice(0, 80),
        description: p.content,
        imageUrl: p.mediaUrls?.[0],
        url: p.url,
        publishedAt: p.publishedAt,
        stats: [
          ...(p.likeCount != null ? [{ icon: ThumbsUp, value: p.likeCount.toLocaleString("bn-BD") }] : []),
          ...(p.commentCount != null ? [{ icon: MessageSquare, value: p.commentCount.toLocaleString("bn-BD") }] : []),
          ...(p.shareCount != null ? [{ icon: Share2, value: p.shareCount.toLocaleString("bn-BD") }] : []),
        ],
      })),
    [filteredPosts]
  );

  return (
    <div className="relative py-8 sm:py-12 bg-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-24 left-1/4 h-96 w-96 rounded-full bg-[#E97835]/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Latest Facebook posts */}
        <LatestSpotlight
          provider="FACEBOOK"
          items={spotlightItems}
          kind="post"
          heading="ফেসবুকের সর্বশেষ"
          subheading="পেজের সাম্প্রতিক পোস্ট"
          ctaLabel="ফেসবুকে পড়ুন"
        />

        {/* Archive heading (single source, so no filter tabs) */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE6DB] pb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-1.5 text-sm font-bold text-white">
            <FaFacebookF className="h-3.5 w-3.5" />
            ফেসবুক পেজের সব পোস্ট
          </span>
          <span className="text-xs font-medium text-[#777777]">
            মোট <strong>{filteredPosts.length}</strong> টি পোস্ট
          </span>
        </div>

        {filteredPosts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#EAE6DB] bg-[#F7F5EF]/50 px-6 py-14 text-center">
            <p className="text-base font-semibold text-[#142B3B]">এখনো কোনো পোস্ট যুক্ত হয়নি।</p>
            <p className="mt-1 text-sm text-[#777777]">ফেসবুক পেজের পোস্ট শীঘ্রই এখানে দেখা যাবে।</p>
          </div>
        )}

        {/* Posts Grid with Animated Transitions */}
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key="blog-grid"
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
                <m.a
                  key={post.id}
                  href={formatSocialUrl(post.url, post.provider)}
                  target="_blank"
                  rel="noopener noreferrer"
                  // CSS entrance (visible without JavaScript); framer only does the hover lift
                  style={{ animationDelay: `${(idx % itemsPerPage) * 0.05}s`, animationDuration: "0.4s" }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  whileHover={{ y: -8 }}
                  className={`anim-rise group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EAE6DB] bg-white transition-[color,background-color,border-color,box-shadow] duration-300 hover:shadow-2xl cursor-pointer ${isYT ? "hover:border-[#FF0000]/60 hover:shadow-[#FF0000]/15" : "hover:border-[#1877F2]/60 hover:shadow-[#1877F2]/15"}`}
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
                              src="/images/hd/hanif_avatar_face.jpg"
                              alt="হানিফ"
                              fill
                              sizes="48px"
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

                      <h3 className={`font-heading text-lg font-bold text-[#142B3B] line-clamp-2 leading-snug transition-colors mb-3 ${isYT ? "group-hover:text-[#CC0000]" : "group-hover:text-[#1877F2]"}`}>
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

                    <span
                      className={`inline-flex items-center gap-1.5 font-bold text-[#142B3B] transition-colors ${isYT ? "group-hover:text-[#CC0000]" : "group-hover:text-[#1877F2]"}`}
                    >
                      <span>{isYT ? "ভিডিও দেখুন" : "ফেসবুকে পড়ুন"}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </m.a>
              );
            })}
          </m.div>
        </AnimatePresence>

        {/* Load More Pagination */}
        {visiblePosts.length < filteredPosts.length && (
          <div className="anim-rise mt-10 text-center">
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Button
                onClick={() => setPage((prev) => prev + 1)}
                variant="outline"
                size="lg"
                className="rounded-full px-8 py-3 border-[#142B3B]/20 text-[#142B3B] hover:bg-[#142B3B] hover:text-white font-bold shadow-sm"
              >
                আরও পোস্ট লোড করুন ({filteredPosts.length - visiblePosts.length} টি বাকি)
              </Button>
            </m.div>
          </div>
        )}
      </div>
    </div>
  );
}