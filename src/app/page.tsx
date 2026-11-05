import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Facts } from "@/components/sections/Facts";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Method } from "@/components/sections/Method";
import { Skills } from "@/components/sections/Skills";
import { Studio } from "@/components/sections/Studio";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Facts />
      <Education />
      <Method />
      <Work />
      <Studio />
      <Skills />
      <Journey />
      <Contact />
    </main>
  );
}
