"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CoverflowItem {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  caption?: string;
  location?: string;
  provider?: "FACEBOOK" | "YOUTUBE";
  publishedAt?: string;
  sourceUrl?: string;
}

interface CoverflowCarouselProps {
  items: CoverflowItem[];
  onSelectPhoto?: (item: CoverflowItem) => void;
  className?: string;
  buttonText?: string;
}

export function CoverflowCarousel({
  items,
  onSelectPhoto,
  className,
  buttonText = "View Frame",
}: CoverflowCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [direction, setDirection] = React.useState<number>(0);

  const total = items.length;

  const handlePrev = React.useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = React.useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  // Keyboard navigation when user is on page
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  if (total === 0) return null;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden py-8 sm:py-14 select-none flex flex-col items-center justify-center",
        className
      )}
    >
      {/* 3D Perspective Stage Container (matching humble-method-084621.framer.app) */}
      <div className="relative w-full max-w-[1400px] h-[460px] sm:h-[540px] lg:h-[600px] flex items-center justify-center perspective-[1200px]">
        {/* Left Arrow Button (White circular pill button with chevron '<') */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-6 lg:left-12 z-40 flex h-11 w-11 sm:h-13 sm:w-13 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-white text-black shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border border-black/10"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 stroke-[2.5]" />
        </button>

        {/* Right Arrow Button (White circular pill button with chevron '>') */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-2 sm:right-6 lg:right-12 z-40 flex h-11 w-11 sm:h-13 sm:w-13 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-white text-black shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border border-black/10"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 stroke-[2.5]" />
        </button>

        {/* Cover Flow Sliding Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            {items.map((item, index) => {
              // Calculate circular relative offset (-1: Left, 0: Center, 1: Right)
              let offset = index - currentIndex;
              if (offset > total / 2) offset -= total;
              if (offset < -total / 2) offset += total;

              // Only render visible cards in range [-2, 2]
              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              // Responsive percentage x-offset:
              // - Center: 0%
              // - Left peek: -76% (responsive relative to card width)
              // - Right peek: +76%
              // - Outer: -140% or +140%
              const xPercent = isCenter
                ? "0%"
                : isLeft
                ? "-76%"
                : isRight
                ? "76%"
                : offset < 0
                ? "-140%"
                : "140%";

              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    if (isLeft) handlePrev();
                    else if (isRight) handleNext();
                    else if (isCenter && onSelectPhoto) onSelectPhoto(item);
                  }}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -45) handleNext();
                    else if (info.offset.x > 45) handlePrev();
                  }}
                  initial={{
                    scale: isCenter ? 0.9 : 0.82,
                    opacity: 0,
                    x: xPercent,
                  }}
                  animate={{
                    scale: isCenter ? 1 : 0.85,
                    opacity: isCenter ? 1 : Math.abs(offset) === 1 ? 0.72 : 0,
                    x: xPercent,
                    zIndex: isCenter ? 25 : Math.abs(offset) === 1 ? 15 : 5,
                    rotateY: isCenter ? 0 : offset < 0 ? 4 : -4,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.75,
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                    mass: 0.8,
                  }}
                  className={cn(
                    "absolute w-[280px] sm:w-[340px] lg:w-[410px] h-[420px] sm:h-[480px] lg:h-[540px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-[#141414] border border-white/10 transition-shadow duration-300",
                    isCenter
                      ? "cursor-grab active:cursor-grabbing shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                      : "cursor-pointer hover:opacity-85"
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Photo Background */}
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    priority={isCenter}
                    sizes="(max-width: 640px) 290px, (max-width: 1024px) 360px, 420px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Overlay for Text Readability (matching screenshot) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-8">
                    {/* Category Label (e.g. CLEAN EVERYDAY STYLE / SUMMER ESSENTIAL) */}
                    <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-white/80 drop-shadow mb-1.5">
                      {item.category}
                    </span>

                    {/* Main Title (e.g. Sky Blue Summer Shirt / Relaxed Linen Shirt) */}
                    <h3 className="font-heading text-lg sm:text-2xl font-bold text-white leading-snug drop-shadow-md mb-4 line-clamp-2">
                      {item.title}
                    </h3>

                    {/* White Pill Button: [ View Product ] (on center active card) */}
                    {isCenter ? (
                      <div className="pt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectPhoto) onSelectPhoto(item);
                          }}
                          className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-2xl transition-all duration-300 hover:bg-[#E97835] hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <span>{buttonText}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-white/45 uppercase tracking-[0.2em]">
                        Click to Focus
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Dot Indicators */}
      <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 z-20">
        {items.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => {
              setDirection(dotIdx > currentIndex ? 1 : -1);
              setCurrentIndex(dotIdx);
            }}
            aria-label={`Go to slide ${dotIdx + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              dotIdx === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/30 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}
