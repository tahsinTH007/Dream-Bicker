"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { NormalizedPhoto } from "@/server/social/social.types";
import { PageHeader } from "@/components/shared/page-header";
import { CoverflowCarousel, CoverflowItem } from "./coverflow-carousel";
import { cn } from "@/lib/utils";

interface GalleryViewProps {
  initialPhotos: NormalizedPhoto[];
}

interface GalleryItem {
  id: string;
  imageUrl: string;
  location: string;
  title: string;
  caption: string;
  provider: "FACEBOOK" | "YOUTUBE";
  aspect: string;
  publishedAt: string;
  sourceUrl?: string;
}

type Filter = "all" | "facebook" | "youtube";

const PAGE_SIZE = 9;
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ASPECTS = ["aspect-[3/4]", "aspect-[4/3]", "aspect-square", "aspect-[16/10]", "aspect-[4/5]"];

/** Number of masonry columns for the current viewport (1 / 2 / 3). */
function useColumnCount(): number {
  const [count, setCount] = React.useState(3);
  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCount(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

export function GalleryView({ initialPhotos }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = React.useState<Filter>("all");
  const [visibleCount, setVisibleCount] = React.useState<number>(PAGE_SIZE);
  // Index (in filteredList) of the photo the carousel opens on; null = closed
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const columnCount = useColumnCount();

  // Synced social photos, deduplicated by image URL
  const allPhotos: GalleryItem[] = React.useMemo(() => {
    const seen = new Set<string>();
    const list: GalleryItem[] = [];
    initialPhotos.forEach((photo, idx) => {
      if (seen.has(photo.imageUrl)) return;
      seen.add(photo.imageUrl);
      const isYT = photo.provider === "YOUTUBE";
      list.push({
        id: photo.id || `photo-${idx}`,
        imageUrl: photo.imageUrl,
        location: isYT ? "YOUTUBE" : "FACEBOOK",
        title: photo.caption?.slice(0, 60) || "ড্রিম বাইকার ফ্রেম",
        caption: photo.caption || "মাঠপর্যায়ের অভিজ্ঞতা ও সামাজিক ডায়েরি থেকে সংগৃহীত আলোকচিত্র।",
        provider: isYT ? "YOUTUBE" : "FACEBOOK",
        aspect: ASPECTS[idx % ASPECTS.length],
        publishedAt: photo.publishedAt,
        sourceUrl: photo.sourceUrl || undefined,
      });
    });
    return list;
  }, [initialPhotos]);

  const filteredList = React.useMemo(() => {
    if (activeFilter === "facebook") return allPhotos.filter((p) => p.provider === "FACEBOOK");
    if (activeFilter === "youtube") return allPhotos.filter((p) => p.provider === "YOUTUBE");
    return allPhotos;
  }, [allPhotos, activeFilter]);

  const fbCount = allPhotos.filter((p) => p.provider === "FACEBOOK").length;
  const ytCount = allPhotos.length - fbCount;

  const carouselItems: CoverflowItem[] = React.useMemo(
    () =>
      filteredList.map((p) => ({
        id: `carousel-${p.id}`,
        imageUrl: p.imageUrl,
        category: p.provider === "YOUTUBE" ? "YOUTUBE" : "FACEBOOK",
        title: p.title,
        caption: p.caption,
        provider: p.provider,
        publishedAt: p.publishedAt,
        sourceUrl: p.sourceUrl,
      })),
    [filteredList]
  );

  const visiblePhotos = filteredList.slice(0, visibleCount);

  // Stable masonry: item i always lives in column i % columnCount, so loading
  // more photos only appends to the bottom and never reshuffles what is visible.
  const columns = React.useMemo(() => {
    const cols: { photo: GalleryItem; index: number }[][] = Array.from(
      { length: columnCount },
      () => []
    );
    visiblePhotos.forEach((photo, index) => cols[index % columnCount].push({ photo, index }));
    return cols;
  }, [visiblePhotos, columnCount]);

  const handleFilterChange = (filter: Filter) => {
    setActiveFilter(filter);
    setVisibleCount(PAGE_SIZE);
    setOpenIndex(null);
  };

  // Infinite scroll: reveal the next batch when the sentinel nears the viewport
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visibleCount >= filteredList.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredList.length));
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount, filteredList.length]);

  // Carousel modal: Escape closes, page scroll is locked while open
  React.useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  const filterTabs: { key: Filter; label: string; count: number; icon?: React.ReactNode }[] = [
    { key: "all", label: "সব ছবি", count: allPhotos.length },
    {
      key: "facebook",
      label: "ফেসবুক",
      count: fbCount,
      icon: <FaFacebookF className="h-3 w-3 text-blue-400" />,
    },
    {
      key: "youtube",
      label: "ইউটিউব",
      count: ytCount,
      icon: <FaYoutube className="h-3.5 w-3.5 text-red-500" />,
    },
  ];

  return (
    <>
      <PageHeader
        badge="আলোকচিত্র সংগ্রহশালা"
        title="মাঠপর্যায়ের মুহূর্ত ও ফটোগ্যালারি"
        description="ফেসবুক পোস্ট ও ইউটিউব ভিডিও থেকে সংগৃহীত বাংলাদেশের প্রত্যন্ত অঞ্চলের মানবিক কার্যক্রম ও পরিভ্রমণের ছবি।"
        breadcrumbs={[{ label: "গ্যালারি" }]}
      />

      <div className="min-h-[60vh] bg-[#0A1620] text-white">
        <div className="mx-auto max-w-[1600px] px-4 pb-20 pt-10 sm:px-6 lg:px-10">
          {/* Filter tabs */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <nav className="flex items-center gap-6 sm:gap-9" aria-label="Gallery filter">
              {filterTabs.map((tab) => {
                const isActive = activeFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => handleFilterChange(tab.key)}
                    className={cn(
                      "relative flex cursor-pointer items-center gap-2 pb-2 text-sm font-bold transition-colors duration-200",
                      isActive ? "text-white" : "text-white/50 hover:text-white/80"
                    )}
                  >
                    {tab.icon}
                    <span>
                      {tab.label} ({tab.count})
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="galleryFilterLine"
                        className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-[#E97835]"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
            <span className="text-xs font-semibold text-white/50">
              ছবিতে ক্লিক করে ক্যারোসেলে দেখুন
            </span>
          </div>

          {filteredList.length === 0 ? (
            <div className="py-24 text-center text-sm text-white/50">এই বিভাগে এখনো কোনো ছবি নেই।</div>
          ) : (
            <div
              key={activeFilter}
              className="grid items-start gap-4 sm:gap-5 lg:gap-6"
              style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
            >
              {columns.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
                  {col.map(({ photo, index }) => (
                    <GalleryCard
                      key={photo.id}
                      photo={photo}
                      // Stagger only within the newly revealed batch
                      delay={(index % PAGE_SIZE) * 0.05}
                      onOpen={() => setOpenIndex(index)}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} className="mt-12 flex h-16 items-center justify-center">
            {visibleCount < filteredList.length ? (
              <button
                onClick={() =>
                  setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredList.length))
                }
                className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-bold transition-colors duration-200 hover:bg-[#E97835]"
              >
                আরও {filteredList.length - visibleCount} টি ছবি লোড করুন
              </button>
            ) : (
              filteredList.length > 0 && (
                <span className="text-[11px] font-bold tracking-wider text-white/30">
                  সব ছবি প্রদর্শিত হয়েছে
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Coverflow carousel modal, opened by clicking a photo */}
      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            key="gallery-carousel"
            role="dialog"
            aria-modal="true"
            aria-label="ছবির ক্যারোসেল"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[110] flex flex-col bg-black/90 backdrop-blur-xl"
            onClick={() => setOpenIndex(null)}
          >
            <div className="flex items-center justify-end p-4 sm:p-6">
              <button
                onClick={() => setOpenIndex(null)}
                aria-label="বন্ধ করুন"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/25"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="flex flex-1 items-center justify-center px-2 pb-6"
              onClick={(e) => e.stopPropagation()}
            >
              <CoverflowCarousel
                items={carouselItems}
                initialIndex={openIndex}
                buttonText="মূল পোস্ট দেখুন"
                onSelectPhoto={(item) => {
                  if (item.sourceUrl) window.open(item.sourceUrl, "_blank", "noopener,noreferrer");
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface GalleryCardProps {
  photo: GalleryItem;
  delay: number;
  onOpen: () => void;
}

function GalleryCard({ photo, delay, onOpen }: GalleryCardProps) {
  const isYT = photo.provider === "YOUTUBE";

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      onClick={onOpen}
      className={cn(
        // Only CSS-transition properties framer-motion does NOT animate, so the two never fight
        "group relative block w-full cursor-pointer overflow-hidden rounded-xl bg-[#111] text-left shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/50",
        photo.aspect
      )}
    >
      <Image
        src={photo.imageUrl}
        alt={photo.caption || photo.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/30 to-black/10 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white">
            {isYT ? (
              <FaYoutube className="h-3.5 w-3.5 text-red-500" />
            ) : (
              <FaFacebookF className="h-3 w-3 text-blue-400" />
            )}
            {isYT ? "YOUTUBE" : "FACEBOOK"}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
            <Maximize2 className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="translate-y-2 space-y-1.5 transition-transform duration-300 ease-out group-hover:translate-y-0">
          <span className="line-clamp-2 block text-sm font-bold leading-snug text-white sm:text-base">
            {photo.title}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-[#E97835]">
            ক্যারোসেলে দেখুন
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
