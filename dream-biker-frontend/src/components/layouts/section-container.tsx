import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "default" | "narrow" | "wide" | "full";
  spacing?: "none" | "sm" | "default" | "lg";
}

export function SectionContainer({
  as: Component = "section",
  size = "default",
  spacing = "default",
  className,
  children,
  ...props
}: SectionContainerProps) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
    full: "max-w-full",
  };

  const spacingClasses = {
    none: "py-0",
    sm: "py-8 sm:py-12",
    default: "py-14 sm:py-20 lg:py-24",
    lg: "py-20 sm:py-28 lg:py-32",
  };

  return (
    <Component
      className={cn(
        "w-full",
        spacingClasses[spacing],
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          sizeClasses[size]
        )}
      >
        {children}
      </div>
    </Component>
  );
}
