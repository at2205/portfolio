"use client";
/** ShimmerBorder — a point of light travelling the border, leaving a short conic trail. React only. */
export default function ShimmerBorder({ label = "Get started" }: { label?: string }) {
  return (
    <button className="sb">
      <span>{label}</span>
      <style dangerouslySetInnerHTML={{ __html: `
@property --a{syntax:'<angle>';inherits:false;initial-value:0deg}
.sb{position:relative;padding:18px 32px;border-radius:999px;background:#0a0a0a;font-size:18px;letter-spacing:-.02em}
.sb::before{content:"";position:absolute;inset:0;border-radius:inherit;padding:1.5px;background:conic-gradient(from var(--a),transparent 0 70%,#ff630f 90%,#fff 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:sb-spin 3s linear infinite}
.sb::after{content:"";position:absolute;inset:0;border-radius:inherit;border:1px solid rgba(255,255,255,.12)}
.sb span{position:relative}
@keyframes sb-spin{to{--a:360deg}}` }} />
    </button>
  );
}
