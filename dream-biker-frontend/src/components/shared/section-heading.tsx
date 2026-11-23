"use client";

import * as m from "framer-motion/m";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  isDark?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
  isDark = false,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col mb-8 sm:mb-10 max-w-3xl",
        alignmentClasses[align],
        className
      )}
    >
      {label && (
        <m.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={cn(
            "inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-3",
            isDark ? "text-[#E97835]" : "text-[#E97835]"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E97835] animate-ping" />
          {label}
        </m.span>
      )}
      <m.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight",
          isDark ? "text-white" : "text-[#142B3B]"
        )}
      >
        {title}
      </m.h2>
      {description && (
        <m.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "mt-3 text-base sm:text-lg leading-relaxed",
            isDark ? "text-white/75" : "text-[#777777]"
          )}
        >
          {description}
        </m.p>
      )}
    </m.div>
  );
}
