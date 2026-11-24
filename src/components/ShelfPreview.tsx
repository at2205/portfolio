"use client";
import { ShelfDemo } from "@/components/ShelfDemo";
import { Pill, Reveal } from "@/components/ui";
import { shelf, slugOf } from "@/lib/shelf";

const PICK = ["ChromeLogo", "StatCards", "VoiceOrb", "MobileSheetMenu", "StoryViewer", "Caustics"];

/** The shelf teaser at the foot of /resources: a text column and six live thumbnails linking to their code. */
export function ShelfPreview() {
  const items = PICK.map((f) => shelf.find((s) => s.file === f)!).filter(Boolean);
  return (
    <section className="wrap sec">
      <div className="sp">
        <div className="sp-t">
          <p className="label" style={{ marginBottom: 18 }}>{"// More to take"}</p>
          <Reveal><h2 className="display h-md" style={{ marginBottom: 20 }}>{shelf.length} more, on one shelf</h2></Reveal>
          <p className="body" style={{ marginBottom: 26 }}>
            Smaller pieces — text, buttons, cards, loaders, charts, navigation, AI interfaces, forms, media, 3D and
            shaders. Each one runs live and shows all of its code on its own page, so you always know what you are copying.
          </p>
          <Pill href="/components" label="See the shelf" />
        </div>
        <ul className="sp-g">
          {items.map((it, i) => (
            <Reveal key={it.file} as="li" delay={i * 0.06}>
              <a href={`/components/${slugOf(it.file)}`} data-cursor="View code">
                <div className="sp-f"><div className="sp-in"><ShelfDemo file={it.file} /></div></div>
                <span className="sp-n">{it.title}</span>
                <span className="label">{it.kind}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .sp{display:grid;grid-template-columns:1fr 1.7fr;gap:clamp(24px,5vw,80px);align-items:start}
        .sp-g{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .sp-g a{display:grid;gap:4px}
        .sp-f{aspect-ratio:1.6;border-radius:12px;overflow:hidden;background:#050505;border:1px solid var(--rule);position:relative;transition:border-color .3s}
        .sp-g a:hover .sp-f{border-color:var(--accent)}
        .sp-in{position:absolute;left:50%;top:50%;width:520px;height:330px;display:grid;place-items:center;transform:translate(-50%,-50%) scale(.5);transform-origin:50% 50%;pointer-events:none}
        .sp-n{font-size:14px;margin-top:6px}
        @media (max-width:1100px){.sp-in{transform:translate(-50%,-50%) scale(.36)}}
        @media (max-width:900px){.sp{grid-template-columns:1fr}.sp-g{grid-template-columns:1fr 1fr}.sp-in{transform:translate(-50%,-50%) scale(.42)}}
      ` }} />
    </section>
  );
}
