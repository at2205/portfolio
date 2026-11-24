"use client";
import { useEffect, useRef, useState } from "react";

/**
 * HeroSection — a name split to both margins with a portrait set between,
 * and a colour copy of the portrait uncovered by the pointer.
 * One file. Nothing imported but React. Drop your portrait at /public/portrait.png.
 */
export type HeroSectionProps = {
  first: string;
  last: string;
  kicker?: string;
  tagline: string;
  status?: string;
  cta?: { label: string; href: string; onClick?: (e: React.MouseEvent) => void };
  image?: string;
  height?: string;
};

export default function HeroSection({
  first,
  last,
  kicker,
  tagline,
  status,
  cta,
  image = "/portrait.png",
  height = "100svh",
}: HeroSectionProps) {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setReady(true);
    const el = root.current;
    if (!el) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0.5,
      ty = 0.45,
      x = tx,
      y = ty,
      raf = 0,
      hovering = false;
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      tx = (e.clientX - b.left) / b.width;
      ty = (e.clientY - b.top) / b.height;
      hovering = true;
    };
    const leave = () => (hovering = false);
    const tick = (t: number) => {
      // no pointer (touch / idle): the light drifts on its own
      if (!hovering && !reduce) {
        tx = 0.5 + Math.sin(t / 1900) * 0.14;
        ty = 0.45 + Math.cos(t / 2400) * 0.09;
      }
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const letters = (word: string, offset: number) =>
    [...word].map((c, i) => (
      <span
        key={i}
        className="hs-l"
        style={{ "--d": `${offset + i * 0.05}s` } as React.CSSProperties}
      >
        {c}
      </span>
    ));

  return (
    <section
      ref={root}
      className="hs"
      data-ready={ready}
      style={{ "--h": height } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="hs-stage" aria-hidden="true">
        {broken ? (
          <div className="hs-figure" />
        ) : (
          <div className="hs-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hs-img hs-base" src={image} alt="" onError={() => setBroken(true)} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hs-img hs-lit" src={image} alt="" />
          </div>
        )}
        <div className="hs-glow" />
        <div className="hs-sun" />
      </div>

      <h1 className="hs-name" aria-label={`${first} ${last}`}>
        <span className="hs-word" aria-hidden="true">
          {letters(first, 0.35)}
        </span>
        <span className="hs-word hs-light" aria-hidden="true">
          {letters(last, 0.6)}
        </span>
      </h1>

      <div className="hs-meta">
        <div>
          {kicker && <p className="hs-kicker">{kicker}</p>}
          <p className="hs-tag">{tagline}</p>
        </div>
        <div className="hs-right">
          {status && <p className="hs-status">{status}</p>}
          {cta && (
            <a className="hs-cta" href={cta.href} onClick={cta.onClick}>
              {cta.label} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
      <span className="hs-cue" aria-hidden="true" />
    </section>
  );
}

const css = `
.hs{--mx:50%;--my:45%;--r:clamp(150px,21vw,400px);position:relative;min-height:var(--h);overflow:hidden;background:#000;color:#fff;isolation:isolate}
.hs-stage{position:absolute;inset:0;z-index:-1;background:radial-gradient(ellipse 46% 62% at 50% 42%,#ff7a2a 0,#d9470f 34%,#4a1604 62%,#0a0908 86%)}
.hs-photo{position:absolute;inset:0;mix-blend-mode:multiply;-webkit-mask-image:radial-gradient(ellipse 27% 88% at 50% 52%,#000 42%,transparent 100%);mask-image:radial-gradient(ellipse 27% 88% at 50% 52%,#000 42%,transparent 100%)}
.hs-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:50% 100%;padding-top:5%}
.hs-base{filter:grayscale(1) contrast(1.25) brightness(.62)}
.hs-lit{-webkit-mask-image:radial-gradient(circle var(--r) at var(--mx) var(--my),#000 0,#000 35%,transparent 100%);mask-image:radial-gradient(circle var(--r) at var(--mx) var(--my),#000 0,#000 35%,transparent 100%);filter:saturate(1.1) contrast(1.05) brightness(1.08)}
.hs-figure{position:absolute;left:50%;bottom:0;width:min(34vw,420px);height:78%;transform:translateX(-50%);border-radius:999px 999px 0 0;background:linear-gradient(180deg,#1b1b1b,#050505);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
.hs-glow{position:absolute;inset:0;background:radial-gradient(circle var(--r) at var(--mx) var(--my),rgba(255,140,50,.28),transparent 70%);mix-blend-mode:screen}
.hs-sun{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.65) 0%,transparent 28%,transparent 55%,rgba(234,79,22,.5) 100%)}
.hs-name{position:absolute;z-index:2;left:var(--edge);right:var(--edge);top:clamp(92px,9.5vw,170px);display:flex;justify-content:space-between;align-items:center;margin:0;font-family:var(--f-display,system-ui);font-stretch:87.5%;font-weight:500;font-size:clamp(60px,15.4vw,300px);letter-spacing:-.06em;line-height:.9;text-transform:uppercase;white-space:nowrap;pointer-events:none;text-shadow:0 2px 40px rgba(0,0,0,.35)}
.hs-light{font-weight:200}
.hs-l{display:inline-block}
.hs[data-ready="true"] .hs-l{animation:hs-rise .8s var(--e-out,cubic-bezier(.22,1,.36,1)) both;animation-delay:var(--d)}
.hs:not([data-ready="true"]) .hs-l{opacity:0}
@keyframes hs-rise{0%{opacity:0;filter:blur(30px);transform:translateY(120%)}}
.hs-meta{position:absolute;z-index:3;left:var(--edge);right:var(--edge);bottom:clamp(20px,3vw,44px);display:flex;justify-content:space-between;align-items:flex-end;gap:24px}
.hs-kicker{font-family:var(--f-mono,monospace);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--accent,#ff630f);margin:0 0 14px}
.hs-tag{margin:0;max-width:28ch;font-family:var(--f-display,system-ui);font-stretch:90%;font-size:clamp(20px,2.3vw,34px);line-height:1.08;letter-spacing:-.035em}
.hs-right{display:flex;flex-direction:column;align-items:flex-end;gap:14px}
.hs-status{margin:0;font-family:var(--f-mono,monospace);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.65)}
.hs-cta{display:inline-flex;gap:10px;padding:14px 20px;border-radius:999px;background:#fff;color:#000;font-size:17px;letter-spacing:-.03em;transition:background .25s,color .25s,transform .25s}
@media (hover:hover){.hs-cta:hover{background:var(--accent,#ff630f);color:#fff;transform:scale(1.04)}}
.hs-cue{position:absolute;z-index:3;left:50%;bottom:0;width:1px;height:48px;background:linear-gradient(#fff,transparent);transform-origin:top;animation:hs-cue 2.2s var(--e,ease) infinite}
@keyframes hs-cue{0%{transform:scaleY(0)}50%{transform:scaleY(1)}100%{transform:scaleY(1);opacity:0}}
@media (max-width:900px){
 .hs-name{flex-direction:column;align-items:flex-start;gap:0;font-size:clamp(64px,27vw,200px);top:96px}
 .hs-word:nth-child(2){align-self:flex-end}
 .hs-meta{flex-direction:column;align-items:flex-start}
 .hs-right{align-items:flex-start}
 .hs-cue{display:none}
}
@media (prefers-reduced-motion:reduce){.hs-l{animation:none!important;opacity:1!important}.hs-cue{animation:none}}
`;
