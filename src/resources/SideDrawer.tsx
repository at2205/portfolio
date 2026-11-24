"use client";
import { useEffect, useRef, useState } from "react";

/**
 * SideDrawer — a panel that arrives tilted and straightens, carrying a page
 * of content without taking the reader off the page they were on.
 * Handles focus (trap + restore), Escape, scroll lock and a scrim.
 * One file. Nothing imported but React.
 */
export type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** render inside a frame instead of over the viewport (for demos) */
  contained?: boolean;
};

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

export default function SideDrawer({ open, onClose, title, children, contained }: SideDrawerProps) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  // mount -> next frame show; hide -> wait for the transition -> unmount
  useEffect(() => {
    if (open) {
      opener.current = document.activeElement as HTMLElement;
      setMounted(true);
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(r);
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), 650);
    return () => clearTimeout(t);
  }, [open]);

  // scroll lock (without the layout jump) + focus management
  useEffect(() => {
    if (!open || !mounted) return;
    let restore = () => {};
    if (!contained) {
      const gap = window.innerWidth - document.documentElement.clientWidth;
      const prev = document.body.style.cssText;
      document.body.style.overflow = "hidden";
      if (gap) document.body.style.paddingRight = `${gap}px`;
      restore = () => (document.body.style.cssText = prev);
    }
    panel.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const f = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!f.length) return e.preventDefault();
      const first = f[0],
        last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
      else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      restore();
      opener.current?.focus?.();
    };
  }, [open, mounted, contained, onClose]);

  if (!mounted) return null;
  return (
    <div className={`sd ${contained ? "sd-in" : ""}`} data-shown={shown}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="sd-scrim" onClick={onClose} />
      <div
        ref={panel}
        className="sd-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
      >
        <div className="sd-head">
          <span className="sd-title">{title}</span>
          <button className="sd-close" onClick={onClose}>
            Close <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="sd-body">{children}</div>
      </div>
    </div>
  );
}

const css = `
.sd{position:fixed;inset:0;z-index:300;perspective:1800px;perspective-origin:100% 50%;overflow:hidden}
.sd-in{position:absolute;z-index:20;border-radius:inherit}
.sd-scrim{position:absolute;inset:0;background:rgba(0,0,0,.55);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);opacity:0;transition:opacity .5s ease}
.sd[data-shown="true"] .sd-scrim{opacity:1}
.sd-panel{position:absolute;top:10px;right:10px;bottom:10px;width:min(560px,calc(100% - 20px));display:flex;flex-direction:column;border-radius:22px;border:1px solid rgba(255,255,255,.16);background:#0f0e0d;color:#fff;transform-origin:100% 50%;transform:translateX(108%) rotateY(-22deg);opacity:.4;transition:transform .65s var(--e-out,cubic-bezier(.22,1,.36,1)),opacity .45s;outline:none;overflow:hidden}
.sd[data-shown="true"] .sd-panel{transform:none;opacity:1}
.sd-head{display:flex;justify-content:space-between;align-items:center;padding:18px 22px;border-bottom:1px solid rgba(255,255,255,.12);flex:none}
.sd-title,.sd-close{font-family:var(--f-mono,monospace);font-size:12px;letter-spacing:.06em;text-transform:uppercase}
.sd-title{color:rgba(255,255,255,.5)}
.sd-close{padding:8px 4px;transition:color .2s}
.sd-close:hover{color:var(--accent,#ff630f)}
.sd-body{padding:clamp(20px,3vw,36px);overflow:auto;flex:1}
@media (prefers-reduced-motion:reduce){.sd-panel{transition:opacity .2s;transform:none}}
`;
