"use client";

import { MotionConfig } from "framer-motion";

/**
 * Site-wide animation settings.
 * reducedMotion="user": visitors who enable "reduce motion" in their OS get
 * transform/layout animations disabled (opacity fades are kept).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
