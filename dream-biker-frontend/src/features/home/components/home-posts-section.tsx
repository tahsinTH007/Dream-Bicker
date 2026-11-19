"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, ThumbsUp, MessageSquare, Calendar } from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { NormalizedPost } from "@/server/social/social.types";

interface HomePostsSectionProps {
  posts: NormalizedPost[];
}

export function HomePostsSection({ posts }: HomePostsSectionProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative py-12 sm:py-14 bg-white text-[#222222] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 h-96 w-96 rounded-full bg-[#E97835]/5 blur-3xl pointer-events-none -translate-y-1/2" />

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
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E97835]/30 bg-[#FDF3ED] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#E97835] mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E97835] animate-pulse" />
              ব্লগ ও সোশ্যাল ডায়েরি
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#142B3B] tracking-tight">
              সাম্প্রতিক পোস্ট ও মানবিক ভাবনা
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-xl">
              ফেসবুক ও সোশ্যাল মিডিয়ায় প্রকাশিত তৃণমূল মানুষের সাথে ঘটে যাওয়া অভিজ্ঞতা ও ডায়েরি।
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[#142B3B]/15 bg-[#F7F5EF] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#142B3B] transition-all hover:bg-[#142B3B] hover:text-white shrink-0 self-start sm:self-auto shadow-sm"
            >
              <span>সব ব্লগ পড়ুন</span>
              <ArrowRight className="h-4 w-4 text-[#E97835]" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Posts Grid with Staggered Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.slice(0, 3).map((post, idx) => {
            const isFB = post.provider === "FACEBOOK";
            const hasMedia = post.mediaUrls && post.mediaUrls.length > 0;

            const formattedDate = new Date(post.publishedAt).toLocaleDateString("bn-BD", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });

            return (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] } }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
                whileHover={{ y: -8 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EAE6DB] bg-white transition-[color,background-color,border-color,box-shadow] duration-300 hover:shadow-2xl ${isFB ? "hover:border-[#1877F2]/60 hover:shadow-[#1877F2]/15" : "hover:border-[#FF0000]/60 hover:shadow-[#FF0000]/15"}`}
              >
                <div>
                  {/* Optional Media Preview */}
                  {hasMedia && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F7F5EF]">
                      <Image
                        src={post.mediaUrls[0]}
                        alt={post.title || "পোস্ট ছবি"}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-106"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow bg-black/70 border border-white/20">
                        {isFB ? (
                          <>
                            <FaFacebookF className="h-3 w-3 text-blue-400" />
                            <span>ফেসবুক আপডেট</span>
                          </>
                        ) : (
                          <>
                            <FaYoutube className="h-3.5 w-3.5 text-red-500" />
                            <span>ইউটিউব পাবলিকেশন</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#777777] mb-3">
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
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#E97835]" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    <h3 className={`font-heading text-lg font-bold text-[#142B3B] line-clamp-2 leading-snug transition-colors mb-3 ${isFB ? "group-hover:text-[#1877F2]" : "group-hover:text-[#CC0000]"}`}>
                      {post.title || post.content.slice(0, 75)}
                    </h3>

                    <p className="text-sm text-[#222222]/75 line-clamp-3 leading-relaxed">
                      {post.content}
                    </p>
                  </div>
                </div>

                {/* Footer Reactions & Link */}
                <div className="flex items-center justify-between border-t border-[#EAE6DB] px-6 py-4 bg-[#F7F5EF]/40 text-xs text-[#777777]">
                  <div className="flex items-center gap-4">
                    {post.likeCount !== null && post.likeCount !== undefined && (
                      <span className="flex items-center gap-1">
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
                  </div>

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 font-semibold text-[#142B3B] transition-colors ${isFB ? "group-hover:text-[#1877F2]" : "group-hover:text-[#CC0000]"}`}
                  >
                    <span>মূল পোস্ট</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
