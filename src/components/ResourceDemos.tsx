"use client";
import { useState } from "react";
import HeroSection from "@/resources/HeroSection";
import HeaderMegaMenu from "@/resources/HeaderMegaMenu";
import RotaryCardDeck from "@/resources/RotaryCardDeck";
import DepthStack from "@/resources/DepthStack";
import SideDrawer from "@/resources/SideDrawer";
import RollingLabel from "@/resources/RollingLabel";
import ScrollRows from "@/resources/ScrollRows";
import DashedRing from "@/resources/DashedRing";

const tones = [
  "linear-gradient(160deg,#ea4f16,#f6af60 70%)",
  "linear-gradient(160deg,#1a1a1a,#ff630f 120%)",
  "linear-gradient(160deg,#b4460a,#000 90%)",
  "linear-gradient(160deg,#f6af60,#ea4f16 60%,#000)",
];

const sampleCards = ["Backend", "LLM", "Data", "APIs", "Auth", "React", "Ship"].map((t, i) => ({
  title: t,
  kicker: `Card ${String(i + 1).padStart(2, "0")}`,
  meta: "Drag me",
  tone: tones[i % tones.length],
}));

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="demo-fill" style={{ position: "relative", minHeight: 460, display: "grid", placeItems: "center" }}>
      <button className="pill" onClick={() => setOpen(true)}>Open the drawer</button>
      <SideDrawer open={open} onClose={() => setOpen(false)} title="Demo" contained>
        <h3 className="display" style={{ fontSize: 48, marginBottom: 16 }}>Straightens in.</h3>
        <p style={{ color: "var(--soft)" }}>
          Tab stays inside, Escape closes, and focus returns to the button that opened it.
        </p>
        <button className="pill ghost" style={{ marginTop: 20 }} onClick={() => setOpen(false)}>Done</button>
      </SideDrawer>
    </div>
  );
}

const Stage = ({ children, pad = true }: { children: React.ReactNode; pad?: boolean }) => (
  <div className="demo-fill" style={{ padding: pad ? "clamp(24px,4vw,56px)" : 0, minHeight: 320 }}>{children}</div>
);

export const demos: Record<string, () => React.ReactNode> = {
  "hero-section": () => (
    <HeroSection
      first="Aryan"
      last="Tomar"
      kicker="[ DEMO // HERO ]"
      tagline="Move the pointer across the portrait."
      status="Idle drift on touch"
      height="560px"
    />
  ),
  "header-mega-menu": () => (
    <div className="demo-fill" style={{ position: "relative", height: 560, overflow: "hidden" }}>
      <HeaderMegaMenu
        contained
        brand="Brand_"
        groups={[
          { label: "The work", items: [{ label: "Projects", href: "#", note: "Everything shipped" }, { label: "About", href: "#", note: "Who you'd work with" }] },
          { label: "Read and take", items: [{ label: "Resources", href: "#", badge: "Free" }, { label: "Contact", href: "#" }] },
        ]}
        cta={{ label: "Start", href: "#" }}
        feature={{ kicker: "Feature", title: "Take the parts", blurb: "A card in the panel.", href: "#", cta: "Open" }}
        onNavigate={() => {}}
      />
      <p className="label" style={{ position: "absolute", bottom: 20, left: 20 }}>Press Menu</p>
    </div>
  ),
  "rotary-card-deck": () => (
    <Stage pad={false}>
      <div style={{ padding: "32px 0 16px" }}>
        <RotaryCardDeck cards={sampleCards} />
      </div>
    </Stage>
  ),
  "depth-stack": () => (
    <Stage>
      <DepthStack
        cards={sampleCards.map((c, i) => ({ title: c.title, kicker: c.kicker, body: "Flick up or down — one card, however hard.", tone: tones[i % tones.length] }))}
      />
    </Stage>
  ),
  "side-drawer": () => <DrawerDemo />,
  "rolling-label": () => (
    <Stage>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "center", minHeight: 240 }}>
        <RollingLabel label="Start a project" />
        <RollingLabel label="See the work" variant="ghost" />
        <RollingLabel label="Copy the component" />
      </div>
    </Stage>
  ),
  "cursor-pill": () => (
    <Stage>
      <p className="label" style={{ marginBottom: 20 }}>The pill is already running on this site — hover these:</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
        {[["Drag", "data-cursor=\"Drag\""], ["Play reel", "data-cursor=\"Play reel\""], ["Zoom", "aria-label=\"Zoom\""], ["Nothing", "data-cursor=\"\""]].map(([c, a]) => (
          <div key={c} role="button" tabIndex={0} data-cursor={c === "Nothing" ? "" : c} className="card" style={{ minHeight: 140, display: "grid", placeItems: "end start" }}>
            <span className="label">{a}</span>
          </div>
        ))}
      </div>
    </Stage>
  ),
  "scroll-revealed-rows": () => (
    <Stage>
      <ScrollRows
        rows={[
          { title: "Branding", note: "Hover to open. On touch, the row in the middle opens itself.", tags: ["Identity", "Type"], tone: tones[0] },
          { title: "Web", note: "The body animates with grid-template-rows, no measured heights.", tags: ["Next.js", "CSS"], tone: tones[1] },
          { title: "Systems", note: "Keyboard focus opens a row too.", tags: ["APIs", "Data"], tone: tones[2] },
        ]}
      />
    </Stage>
  ),
  "dashed-ring": () => (
    <Stage>
      <DashedRing size="min(84vw, 460px)">
        <p className="label" style={{ marginBottom: 10 }}>ring=&quot;dashed&quot;</p>
        <p className="display" style={{ fontSize: "clamp(34px,5vw,64px)" }}>Behind a title</p>
      </DashedRing>
    </Stage>
  ),
};
