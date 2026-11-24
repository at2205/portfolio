"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RollingLabel from "@/resources/RollingLabel";

/** One IntersectionObserver hook shared by Reveal and Split. */
function useInView<T extends HTMLElement>(margin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, seen] as const;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "li" | "section";
}) {
  const [ref, seen] = useInView<HTMLElement>();
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={`rev ${className}`}
      data-in={seen}
      style={{ "--delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}

/** Letter-by-letter heading. Each word stays whole so lines wrap cleanly. */
export function Split({
  text,
  className = "",
  as: Tag = "h2",
  step = 0.035,
  base = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  step?: number;
  base?: number;
}) {
  const [ref, seen] = useInView<HTMLElement>("0px 0px -8% 0px");
  const Comp = Tag as React.ElementType;
  let n = 0;
  return (
    <Comp ref={ref} className={`split display ${className}`} data-in={seen} aria-label={text}>
      {text.split(" ").map((w, wi) => (
        <span key={wi} className="w" aria-hidden="true">
          {[...w].map((c, ci) => (
            <span key={ci} className="ch" style={{ "--d": `${base + n++ * step}s` } as React.CSSProperties}>
              {c}
            </span>
          ))}
          {" "}
        </span>
      ))}
    </Comp>
  );
}

export function useNavigate() {
  const router = useRouter();
  return (href: string) => router.push(href);
}

/** A pill link. Internal hrefs go through the router; labels roll on hover. */
export function Pill({
  href,
  label,
  variant = "solid",
}: {
  href: string;
  label: string;
  variant?: "solid" | "ghost";
}) {
  const router = useRouter();
  const internal = href.startsWith("/") && !href.includes(".");
  return (
    <RollingLabel
      label={label}
      href={href}
      variant={variant}
      onClick={(e) => {
        if (internal && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          router.push(href);
        }
      }}
    />
  );
}

export function SecHead({ index, kicker, aside }: { index: string; kicker: string; aside?: string }) {
  return (
    <div className="secHead">
      <p className="label">
        <b>{`[${index}]`}</b> &nbsp;// {kicker}
      </p>
      {aside && <p className="label">{aside}</p>}
    </div>
  );
}
