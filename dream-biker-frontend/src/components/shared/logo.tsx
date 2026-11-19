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
          priority
          className="h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(233,120,53,0.35)]"
        />
      </div>

      {/* Brand Name Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "font-heading text-lg font-extrabold tracking-tight leading-tight",
                isLight ? "text-white" : "text-[#142B3B]",
              )}
            >
              ড্রিম বাইকার
            </span>
            <span className="inline-block rounded-md bg-[#E97835]/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-[#E97835]">
              হানিফ
            </span>
          </div>
          <span
            className={cn(
              "text-[10px] font-medium tracking-wider hidden sm:block",
              isLight ? "text-white/70" : "text-[#777777]",
            )}
          >
            কন্টেন্ট ক্রিয়েটর ও মানবসেবক
          </span>
        </div>
      )}
    </Link>
  );
}
