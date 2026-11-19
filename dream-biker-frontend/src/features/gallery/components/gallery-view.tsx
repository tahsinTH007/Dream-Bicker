"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  ArrowUpRight,
  MapPin,
  Camera,
} from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { NormalizedPhoto } from "@/server/social/social.types";
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

export function GalleryView({ initialPhotos }: GalleryViewProps) {
  // Filter state: "all", "facebook", "youtube"
  const [activeFilter, setActiveFilter] = React.useState<"all" | "facebook" | "youtube">("all");

  // Number of items displayed currently
  const [visibleCount, setVisibleCount] = React.useState<number>(9);
  const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);

  // Fullscreen Lightbox Carousel state: current index and slide direction
  const [carouselIndex, setCarouselIndex] = React.useState<number | null>(null);
  const [slideDirection, setSlideDirection] = React.useState<number>(0);

  // Ref for thumbnail filmstrip to auto-scroll
  const thumbnailStripRef = React.useRef<HTMLDivElement | null>(null);

  // Normalize synced social photos into gallery items (deduplicated by image URL)
  const allPhotosCombined: GalleryItem[] = React.useMemo(() => {
    const list: GalleryItem[] = [];

    initialPhotos.forEach((apiPhoto, idx) => {
      if (!list.some((item) => item.imageUrl === apiPhoto.imageUrl)) {
        list.push({
          id: `api-photo-${apiPhoto.id || idx}`,
          imageUrl: apiPhoto.imageUrl,
          location: apiPhoto.provider === "YOUTUBE" ? "YOUTUBE PUBLICATION" : "FACEBOOK POST",
          title: apiPhoto.caption?.slice(0, 40) || "ড্রিম বাইকার ফ্রেম",
          caption: apiPhoto.caption || "মাঠপর্যায়ের অভিজ্ঞতা ও সামাজিক ডায়েরি থেকে সংগৃহীত আলোকচিত্র।",
          provider: apiPhoto.provider === "YOUTUBE" ? "YOUTUBE" : "FACEBOOK",
          aspect: idx % 3 === 0 ? "aspect-[3/4]" : idx % 2 === 0 ? "aspect-[16/10]" : "aspect-[1/1]",
          publishedAt: apiPhoto.publishedAt,
          sourceUrl: apiPhoto.sourceUrl || undefined,
        });
      }
    });

    return list;
  }, [initialPhotos]);

  // Filtered array according to active tab
  const filteredList = React.useMemo(() => {
    if (activeFilter === "facebook") {
      return allPhotosCombined.filter((p) => p.provider === "FACEBOOK");
    }
    if (activeFilter === "youtube") {
      return allPhotosCombined.filter((p) => p.provider === "YOUTUBE");
    }
    return allPhotosCombined;
  }, [allPhotosCombined, activeFilter]);

  // Carousel items derived from filteredList (up to 12 items for smooth looping)
  const carouselItems: CoverflowItem[] = React.useMemo(() => {
    return filteredList.slice(0, 12).map((p) => ({
      id: `carousel-${p.id}`,
      imageUrl: p.imageUrl,
      category: p.location || (p.provider === "YOUTUBE" ? "YOUTUBE PUBLICATION" : "FIELD EXPEDITION"),
      title: p.title,
      caption: p.caption,
      location: p.location,
      provider: p.provider,
      publishedAt: p.publishedAt,
      sourceUrl: p.sourceUrl,
    }));
  }, [filteredList]);

  // Current slice of photos based on visibleCount
  const visiblePhotos = React.useMemo(() => {
    return filteredList.slice(0, visibleCount);
  }, [filteredList, visibleCount]);

  // Reset visibleCount and carousel on filter change
  const handleFilterChange = (filter: "all" | "facebook" | "youtube") => {
    setActiveFilter(filter);
    setVisibleCount(9);
    setCarouselIndex(null);
  };

  // Open Carousel at specific index
  const openCarousel = (index: number) => {
    setSlideDirection(0);
    setCarouselIndex(index);
  };

  // Carousel Navigation: Previous Photo
  const handlePrevPhoto = React.useCallback(() => {
    setSlideDirection(-1);
    setCarouselIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : filteredList.length - 1;
    });
  }, [filteredList.length]);

  // Carousel Navigation: Next Photo
  const handleNextPhoto = React.useCallback(() => {
    setSlideDirection(1);
    setCarouselIndex((prev) => {
      if (prev === null) return null;
      return prev < filteredList.length - 1 ? prev + 1 : 0;
    });
  }, [filteredList.length]);

  // Carousel Navigation: Jump to specific index from thumbnail track
  const handleJumpToPhoto = (index: number) => {
    if (carouselIndex !== null) {
      setSlideDirection(index > carouselIndex ? 1 : -1);
    }
    setCarouselIndex(index);
  };

  // Auto-scroll the active thumbnail into view
  React.useEffect(() => {
    if (carouselIndex !== null && thumbnailStripRef.current) {
      const activeThumb = thumbnailStripRef.current.children[carouselIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [carouselIndex]);

  // Keyboard navigation for Lightbox Carousel
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (carouselIndex === null) return;
      if (e.key === "Escape") setCarouselIndex(null);
      else if (e.key === "ArrowLeft") handlePrevPhoto();
      else if (e.key === "ArrowRight") handleNextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [carouselIndex, handlePrevPhoto, handleNextPhoto]);

  // Lock body scroll during fullscreen carousel
  React.useEffect(() => {
    if (carouselIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [carouselIndex]);

  // Scroll-down Infinite Loading: Sentinel observer to add photos dynamically
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore && visibleCount < filteredList.length) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 6, filteredList.length));
            setIsLoadingMore(false);
          }, 350);
        }
      },
      { rootMargin: "250px" }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [visibleCount, filteredList.length, isLoadingMore]);

  // Distribute visiblePhotos into 3 responsive columns for masonry stacking
  const column1 = visiblePhotos.filter((_, idx) => idx % 3 === 0);
  const column2 = visiblePhotos.filter((_, idx) => idx % 3 === 1);
  const column3 = visiblePhotos.filter((_, idx) => idx % 3 === 2);

  // Render individual photo card (Always in full vivid color)
  const renderCard = (photo: GalleryItem, globalIndex: number) => {
    const isYT = photo.provider === "YOUTUBE";

    return (
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, y: 35, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (globalIndex % 4) * 0.07 }}
        whileHover={{ y: -6 }}
        onClick={() => {
          const idx = filteredList.findIndex((p) => p.imageUrl === photo.imageUrl);
          openCarousel(idx >= 0 ? idx : 0);
        }}
        className={cn(
          "group relative w-full overflow-hidden bg-[#111111] cursor-pointer shadow-lg transition-all duration-500 rounded-xl",
          photo.aspect
        )}
      >
        {/* Main Image - ALWAYS IN FULL VIVID COLOR */}
        <Image
          src={photo.imageUrl}
          alt={photo.caption || photo.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-700 ease-out group-hover:scale-106"
        />

        {/* Static Bottom-Left Location Tag */}
        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
          <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {photo.location}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-6 z-20">
          {/* Top: Platform Badge & Zoom Icon */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-white bg-black/70 backdrop-blur-md border border-white/20 shadow-md">
              {isYT ? (
                <>
                  <FaYoutube className="h-3.5 w-3.5 text-red-500" />
                  <span>YOUTUBE</span>
                </>
              ) : (
                <>
                  <FaFacebookF className="h-3 w-3 text-blue-400" />
                  <span>FACEBOOK</span>
                </>
              )}
            </span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/35 transition-colors">
              <Maximize2 className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Bottom: Location, Title, & Detailed Caption */}
          <div className="space-y-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E97835]">
                {photo.location}
              </span>
            </div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-white leading-snug">
              {photo.title}
            </h3>
            <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
              {photo.caption}
            </p>
            <div className="pt-1 flex items-center gap-1 text-[11px] font-bold text-[#E97835]">
              <span>ক্লিক করে ক্যারোসেল দেখুন</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const activePhoto = carouselIndex !== null ? filteredList[carouselIndex] : null;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#E97835] selection:text-white">
      {/* =========================================================================
          TOP MINIMALIST FILTER NAVIGATION (CLEAN TABS: ALL | FACEBOOK | YOUTUBE)
         ========================================================================= */}
      <section className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 lg:px-12 py-5 sm:py-6">
        <div className="max-w-[1720px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: 3 Filter Tabs with sleek white underline */}
          <nav className="flex items-center gap-6 sm:gap-10">
            {/* 1. ALL */}
            <button
              onClick={() => handleFilterChange("all")}
              className={cn(
                "relative font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-colors pb-2 cursor-pointer",
                activeFilter === "all" ? "text-white" : "text-white/45 hover:text-white/80"
              )}
            >
              <span>ALL</span>
              {activeFilter === "all" && (
                <motion.span
                  layoutId="filterActiveLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E97835] shadow-[0_0_8px_rgba(233,120,53,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* 2. FACEBOOK */}
            <button
              onClick={() => handleFilterChange("facebook")}
              className={cn(
                "relative flex items-center gap-2 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-colors pb-2 cursor-pointer",
                activeFilter === "facebook" ? "text-white" : "text-white/45 hover:text-white/80"
              )}
            >
              <FaFacebookF className="h-3 w-3 text-blue-400" />
              <span>FACEBOOK</span>
              {activeFilter === "facebook" && (
                <motion.span
                  layoutId="filterActiveLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E97835] shadow-[0_0_8px_rgba(233,120,53,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* 3. YOUTUBE */}
            <button
              onClick={() => handleFilterChange("youtube")}
              className={cn(
                "relative flex items-center gap-2 font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-colors pb-2 cursor-pointer",
                activeFilter === "youtube" ? "text-white" : "text-white/45 hover:text-white/80"
              )}
            >
              <FaYoutube className="h-3.5 w-3.5 text-red-500" />
              <span>YOUTUBE</span>
              {activeFilter === "youtube" && (
                <motion.span
                  layoutId="filterActiveLine"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E97835] shadow-[0_0_8px_rgba(233,120,53,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </nav>

          {/* Right: Item Count */}
          <div className="flex items-center gap-3 text-xs">
            <span className="font-sans uppercase tracking-[0.2em] text-white/50 text-xs font-semibold">
              {filteredList.length} টি ছবি
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED 3D COVER FLOW CAROUSEL SLIDER
         ========================================================================= */}
      <section className="relative w-full border-b border-white/10 bg-black/40">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12">
          <CoverflowCarousel
            // Remount on filter change so the slide position starts at 0 for the new list
            key={activeFilter}
            items={carouselItems}
            // The fullscreen lightbox owns the arrow keys while it is open
            keyboardEnabled={carouselIndex === null}
            onSelectPhoto={(item) => {
              const idx = filteredList.findIndex((p) => p.imageUrl === item.imageUrl);
              openCarousel(idx >= 0 ? idx : 0);
            }}
            buttonText="ক্যারোসেলে খুলুন"
          />
        </div>
      </section>

      {/* =========================================================================
          GALLERY MASONRY GRID (Always in full vivid color)
         ========================================================================= */}
      <main className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-20">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/10">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-white/60">
            আলোকচিত্র সংগ্রহশালা
          </span>
          <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-white/40">
            স্ক্রোল করে আরও দেখুন ({Math.min(visibleCount, filteredList.length)} OF {filteredList.length})
          </span>
        </div>

        {filteredList.length === 0 && (
          <div className="py-24 text-center text-sm text-white/50">
            এই বিভাগে এখনো কোনো ছবি নেই।
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {column1.map((photo, i) => renderCard(photo, i * 3))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {column2.map((photo, i) => renderCard(photo, i * 3 + 1))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 sm:col-span-2 lg:col-span-1">
            {column3.map((photo, i) => renderCard(photo, i * 3 + 2))}
          </div>
        </div>

        {/* Infinite Scroll Sentinel */}
        <div ref={sentinelRef} className="h-20 w-full flex items-center justify-center mt-12">
          {isLoadingMore ? (
            <div className="flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-[0.25em]">
              <span className="h-2 w-2 rounded-full bg-[#E97835] animate-ping" />
              <span>লোডিং হচ্ছে...</span>
            </div>
          ) : visibleCount < filteredList.length ? (
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 6, filteredList.length))}
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-[#E97835] hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer shadow-sm"
            >
              <span>আরও {filteredList.length - visibleCount} টি ছবি লোড করুন</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 text-white/30 text-[11px] font-bold uppercase tracking-[0.25em]">
              <span className="h-px w-10 bg-white/15" />
              <span>সব ছবি প্রদর্শিত হয়েছে</span>
              <span className="h-px w-10 bg-white/15" />
            </div>
          )}
        </div>
      </main>

      {/* =========================================================================
          FULLSCREEN INTERACTIVE LIGHTBOX CAROUSEL MODAL
          - Opens when clicking any photo
          - Fluid slide transitions with swipe & drag gestures
          - Bottom filmstrip carousel track with auto-scrolling
          - Keyboard arrows & backdrop blur
         ========================================================================= */}
      <AnimatePresence>
        {carouselIndex !== null && activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-3 sm:p-6 backdrop-blur-2xl select-none overflow-hidden"
          >
            {/* 1. TOP CAROUSEL HEADER BAR */}
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-30 pb-2">
              {/* Left: Frame Counter & Platform Badge */}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold font-mono text-[#E97835] border border-white/15">
                  <Camera className="h-3.5 w-3.5" />
                  <span>{carouselIndex + 1} / {filteredList.length}</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-white bg-white/10 border border-white/15">
                  {activePhoto.provider === "YOUTUBE" ? (
                    <>
                      <FaYoutube className="h-3 w-3 text-red-500" />
                      <span>ইউটিউব</span>
                    </>
                  ) : (
                    <>
                      <FaFacebookF className="h-3 w-3 text-blue-400" />
                      <span>ফেসবুক</span>
                    </>
                  )}
                </span>
              </div>

              {/* Center: Title / Location */}
              <div className="hidden md:block text-center max-w-md truncate">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  {activePhoto.location || activePhoto.title}
                </span>
              </div>

              {/* Right: Close Button */}
              <button
                onClick={() => setCarouselIndex(null)}
                aria-label="বন্ধ করুন"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/25 hover:scale-110 active:scale-95 cursor-pointer shadow-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 2. MAIN CAROUSEL SLIDE STAGE (WITH DRAG & SWIPE GESTURES) */}
            <div className="relative flex-1 flex items-center justify-center w-full max-w-6xl mx-auto my-2 overflow-hidden">
              {/* Floating Previous Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPhoto();
                }}
                aria-label="পূর্ববর্তী ছবি"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 sm:bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-[#E97835] hover:border-[#E97835] hover:scale-110 active:scale-95 cursor-pointer shadow-2xl"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>

              {/* Floating Next Arrow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPhoto();
                }}
                aria-label="পরবর্তী ছবি"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/60 sm:bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-[#E97835] hover:border-[#E97835] hover:scale-110 active:scale-95 cursor-pointer shadow-2xl"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>

              {/* Animated Carousel Slide Frame */}
              <AnimatePresence custom={slideDirection} mode="wait">
                <motion.div
                  key={`carousel-slide-${carouselIndex}`}
                  custom={slideDirection}
                  variants={{
                    enter: (dir: number) => ({
                      x: dir > 0 ? 350 : -350,
                      opacity: 0,
                      scale: 0.94,
                    }),
                    center: {
                      x: 0,
                      opacity: 1,
                      scale: 1,
                    },
                    exit: (dir: number) => ({
                      x: dir < 0 ? 350 : -350,
                      opacity: 0,
                      scale: 0.94,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 320, damping: 32 },
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.25 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -8000 || offset.x < -90) {
                      handleNextPhoto();
                    } else if (swipe > 8000 || offset.x > 90) {
                      handlePrevPhoto();
                    }
                  }}
                  className="relative h-full max-h-[58vh] sm:max-h-[66vh] w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                >
                  <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={activePhoto.imageUrl}
                      alt={activePhoto.caption || activePhoto.title || "ড্রিম বাইকার ছবি"}
                      fill
                      priority
                      sizes="(max-width: 1200px) 95vw, 1200px"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3. CAPTION & METADATA BAR */}
            <div className="w-full max-w-6xl mx-auto rounded-xl bg-white/10 p-3 sm:p-4 text-white backdrop-blur-xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl z-20">
              <div className="text-center sm:text-left flex-1 min-w-0">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#E97835] uppercase tracking-[0.2em]">
                    <MapPin className="h-3 w-3" />
                    {activePhoto.location}
                  </span>
                  {activePhoto.publishedAt && (
                    <>
                      <span className="text-white/40">•</span>
                      <span className="text-[11px] text-white/70">
                        {new Date(activePhoto.publishedAt).toLocaleDateString("bn-BD", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </>
                  )}
                </div>
                {activePhoto.title && (
                  <h4 className="font-heading text-sm sm:text-base font-bold text-white mb-0.5 truncate">
                    {activePhoto.title}
                  </h4>
                )}
                <p className="text-xs text-white/80 line-clamp-1">
                  {activePhoto.caption}
                </p>
              </div>

              {activePhoto.sourceUrl && (
                <a
                  href={activePhoto.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:bg-[#E97835] hover:text-white hover:scale-105 shadow-md shrink-0"
                >
                  <span>মূল উৎস দেখুন</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            {/* 4. BOTTOM HORIZONTAL CAROUSEL FILMSTRIP (THUMBNAIL TRACK) */}
            <div className="w-full max-w-6xl mx-auto pt-3 z-20">
              <div
                ref={thumbnailStripRef}
                className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 px-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent scroll-smooth"
              >
                {filteredList.map((thumb, idx) => {
                  const isActive = idx === carouselIndex;

                  return (
                    <button
                      key={thumb.id}
                      onClick={() => handleJumpToPhoto(idx)}
                      className={cn(
                        "relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer",
                        isActive
                          ? "ring-2 ring-[#E97835] ring-offset-2 ring-offset-black scale-105 opacity-100 shadow-lg shadow-[#E97835]/30"
                          : "opacity-40 hover:opacity-85 hover:scale-102"
                      )}
                    >
                      <Image
                        src={thumb.imageUrl}
                        alt={`থাম্বনেইল ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}