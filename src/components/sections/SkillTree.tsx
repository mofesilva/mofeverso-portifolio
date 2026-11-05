"use client";

import { useMemo, useRef, useState } from "react";
import { SkillIcon } from "../SkillIcon";
import { SkillCard, type ResolvedSkill } from "./SkillCard";

// Coordenadas em uma grade de quatro colunas.
const areas = [
  { id: "frontend", name: "Front-end", description: "Interfaces e aplicações web", columns: 4, nodes: [
    ["javascript", 0, 0], ["typescript", 1, 0], ["react", 2, 0], ["nextjs", 3, 0],
    ["electron", 0, 1], ["vite", 1, 1], ["tailwind", 3, 1],
  ] },
  { id: "backend", name: "Back-end e dados", description: "Serviços, validação e persistência", columns: 4, nodes: [
    ["nodejs", 0, 0], ["express", 1, 0], ["mysql", 2, 0], ["mongodb", 3, 0],
    ["jest", 0, 1], ["zod", 1, 1], ["sqlite", 2, 1],
  ] },
  { id: "mobile", name: "Mobile", description: "Aplicativos e experiência nativa", columns: 3, nodes: [
    ["flutter", 1, 0], ["dart", 0, 1], ["riverpod", 1, 1], ["firebase", 2, 1],
  ] },
  { id: "infra", name: "Infraestrutura", description: "Versionamento e operação", columns: 3, nodes: [
    ["git", 0, 0], ["docker", 1, 0], ["debian", 2, 0],
    ["github", 0, 1], ["akamai", 2, 1],
  ] },
] satisfies { id: string; name: string; description: string; columns: number; nodes: [string, number, number][] }[];

// A trilha visual compartilha segmentos; os vínculos da ficha permanecem nos dados.
const connectionParents: Record<string, string> = {
  mysql: "express",
  mongodb: "mysql",
  sqlite: "mysql",
};

type SkillTreeProps = {
  skills: ResolvedSkill[];
  initial: string;
  labels: {
    practical: string; linkedTo: string; branch: string; projects: string;
    main: string; passive: string; tree: string;
  };
};

