"use client";
import { useRef, useState } from "react";

/**
 * RotaryCardDeck — cards on an arc, one upright in front, the rest tilting
 * away. Placement (spread) and lean (tilt) are separate numbers so each can
 * be tuned alone. The arc is plain CSS sin()/cos(); JS only holds a position.
 * One file. Nothing imported but React.
 */
export type DeckCard = {
  title: string;
  kicker?: string;
  meta?: string;
  href?: string;
  /** any CSS background — gradient or url() */
  tone?: string;
};

export default function RotaryCardDeck({
  cards,
  spread = 14, // degrees of arc between neighbours
  tilt = 6, // degrees of lean per step
  radius = 640, // px
}: {
  cards: DeckCard[];
  spread?: number;
  tilt?: number;
  radius?: number;
}) {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const from = useRef(0);
  const moved = useRef(false);
  const n = cards.length;
  const clamp = (v: number) => Math.max(0, Math.min(n - 1, v));

  const down = (e: React.PointerEvent) => {
    from.current = e.clientX;
    moved.current = false;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - from.current;
    if (Math.abs(dx) > 6) moved.current = true;
    setDrag(-dx / 240);
  };
  const up = () => {
    if (!dragging) return;
    setDragging(false);
    const step = Math.abs(drag) > 0.15 ? Math.sign(drag) * Math.max(1, Math.round(Math.abs(drag))) : 0;
    setActive((a) => clamp(a + step));
    setDrag(0);
  };
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActive((a) => clamp(a + 1));
    if (e.key === "ArrowLeft") setActive((a) => clamp(a - 1));
  };

  return (
    <div
      className="rc"
      role="group"
      aria-roledescription="carousel"
      aria-label="Cards"
      tabIndex={0}
      onKeyDown={key}
      style={
        {
          "--spread": `${spread}deg`,
          "--tilt": `${tilt}deg`,
          "--r": `${radius}px`,
        } as React.CSSProperties
      }
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className="rc-stage"
        data-dragging={dragging}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        {cards.map((c, i) => {
          const d = i - active + drag;
          const hidden = Math.abs(d) > 3.6;
          const Tag = c.href ? "a" : "div";
          return (
            <Tag
              key={c.title}
              className="rc-card"
              href={c.href}
              data-cursor={c.href ? "Open" : "Drag"}
              draggable={false}
              aria-hidden={hidden || undefined}
              aria-current={i === active || undefined}
              onClick={(e: React.MouseEvent) => {
                if (moved.current) e.preventDefault();
                else if (i !== active) {
                  e.preventDefault();
                  setActive(i);
                }
              }}
              style={
                {
                  "--d": d,
                  zIndex: 100 - Math.round(Math.abs(d) * 10),
                  opacity: hidden ? 0 : 1,
                  pointerEvents: hidden ? "none" : "auto",
                  background: c.tone,
                } as React.CSSProperties
              }
            >
              <span className="rc-k">{c.kicker}</span>
              <span className="rc-t">{c.title}</span>
              <span className="rc-m">{c.meta}</span>
            </Tag>
          );
        })}
      </div>
      <div className="rc-ctl">
        <button aria-label="Previous" onClick={() => setActive((a) => clamp(a - 1))} disabled={active === 0}>
          ←
        </button>
        <span>
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button aria-label="Next" onClick={() => setActive((a) => clamp(a + 1))} disabled={active === n - 1}>
          →
        </button>
      </div>
    </div>
  );
}

const css = `
.rc{--w:min(300px,64vw);outline-offset:8px;user-select:none;-webkit-user-select:none}
.rc-stage{position:relative;height:calc(var(--w)*1.333 + 150px);overflow:hidden;touch-action:pan-y;cursor:grab}
.rc-stage[data-dragging="true"]{cursor:grabbing}
.rc-card{position:absolute;left:50%;top:10px;width:var(--w);aspect-ratio:3/4;margin-left:calc(var(--w)/-2);display:flex;flex-direction:column;justify-content:space-between;padding:22px;border-radius:22px;border:1px solid rgba(255,255,255,.16);background:#141311;color:#fff;overflow:hidden;
 transform:translate(calc(sin(var(--d)*var(--spread))*var(--r)),calc((1 - cos(var(--d)*var(--spread)))*var(--r)*.55)) rotate(calc(var(--d)*var(--tilt)));
 transition:transform .65s var(--e-out,cubic-bezier(.22,1,.36,1)),opacity .4s}
.rc-stage[data-dragging="true"] .rc-card{transition:opacity .4s}
.rc-card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.62));pointer-events:none}
.rc-card>*{position:relative;z-index:1}
.rc-k,.rc-m{font-family:var(--f-mono,monospace);font-size:11px;letter-spacing:.06em;text-transform:uppercase;opacity:.85}
.rc-t{font-family:var(--f-display,system-ui);font-stretch:87.5%;font-weight:500;font-size:clamp(26px,2.4vw,36px);line-height:.98;letter-spacing:-.04em;text-transform:uppercase}
.rc-ctl{display:flex;justify-content:center;align-items:center;gap:20px;font-family:var(--f-mono,monospace);font-size:12px;letter-spacing:.06em}
.rc-ctl button{width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.2);font-size:16px;transition:border-color .2s,color .2s}
.rc-ctl button:hover:not(:disabled){border-color:var(--accent,#ff630f);color:var(--accent,#ff630f)}
.rc-ctl button:disabled{opacity:.3;cursor:default}
`;
