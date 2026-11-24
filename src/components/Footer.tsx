import Link from "next/link";
import { profile } from "@/lib/data";
import { menuGroups } from "@/lib/site";

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <p className="label" style={{ marginBottom: 14 }}>E-mail</p>
            <a className="foot-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
            <p className="foot-line">{profile.phone}</p>
            <p className="foot-line">{profile.location}</p>
          </div>
          {menuGroups.map((g) => (
            <div key={g.label}>
              <p className="label" style={{ marginBottom: 14 }}>{g.label}</p>
              <ul>
                {g.items.map((i) => (
                  <li key={i.label}>
                    <Link href={i.href}>{i.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="label" style={{ marginBottom: 14 }}>Elsewhere</p>
            <ul>
              <li><a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>
              <li><a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
              <li><button data-open-about>About me ↗</button></li>
            </ul>
          </div>
        </div>
        <p className="foot-word display" aria-hidden="true">Aryan Tomar</p>
        <div className="foot-base">
          <span className="label">© {new Date().getFullYear()} {profile.name}</span>
          <span className="label">Built with Next.js · available for work &apos;26</span>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .foot{border-top:1px solid var(--rule);padding-top:clamp(48px,7vw,96px);overflow:hidden}
        .foot-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:32px}
        .foot-grid li{padding:4px 0}
        .foot-grid a,.foot-grid button{color:var(--soft);transition:color .2s}
        .foot-grid a:hover,.foot-grid button:hover{color:var(--accent)}
        .foot-mail{font-family:var(--f-display);font-stretch:87.5%;font-size:clamp(24px,3vw,44px);letter-spacing:-.04em;display:block;margin-bottom:12px}
        .foot-mail:hover{color:var(--accent)}
        .foot-line{color:var(--soft)}
        .foot-word{font-size:clamp(70px,19vw,360px);line-height:.8;margin:clamp(40px,7vw,100px) 0 0;white-space:nowrap;color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.22);letter-spacing:-.06em;user-select:none}
        .foot-base{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-block:24px}
        @media (max-width:900px){.foot-grid{grid-template-columns:1fr 1fr}.foot-grid>:first-child{grid-column:1/-1}}
      ` }} />
    </footer>
  );
}
