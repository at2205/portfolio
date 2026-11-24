import type { Metadata, Viewport } from "next";
import "@fontsource-variable/mona-sans/wdth.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./globals.css";
import { profile } from "@/lib/data";
import { SiteChrome } from "@/components/SiteChrome";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.summary,
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteChrome />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
