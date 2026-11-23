import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "navy";
  showText?: boolean;
}

export function Logo({ className, variant = "navy", showText = true }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-3 transition-opacity hover:opacity-95 select-none",
        className,
      )}
    >
      {/* Brand Emblem Logo Image */}
      <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/images/logo/dream_biker_emblem.png"
          alt="Dream Biker Logo"
          width={64}
          height={54}
          preload
          fetchPriority="high"
          className="h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(233,120,53,0.35)]"
        />
      </div>

      {/* Brand name only (no personal name underneath, per client request) */}
      {showText && (
        <span
          className={cn(
            "font-heading text-xl sm:text-2xl font-black tracking-tight leading-none group-hover:text-[#E97835] transition-colors text-shadow-md",
            isLight ? "text-white" : "text-[#142B3B]",
          )}
        >
          Dream Biker
        </span>
      )}
    </Link>
  );
}
