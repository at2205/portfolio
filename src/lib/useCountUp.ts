"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Counts up to a numeric target when the element scrolls into view.
 * Pass the original display string (e.g. "10K+", "73.7%", "152") and it
 * preserves the prefix/suffix while animating the number.
 */
export function useCountUp(display: string, duration = 1600) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(display);

  useEffect(() => {
    if (!inView) return;

    const match = display.match(/([\d.]+)/);
    if (!match) {
      setValue(display);
      return;
    }

    const target = parseFloat(match[1]);
    const decimals = (match[1].split(".")[1] || "").length;
    const prefix = display.slice(0, match.index);
    const suffix = display.slice((match.index ?? 0) + match[1].length);

    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = (target * eased).toFixed(decimals);
      setValue(`${prefix}${current}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, display, duration]);

  return { ref, value };
}
