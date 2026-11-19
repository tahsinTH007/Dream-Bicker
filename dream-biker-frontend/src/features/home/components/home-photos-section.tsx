"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { NormalizedPhoto } from "@/server/social/social.types";

interface HomePhotosSectionProps {
  photos: NormalizedPhoto[];
}

export function HomePhotosSection({ photos }: HomePhotosSectionProps) {
  if (!photos || photos.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-24 bg-[#F7F5EF] text-[#222222] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#142B3B]/15 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#142B3B] mb-3 shadow-xs">
              <Camera className="h-3.5 w-3.5 text-[#E97835]" />
              আলোকচিত্র গ্যালারি
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#142B3B] tracking-tight">
              সোশ্যাল মিডিয়া থেকে সাম্প্রতিক ছবি
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#777777] max-w-xl">
              বিভিন্ন প্রত্যন্ত গ্রাম, চরাঞ্চল ও মানুষের সাথে কাটানো মুহূর্তগুলোর চিত্রমালা।
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-[#142B3B]/15 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#142B3B] transition-all hover:bg-[#142B3B] hover:text-white shrink-0 self-start sm:self-auto shadow-sm"
            >
              <span>সম্পূর্ণ গ্যালারি দেখুন</span>
              <ArrowRight className="h-4 w-4 text-[#E97835]" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Photos Grid with Staggered Framer Motion */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {photos.slice(0, 8).map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] } }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href="/gallery"
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-[#EAE6DB] border border-[#EAE6DB] shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.caption || "ড্রিম বাইকার ছবি"}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                  <span className="text-xs text-white font-medium line-clamp-2 leading-snug">
                    {photo.caption}
                  </span>
                  <span className="mt-1 text-xs text-[#F5A623] uppercase font-bold tracking-wider">
                    {photo.provider === "YOUTUBE" ? "ইউটিউব" : "ফেসবুক"}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
