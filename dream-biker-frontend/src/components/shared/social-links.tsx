"use client";

import * as React from "react";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { Mail } from "lucide-react";
import { socialConfig } from "@/config/social.config";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
}

export function SocialLinks({ className, showLabels = false }: SocialLinksProps) {
  const items = [
    {
      name: "ফেসবুক",
      url: socialConfig.facebook.url,
      icon: FaFacebookF,
      color: "bg-[#1877F2] text-white hover:bg-[#166fe5]",
    },
    {
      name: "ইউটিউব",
      url: socialConfig.youtube.url,
      icon: FaYoutube,
      color: "bg-[#FF0000] text-white hover:bg-[#e60000]",
    },
    {
      name: "ইমেইল",
      url: `mailto:${siteConfig.contact.email}`,
      icon: Mail,
      color: "bg-[#142B3B] text-white hover:bg-[#1e3e54]",
    },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className={cn(
              "flex items-center gap-2 rounded-full p-2.5 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm text-xs font-semibold",
              item.color,
              showLabels ? "px-3.5" : "h-10 w-10 justify-center"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {showLabels && <span>{item.name}</span>}
          </a>
        );
      })}
    </div>
  );
}
