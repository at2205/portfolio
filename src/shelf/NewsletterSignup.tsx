"use client";
import { useState } from "react";
/** NewsletterSignup — an inline form with idle → sending → done states, validation, and a button that morphs between them. Wire onSubmit to your endpoint. React only. */
export default function NewsletterSignup() {
  const [s, setS] = useState<"idle" | "sending" | "done">("idle");
  return (
    <form className="ns" onSubmit={(e) => { e.preventDefault(); setS("sending"); setTimeout(() => setS("done"), 1200); }}>
      <input type="email" required placeholder="you@company.com" aria-label="Email" disabled={s !== "idle"} />
      <button data-s={s} disabled={s !== "idle"}>
        <span>Subscribe</span><span>Sending…</span><span>Subscribed ✓</span>
      </button>
      <style dangerouslySetInnerHTML={{ __html: `.ns{display:flex;gap:6px;padding:6px;border-radius:999px;background:#141414;border:1px solid rgba(255,255,255,.14);width:min(420px,100%)}.ns input{flex:1;min-width:0;padding:0 16px;background:none;border:0;color:#fff;font:inherit;outline:none}.ns button{position:relative;height:44px;width:128px;border-radius:999px;background:#fff;color:#000;overflow:hidden;font-size:14px;transition:width .5s cubic-bezier(.34,1.56,.64,1),background .3s}.ns button span{position:absolute;inset:0;display:grid;place-items:center;white-space:nowrap;transition:transform .4s cubic-bezier(.22,1,.36,1),opacity .3s}.ns button span:nth-child(2){transform:translateY(100%);opacity:0}.ns button span:nth-child(3){transform:translateY(100%);opacity:0}.ns button[data-s="sending"] span:nth-child(1){transform:translateY(-100%);opacity:0}.ns button[data-s="sending"] span:nth-child(2){transform:none;opacity:1}.ns button[data-s="done"]{background:#ff630f;width:150px}.ns button[data-s="done"] span:nth-child(1){transform:translateY(-100%);opacity:0}.ns button[data-s="done"] span:nth-child(3){transform:none;opacity:1}` }} />
    </form>
  );
}
