import fs from "node:fs";
import path from "node:path";
import { shelf, slugOf } from "@/lib/shelf";
import { resources } from "@/lib/resources";

/** Where the registry is served from. Set NEXT_PUBLIC_SITE_URL to your deployed origin. */
export const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com").replace(/\/$/, "");
export const SITE_IS_PLACEHOLDER = !process.env.NEXT_PUBLIC_SITE_URL;

const read = (dir: string, f: string) => fs.readFileSync(path.join(process.cwd(), "src", dir, f), "utf8");

export type RegistryFile = { path: string; type: string; content?: string };
export type RegistryItem = {
  $schema?: string; name: string; type: string; title: string; description: string;
  dependencies?: string[]; devDependencies?: string[]; files: RegistryFile[];
};

/** Every installable thing, keyed by slug: the 112 shelf components and the 9 resources. */
export function allItems(withContent = true): RegistryItem[] {
  const out: RegistryItem[] = [];
  for (const s of shelf) {
    const files: RegistryFile[] = [{ path: `components/shelf/${s.file}.tsx`, type: "registry:component", ...(withContent ? { content: read("shelf", `${s.file}.tsx`) } : {}) }];
    if (s.helper) files.push({ path: `components/shelf/${s.helper}.tsx`, type: "registry:component", ...(withContent ? { content: read("shelf", `${s.helper}.tsx`) } : {}) });
    out.push({
      $schema: "https://ui.shadcn.com/schema/registry-item.json", name: slugOf(s.file), type: "registry:component", title: s.title, description: s.blurb,
      ...(s.helper === "_three" ? { dependencies: ["three"], devDependencies: ["@types/three"] } : {}), files,
    });
  }
  for (const r of resources) {
    out.push({
      $schema: "https://ui.shadcn.com/schema/registry-item.json", name: r.slug, type: "registry:component", title: r.title, description: r.blurb,
      files: [{ path: `components/resources/${r.file}`, type: "registry:component", ...(withContent ? { content: read("resources", r.file) } : {}) }],
    });
  }
  return out;
}

export const installCommand = (slug: string) => `npx shadcn@latest add ${SITE}/r/${slug}.json`;
