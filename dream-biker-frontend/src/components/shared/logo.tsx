import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "navy";
}

export function Logo({ className, variant = "navy" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-3 transition-opacity hover:opacity-95 select-none",
        className,
      )}
    >
      {/* Brand Icon Badge */}
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#142B3B] text-white shadow-md transition-transform duration-300 group-hover:scale-105 border border-white/10">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-[#E97835]"
        >
          {/* Stylized Motorbike / Journey Path Icon */}
          <circle cx="5.5" cy="17.5" r="3.5" />
          <circle cx="18.5" cy="17.5" r="3.5" />
          <path d="M15 6h-3l-3 6.5h7.5" />
          <path d="M19 17.5l-3.5-7.5H12" />
          <path d="M5.5 17.5L9 10" />
          <path d="M14 6l1.5-2h3" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E97835] opacity-75"></span>
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E97835]"></span>
        </span>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "font-heading text-lg font-extrabold tracking-tight",
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
    </Link>
  );
}
