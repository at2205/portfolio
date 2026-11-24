"use client";
import { useState } from "react";

/**
 * RollingLabel — a button whose word turns over on hover. Three copies sit on
 * a wheel. The number you can't copy from someone else's version is the
 * radius: translateZ = lineHeight / (2 * tan(180° / faces)) — for three faces,
 * 0.2887 × the line height. Get it wrong and the faces drift apart mid-turn.
 * One file. Nothing imported but React.
 */
export type RollingLabelProps = {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: "solid" | "ghost";
  className?: string;
};

const LINE = 1.25; // em — the line height of one face
const RADIUS = LINE * 0.2887; // em — see above

export default function RollingLabel({
  label,
  href,
  onClick,
  variant = "solid",
  className = "",
}: RollingLabelProps) {
  const [turns, setTurns] = useState(0);
  const roll = () => setTurns((t) => t + 1); // always the same direction

  const inner = (
    <span className="rl-view" aria-hidden="true">
      <span className="rl-size">{label}</span>
      <span className="rl-wheel" style={{ transform: `rotateX(${turns * -120}deg)` }}>
        {[0, 1, 2].map((k) => (
          <span key={k} className="rl-face" style={{ "--k": k } as React.CSSProperties}>
            {label}
          </span>
        ))}
      </span>
    </span>
  );
  const common = {
    className: `rl rl-${variant} ${className}`,
    onMouseEnter: roll,
    onMouseLeave: roll,
    onFocus: roll,
    "aria-label": label,
  };
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {href ? (
        <a href={href} onClick={onClick} {...common}>
          {inner}
        </a>
      ) : (
        <button type="button" onClick={onClick} {...common}>
          {inner}
        </button>
      )}
    </>
  );
}

const css = `
.rl{--line:${LINE}em;--rad:${RADIUS}em;display:inline-flex;align-items:center;padding:14px 22px;border-radius:999px;font-size:17px;letter-spacing:-.03em;line-height:var(--line);transition:background .3s,color .3s,border-color .3s}
.rl-solid{background:#fff;color:#000}
.rl-solid:hover{background:var(--accent,#ff630f);color:#fff}
.rl-ghost{border:1px solid rgba(255,255,255,.2);color:#fff}
.rl-ghost:hover{border-color:var(--accent,#ff630f);color:var(--accent,#ff630f)}
.rl-view{display:block;position:relative;height:var(--line);perspective:420px;white-space:nowrap}
.rl-size{display:block;height:var(--line);visibility:hidden}
.rl-wheel{display:block;position:absolute;inset:0;transform-style:preserve-3d;transition:transform .6s cubic-bezier(.22,1,.36,1)}
.rl-face{position:absolute;inset:0;display:flex;align-items:center;backface-visibility:hidden;transform:rotateX(calc(var(--k)*120deg)) translateZ(var(--rad))}
@media (prefers-reduced-motion:reduce){.rl-wheel{transition:none}}
`;
