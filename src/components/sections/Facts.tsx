import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { hero, site } from "@/content/site";
import { Parallax } from "../Parallax";
import { Reveal } from "../Reveal";
import { Container } from "../ui";
import { FactIllustration, type FactScene } from "./FactIllustration";

const valueClass = "font-display text-[30px] font-bold leading-[1.1] tracking-[-0.01em] text-fg lg:text-[34px]";

function Fact({
  scene,
  label,
  href,
  children,
}: {
  scene: FactScene;
  label: string;
  href?: string;
  children: ReactNode;
}) {
  const body = (
    <>
      <div className="flex w-[132px] shrink-0 items-center justify-center sm:w-[150px]">
        <FactIllustration scene={scene} />
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <span className="text-[14px] font-medium text-accent-2">{label}</span>
        {children}
      </div>
    </>
  );
  const cls =
    "fact-card flex h-full items-center gap-6 rounded-[20px] border border-line-2 bg-panel p-5 sm:gap-8 sm:p-7";
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/** Credenciais da abertura: um cartão ilustrado por informação. */
export function Facts() {
  const f = hero.facts;
  return (
    <section aria-label="Credenciais" className="pb-24 pt-6 lg:pb-36 lg:pt-10">
      <Container className="grid gap-4 md:grid-cols-2 lg:gap-5">
        <div className="flex flex-col gap-4 lg:gap-5">
          <Reveal>
            <Fact scene="role" label={f.role.label}>
              <span className={valueClass}>{f.role.value}</span>
            </Fact>
          </Reveal>
          <Reveal delay={80}>
            <Fact scene="process" label={f.process.label}>
              <span className={valueClass}>{f.process.value}</span>
            </Fact>
          </Reveal>
          <Reveal delay={160}>
            <Fact scene="areas" label={f.areas.label}>
              <span className={valueClass}>{f.areas.items.join(" · ")}</span>
            </Fact>
          </Reveal>
        </div>

        <Parallax speed={0.05} className="md:pt-12">
          <div className="flex flex-col gap-4 lg:gap-5">
            <Reveal delay={120}>
              <Fact scene="place" label={f.place.label}>
                <span className={valueClass}>{f.place.value}</span>
              </Fact>
            </Reveal>
            <Reveal delay={200}>
              <Fact scene="company" label={f.company.label}>
                <span className={valueClass}>{f.company.value}</span>
              </Fact>
            </Reveal>
            <Reveal delay={280}>
              <Fact scene="github" label={f.github.label} href={site.github}>
                <span className={`${valueClass} inline-flex items-center gap-2 text-[26px] lg:text-[28px]`}>
                  {f.github.value}
                  <ArrowUpRight aria-hidden="true" className="size-5 shrink-0" />
                  <span className="sr-only"> ({site.newTab})</span>
                </span>
              </Fact>
            </Reveal>
          </div>
        </Parallax>
      </Container>
    </section>
  );
}
