import type { Project } from "@/content/projects";
import { caseUi } from "@/content/site";

/** Dados do projeto em linhas simples, sem ilustração: o que importa aqui é o produto. */
export function ProjectFacts({ project: p }: { project: Project }) {
  const items = [
    [caseUi.meta.client, p.client],
    [caseUi.meta.platform, p.platform],
    [caseUi.meta.audience, p.audience],
    [caseUi.meta.team, p.team],
    [caseUi.meta.status, p.status],
  ].filter((i): i is [string, string] => Boolean(i[1]));

  return (
    <dl className="grid gap-x-10 gap-y-5 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="text-[12px] font-medium uppercase tracking-[0.13em] text-accent-2">{k}</dt>
          <dd className="mt-2 text-[16px] leading-snug text-fg">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
