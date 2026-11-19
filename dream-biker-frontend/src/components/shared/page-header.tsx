"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({
  badge,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("relative overflow-hidden bg-[#0D1C26] text-white py-10 sm:py-12 border-b border-[#1E3E54]", className)}>
      {/* Background ambient accents with subtle motion */}
      <div className="absolute inset-0 bg-[radial-gradient(#E97835_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#E97835] blur-3xl pointer-events-none will-change-[transform,opacity]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl">
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E97835]/20 border border-[#E97835]/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#E97835] mb-4 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E97835] animate-ping" />
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl font-normal"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </header>
  );
}
