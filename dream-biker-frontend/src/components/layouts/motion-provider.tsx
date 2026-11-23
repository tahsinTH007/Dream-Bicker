"use client";

import { LazyMotion, MotionConfig, MotionGlobalConfig } from "framer-motion";

// Components use the lightweight `m.*` (framer-motion/m); the animation engine
// arrives in its own chunk right after hydration instead of in the main bundle.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * How long after the page started loading the scripts may arrive and still
 * play the scroll-reveal animations. Must stay below the 2.5 s delay of the
 * CSS reveal fallback in globals.css.
 */
const LATE_SCRIPT_MS = 2000;

// Runs once, when this module first loads in the browser (i.e. at hydration).
if (typeof window !== "undefined") {
  if (performance.now() < LATE_SCRIPT_MS) {
    // Scripts arrived in time: switch the CSS fallback off, framer animates as usual.
    document.documentElement.setAttribute("data-motion-ready", "");
  } else {
    // Slow connection: the CSS fallback has already shown (or is about to show)
    // the content. Skip reveal animations so nothing is hidden again.
    MotionGlobalConfig.skipAnimations = true;
  }
}

/**
 * Site-wide animation settings.
 * reducedMotion="user": visitors who enable "reduce motion" in their OS get
 * transform/layout animations disabled (opacity fades are kept).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    // strict: a full `motion.*` component anywhere would throw, keeping the bundle lean
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
