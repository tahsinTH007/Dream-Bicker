"use client";

import * as React from "react";

function bnFormatter(decimals: number) {
  return new Intl.NumberFormat("bn-BD", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Fast start, gentle landing (close to cubic-bezier(0.16, 1, 0.3, 1)). */
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

interface CountUpProps {
  /** Final number. */
  to: number;
  /** Text after the number, e.g. " লাখ+" or "%". */
  suffix?: string;
  /** Digits after the decimal point (e.g. 1 for ৮.৩ লাখ). */
  decimals?: number;
  /** Seconds. */
  duration?: number;
  /** Seconds to wait after the number scrolls into view. */
  delay?: number;
  className?: string;
}

/**
 * Counts from 0 up to `to` (Bengali digits) the first time it scrolls into view.
 *
 * - No animation library: IntersectionObserver + requestAnimationFrame, writing
 *   straight to the DOM so React doesn't re-render 60×/s.
 * - The final value is rendered on the server (so it is correct without
 *   JavaScript) and kept as an invisible copy underneath, reserving its width
 *   so the line never shifts while counting.
 * - Shows the final number straight away for "reduce motion" visitors and when
 *   the scripts loaded late (motion-provider then leaves data-motion-ready unset).
 */
export function CountUp({ to, suffix = "", decimals = 0, duration = 2, delay = 0, className }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const finalText = bnFormatter(decimals).format(to) + suffix;

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const animationsOn =
      document.documentElement.hasAttribute("data-motion-ready") &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animationsOn || !("IntersectionObserver" in window)) return;

    const format = bnFormatter(decimals);
    node.textContent = format.format(0) + suffix;

    let frame = 0;
    let timer = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / (duration * 1000));
        node.textContent = format.format(to * easeOutExpo(t)) + suffix;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    // any part visible: the hero stats bar sits at the very bottom of the screen
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      observer.disconnect();
      timer = window.setTimeout(run, delay * 1000);
    });
    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      node.textContent = format.format(to) + suffix;
    };
  }, [to, suffix, decimals, duration, delay]);

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
