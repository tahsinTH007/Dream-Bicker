"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const bnNumber = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 });

interface CountUpProps {
  /** Final number. */
  to: number;
  /** Text after the number, e.g. " লাখ+" or "%". */
  suffix?: string;
  /** Seconds. */
  duration?: number;
  /** Seconds to wait after the number scrolls into view. */
  delay?: number;
  className?: string;
}

/**
 * Counts from 0 up to `to` (Bengali digits) the first time it scrolls into view.
 *
 * - Writes straight to the DOM each frame, so React doesn't re-render 60×/s.
 * - The final value is rendered on the server and kept as an invisible copy
 *   underneath, reserving its width so the line never shifts while counting.
 * - Visitors with "reduce motion" enabled just see the final number.
 */
export function CountUp({ to, suffix = "", duration = 2, delay = 0, className }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const finalText = bnNumber.format(to) + suffix;

  // Reset to 0 as soon as we're on the client (the stats fade in, so this is never seen)
  React.useEffect(() => {
    if (!reduceMotion && ref.current) ref.current.textContent = bnNumber.format(0) + suffix;
  }, [reduceMotion, suffix]);

  React.useEffect(() => {
    if (!inView || reduceMotion || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // fast start, gentle landing
      onUpdate: (latest) => {
        node.textContent = bnNumber.format(Math.round(latest)) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, suffix, duration, delay]);

  return (
    <span className={`inline-grid ${className ?? ""}`}>
      <span aria-hidden="true" className="invisible [grid-area:1/1]">
        {finalText}
      </span>
      <span ref={ref} className="[grid-area:1/1]" aria-label={finalText}>
        {finalText}
      </span>
    </span>
  );
}