export function SkillTree({ skills, initial, labels }: SkillTreeProps) {
  const [selected, setSelected] = useState(initial);
  const [expanded, setExpanded] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const byId = useMemo(() => new Map(skills.map((skill) => [skill.id, skill])), [skills]);
  const current = byId.get(selected) ?? skills[0];
  const activeArea = areas.find((area) => area.nodes.some(([id]) => id === current?.id)) ?? areas[0];
  const path = new Set<string>();
  let ancestor: ResolvedSkill | undefined = current;
  while (ancestor && !path.has(ancestor.id)) {
    path.add(ancestor.id);
    const parentId: string | null = connectionParents[ancestor.id] ?? ancestor.parent;
    ancestor = parentId ? byId.get(parentId) : undefined;
  }

  if (!current) return null;

  function selectArea(index: number) {
    setSelected(areas[index].nodes[0][0]);
    setExpanded(false);
  }

  return (
    <div className="skill-map mt-12 w-full">
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-4 text-[12px] text-fg-2">
        <p><span className="mr-3 text-accent-2">{skills.length.toString().padStart(2, "0")}</span>habilidades · {areas.length} áreas</p>
        <div className="flex items-center gap-5" aria-label="Legenda">
          <span className="flex items-center gap-2"><span className="skill-legend-hex" />{labels.main}</span>
          <span className="flex items-center gap-2"><span className="size-2.5 rounded-full border border-fg-3" />{labels.passive}</span>
        </div>
      </div>

      <div className="skill-tabs" role="tablist" aria-label="Áreas de habilidades">
        {areas.map((area, index) => (
          <button key={area.id} type="button" role="tab" id={`skill-tab-${area.id}`}
            ref={(element) => { tabRefs.current[index] = element; }}
            aria-selected={area.id === activeArea.id} aria-controls={`skill-panel-${area.id}`}
            tabIndex={area.id === activeArea.id ? 0 : -1}
            className="skill-tab"
            onClick={() => selectArea(index)}
            onKeyDown={(event) => {
              let next: number;
              switch (event.key) {
                case "ArrowRight": next = (index + 1) % areas.length; break;
                case "ArrowLeft": next = (index + areas.length - 1) % areas.length; break;
                case "Home": next = 0; break;
                case "End": next = areas.length - 1; break;
                default: return;
              }
              event.preventDefault();
              selectArea(next);
              tabRefs.current[next]?.focus();
            }}>
            <span aria-hidden="true" className="skill-tab-number">0{index + 1}</span>
            {area.name}
          </button>
        ))}
      </div>

      <div className="skill-layout">
        <div role="group" aria-label={labels.tree} className="skill-areas">
          {areas.map((area) => (
            <section key={area.id} role="tabpanel" id={`skill-panel-${area.id}`} aria-labelledby={`skill-tab-${area.id}`}
              hidden={area.id !== activeArea.id} tabIndex={0} className="skill-area">
              <header className="mb-10 flex items-start justify-between gap-3">
                <div>
                  <h3 id={`skill-area-${area.id}`} className="text-[30px] leading-tight sm:text-[36px]">{area.name}</h3>
                  <p className="mt-2 text-[14px] text-fg-2">{area.description}</p>
                </div>
                <span className="pt-2 text-[12px] text-fg-3">{area.nodes.length} habilidades</span>
              </header>
              <div className="skill-graph">
                <svg aria-hidden="true" viewBox={`0 0 ${area.columns * 100} 200`} preserveAspectRatio="none" className="skill-connections">
                  {area.nodes.map(([id, column, row]) => {
                    const skill = byId.get(id);
                    const parentId = connectionParents[id] ?? skill?.parent;
                    const parent = area.nodes.find(([nodeId]) => nodeId === parentId);
                    if (!parent) return null;
                    const x1 = parent[1] * 100 + 50, y1 = parent[2] * 100 + 34;
                    const x2 = column * 100 + 50, y2 = row * 100 + 34;
                    const d = `M ${x1} ${y1} H ${x2} V ${y2}`;
                    return <path key={id} d={d} data-on={path.has(id)} />;
                  })}
                </svg>
                <ul className="skill-nodes" style={{ gridTemplateColumns: `repeat(${area.columns}, minmax(0, 1fr))` }}>
                  {area.nodes.map(([id, column, row]) => {
                    const skill = byId.get(id);
                    if (!skill) return null;
                    const active = selected === id;
                    return (
                      <li key={id} style={{ gridColumn: column + 1, gridRow: row + 1 }}>
                        <button type="button" aria-label={skill.name} aria-pressed={active} aria-controls="skill-detail"
                          className="skill-node" data-main={skill.kind === "main"} data-on={path.has(id)}
                          onClick={() => setSelected(id)}>
                          <span className="skill-node-frame">
                            <SkillIcon icon={skill.icon} tone={active ? "active" : path.has(id) ? "path" : "base"} rounded="" className="skill-node-icon" />
                          </span>
                          <span className="skill-node-label">{skill.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          ))}
          <p className="col-span-full text-[12px] text-fg-3">Selecione uma habilidade para explorar suas conexões e projetos.</p>
        </div>

        <aside id="skill-detail" aria-label="Ficha técnica da habilidade" className="skill-detail" data-expanded={expanded}>
          <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-fg-3">Ficha da habilidade</p>
            <span className="text-[11px] text-accent-2">{activeArea.name}</span>
          </div>
          <div className="skill-mobile-summary mt-4 items-center gap-3">
            <SkillIcon icon={current.icon} className="size-11" />
            <p className="min-w-0 flex-1 text-[17px]">{current.name}</p>
            <button type="button" aria-expanded={expanded} aria-controls="skill-card-content" className="min-h-11 px-2 text-[12px] text-accent-2" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Fechar −" : "Ver ficha +"}
            </button>
          </div>
          <div id="skill-card-content" className="skill-card-content">
            <SkillCard skill={current} parent={current.parent ? byId.get(current.parent) : undefined} labels={labels} />
          </div>
        </aside>
      </div>
    </div>
  );
}
