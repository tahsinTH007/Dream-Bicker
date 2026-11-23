import { cn } from "@/lib/utils";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Dark title banner at the top of inner pages.
 * Server component with CSS entrance animations (anim-* in globals.css): the
 * title is visible as soon as the HTML arrives, no JavaScript needed.
 */
export function PageHeader({ badge, title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("relative overflow-hidden bg-[#0D1C26] text-white py-10 sm:py-12 border-b border-[#1E3E54]", className)}>
      {/* Background ambient accents with subtle motion */}
      <div className="absolute inset-0 bg-[radial-gradient(#E97835_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="anim-breathe absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#E97835] opacity-10 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {badge && (
            <div className="anim-pop" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E97835]/20 border border-[#E97835]/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#E97835] mb-4 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E97835] animate-ping" />
                {badge}
              </span>
            </div>
          )}

          <h1
            className="anim-rise font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white"
            style={{ animationDelay: "0.2s", animationDuration: "0.7s" }}
          >
            {title}
          </h1>

          {description && (
            <p
              className="anim-rise mt-4 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl font-normal"
              style={{ animationDelay: "0.35s", animationDuration: "0.7s" }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
