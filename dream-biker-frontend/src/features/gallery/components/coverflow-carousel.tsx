"use client";

import * as React from "react";
import Image from "next/image";
import * as m from "framer-motion/m";
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
  /** Slide to start on. */
  initialIndex?: number;
  /** Called by the button on the centered card. */
  onSelectPhoto?: (item: CoverflowItem) => void;
  className?: string;
  buttonText?: string;
  /** Set false while another component handles the arrow keys. */
  keyboardEnabled?: boolean;
}

/** Above this many slides, show a "3 / 40" counter instead of dots. */
const MAX_DOTS = 12;

const SPRING = { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.9 };

export function CoverflowCarousel({
  items,
  initialIndex = 0,
  onSelectPhoto,
  className,
  buttonText = "View",
  keyboardEnabled = true,
}: CoverflowCarouselProps) {
  const total = items.length;
  const [currentIndex, setCurrentIndex] = React.useState<number>(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(total - 1, 0))
  );

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  }, [total]);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  }, [total]);

  React.useEffect(() => {
    if (!keyboardEnabled) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, keyboardEnabled]);

  if (total === 0) return null;

  return (
    <div
      className={cn(
        "relative flex w-full select-none flex-col items-center justify-center overflow-hidden py-2 sm:py-4",
        className
      )}
    >
      <div className="relative flex h-[min(460px,calc(100svh-96px))] w-full max-w-[1400px] items-center justify-center perspective-[1200px] sm:h-[min(520px,calc(100svh-96px))] lg:h-[min(580px,calc(100svh-96px))]">
        {total > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="আগের ছবি"
              className="absolute left-2 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-2xl transition-transform duration-200 ease-out hover:scale-110 active:scale-95 sm:left-6 sm:h-13 sm:w-13 lg:left-12"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.5] sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={handleNext}
              aria-label="পরের ছবি"
              className="absolute right-2 z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-2xl transition-transform duration-200 ease-out hover:scale-110 active:scale-95 sm:right-6 sm:h-13 sm:w-13 lg:right-12"
            >
              <ChevronRight className="h-5 w-5 stroke-[2.5] sm:h-6 sm:w-6" />
            </button>
          </>
        )}

        <div className="relative flex h-full w-full items-center justify-center">
          {items.map((item, index) => {
            // Circular offset relative to the centered slide
            let offset = index - currentIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            // Render the centre, its neighbours and one hidden slide each side
            // (so slides glide in instead of popping into existence)
            if (Math.abs(offset) > 2) return null;

            const isCenter = offset === 0;
            const distance = Math.abs(offset);
            const xPercent = offset === 0 ? 0 : Math.sign(offset) * (distance === 1 ? 76 : 140);

            return (
              <m.div
                key={item.id}
                onClick={() => {
                  if (offset === -1) handlePrev();
                  else if (offset === 1) handleNext();
                }}
                drag={isCenter && total > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50 || info.velocity.x < -400) handleNext();
                  else if (info.offset.x > 50 || info.velocity.x > 400) handlePrev();
                }}
                initial={false}
                animate={{
                  x: `${xPercent}%`,
                  scale: isCenter ? 1 : 0.85,
                  opacity: isCenter ? 1 : distance === 1 ? 0.65 : 0,
                  rotateY: isCenter ? 0 : offset < 0 ? 6 : -6,
                }}
                transition={SPRING}
                // zIndex must switch instantly; animating it makes cards flicker through each other
                style={{ zIndex: isCenter ? 30 : distance === 1 ? 20 : 10, transformStyle: "preserve-3d" }}
                className={cn(
                  "absolute aspect-[41/54] h-[min(400px,calc(100svh-124px))] max-w-[80vw] overflow-hidden rounded-2xl border border-white/10 bg-[#141414] shadow-[0_20px_50px_rgba(0,0,0,0.7)] will-change-transform sm:h-[min(480px,calc(100svh-124px))] sm:rounded-3xl lg:h-[min(540px,calc(100svh-124px))]",
                  isCenter ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
                  distance > 1 && "pointer-events-none"
                )}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  draggable={false}
                  fetchPriority={isCenter ? "high" : undefined}
                  loading={isCenter ? "eager" : undefined}
                  sizes="(max-width: 640px) 290px, (max-width: 1024px) 360px, 420px"
                  className="pointer-events-none object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 sm:p-7">
                  <span className="mb-1.5 text-xs font-bold uppercase tracking-[0.25em] text-white/80 sm:text-xs">
                    {item.category}
                  </span>
                  <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-snug text-white sm:text-xl lg:text-2xl">
                    {item.title}
                  </h3>

                  {isCenter && onSelectPhoto && item.sourceUrl ? (
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectPhoto(item);
                        }}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold text-black shadow-2xl transition-colors duration-200 hover:bg-[#E97835] hover:text-white sm:py-3 sm:text-sm"
                      >
                        {item.provider === "YOUTUBE" ? "ইউটিউবে দেখুন" : item.provider === "FACEBOOK" ? "ফেসবুকে দেখুন" : buttonText}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : null}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>

      {/* Position indicator */}
      {total > 1 &&
        (total <= MAX_DOTS ? (
          <div className="z-20 mt-3 flex items-center justify-center gap-2">
            {items.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`ছবি ${dotIdx + 1}`}
                className={cn(
                  "h-1.5 cursor-pointer rounded-full transition-[width,background-color] duration-300 ease-out",
                  dotIdx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        ) : (
          <div className="z-20 mt-3 font-mono text-sm font-bold text-white/70">
            {currentIndex + 1} / {total}
          </div>
        ))}
    </div>
  );
}
