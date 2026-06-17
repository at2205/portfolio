"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { process } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          title="How I Work"
          subtitle="A clear, repeatable process — from understanding the problem to shipping measurable results."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              data-cursor="hover"
              className="group glass relative overflow-hidden rounded-2xl p-7"
            >
              <div className="pointer-events-none absolute -right-6 -top-8 font-display text-[7rem] font-bold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-accent/10">
                {p.step}
              </div>
              <div className="relative">
                <span className="font-mono text-xs tracking-[0.2em] text-accent-glow">
                  STEP {p.step}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {p.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
