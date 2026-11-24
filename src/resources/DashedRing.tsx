/**
 * DashedRing — the ticked circle behind a title. A repeating conic gradient
 * cut into a ring with a radial mask: no asset, scales with the viewport, and
 * one keyword (`ring`) decides whether it exists at all.
 * One file. Nothing imported but React.
 */
export type DashedRingProps = {
  /** "dashed" draws the ring; "none" renders the children bare */
  ring?: "dashed" | "none";
  ticks?: number;
  size?: string;
  thickness?: number;
  spin?: boolean;
  children?: React.ReactNode;
};

export default function DashedRing({
  ring = "dashed",
  ticks = 90,
  size = "min(88vw, 720px)",
  thickness = 14,
  spin = true,
  children,
}: DashedRingProps) {
  if (ring === "none") return <div>{children}</div>;
  return (
    <div
      className="dr"
      style={
        {
          "--n": ticks,
          "--size": size,
          "--th": `${thickness}px`,
        } as React.CSSProperties
      }
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <span className="dr-ring" data-spin={spin} aria-hidden="true" />
      <div className="dr-in">{children}</div>
    </div>
  );
}

const css = `
.dr{position:relative;display:grid;place-items:center;width:var(--size);aspect-ratio:1;margin-inline:auto}
.dr-ring{position:absolute;inset:0;border-radius:50%;
 background:repeating-conic-gradient(from 0deg,var(--accent,#ff630f) 0 .9deg,transparent .9deg calc(360deg / var(--n)));
 -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--th)),#000 calc(100% - var(--th) + 1px));
 mask:radial-gradient(farthest-side,transparent calc(100% - var(--th)),#000 calc(100% - var(--th) + 1px))}
.dr-ring[data-spin="true"]{animation:dr-spin 90s linear infinite}
@keyframes dr-spin{to{transform:rotate(1turn)}}
.dr-in{position:relative;text-align:center;padding:12%}
@media (prefers-reduced-motion:reduce){.dr-ring{animation:none}}
`;
