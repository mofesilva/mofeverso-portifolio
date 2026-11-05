import Link from "next/link";
import { SkillIcon } from "../SkillIcon";

export type ResolvedSkill = {
  id: string;
  name: string;
  icon: string;
  kind: "main" | "passive";
  parent: string | null;
  branch?: string;
  description: string;
  projects: { name: string; href: string }[];
};

type SkillCardProps = {
  skill: ResolvedSkill;
  parent?: ResolvedSkill;
  labels: {
    practical: string; linkedTo: string; branch: string;
    projects: string; main: string; passive: string;
  };
};

export function SkillCard({ skill, parent, labels }: SkillCardProps) {
  const main = skill.kind === "main";
  return (
    <article aria-live="polite" aria-atomic="true" className="flex min-w-0 flex-col gap-6 pt-6">
      <div className="flex items-center gap-4">
        <SkillIcon icon={skill.icon} tone="path" rounded={main ? "skill-card-hex" : "rounded-full"} className="size-16" />
        <div className="min-w-0">
          <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-accent-2">{main ? labels.main : labels.passive}</p>
          <h3 className="break-words text-[32px] leading-tight">{skill.name}</h3>
        </div>
      </div>
      {parent ? (
        <p className="flex flex-wrap items-center gap-2 text-[12px] text-fg-3">
          {labels.linkedTo}<SkillIcon icon={parent.icon} rounded="rounded-md" className="size-6" /><span className="text-fg-2">{parent.name}</span>
        </p>
      ) : null}
      <div className="border-t border-line pt-5">
        <p className="text-[12px] text-accent-2">{labels.practical}</p>
        <p className="mt-3 text-[14px] leading-relaxed text-fg-2">{skill.description}</p>
      </div>
      <div className="border-t border-line pt-5">
        <p className="mb-4 flex items-baseline gap-2">
          <span className="text-[30px] leading-none">{skill.projects.length.toString().padStart(2, "0")}</span>
          <span className="text-[12px] text-fg-3">{labels.projects}</span>
        </p>
        {skill.projects.length ? (
          <ul className="flex flex-col gap-2">
            {skill.projects.map((project) => (
              <li key={project.name}>
                <Link href={project.href} className="flex min-h-11 items-center justify-between gap-3 rounded-lg bg-white/[0.04] px-3 py-2 text-[13px] transition-colors hover:bg-white/[0.09]">
                  {project.name}<span aria-hidden="true" className="text-accent-2">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : <p className="text-[13px] text-fg-3">Sem projeto publicado por aqui ainda.</p>}
      </div>
    </article>
  );
}
