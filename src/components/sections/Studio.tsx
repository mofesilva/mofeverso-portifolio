"use client";

import { useState } from "react";
import { Keyboard, Plot, Riffle, Terminal } from "@lucasmarkes/hairline/react";
import { studio } from "@/content/other";
import { studioIntro } from "@/content/site";
import { SkillIcon } from "../SkillIcon";
import { Container, SectionHeader } from "../ui";

/** Chave de cada tecnologia em skill-icons.ts, a mesma do mapa de habilidades. */
const stackIcon: Record<string, string> = {
  Electron: "electron",
  TypeScript: "typescript",
  SQLite: "sqlite",
  Vite: "vite",
  "Tailwind CSS": "tailwindcss",
  "Next.js": "nextdotjs",
  React: "react",
  Flutter: "flutter",
  Dart: "dart",
  Express: "express",
  MongoDB: "mongodb",
};

/** Figura pronta do Hairline para cada projeto: a que mais se parece com o que ele faz. */
const figures = {
  // Mapa de calor do teclado: as teclas afundam sob o cursor.
  presso: { Figure: Keyboard, label: "Teclado: a tecla sob o cursor afunda e as vizinhas acompanham." },
  // CMS de artigos: uma bandeja de cartões, o artigo sob o cursor sai da fila.
  nerdcave: { Figure: Riffle, label: "Bandeja de artigos: o cartão sob o cursor se levanta." },
  // Finanças pessoais: um gráfico de barras que reage ao cursor.
  finch: { Figure: Plot, label: "Gráfico de barras: as barras se levantam sob o cursor." },
  // Agente: uma janela de terminal com histórico em linhas.
  minim: { Figure: Terminal, label: "Terminal: a linha sob o cursor se levanta." },
} as const;

/** Mesma estrutura da seção Trabalho: botões para escolher e um painel só, em destaque. */
export function Studio() {
  const [selected, setSelected] = useState(0);
  const p = studio[selected];
  const { Figure, label } = figures[p.figure];
  return (
    <section id="atelie" aria-labelledby="atelie-titulo" className="scroll-mt-16 py-24 lg:py-36">
      <Container>
        <SectionHeader
          id="atelie-titulo"
          title={studioIntro.title}
          aside={
            <>
              <p className="font-medium text-fg">{studioIntro.subtitle}</p>
              <p className="mt-2">{studioIntro.text}</p>
            </>
          }
        />

        <nav aria-label="Escolher projeto em construção" className="mt-14 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:mt-16">
          {studio.map((project, i) => (
            <button
              key={project.name}
              type="button"
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
              className={`flex h-16 items-center justify-center rounded-2xl border bg-panel px-3 text-[20px] font-semibold tracking-[-0.02em] transition-colors sm:h-20 sm:text-[24px] ${
                selected === i ? "border-accent text-fg ring-1 ring-accent" : "border-line-2 text-fg-2 hover:border-fg-3 hover:text-fg"
              }`}
            >
              {project.name}
            </button>
          ))}
        </nav>

        <div className="mt-4 overflow-hidden rounded-[24px] border border-line-2 bg-panel">
          <article className="p-5 sm:p-8 lg:p-10" aria-live="polite">
            <div className="grid items-center gap-8 px-1 pb-4 pt-3 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-10 md:px-4 lg:min-h-[420px]">
              <div className="order-2 md:order-1">
                <p className="text-[12px] font-medium uppercase tracking-[0.13em] text-accent-2">{p.stage}</p>
                <h3 className="mt-5 text-[48px] leading-none sm:text-[64px]">{p.name}</h3>
                {p.text ? <p className="mt-6 max-w-[44ch] text-[18px] leading-relaxed text-fg-2">{p.text}</p> : null}
                {p.notice ? <p role="note" className="mt-4 max-w-[44ch] text-[14px] leading-relaxed text-fg-3">{p.notice}</p> : null}
                {p.stack ? (
                  <div className="mt-7 flex flex-wrap gap-2" role="list" aria-label={`Tecnologias de ${p.name}`}>
                    {p.stack.map((name) => (
                      <span key={name} role="listitem" title={name} aria-label={name}>
                        <SkillIcon icon={stackIcon[name]} className="size-11" rounded="rounded-xl" />
                      </span>
                    ))}
                  </div>
                ) : null}
                {p.link ? (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-9 inline-flex min-h-11 items-center gap-4 rounded-full bg-white px-5 text-[15px] font-medium text-black transition-colors hover:bg-white/85"
                  >
                    Ver no {p.link.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                ) : null}
              </div>
              <div className="order-1 flex items-center justify-center md:order-2">
                <Figure key={p.figure} theme="dark" label={label} className="hairline-figure w-full max-w-[380px]" />
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
