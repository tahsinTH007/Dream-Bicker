import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedContentProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Fades content up on page load with CSS (anim-rise), so it never waits for JavaScript. */
export function AnimatedContent({ children, className, delay = 0.1 }: AnimatedContentProps) {
  return (
    <div className={cn("anim-rise", className)} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
