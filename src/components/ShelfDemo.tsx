"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { shelf } from "@/lib/shelf";

// One lazy loader per component, created once, so a page only pays for what is on screen.
const loaders: Record<string, ComponentType> = {};
for (const s of shelf) {
  loaders[s.file] = dynamic(() => import(`@/shelf/${s.file}`), {
    ssr: false,
    loading: () => <span className="label">Loading…</span>,
  }) as ComponentType;
}

export function ShelfDemo({ file }: { file: string }) {
  const C = loaders[file];
  return C ? <C /> : null;
}
