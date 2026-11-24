"use client";
import { useEffect, useRef, useState } from "react";

/**
 * HeaderMegaMenu — a bar that rides tall in the hero and pins smaller on
 * scroll, opening a grouped panel fixed at 80% of the viewport. The page is
 * still visible around it, and the letters roll one after another.
 * One file. Nothing imported but React.
 */
export type MenuItem = { label: string; href: string; note?: string; badge?: string };
export type MenuGroup = { label: string; items: MenuItem[] };
export type HeaderMegaMenuProps = {
  brand: string;
  groups: MenuGroup[];
  cta: { label: string; href: string };
  feature?: { kicker: string; title: string; blurb: string; href: string; cta: string };
  /** route through your router; falls back to a normal link */
  onNavigate?: (href: string) => void;
  /** render inside a frame instead of fixed to the viewport (for demos) */
  contained?: boolean;
};

function Roll({ text }: { text: string }) {
  return (
    <span className="mm-roll" aria-label={text}>
      {[...text].map((c, i) => {
        const ch = c === " " ? " " : c;
        return (
          <span key={i} className="mm-c" aria-hidden="true" style={{ "--i": i } as React.CSSProperties}>
            <span>{ch}</span>
            <span>{ch}</span>
          </span>
        );
      })}
    </span>
  );
}

