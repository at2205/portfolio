"use client";
import { useEffect, useRef, useState } from "react";

/**
 * ScrollRows — a list that opens on hover to show an image behind its type,
 * and opens itself as you scroll where there is no hover to use. The height
 * animates through grid-template-rows (0fr → 1fr), which is the only height
 * transition that doesn't need a measured number.
 * One file. Nothing imported but React.
 */
export type Row = {
  title: string;
  note: string;
  tags?: string[];
  /** any CSS background — gradient or url() */
  tone?: string;
  href?: string;
};

export default function ScrollRows({ rows }: { rows: Row[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [touch, setTouch] = useState(false);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => setTouch(!matchMedia("(hover: hover)").matches), []);

  // no hover? the row crossing the middle of the viewport is the open one
  useEffect(() => {
    if (!touch) return;
    const io = new IntersectionObserver(
      (list) =>
        list.forEach((e) => {
          if (e.isIntersecting) setOpen(refs.current.indexOf(e.target as HTMLLIElement));
        }),
      { rootMargin: "-42% 0px -42% 0px" }
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, [touch]);

  return (
    <ul className="sr" onMouseLeave={() => !touch && setOpen(null)}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {rows.map((r, i) => {
        const Tag = r.href ? "a" : "div";
        return (
          <li
            key={r.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="sr-row"
            data-open={open === i}
            onMouseEnter={() => !touch && setOpen(i)}
            onFocus={() => setOpen(i)}
          >
            <div className="sr-bg" style={{ background: r.tone }} aria-hidden="true" />
            <Tag className="sr-in" href={r.href} data-cursor={r.href ? "Open" : ""}>
              <div className="sr-head">
                <span className="sr-i">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="sr-t">{r.title}</h3>
                <span className="sr-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="sr-body">
                <div>
                  <p>{r.note}</p>
                  {r.tags && (
                    <div className="sr-tags">
                      {r.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Tag>
          </li>
        );
      })}
    </ul>
  );
}

const css = `
.sr{list-style:none;margin:0;padding:0;border-top:1px solid rgba(255,255,255,.14)}
.sr-row{position:relative;border-bottom:1px solid rgba(255,255,255,.14);overflow:hidden}
.sr-bg{position:absolute;inset:0;opacity:0;transform:scale(1.06);transition:opacity .5s var(--e,ease),transform .8s var(--e-out,cubic-bezier(.22,1,.36,1));background:linear-gradient(100deg,#ea4f16,#f6af60)}
.sr-row[data-open="true"] .sr-bg{opacity:.5;transform:none}
.sr-in{position:relative;display:block;padding:clamp(18px,2.4vw,34px) 0}
.sr-head{display:grid;grid-template-columns:clamp(40px,6vw,96px) 1fr auto;align-items:baseline;gap:12px}
.sr-i{font-family:var(--f-mono,monospace);font-size:12px;letter-spacing:.06em;color:rgba(255,255,255,.5)}
.sr-t{margin:0;font-family:var(--f-display,system-ui);font-stretch:87.5%;font-weight:500;font-size:clamp(34px,6.4vw,112px);line-height:.95;letter-spacing:-.05em;text-transform:uppercase;transition:transform .6s var(--e-out,cubic-bezier(.22,1,.36,1))}
.sr-row[data-open="true"] .sr-t{transform:translateX(clamp(8px,1.4vw,24px))}
.sr-arrow{font-size:clamp(20px,2.4vw,36px);opacity:0;transform:translate(-8px,8px);transition:.4s var(--e,ease)}
.sr-row[data-open="true"] .sr-arrow{opacity:1;transform:none}
.sr-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .6s var(--e-out,cubic-bezier(.22,1,.36,1));padding-left:clamp(52px,calc(6vw + 12px),108px)}
.sr-row[data-open="true"] .sr-body{grid-template-rows:1fr}
.sr-body>div{overflow:hidden;min-height:0}
.sr-body p{margin:20px 0 0;max-width:52ch;font-size:clamp(15px,1.2vw,18px);color:#fff}
.sr-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.sr-tags span{font-family:var(--f-mono,monospace);font-size:11px;letter-spacing:.05em;text-transform:uppercase;padding:5px 12px;border:1px solid rgba(255,255,255,.4);border-radius:999px}
`;
