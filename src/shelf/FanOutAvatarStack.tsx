"use client";
/** FanOutAvatarStack — overlapping avatars that fan apart on hover/focus, each staggered, with a "+N" tail. Pure CSS transitions. React only. */
const A = [["A", "#ea4f16"], ["K", "#ff630f"], ["M", "#f6af60"], ["S", "#b4460a"], ["D", "#c9531b"]];
export default function FanOutAvatarStack() {
  return (
    <div className="fa" tabIndex={0} aria-label="Team members">
      {A.map(([c, bg], i) => (<span key={c} style={{ background: bg, "--i": i, zIndex: A.length - i } as React.CSSProperties}>{c}</span>))}
      <b>+12</b>
      <style dangerouslySetInnerHTML={{ __html: `.fa{display:flex;align-items:center;padding:14px 20px;outline-offset:6px}.fa span{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;color:#000;font:500 22px var(--f-display,system-ui);border:3px solid #0a0a0a;margin-left:-18px;transform:translateX(0);transition:transform .55s cubic-bezier(.34,1.56,.64,1),margin .55s cubic-bezier(.34,1.56,.64,1);transition-delay:calc(var(--i)*30ms)}.fa span:first-child{margin-left:0}.fa:hover span,.fa:focus-visible span{margin-left:8px}.fa:hover span:first-child,.fa:focus-visible span:first-child{margin-left:0}.fa:hover span:hover{transform:translateY(-10px)}.fa b{margin-left:10px;font:500 13px var(--f-mono,monospace);opacity:.65}` }} />
    </div>
  );
}
