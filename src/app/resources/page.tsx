import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Reveal, Pill, Split } from "@/components/ui";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { ShelfPreview } from "@/components/ShelfPreview";
import { resources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Free React and Next.js components from this site — running live, with the traps and a rebuild prompt.",
};

export default function ResourcesPage() {
  // The code on the Copy button is the real file behind each demo, read at build time.
  const items = resources.map((r) => ({
    ...r,
    source: fs.readFileSync(path.join(process.cwd(), "src", "resources", r.file), "utf8"),
  }));

  return (
    <>
      <section className="wrap pageHead">
        <div className="secHead">
          <p className="label"><b>{"//"}</b> Free, no sign-up</p>
          <p className="label">{items.length} files // &apos;26</p>
        </div>
        <Split text="Take the parts" as="h1" className="h-xl" />
        <Reveal delay={0.2}>
          <p className="body" style={{ marginTop: 28, maxWidth: "70ch" }}>
            Every component on this site, running on its own card. Each file carries the whole thing — one
            self-contained file you paste and use, nothing imported but React — then the things that went wrong
            building it here, the ones that cost a day and look like nothing in a screenshot, then a prompt for
            rebuilding it in a stack this file does not fit. Copy the component, or take the file.
          </p>
        </Reveal>
      </section>

      <ResourceLibrary items={items} />

      <ShelfPreview />

      <section className="sec wrap" style={{ textAlign: "center" }}>
        <p className="label" style={{ marginBottom: 18 }}>{"// No attribution needed"}</p>
        <Split text="Built something with one of these?" className="h-lg" />
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Pill href="/contact" label="Get in touch" />
          <Pill href="/projects" label="See what else gets built" variant="ghost" />
        </div>
      </section>
    </>
  );
}
