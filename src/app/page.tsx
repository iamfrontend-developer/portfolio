import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import { aboutData } from "@/data/about";
import { projectsData } from "@/data/projects";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <About data={aboutData} />
      <Projects data={projectsData} />
    </main>
  );
}
