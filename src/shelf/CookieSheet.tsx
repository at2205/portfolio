"use client";
import { useState } from "react";
/** CookieSheet — a consent sheet that slides up from the bottom edge with equal-weight Accept and Decline, and a way to re-open it. Contained here. React only. */
export default function CookieSheet() {
  const [open, setOpen] = useState(true);
  return (
    <div className="ck">
      <button className="chip" onClick={() => setOpen(true)} style={{ position: "absolute", left: 14, top: 14 }}>Show sheet</button>
      <section className="ck-s" data-open={open} aria-label="Cookie consent" aria-hidden={!open}>
        <p><b>Cookies.</b> Only the ones that keep the site working, unless you say otherwise.</p>
        <div><button tabIndex={open ? 0 : -1} className="pill ghost" onClick={() => setOpen(false)}>Decline</button><button tabIndex={open ? 0 : -1} className="pill" onClick={() => setOpen(false)}>Accept</button></div>
      </section>
      <style dangerouslySetInnerHTML={{ __html: `.ck{position:relative;width:min(460px,100%);height:230px;border-radius:20px;overflow:hidden;background:#0a0a0a;border:1px solid rgba(255,255,255,.1)}.ck-s{position:absolute;left:10px;right:10px;bottom:10px;padding:16px;border-radius:16px;background:#1a1a1a;border:1px solid rgba(255,255,255,.14);display:grid;gap:12px;transform:translateY(130%);transition:transform .6s cubic-bezier(.34,1.3,.64,1)}.ck-s[data-open="true"]{transform:none}.ck-s p{margin:0;font-size:13px;color:rgba(255,255,255,.75)}.ck-s b{color:#fff}.ck-s div{display:flex;gap:8px}.ck-s .pill{padding:10px 18px;font-size:14px;flex:1;justify-content:center}` }} />
    </div>
  );
}
