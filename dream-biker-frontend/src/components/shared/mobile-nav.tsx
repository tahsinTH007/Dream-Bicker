"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight, Heart } from "lucide-react";
import { mainNavItems } from "@/config/navigation.config";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  // Prevent background scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A1620]/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 z-[101] flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EAE6DB] px-6 py-4 bg-[#F7F5EF]/60">
          <Logo />
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#EAE6DB] bg-white text-[#142B3B] hover:bg-[#F7F5EF] active:scale-95 cursor-pointer transition-all shadow-sm"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items (6 exact routes) */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#777777] mb-3">
            মেনু নেভিগেশন
          </p>
          <nav className="flex flex-col space-y-1.5">
            {mainNavItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-[#142B3B] text-white shadow-md shadow-[#142B3B]/10"
                      : "text-[#222222] hover:bg-[#F7F5EF] hover:text-[#E97835]",
                  )}
                >
                  <span>{item.title}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isActive ? "text-[#E97835]" : "text-[#777777]/50",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Humanitarian Mission CTA Box */}
          <div className="mt-8 rounded-2xl bg-[#F7F5EF] p-5 border border-[#EAE6DB]">
            <div className="flex items-center gap-2 text-[#E97835] font-bold text-xs uppercase tracking-wider mb-2">
              <Heart className="h-4 w-4 fill-current" />
              মানবিক মিশন
            </div>
            <p className="text-xs text-[#777777] leading-relaxed mb-4">
              &quot;মানবতা শান্তির প্রতীক।&quot; ড্রিম বাইকারের সাথে যুক্ত হয়ে অসহায় মানুষের পাশে দাঁড়ান।
            </p>
            <Button
              asChild
              variant="orange"
              size="sm"
              className="w-full rounded-xl"
            >
              <Link href="/contact" onClick={onClose}>
                যোগাযোগ করুন
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer with Social Links */}
        <div className="border-t border-[#EAE6DB] px-6 py-5 bg-[#F7F5EF]/50">
          <p className="text-xs font-semibold text-[#777777] mb-3">
            হানিফের সাথে যুক্ত থাকুন
          </p>
          <SocialLinks showLabels />
        </div>
      </div>
    </div>
  );
}
