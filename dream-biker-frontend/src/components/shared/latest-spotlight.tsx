"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, FileText, Play, type LucideIcon } from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface SpotlightItem {
  id: string;
  provider: "YOUTUBE" | "FACEBOOK";
  title: string;
  description?: string;
  imageUrl?: string;
  url: string;
  publishedAt: string;
  stats?: { icon: LucideIcon; value: string }[];
}

interface LatestSpotlightProps {
  items: SpotlightItem[];
  /** "video" shows a play button over the media. */
  kind: "video" | "post";
  heading: string;
  subheading: string;
  ctaLabel: (item: SpotlightItem) => string;
  /** How many of the newest items to feature. */
  count?: number;
  /** Auto-advance interval in ms. */
  interval?: number;
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const bnRelative = new Intl.RelativeTimeFormat("bn", { numeric: "auto" });

function timeAgo(iso: string): string {
  const seconds = Math.round((new Date(iso).getTime() - Date.now()) / 1000);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return bnRelative.format(Math.round(seconds / size), unit);
  }
  return bnRelative.format(0, "minute");
}

/**
 * Newest `count` items across both platforms, newest first. If one platform has
 * content but none of it made the cut, its newest item replaces the last slot,
 * so the spotlight always mixes Facebook and YouTube when both exist.
 */
function pickLatest(items: SpotlightItem[], count: number): SpotlightItem[] {
  const sorted = [...items].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const top = sorted.slice(0, count);
  for (const provider of ["YOUTUBE", "FACEBOOK"] as const) {
    if (top.length >= count && !top.some((i) => i.provider === provider)) {
      const newest = sorted.find((i) => i.provider === provider);
      if (newest) top[top.length - 1] = newest;
    }
  }
  return top.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

function PlatformBadge({ provider, className }: { provider: SpotlightItem["provider"]; className?: string }) {
  const isYT = provider === "YOUTUBE";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-xs font-bold text-white",
        className
      )}
    >
      {isYT ? <FaYoutube className="h-3.5 w-3.5 text-red-500" /> : <FaFacebookF className="h-3 w-3 text-blue-400" />}
      {isYT ? "ইউটিউব" : "ফেসবুক"}
    </span>
  );
}

function Media({ item, priority, sizes }: { item: SpotlightItem; priority?: boolean; sizes: string }) {
  if (!item.imageUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1E3E54] to-[#0D1C26]">
        <FileText className="h-10 w-10 text-white/40" />
      </div>
    );
  }
  return (
    <Image
      src={item.imageUrl}
      alt={item.title}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  );
}

export function LatestSpotlight({
  items,
  kind,
  heading,
  subheading,
  ctaLabel,
  count = 5,
  interval = 7000,
}: LatestSpotlightProps) {
  const latest = React.useMemo(() => pickLatest(items, count), [items, count]);
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const reduceMotion = useReducedMotion();

  const total = latest.length;
  const next = React.useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = React.useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  if (total === 0) return null;
  const current = latest[Math.min(active, total - 1)];
  const autoRotate = total > 1 && !reduceMotion;

  return (
    <section
      aria-label={heading}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className="mb-10 overflow-hidden rounded-[24px] border border-[#1E3E54] bg-[#142B3B] p-5 text-white shadow-2xl sm:p-8"
    >
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E97835]/20 px-3 py-1 text-xs font-bold text-[#FF9A5C]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E97835] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E97835]" />
            </span>
            {heading}
          </span>
          <span className="text-sm text-white/70">{subheading}</span>
        </div>

        {total > 1 && (
          <div className="flex items-center gap-2">
            <span className="mr-1 font-mono text-xs text-white/60">
              {active + 1} / {total}
            </span>
            <button
              onClick={prev}
              aria-label="আগেরটি"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors duration-200 hover:bg-white/15"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              aria-label="পরেরটি"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors duration-200 hover:bg-white/15"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Featured item */}
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <a
            href={current.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-black/60"
          >
            {/* All featured images stay stacked; the active one fades in with plain CSS.
                Swapping never waits on an exit animation (which can stall in background
                tabs), and the next images are already loaded when their turn comes. */}
            {latest.map((item, idx) => (
              <div
                key={item.id}
                aria-hidden={idx !== active}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-out",
                  idx === active ? "opacity-100" : "opacity-0"
                )}
              >
                <Media item={item} priority={idx === 0} sizes="(max-width: 1024px) 100vw, 60vw" />
              </div>
            ))}
            <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10" />

            {kind === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E97835] text-white shadow-2xl transition-transform duration-300 ease-out group-hover:scale-110">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
              </div>
            )}
            <PlatformBadge provider={current.provider} className="absolute left-4 top-4" />
          </a>
        </div>

        <div className="lg:col-span-5">
          {/* New text replaces the old immediately, then fades in (no exit to wait for) */}
          <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <p className="mb-3 text-xs font-semibold text-[#FF9A5C]">{timeAgo(current.publishedAt)}</p>
              <h2 className="line-clamp-3 text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                {current.title}
              </h2>
              {current.description && (
                <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-white/80">
                  {current.description}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                  {current.stats?.map(({ icon: Icon, value }, i) => (
                    <span key={i} className="flex items-center gap-1.5 font-semibold">
                      <Icon className="h-4 w-4 text-[#E97835]" />
                      {value}
                    </span>
                  ))}
                </div>
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E97835] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#E97835]/30 transition-[background-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#D46624]"
                >
                  {ctaLabel(current)}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
        </div>
      </div>

      {/* Suggestions: the other latest items; the active one shows a progress bar */}
      {total > 1 && (
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 sm:grid-cols-3 lg:grid-cols-5">
          {latest.map((item, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={item.id}
                onClick={() => setActive(idx)}
                aria-current={isActive}
                className={cn(
                  "group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border text-left transition-[border-color,background-color] duration-300",
                  isActive
                    ? "border-[#E97835] bg-white/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.07]"
                )}
              >
                <span className="relative block aspect-video w-full overflow-hidden">
                  <Media item={item} sizes="220px" />
                  <span className="absolute inset-0 bg-black/20" />
                  <span className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/70">
                    {item.provider === "YOUTUBE" ? (
                      <FaYoutube className="h-3.5 w-3.5 text-red-500" />
                    ) : (
                      <FaFacebookF className="h-3 w-3 text-blue-400" />
                    )}
                  </span>
                </span>
                <span className="block p-3">
                  <span className="line-clamp-2 text-sm font-semibold leading-snug text-white">{item.title}</span>
                  <span className="mt-1 block text-xs text-white/60">{timeAgo(item.publishedAt)}</span>
                </span>

                {/* progress bar drives the auto-advance (paused on hover/focus) */}
                {isActive && autoRotate && (
                  <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
                    <span
                      key={`${item.id}-${active}`}
                      className="spotlight-progress block h-full bg-[#E97835]"
                      style={{
                        animationDuration: `${interval}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                      onAnimationEnd={next}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
