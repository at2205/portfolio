"use client";

import { motion, useReducedMotion } from "framer-motion";

const KEYWORDS = [
  "SPRING BOOT",
  "LLM ENGINEERING",
  "REST APIs",
  "BIG DATA ANALYTICS",
  "REACT",
  "NEXT.JS",
  "WORKFLOW AUTOMATION",
  "SYSTEM DESIGN",
  "PLAYWRIGHT",
  "POSTGRESQL",
];

/** Infinite horizontal marquee of keywords — an editorial ticker band. */
export function Marquee() {
  const reduce = useReducedMotion();
  const row = [...KEYWORDS, ...KEYWORDS];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

      <motion.div
        className="flex w-max items-center gap-8 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {row.map((word, i) => (
          <span key={`${word}-${i}`} className="flex items-center gap-8">
            <span className="font-display text-xl font-semibold tracking-tight text-white/70 sm:text-2xl">
              {word}
            </span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
