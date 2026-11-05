import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ProjectMedia } from "@/components/ProjectMedia";
import { Button, Container, Eyebrow, TagList } from "@/components/ui";
import { getNeighbours, getProject, projects, type Project } from "@/content/projects";
import { caseUi } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/projetos/${p.slug}` },
    openGraph: { title: p.name, description: p.summary, url: `/projetos/${p.slug}` },
  };
}

function Block({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-3 lg:col-span-3">
          <h2 id={id} className="text-[30px] font-semibold tracking-[-0.03em]">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </Container>
    </section>
  );
}

function flowLabel(p: Project) {
  const steps = p.flow.edges.map(([a, b]) => `${p.flow.nodes[a]} para ${p.flow.nodes[b]}`);
  if (p.flow.loop) steps.push(`${p.flow.nodes.at(-1)} de volta para ${p.flow.nodes[0]}`);
  return `Fluxo funcional de ${p.name}: ${steps.join("; ")}.`;
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const { previous, next } = getNeighbours(p.slug);
  const id = (s: string) => `${p.slug}-${s}`;
  const meta = (
    [
      [caseUi.meta.client, p.client],
      [caseUi.meta.category, p.category],
      [caseUi.meta.platform, p.platform],
      [caseUi.meta.audience, p.audience],
      [caseUi.meta.team, p.team],
      [caseUi.meta.status, p.status],
    ] as const
  ).filter((m): m is readonly [string, string] => Boolean(m[1]));

  return (
    <main id="conteudo" className="pt-16">
      {/* Abertura */}
      <section aria-labelledby={id("titulo")} className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[640px] w-[1100px] -translate-x-1/2 rounded-full"
          style={{ background: `radial-gradient(closest-side, ${p.glow}40, transparent)` }}
        />
        <Container className="relative flex flex-col gap-12 py-16 lg:py-24">
          <Link href="/#trabalho" className="w-fit text-[14px] text-fg-3 transition-colors hover:text-fg">
            ← {caseUi.back}
          </Link>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="flex flex-col gap-5 lg:col-span-8">
              <Eyebrow>{p.category}</Eyebrow>
              <h1 id={id("titulo")} className="text-[48px] font-semibold leading-[1.02] tracking-[-0.045em] lg:text-[80px]">
                {p.name}
              </h1>
              <p className="max-w-[40ch] text-[22px] leading-snug text-fg-2">{p.headline ?? p.summary}</p>
              {p.headline ? <p className="max-w-[60ch] text-[16px] text-fg-3">{p.summary}</p> : null}
            </div>
            {p.link ? (
              <div className="lg:col-span-4 lg:justify-self-end">
                <Button href={p.link.href} external>
                  {p.link.label}
                </Button>
              </div>
            ) : null}
          </div>
          <ProjectMedia project={p} priority tall />
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {meta.map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 bg-bg p-5">
                <dt className="text-[13px] text-fg-3">{k}</dt>
                <dd className="text-[15px]">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Block title={caseUi.context} id={id("contexto")}>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {[
            [caseUi.problem, p.problem],
            [caseUi.solution, p.solution],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-3 bg-bg p-7 lg:p-8">
              <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-fg-3">{k}</h3>
              <p className="text-[18px] leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <h3 className="text-[13px] text-fg-3">{caseUi.stack}</h3>
          <TagList items={p.stack} label={caseUi.stack} />
        </div>
      </Block>

      <Block title={caseUi.product} id={id("produto")}>
        <h3 className="mb-4 text-[13px] font-medium uppercase tracking-[0.12em] text-fg-3">
          {p.listKind === "scope" ? caseUi.scope : caseUi.features}
        </h3>
        <ul className="grid gap-x-10 md:grid-cols-2">
          {p.list.map((item) => (
            <li key={item} className="flex gap-3 border-t border-line py-4 text-[17px]">
              <span aria-hidden="true" className="text-accent">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/[0.07] p-7 lg:p-8">
          <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-accent-2">{caseUi.result}</h3>
          <p className="mt-3 text-[22px] font-medium leading-snug tracking-[-0.02em]">{p.result}</p>
          {p.resultNote ? <p className="mt-3 text-[14px] text-fg-3">{p.resultNote}</p> : null}
        </div>
      </Block>

      <Block title={caseUi.flow} id={id("funcionamento")}>
        <div className="rounded-2xl border border-line bg-panel p-6 lg:p-8">
          <FlowDiagram flow={p.flow} label={flowLabel(p)} />
        </div>
        <p className="mt-4 text-[13px] text-fg-3">{caseUi.flowNote}</p>
      </Block>

      <Block title={caseUi.participation} id={id("participacao")}>
        <h3 className="text-[13px] font-medium uppercase tracking-[0.12em] text-fg-3">{caseUi.myWork}</h3>
        <p className="mt-3 text-[21px] leading-relaxed">{p.participation}</p>
        <h3 className="mt-12 text-[13px] font-medium uppercase tracking-[0.12em] text-fg-3">{caseUi.decisions}</h3>
        <ul className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {p.decisions.map((d) => (
            <li key={d.title} className="flex flex-col gap-2 bg-bg p-6 lg:p-7">
              <span className="text-[17px] font-semibold tracking-[-0.015em]">{d.title}</span>
              <span className="text-[15px] leading-relaxed text-fg-2">{d.text}</span>
            </li>
          ))}
        </ul>
      </Block>

      <nav aria-label="Outros projetos" className="border-t border-line">
        <Container className="grid md:grid-cols-2">
          {[
            { label: caseUi.previous, target: previous, align: "" },
            { label: caseUi.next, target: next, align: "md:items-end md:text-right md:border-l md:border-line" },
          ].map(({ label, target, align }) => (
            <Link
              key={label}
              href={`/projetos/${target.slug}`}
              className={`group flex flex-col gap-2 py-12 md:px-8 first:md:pl-0 last:md:pr-0 ${align}`}
            >
              <span className="text-[13px] text-fg-3">{label}</span>
              <span className="text-[30px] font-semibold tracking-[-0.03em] transition-colors group-hover:text-accent-2">
                {target.name}
              </span>
              <span className="text-[15px] text-fg-2">{target.summary}</span>
            </Link>
          ))}
        </Container>
      </nav>
    </main>
  );
}
