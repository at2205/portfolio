import { Background } from "@/components/Background";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { BackendProjects } from "@/components/BackendProjects";
import { FrontendDemos } from "@/components/FrontendDemos";
import { Process } from "@/components/Process";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <BackendProjects />
        <FrontendDemos />
        <Process />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
