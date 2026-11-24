"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderMegaMenu from "@/resources/HeaderMegaMenu";
import SideDrawer from "@/resources/SideDrawer";
import CursorPill from "@/resources/CursorPill";
import { Pill } from "@/components/ui";
import { menuGroups, brand } from "@/lib/site";
import { profile } from "@/lib/data";

/** Mounts everything that lives outside the page: nav, drawer, cursor, progress. */
export function SiteChrome() {
  const router = useRouter();
  const [about, setAbout] = useState(false);

  // any element with [data-open-about] opens the drawer
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const t = (e.target as Element).closest?.("[data-open-about]");
      if (t) {
        e.preventDefault();
        setAbout(true);
      }
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);

  // reading progress, written straight to a CSS variable
  useEffect(() => {
    const el = document.getElementById("progress");
    const on = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      el?.style.setProperty("--p", String(max > 0 ? scrollY / max : 0));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
    };
  }, []);

  return (
    <>
      <div id="progress" className="progress" aria-hidden="true" />
      <CursorPill />
      <HeaderMegaMenu
        brand={brand}
        groups={menuGroups}
        cta={{ label: "Start a project", href: "/contact" }}
        feature={{
          kicker: "Free · no sign-up",
          title: "Take the parts",
          blurb: "Nine components from this site, each running on its own card — the idea, the traps, and a prompt that rebuilds it.",
          href: "/resources",
          cta: "Open resources",
        }}
        onNavigate={(href) => router.push(href)}
      />
      <SideDrawer open={about} onClose={() => setAbout(false)} title="About">
        <h2 className="display" style={{ fontSize: "clamp(44px,7vw,84px)", marginBottom: 28 }}>
          A studio of one.
        </h2>
        <p className="label" style={{ marginBottom: 6 }}>
          {profile.name}
        </p>
        <p style={{ marginBottom: 24, color: "var(--soft)" }}>
          {profile.role} · {profile.location}
        </p>
        <p style={{ marginBottom: 16, color: "var(--soft)" }}>{profile.summary}</p>
        <dl className="drawer-dl">
          <dt className="label">Status</dt>
          <dd className="badge">Taking work now</dd>
          <dt className="label">Based in</dt>
          <dd>{profile.location}</dd>
          <dt className="label">Elsewhere</dt>
          <dd>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <br />
            <a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            {" · "}
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </dd>
        </dl>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }} onClick={() => setAbout(false)}>
          <Pill href="/contact" label="Start a project" />
          <Pill href="/projects" label="See the work" variant="ghost" />
        </div>
      </SideDrawer>
      <style dangerouslySetInnerHTML={{ __html: `
        .drawer-dl{display:grid;grid-template-columns:110px 1fr;gap:14px 16px;margin:28px 0 0;padding-top:20px;border-top:1px solid var(--rule)}
        .drawer-dl dd{margin:0;color:var(--soft)}
        .drawer-dl dt{padding-top:3px}
      ` }} />
    </>
  );
}
