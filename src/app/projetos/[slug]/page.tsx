import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectFacts } from "@/components/ProjectFacts";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ProjectStory } from "@/components/ProjectStory";
import { Button, Container } from "@/components/ui";
import { getNeighbours, getProject, projects } from "@/content/projects";
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

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const { previous, next } = getNeighbours(p.slug);

  return (
    <main id="conteudo">
      <section aria-labelledby={`${p.slug}-titulo`} className="pt-16">
        <Container className="flex flex-col gap-8 pb-10 pt-12 lg:pt-16">
          <Link href="/#trabalho" className="w-fit text-[14px] text-fg-3 transition-colors hover:text-fg">
            ← {caseUi.back}
          </Link>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="flex flex-col gap-5 lg:col-span-8">
              <p className="text-[12px] font-medium uppercase tracking-[0.13em] text-accent-2">
                {p.category} / {p.platform}
              </p>
              <h1
                id={`${p.slug}-titulo`}
                className="text-balance text-[56px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[72px] lg:text-[92px]"
              >
                {p.name}
              </h1>
              <p className="max-w-[44ch] text-[19px] leading-relaxed text-fg-2 lg:text-[21px]">{p.headline ?? p.summary}</p>
            </div>
            {p.link ? (
              <div className="lg:col-span-4 lg:justify-self-end">
                <Button href={p.link.href} external>
                  {p.link.label}
                </Button>
              </div>
            ) : null}
          </div>
          <ProjectFacts project={p} />
        </Container>
      </section>

      <section aria-label="Telas do produto" className="pb-16 lg:pb-24">
        <Container>
          <ProjectGallery shots={p.gallery} name={p.name} />
        </Container>
      </section>

      <ProjectStory project={p} />

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
              <span className="text-[36px] leading-none transition-colors group-hover:text-accent-2">{target.name}</span>
              <span className="text-[15px] text-fg-2">{target.summary}</span>
            </Link>
          ))}
        </Container>
      </nav>
    </main>
  );
}
