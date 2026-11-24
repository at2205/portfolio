"use client";
import { useEffect, useRef } from "react";

/**
 * CursorPill — a drawn cursor that opens into a labelled pill over anything
 * that says what it does. The label is read off the element (data-cursor,
 * then aria-label, then title, then short text) rather than written in.
 * All movement goes through refs; there is no React state per mouse move.
 * One file. Nothing imported but React. Mount once, near the root.
 */
export default function CursorPill() {
  const body = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = body.current!;
    const label = text.current!;
    const root = document.documentElement;
    root.classList.add("cp-on");

    let x = -100,
      y = -100,
      cx = x,
      cy = y,
      raf = 0,
      shown = "";

    const read = (t: EventTarget | null) => {
      const h = (t as Element | null)?.closest?.(
        "[data-cursor],a,button,[role=button],summary,input,textarea,select"
      ) as HTMLElement | null;
      if (!h) return { text: "", mode: "" };
      if (h.matches("input,textarea,select")) return { text: "", mode: "text" };
      const own = h.getAttribute("data-cursor");
      if (own === "") return { text: "", mode: "" };
      const raw =
        own ??
        h.getAttribute("aria-label") ??
        h.getAttribute("title") ??
        (h.textContent || "").replace(/\s+/g, " ").trim();
      return { text: raw.length > 0 && raw.length <= 22 ? raw : h.matches("a") ? "Open" : "Press", mode: "pill" };
    };

    const over = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const r = read(e.target);
      if (r.text !== shown) {
        shown = r.text;
        label.textContent = r.text;
      }
      el.dataset.mode = r.mode;
      el.dataset.down = el.dataset.down ?? "false";
    };
    const down = () => (el.dataset.down = "true");
    const up = () => (el.dataset.down = "false");
    const leave = () => (el.style.opacity = "0");
    const enter = () => (el.style.opacity = "1");

    const tick = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("cp-on");
      window.removeEventListener("pointermove", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <div className="cp" aria-hidden="true">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={body} className="cp-body" data-mode="" data-down="false" style={{ transform: "translate3d(-100px,-100px,0)" }}>
        <span ref={text} />
      </div>
    </div>
  );
}

const css = `
.cp-on,.cp-on a,.cp-on button,.cp-on [role=button],.cp-on summary{cursor:none}
.cp-on input,.cp-on textarea,.cp-on select{cursor:text}
.cp{position:fixed;left:0;top:0;z-index:9999;pointer-events:none}
.cp-body{position:fixed;left:0;top:0;display:flex;align-items:center;justify-content:center;height:12px;min-width:12px;max-width:12px;border-radius:999px;background:#fff;color:#000;mix-blend-mode:normal;transition:max-width .35s var(--e-out,cubic-bezier(.22,1,.36,1)),height .35s var(--e-out,cubic-bezier(.22,1,.36,1)),background .25s,opacity .25s,scale .2s;overflow:hidden;white-space:nowrap;will-change:transform}
.cp-body span{font-family:var(--f-mono,monospace);font-size:0;letter-spacing:.04em;text-transform:uppercase;padding:0;transition:font-size .2s,padding .35s}
.cp-body[data-mode="pill"]{height:34px;max-width:260px;background:var(--accent,#ff630f)}
.cp-body[data-mode="pill"] span{font-size:12px;padding:0 16px}
.cp-body[data-mode="text"]{height:22px;max-width:2px;min-width:2px;border-radius:1px}
.cp-body[data-down="true"]{scale:.82}
@media (hover:none),(pointer:coarse){.cp{display:none}}
`;
