import { skillTree } from "@/content/other";
import type { Project } from "@/content/projects";
import { caseUi } from "@/content/site";
import { FlowDiagram } from "./FlowDiagram";
import { SkillIcon } from "./SkillIcon";
import { Section, SectionHeader } from "./ui";

const label = "text-[12px] font-medium uppercase tracking-[0.13em] text-accent-2";

function flowLabel(p: Project) {
  const steps = p.flow.edges.map(([a, b]) => `${p.flow.nodes[a]} para ${p.flow.nodes[b]}`);
  if (p.flow.loop) steps.push(`${p.flow.nodes.at(-1)} de volta para ${p.flow.nodes[0]}`);
  return `Fluxo funcional de ${p.name}: ${steps.join("; ")}.`;
}

function Stack({ p }: { p: Project }) {
  return (
    <ul aria-label={caseUi.stack} className="flex flex-wrap gap-x-6 gap-y-5">
      {p.stack.map((name) => {
        const skill = skillTree.find((item) => item.name === name);
        return skill ? (
          <li key={name} className="flex w-[72px] flex-col items-center gap-2 text-center">
            <SkillIcon icon={skill.icon} className="size-14" rounded="rounded-2xl" />
            <span className="text-[12px] leading-tight text-fg-2">{name}</span>
          </li>
        ) : null;
      })}
    </ul>
  );
}

/** Seções comuns da home (Section + SectionHeader), sem rolagem presa. */
export function ProjectStory({ project: p }: { project: Project }) {
  const id = (k: string) => `${p.slug}-${k}`;
  return (
    <>
      <Section labelledBy={id("contexto")}>
        <SectionHeader id={id("contexto")} title={caseUi.context} />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <div>
              <p className={label}>{caseUi.problem}</p>
              <p className="mt-3 max-w-[52ch] text-[19px] leading-relaxed text-fg">{p.problem}</p>
            </div>
            <div>
              <p className={label}>{caseUi.solution}</p>
              <p className="mt-3 max-w-[52ch] text-[19px] leading-relaxed text-fg-2">{p.solution}</p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className={`${label} mb-5`}>{caseUi.stack}</p>
            <Stack p={p} />
          </div>
        </div>
      </Section>

      <Section labelledBy={id("produto")}>
        <SectionHeader id={id("produto")} title={caseUi.product} />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className={label}>{p.listKind === "scope" ? caseUi.scope : caseUi.features}</p>
            <ul className="mt-3">
              {p.list.map((item) => (
                <li key={item} className="border-b border-line py-3 text-[17px] text-fg first:border-t">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <p className={label}>{caseUi.result}</p>
            <p className="mt-3 text-[22px] leading-snug text-fg">{p.result}</p>
            {p.resultNote ? <p className="mt-3 text-[14px] text-fg-3">{p.resultNote}</p> : null}
          </div>
        </div>
      </Section>

      <Section labelledBy={id("funcionamento")}>
        <SectionHeader id={id("funcionamento")} title={caseUi.flow} aside={<p>{caseUi.flowNote}</p>} />
        <div className="mt-12 rounded-2xl bg-panel p-5 lg:p-8">
          <FlowDiagram flow={p.flow} label={flowLabel(p)} />
        </div>
      </Section>

      <Section labelledBy={id("participacao")}>
        <SectionHeader id={id("participacao")} title={caseUi.participation} />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={label}>{caseUi.myWork}</p>
            <p className="mt-3 text-[18px] leading-relaxed text-fg">{p.participation}</p>
          </div>
          <div className="lg:col-span-7">
            <p className={label}>{caseUi.decisions}</p>
            <dl className="mt-3">
              {p.decisions.map((d) => (
                <div key={d.title} className="border-b border-line py-4 first:border-t">
                  <dt className="text-[17px] font-medium text-fg">{d.title}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-fg-2">{d.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>
    </>
  );
}
