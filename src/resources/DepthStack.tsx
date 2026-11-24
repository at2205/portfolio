"use client";
import { useRef, useState } from "react";

/**
 * DepthStack — a deck seen almost edge-on: each card smaller and turned
 * further than the last. The four rows of numbers below are the whole look.
 * A flick moves exactly one card however hard it is thrown.
 * One file. Nothing imported but React.
 */
export type StackCard = { title: string; kicker?: string; body?: string; href?: string; tone?: string };

// depth -> measured placement. Tune these, nothing else.
const ROWS = [
  { y: 0, s: 1, rx: 0, o: 1 },
  { y: -54, s: 0.9, rx: 20, o: 0.92 },
  { y: -98, s: 0.8, rx: 34, o: 0.72 },
  { y: -132, s: 0.7, rx: 46, o: 0.45 },
  { y: -156, s: 0.6, rx: 56, o: 0.18 },
];

export default function DepthStack({ cards }: { cards: StackCard[] }) {
  const [index, setIndex] = useState(0);
  const start = useRef({ x: 0, y: 0, t: 0 });
  const flicked = useRef(false);
  const n = cards.length;
  const step = (d: number) => setIndex((i) => Math.max(0, Math.min(n - 1, i + d)));

  const down = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    flicked.current = false;
  };
  const up = (e: React.PointerEvent) => {
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    const dist = Math.hypot(dx, dy);
    const speed = dist / Math.max(1, performance.now() - start.current.t);
    if (dist > 28 || speed > 0.45) {
      flicked.current = true;
      // dominant axis decides; up/left = next, down/right = previous
      const dir = Math.abs(dy) > Math.abs(dx) ? (dy < 0 ? 1 : -1) : dx < 0 ? 1 : -1;
      step(dir);
    }
  };

  return (
    <div className="ds" onKeyDown={(e) => (e.key === "ArrowDown" || e.key === "ArrowRight" ? step(1) : (e.key === "ArrowUp" || e.key === "ArrowLeft") && step(-1))} tabIndex={0}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="ds-stage" onPointerDown={down} onPointerUp={up}>
        {cards.map((c, i) => {
          const d = i - index;
          const row = d < 0 ? null : ROWS[Math.min(d, ROWS.length - 1)];
          const gone = d < 0 || d >= ROWS.length;
          const style = row
            ? { transform: `translateY(${row.y}px) rotateX(${row.rx}deg) scale(${row.s})`, opacity: gone ? 0 : row.o }
            : { transform: "translateY(60px) rotateX(-12deg) scale(1.04)", opacity: 0 };
          const Tag = c.href ? "a" : "div";
          return (
            <Tag
              key={c.title}
              className="ds-card"
              href={c.href}
              data-cursor={d === 0 ? (c.href ? "Open" : "Flick") : "Bring forward"}
              draggable={false}
              aria-hidden={d !== 0 || undefined}
              tabIndex={d === 0 ? 0 : -1}
              onClick={(e: React.MouseEvent) => {
                if (flicked.current || d !== 0) {
                  e.preventDefault();
                  if (!flicked.current && d > 0) setIndex(i);
                }
              }}
              style={{ ...style, zIndex: n - Math.abs(d), background: c.tone, pointerEvents: d < 0 ? "none" : "auto" } as React.CSSProperties}
            >
              <span className="ds-k">{c.kicker}</span>
              <span className="ds-t">{c.title}</span>
              <span className="ds-b">{c.body}</span>
            </Tag>
          );
        })}
      </div>
      <p className="ds-hint">
        {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} — flick up or down
      </p>
    </div>
  );
}

const css = `
.ds{outline-offset:8px;user-select:none;-webkit-user-select:none}
.ds-stage{position:relative;height:clamp(340px,40vw,460px);perspective:1100px;perspective-origin:50% 0%;touch-action:none;display:grid;place-items:end center;padding-top:170px}
.ds-card{grid-area:1/1;width:min(560px,100%);min-height:200px;display:flex;flex-direction:column;gap:10px;justify-content:flex-end;padding:clamp(20px,2.4vw,32px);border-radius:22px;border:1px solid rgba(255,255,255,.18);background:#141311;color:#fff;transform-origin:50% 100%;transition:transform .7s var(--e-out,cubic-bezier(.22,1,.36,1)),opacity .5s;overflow:hidden;position:relative}
.ds-card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.5));pointer-events:none}
.ds-card>*{position:relative;z-index:1}
.ds-k{font-family:var(--f-mono,monospace);font-size:11px;letter-spacing:.06em;text-transform:uppercase;opacity:.8}
.ds-t{font-family:var(--f-display,system-ui);font-stretch:87.5%;font-weight:500;font-size:clamp(30px,3.6vw,52px);line-height:.95;letter-spacing:-.04em;text-transform:uppercase}
.ds-b{font-size:14px;max-width:44ch;opacity:.88}
.ds-hint{margin:18px 0 0;text-align:center;font-family:var(--f-mono,monospace);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.5)}
`;
