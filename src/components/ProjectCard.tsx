"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  Github,
  Server,
  MonitorSmartphone,
} from "lucide-react";
import type { Project } from "@/lib/data";

export function ProjectCard({ project }: { project: Project }) {
  const isBackend = project.category === "backend";
  const Icon = isBackend ? Server : MonitorSmartphone;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
    >
      {/* hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={`grid h-11 w-11 place-items-center rounded-xl border ${
            isBackend
              ? "border-accent/30 bg-accent/10 text-accent-glow"
              : "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan"
          }`}
        >
          <Icon size={20} />
        </span>
        <ArrowUpRight
          size={20}
          className="text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
        />
      </div>

      <h3 className="relative mt-5 font-display text-xl font-semibold text-white">
        {project.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-white/60">
        {project.blurb}
      </p>

      <ul className="relative mt-4 space-y-1.5">
        {project.highlights.slice(0, 3).map((h) => (
          <li
            key={h}
            className="flex gap-2 text-[13px] leading-relaxed text-white/55"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            {h}
          </li>
        ))}
      </ul>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-white/65"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-sm">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
          >
            <ExternalLink size={15} /> Live
          </a>
        )}
        {project.apiDocsUrl && (
          <a
            href={project.apiDocsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent-glow transition-colors hover:text-white"
          >
            <BookOpen size={15} /> API Docs
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/70 transition-colors hover:text-white"
          >
            <Github size={15} /> Code
          </a>
        )}
      </div>
    </motion.article>
  );
}
