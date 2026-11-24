"use client";
import { useRouter } from "next/navigation";
import HeroSection from "@/resources/HeroSection";

export function HomeHero() {
  const router = useRouter();
  return (
    <HeroSection
      first="Aryan"
      last="Tomar"
      kicker="[ SPEC-01 // BACKEND + LLM SYSTEMS ]"
      tagline="I build scalable backend systems and the LLM automation that removes the busy work behind them."
      status="Available for work // '26"
      cta={{
        label: "View work",
        href: "/projects",
        onClick: (e) => {
          e.preventDefault();
          router.push("/projects");
        },
      }}
      image="/portrait.png"
    />
  );
}
