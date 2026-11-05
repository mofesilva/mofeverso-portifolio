"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { skillTree } from "@/content/other";
import { work } from "@/content/site";
import { SkillIcon } from "../SkillIcon";
import { Container, SectionHeader } from "../ui";

const order = ["icalvinus", "oab-mack", "sigmaapp", "ipiconecta", "contrataja", "la-chapelle"];
const collection = order.map((slug) => projects.find((project) => project.slug === slug)!);

export function Work() {
  const [selected, setSelected] = useState(0);
  const p = collection[selected];
  return (
    <section id="trabalho" aria-labelledby="trabalho-titulo" className="scroll-mt-16 py-24 lg:py-36">
      <Container>
      <SectionHeader id="trabalho-titulo" title={work.title} aside={<><p className="font-medium text-fg">{work.subtitle}</p><p className="mt-2">{work.text}</p></>} />
      <nav aria-label="Escolher projeto" className="mt-14 grid grid-cols-3 gap-2 sm:gap-3 lg:mt-16">
        {collection.map((project, i) => (
          <button key={project.slug} type="button" aria-label={project.name} title={project.name} aria-pressed={selected === i} onClick={() => setSelected(i)} className={`flex h-20 items-center justify-center rounded-2xl border bg-panel p-3 transition-colors sm:h-24 sm:p-5 ${selected === i ? "border-accent ring-1 ring-accent" : "border-line-2 hover:border-fg-3"}`}>
            <span className="relative block h-full w-full max-w-[200px]"><Image src={project.slug === "sigmaapp" ? "/images/projects/sigma-brand.png" : `/images/projects/logo-${project.slug}${project.slug === "ipiconecta" || project.slug === "contrataja" ? "-light" : ""}.png`} alt="" fill sizes="(min-width: 640px) 200px, 30vw" className="object-contain" /></span>
          </button>
        ))}
      </nav>
      <div className="mt-4 overflow-hidden rounded-[24px] border border-line-2 bg-panel">
        <div className="p-5 sm:p-8 lg:p-10">
          <article className="min-w-0" aria-live="polite">
            <div className="grid items-center gap-5 px-1 pb-4 pt-3 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:px-4 lg:min-h-[550px]">
              <div className="order-2 md:order-1">
                <p className="text-[12px] font-medium uppercase tracking-[0.13em] text-accent-2">{p.category} / {p.platform}</p>
                <h3 className="mt-5 text-[48px] leading-none sm:text-[64px]">{p.name}</h3>
                <p className="mt-6 max-w-[38ch] text-[18px] leading-relaxed text-fg-2">{p.solution}</p>
                <p className="mt-6 text-[14px] text-fg-2"><span className="text-fg">Cliente</span> · {p.client}</p>
                <div className="mt-7 flex flex-wrap gap-2" aria-label={`Tecnologias de ${p.name}`}>
                  {p.stack.map((name) => { const skill = skillTree.find((item) => item.name === name); return skill ? <span key={name} title={name} aria-label={name}><SkillIcon icon={skill.icon} className="size-11" rounded="rounded-xl" /></span> : null; })}
                </div>
                <Link href={`/projetos/${p.slug}`} className="mt-9 inline-flex min-h-11 items-center gap-4 rounded-full bg-white px-5 text-[15px] font-medium text-black transition-colors hover:bg-white/85">Explorar o projeto <span aria-hidden="true">↗</span></Link>
              </div>
              <div className="relative order-1 flex h-[300px] items-center justify-center md:order-2 md:h-[460px]" style={{ background: `radial-gradient(ellipse at center, ${p.glow}35, transparent 70%)` }}>
                {p.media ? <Image key={p.slug} src={p.media.src} alt={`Apresentação de ${p.name}`} width={p.media.width} height={p.media.height} sizes="(min-width: 768px) 45vw, 90vw" className="relative max-h-[88%] w-auto max-w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.4)]" /> : null}
              </div>
            </div>
          </article>
        </div>
      </div>
      <p className="mt-10 max-w-[80ch] text-[14px] leading-relaxed text-fg-2">{work.note}</p>
      </Container>
    </section>
  );
}
