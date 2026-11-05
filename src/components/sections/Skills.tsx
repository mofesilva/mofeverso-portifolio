import { skillTree, studio } from "@/content/other";
import { projects } from "@/content/projects";
import { skillsIntro } from "@/content/site";
import { Section, SectionHeader } from "../ui";
import type { ResolvedSkill } from "./SkillCard";
import { SkillTree } from "./SkillTree";

/** Projetos com página própria e projetos do ateliê, com a tecnologia de cada um. */
const index = [
  ...projects.map((p) => ({ name: p.name, href: `/projetos/${p.slug}`, stack: p.stack })),
  ...studio.map((s) => ({ name: s.name, href: "/#atelie", stack: s.stack ?? [] })),
];

/** Projetos de cada habilidade: os que a listam no stack, mais os indicados à mão e os herdados. */
function resolve(): ResolvedSkill[] {
  const own = new Map<string, Set<string>>();
  for (const node of skillTree) {
    const names = new Set<string>(node.projects ?? []);
    for (const p of index) if (p.stack.includes(node.name)) names.add(p.name);
    own.set(node.id, names);
  }

  return skillTree.map((node) => {
    const names = new Set(own.get(node.id));
    for (const other of node.inheritFrom ?? []) for (const n of own.get(other) ?? []) names.add(n);
    return {
      id: node.id,
      name: node.name,
      icon: node.icon,
      kind: node.kind,
      parent: node.parent,
      branch: node.branch,
      description: node.description,
      projects: index.filter((p) => names.has(p.name)).map(({ name, href }) => ({ name, href })),
    };
  });
}

export function Skills() {
  return (
    <Section id="habilidades" labelledBy="habilidades-titulo">
      <SectionHeader id="habilidades-titulo" title={skillsIntro.title} aside={<p>{skillsIntro.text}</p>} />
      <SkillTree skills={resolve()} initial="flutter" labels={skillsIntro.card} />
    </Section>
  );
}
