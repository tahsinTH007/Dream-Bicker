"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { mainNavItems } from "@/config/navigation.config";
import { socialConfig } from "@/config/social.config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          // Same position and padding in both states: only colours/shadow fade,
          // so nothing jumps when the page starts scrolling.
          "z-50 w-full border-b py-3.5 sm:py-4 transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          isHome
            ? cn(
                "fixed inset-x-0 top-0",
                isScrolled
                  ? "bg-[#0A1620]/95 shadow-lg border-white/10"
                  : "bg-transparent border-white/5"
              )
            : "sticky top-0 bg-[#0A1620] border-white/10"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* 1. Left: Brand Logo */}
          <div className="flex items-center shrink-0">
            <Logo variant="light" />
          </div>

          {/* 2. Middle: Floating Pill Navigation Capsule (Desktop: 6 exact items) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center rounded-full bg-black/55 px-2 py-1 border border-white/15 shadow-inner"
          >
            {mainNavItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200",
                    isActive
                      ? "bg-white text-gray-950 shadow-sm"
                      : "text-white/80 hover:text-white hover:bg-white/10",
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Circular Social Media Icons (Desktop: Facebook & YouTube only, Search removed!) */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {/* Facebook Circle */}
            <a
              href={socialConfig.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white shadow transition-transform hover:scale-110 active:scale-95"
            >
              <FaFacebookF className="h-3.5 w-3.5" />
            </a>

            {/* YouTube Circle */}
            <a
              href={socialConfig.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0000] text-white shadow transition-transform hover:scale-110 active:scale-95"
            >
              <FaYoutube className="h-4 w-4" />
            </a>
          </div>

          {/* 4. Mobile Actions (Clean Hamburger Toggle + Optional Tablet Socials) */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={socialConfig.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
              >
                <FaFacebookF className="h-3.5 w-3.5" />
              </a>
              <a
                href={socialConfig.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
              >
                <FaYoutube className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-white/15 active:scale-95 cursor-pointer shadow-sm"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
