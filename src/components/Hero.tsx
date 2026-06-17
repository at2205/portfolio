"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { profile, stats } from "@/lib/data";
import { LiveClock } from "./LiveClock";
import { useCountUp } from "@/lib/useCountUp";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const ROLES = [
  "SOFTWARE ENGINEER",
  "LLM ENGINEER",
  "BACKEND DEVELOPER",
  "BIG DATA ANALYST",
];

function StatCard({ value, label }: { value: string; label: string }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div className="glass rounded-xl p-4 text-center" data-cursor="hover">
      <div className="font-display text-2xl font-bold text-gradient sm:text-3xl">
        <span ref={ref}>{animated}</span>
      </div>
      <div className="mt-1 text-xs text-white/50">{label}</div>
    </div>
  );
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2600
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-6 pt-28"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div variants={container} initial="hidden" animate="visible">
          {/* status bar */}
          <motion.div
            variants={item}
            className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4"
          >
            <span className="inline-flex items-center gap-2 text-xs text-white/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new opportunities
            </span>
            <LiveClock />
          </motion.div>

          {/* rotating role */}
          <motion.div
            variants={item}
            className="mb-4 h-6 overflow-hidden font-mono text-sm tracking-[0.25em] text-accent-glow"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl"
          >
            {profile.name.split(" ")[0]}{" "}
            <span className="text-gradient animate-gradient-x">
              {profile.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#backend"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              View my work
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              <Mail size={16} />
              Get in touch
            </a>
            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: profile.socials.github, label: "GitHub" },
                { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
