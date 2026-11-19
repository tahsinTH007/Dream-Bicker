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
    <div
      className={cn(
        "flex flex-col mb-10 sm:mb-14 max-w-3xl",
        alignmentClasses[align],
        className
      )}
    >
      {label && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-3",
            isDark ? "text-[#E97835]" : "text-[#E97835]"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E97835]" />
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight",
          isDark ? "text-white" : "text-[#142B3B]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-base sm:text-lg leading-relaxed",
            isDark ? "text-white/75" : "text-[#777777]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