export default function HeaderMegaMenu({
  brand,
  groups,
  cta,
  feature,
  onNavigate,
  contained,
}: HeaderMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (contained) return;
    const on = () => setStuck(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [contained]);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const down = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", key);
    window.addEventListener("pointerdown", down);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("pointerdown", down);
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (onNavigate && !e.metaKey && !e.ctrlKey && !e.shiftKey && !href.startsWith("http")) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  return (
    <header
      ref={root}
      className={`mm ${contained ? "mm-in" : ""}`}
      data-stuck={stuck || open}
      data-open={open}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="mm-bar">
        <a className="mm-brand mm-link" href="/" onClick={go("/")} aria-label={`${brand} — home`}>
          <Roll text={brand} />
        </a>
        <button
          className="mm-toggle mm-link"
          aria-expanded={open}
          aria-controls="mm-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <Roll text={open ? "Close" : "Menu"} />
          <i className="mm-ico" aria-hidden="true" />
        </button>
        <a className="mm-cta" href={cta.href} onClick={go(cta.href)}>
          {cta.label}
        </a>
      </div>

      <nav id="mm-panel" className="mm-panel" aria-label="Main" aria-hidden={!open}>
        <div className="mm-cols">
          {groups.map((g) => (
            <div key={g.label} className="mm-group">
              <p className="mm-gl">{g.label}</p>
              <ul>
                {g.items.map((it) => (
                  <li key={it.label}>
                    <a
                      className="mm-item mm-link"
                      href={it.href}
                      tabIndex={open ? 0 : -1}
                      onClick={go(it.href)}
                    >
                      <span className="mm-lbl">
                        <Roll text={it.label} />
                        {it.badge && <em>{it.badge}</em>}
                      </span>
                      <span className="mm-arrow" aria-hidden="true">↗</span>
                      {it.note && <small>{it.note}</small>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {feature && (
          <a className="mm-feature" href={feature.href} tabIndex={open ? 0 : -1} onClick={go(feature.href)}>
            <span className="mm-fk">{feature.kicker}</span>
            <span className="mm-ft">{feature.title}</span>
            <span className="mm-fb">{feature.blurb}</span>
            <span className="mm-fc">{feature.cta} ↗</span>
          </a>
        )}
      </nav>
    </header>
  );
}

const css = `
.mm{--bar-rest:clamp(78px,calc(40px + 5.4vw),108px);--bar-stuck:clamp(60px,calc(36px + 2vw),72px);position:fixed;top:0;left:0;right:0;z-index:100;color:#fff;font-family:var(--f-text,system-ui)}
.mm-in{position:absolute;--bar-rest:72px;--bar-stuck:72px}
.mm-bar{height:var(--bar-rest);padding-inline:var(--edge,24px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;transition:height .5s var(--e,ease),background .4s,backdrop-filter .4s;position:relative;z-index:2}
.mm[data-stuck="true"] .mm-bar{height:var(--bar-stuck);background:rgba(10,10,10,.72);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.1)}
.mm-brand{font-family:var(--f-display,system-ui);font-stretch:87.5%;font-weight:600;font-size:22px;letter-spacing:-.03em;justify-self:start}
.mm-toggle{display:inline-flex;align-items:center;gap:10px;font-family:var(--f-mono,monospace);font-size:13px;letter-spacing:.06em;text-transform:uppercase;padding:10px 4px}
.mm-ico{width:16px;height:8px;position:relative;display:block}
.mm-ico::before,.mm-ico::after{content:"";position:absolute;left:0;right:0;height:1.5px;background:currentColor;transition:transform .4s var(--e-out,ease),top .4s}
.mm-ico::before{top:0}.mm-ico::after{top:7px}
.mm[data-open="true"] .mm-ico::before{top:3px;transform:rotate(45deg)}
.mm[data-open="true"] .mm-ico::after{top:3px;transform:rotate(-45deg)}
.mm-cta{justify-self:end;padding:11px 18px;border-radius:999px;background:#fff;color:#000;font-size:15px;letter-spacing:-.02em;transition:background .25s,color .25s,transform .25s}
@media (hover:hover){.mm-cta:hover{background:var(--accent,#ff630f);color:#fff;transform:scale(1.04)}}
.mm-roll{display:inline-block;white-space:nowrap}
.mm-c{display:inline-block;overflow:hidden;height:1.12em;line-height:1.12;vertical-align:top}
.mm-c>span{display:block;transition:transform .55s var(--e-out,cubic-bezier(.22,1,.36,1));transition-delay:calc(var(--i)*24ms)}
@media (hover:hover){.mm-link:hover .mm-c>span{transform:translateY(-100%)}}
.mm-link:focus-visible .mm-c>span{transform:translateY(-100%)}
.mm-panel{position:absolute;left:var(--edge,16px);right:var(--edge,16px);top:calc(var(--bar-stuck) + 8px);height:min(80vh,780px);display:grid;grid-template-columns:2fr 1fr;gap:12px;padding:clamp(20px,3vw,40px);border:1px solid rgba(255,255,255,.14);border-radius:24px;background:rgba(10,10,10,.94);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);clip-path:inset(0 0 100% 0 round 24px);opacity:0;visibility:hidden;transition:clip-path .65s var(--e-out,ease),opacity .3s,visibility 0s .65s;overflow:auto}
.mm-in .mm-panel{height:calc(100% - 80px);min-height:0}
.mm[data-open="true"] .mm-panel{clip-path:inset(0 0 0 0 round 24px);opacity:1;visibility:visible;transition:clip-path .65s var(--e-out,ease),opacity .3s,visibility 0s}
.mm-cols{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(20px,3vw,48px);align-content:start}
.mm-gl{font-family:var(--f-mono,monospace);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--accent,#ff630f);margin:0 0 14px}
.mm-group ul{list-style:none;margin:0;padding:0}
.mm-item{display:grid;grid-template-columns:1fr auto;align-items:baseline;padding:10px 0;border-top:1px solid rgba(255,255,255,.12)}
.mm-lbl{font-family:var(--f-display,system-ui);font-stretch:87.5%;font-size:clamp(26px,3.2vw,48px);letter-spacing:-.04em;line-height:1.05;text-transform:uppercase}
.mm-lbl em{font-style:normal;font-family:var(--f-mono,monospace);font-size:10px;letter-spacing:.06em;margin-left:10px;vertical-align:super;color:var(--accent,#ff630f)}
.mm-arrow{opacity:0;transform:translate(-6px,6px);transition:.3s var(--e,ease);color:var(--accent,#ff630f)}
.mm-item:hover .mm-arrow{opacity:1;transform:none}
.mm-item small{grid-column:1/-1;color:rgba(255,255,255,.5);font-size:13px}
.mm-feature{display:flex;flex-direction:column;justify-content:flex-end;gap:10px;padding:24px;border-radius:16px;background:var(--sunset,linear-gradient(180deg,#000,#ea4f16 60%,#f6af60));min-height:220px}
.mm-fk{font-family:var(--f-mono,monospace);font-size:12px;letter-spacing:.06em;text-transform:uppercase;opacity:.8}
.mm-ft{font-family:var(--f-display,system-ui);font-stretch:87.5%;font-size:clamp(30px,3.4vw,52px);line-height:.95;letter-spacing:-.04em;text-transform:uppercase}
.mm-fb{font-size:14px;max-width:34ch;opacity:.9}
.mm-fc{font-size:14px}
@media (max-width:900px){
 .mm-panel{grid-template-columns:1fr;height:calc(100svh - var(--bar-stuck) - 20px)}
 .mm-cols{grid-template-columns:1fr}
 .mm-feature{min-height:150px}
 .mm-cta{display:none}
 .mm-bar{grid-template-columns:1fr auto}
}
@media (prefers-reduced-motion:reduce){.mm-panel{transition:none}}
`;
