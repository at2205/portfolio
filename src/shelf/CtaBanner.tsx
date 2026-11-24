"use client";
/** CtaBanner — a call-to-action band over a slow animated gradient, with a button that lights as the gradient passes under it. React only. */
export default function CtaBanner() {
  return (
    <div className="cb">
      <p>Have a system that needs building?</p>
      <a href="/contact" className="cb-b">Start a project ↗</a>
      <style dangerouslySetInnerHTML={{ __html: `.cb{width:min(520px,100%);display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding:24px 28px;border-radius:22px;background:linear-gradient(110deg,#ea4f16,#ff630f,#f6af60,#ea4f16);background-size:300% 100%;animation:cb-g 8s ease-in-out infinite;color:#000}.cb p{margin:0;font:500 26px/1 var(--f-display,system-ui);font-stretch:87.5%;letter-spacing:-.03em;text-transform:uppercase;max-width:14ch}.cb-b{padding:12px 20px;border-radius:999px;background:#000;color:#fff;font-size:15px;animation:cb-l 8s ease-in-out infinite;transition:transform .3s cubic-bezier(.34,1.56,.64,1)}.cb-b:hover{transform:scale(1.07)}@keyframes cb-g{50%{background-position:100% 0}}@keyframes cb-l{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0)}50%{box-shadow:0 0 22px 4px rgba(255,255,255,.55)}}` }} />
    </div>
  );
}
