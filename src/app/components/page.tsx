import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Pill, Reveal, Split } from "@/components/ui";
import { ShelfLibrary } from "@/components/ShelfLibrary";
import { shelf } from "@/lib/shelf";

export const metadata: Metadata = {
  title: "Components",
  description: "A shelf of small, self-contained React components — text, buttons, cards, loaders, data, navigation, AI interfaces and forms.",
};

export default function ComponentsPage() {
  const read = (f: string) => fs.readFileSync(path.join(process.cwd(), "src", "shelf", f), "utf8");
  // Copy gives the component itself; the 3D and shader pieces also carry their shared helper file.
  const items = shelf.map((s) => {
    let source = read(`${s.file}.tsx`);
    if (s.helper) {
      const note = s.helper === "_three" ? "Install first: npm i three @types/three" : "No packages needed";
      source += `

/* ===== Also required: save the next block as ${s.helper}.tsx beside this file. ${note}. ===== */

${read(`${s.helper}.tsx`)}`;
    }
    return { ...s, source };
  });
  return (
    <>
      <section className="wrap pageHead">
        <div className="secHead">
          <p className="label"><b>{"//"}</b> Free, no sign-up</p>
          <p className="label">{items.length} files // &apos;26</p>
        </div>
        <Split text="Components" as="h1" className="h-xl" />
        <Reveal delay={0.2}>
          <p className="body" style={{ marginTop: 28, maxWidth: "70ch" }}>
            Small, self-contained pieces — most are a single file with nothing imported but React; the WebGL ones add one shared helper (and three.js for the 3D set). Hover, drag and
            click them here, then copy the source. My own, longer write-ups (with the traps and a rebuild prompt) are
            on the <a href="/resources" style={{ color: "var(--accent)" }}>resources page</a>.
          </p>
        </Reveal>
      </section>
      <ShelfLibrary items={items} />
      <section className="sec wrap" style={{ textAlign: "center" }}>
        <p className="label" style={{ marginBottom: 18 }}>{"// No attribution needed"}</p>
        <Split text="Built something with one of these?" className="h-lg" />
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Pill href="/contact" label="Get in touch" />
          <Pill href="/resources" label="See the nine deep dives" variant="ghost" />
        </div>
      </section>
    </>
  );
}
