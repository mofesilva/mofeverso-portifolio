"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { skillTree } from "@/content/other";
import { work } from "@/content/site";
import { SkillIcon } from "../SkillIcon";
import { StepNav } from "../StepNav";
import { useScrollSteps } from "../useScrollSteps";
import { Container, SectionHeader } from "../ui";

const order = ["icalvinus", "oab-mack", "sigmaapp", "ipiconecta", "contrataja", "la-chapelle"];
const collection = order.map((slug) => projects.find((project) => project.slug === slug)!);
const N = collection.length;

/** Sequência presa à tela, um projeto por passo, rolando para trocar. */
export function Work() {
  const { ref, index: scrollIndex, progress, goTo, height } = useScrollSteps<HTMLDivElement>(N);
  // No celular a sequência presa não funciona (o conteúdo é mais alto que a tela): a troca é por toque.
  const [mobile, setMobile] = useState(false);
  const [picked, setPicked] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const index = mobile ? picked : scrollIndex;
  const p = collection[index];

  return (
    <section id="trabalho" aria-labelledby="trabalho-titulo" className="scroll-mt-16">
      <div ref={ref} style={{ "--h": height } as React.CSSProperties} className="relative md:h-[var(--h)]">
        <div className="flex flex-col pb-6 pt-24 md:sticky md:top-0 md:h-svh md:justify-center md:pt-20">
        <Container>
          <SectionHeader
            id="trabalho-titulo"
            title={work.title}
            aside={
              <>
                <p className="font-medium text-fg">{work.subtitle}</p>
                <p className="mt-2">{work.text}</p>
              </>
            }
          />
        </Container>
          <Container className="mt-6 w-full">
            <div className="grid items-center gap-4 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-12">
              <div key={p.slug} className="fact-in order-2 md:order-1" aria-live="polite">
                <p className="text-[12px] font-medium uppercase tracking-[0.13em] text-accent-2">
                  {p.category} / {p.platform}
                </p>
                <h3 className="mt-4 text-[44px] leading-none sm:text-[60px] lg:text-[64px] [@media(min-height:1000px)]:lg:text-[76px]">{p.name}</h3>
                <p className="mt-5 max-w-[40ch] text-[17px] leading-relaxed text-fg-2 lg:text-[18px]">{p.solution}</p>
                <p className="mt-4 text-[14px] text-fg-2">
                  <span className="text-fg">Cliente</span> · {p.client}
                </p>
                <div className="mt-5 flex flex-wrap gap-2" aria-label={`Tecnologias de ${p.name}`}>
                  {p.stack.map((name) => {
                    const skill = skillTree.find((item) => item.name === name);
                    return skill ? (
                      <span key={name} title={name} aria-label={name}>
                        <SkillIcon icon={skill.icon} className="size-10" rounded="rounded-xl" />
                      </span>
                    ) : null;
                  })}
                </div>
                <Link
                  href={`/projetos/${p.slug}`}
                  className="mt-7 inline-flex min-h-11 items-center gap-4 rounded-full bg-white px-5 text-[15px] font-medium text-black transition-colors hover:bg-white/85"
                >
                  Explorar o projeto <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <div
                key={`media-${p.slug}`}
                className="fact-fig relative order-1 flex h-[26svh] items-center justify-center md:order-2 md:h-[min(36svh,320px)] [@media(min-height:1000px)]:md:h-[min(52svh,460px)]"
                style={{ background: `radial-gradient(ellipse at center, ${p.glow}35, transparent 70%)` }}
              >
                {p.gallery[0] ? (
                  <Image
                    src={p.gallery[0].src}
                    alt={`Apresentação de ${p.name}`}
                    width={p.gallery[0].width}
                    height={p.gallery[0].height}
                    sizes="(min-width: 768px) 45vw, 90vw"
                    quality={90}
                    className="relative max-h-[88%] w-auto max-w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.4)]"
                  />
                ) : null}
              </div>
            </div>

            <nav aria-label="Projetos" className="mt-8 flex flex-wrap gap-2 md:hidden">
              {collection.map((c, i) => (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={i === index}
                  onClick={() => setPicked(i)}
                  className={`min-h-11 rounded-full border px-4 text-[14px] transition-colors ${i === index ? "border-accent text-fg" : "border-line-2 text-fg-3"}`}
                >
                  {c.name}
                </button>
              ))}
            </nav>
            <div className="hidden md:block">
              <StepNav label="Projetos" items={collection.map((c) => c.name)} index={index} progress={progress} onSelect={goTo} />
            </div>
            <p className="mt-5 max-w-[80ch] text-[13px] leading-relaxed text-fg-3">{work.note}</p>
          </Container>
        </div>
      </div>

      <div className="h-16 lg:h-24" aria-hidden="true" />
    </section>
  );
}
