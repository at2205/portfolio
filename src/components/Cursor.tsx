"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a small dot + a larger trailing ring that grows over
 * interactive elements. Disabled on touch / coarse-pointer devices.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 250, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 250, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(
        Boolean(
          target.closest("a, button, [data-cursor='hover']")
        )
      );
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-glow mix-blend-difference"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
          opacity: hovering ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
}
