import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import { aboutData } from "@/data/about";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
      <About data={aboutData} />
    </main>
  );
}
