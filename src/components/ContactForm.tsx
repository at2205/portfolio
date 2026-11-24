"use client";
import { useState } from "react";
import { profile } from "@/lib/data";

/** No backend: the form composes a mailto: with what was typed. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Project enquiry — ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="cf" onSubmit={submit}>
      <label>
        <span className="label">Name</span>
        <input name="name" required autoComplete="name" placeholder="Your name" />
      </label>
      <label>
        <span className="label">E-mail</span>
        <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
      </label>
      <label>
        <span className="label">The brief</span>
        <textarea name="message" required rows={5} placeholder="What are we building?" />
      </label>
      <button className="pill" type="submit">{sent ? "Opening your mail app ✓" : "Send it"} <span aria-hidden="true">↗</span></button>
      <style dangerouslySetInnerHTML={{ __html: `
        .cf{display:grid;gap:22px}
        .cf label{display:grid;gap:8px}
        .cf input,.cf textarea{background:transparent;border:0;border-bottom:1px solid var(--rule);color:#fff;font:inherit;font-size:clamp(20px,2vw,28px);letter-spacing:-.02em;padding:10px 0;outline:none;resize:vertical;transition:border-color .25s}
        .cf input:focus,.cf textarea:focus{border-color:var(--accent)}
        .cf ::placeholder{color:rgba(255,255,255,.28)}
        .cf .pill{justify-self:start;margin-top:8px}
      ` }} />
    </form>
  );
}
