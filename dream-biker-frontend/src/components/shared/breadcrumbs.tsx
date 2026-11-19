import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  isDark?: boolean;
}

export function Breadcrumbs({
  items,
  className,
  isDark = false,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-xs sm:text-sm", className)}
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <li className="flex items-center">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-1 transition-colors hover:text-[#E97835]",
              isDark ? "text-white/60" : "text-[#777777]"
            )}
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">হোম</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight
                className={cn(
                  "h-3.5 w-3.5 shrink-0",
                  isDark ? "text-white/40" : "text-[#777777]/50"
                )}
              />
              {isLast || !item.href ? (
                <span
                  className={cn(
                    "font-medium truncate max-w-[200px] sm:max-w-none",
                    isDark ? "text-white font-semibold" : "text-[#142B3B] font-semibold"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-[#E97835]",
                    isDark ? "text-white/70" : "text-[#777777]"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
