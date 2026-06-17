"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Ambient animated background: grid, gradient orbs, and a subtle glow. */
export function Background() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* faint grid */}
      <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* gradient orbs */}
      <motion.div
        className="absolute -left-40 top-[-10%] h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-[120px]"
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] top-[30%] h-[28rem] w-[28rem] rounded-full bg-accent-cyan/15 blur-[120px]"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/40 to-ink" />
    </div>
  );
}
