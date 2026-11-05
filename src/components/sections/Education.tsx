import { education } from "@/content/site";
import { Parallax } from "../Parallax";
import { Reveal } from "../Reveal";
import { Container } from "../ui";
import { FactIllustration } from "./FactIllustration";

/** Formação atual: painel com ilustração própria, entre a abertura e o método. */
export function Education() {
  const rows = [
    { term: "Instituição", value: education.institution },
    { term: "Período", value: education.period },
    { term: "Situação", value: education.status },
  ];

  return (
    <section aria-labelledby="formacao-titulo" className="pb-28 lg:pb-40">
      <Container>
        <Reveal>
          <article className="fact-card grid items-center gap-10 overflow-hidden rounded-[24px] border border-line-2 bg-panel p-7 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
            <div className="lg:col-span-7">
              <p className="text-[14px] font-medium text-accent-2">{education.label}</p>
              <h2
                id="formacao-titulo"
                className="mt-5 text-balance text-[34px] leading-[1.05] sm:text-[46px] lg:text-[58px]"
              >
                {education.title}
              </h2>
              <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-fg-2">{education.text}</p>

              <dl className="mt-10 grid max-w-[560px] gap-x-10 gap-y-6 sm:grid-cols-2">
                {rows.slice(0, 2).map((r) => (
                  <div key={r.term} className="border-t border-line-2 pt-4">
                    <dt className="text-[14px] text-fg-3">{r.term}</dt>
                    <dd className="mt-1 text-[18px] font-medium text-fg">{r.value}</dd>
                  </div>
                ))}
                <div className="border-t border-line-2 pt-4 sm:col-span-2">
                  <dt className="text-[14px] text-fg-3">{rows[2].term}</dt>
                  <dd className="mt-1 flex items-center gap-2 text-[18px] font-medium text-fg">
                    <span aria-hidden="true" className="size-2 rounded-full bg-accent-2" />
                    {rows[2].value}
                  </dd>
                </div>
              </dl>
            </div>

            <Parallax speed={0.06} rotate={4} className="lg:col-span-5">
              <div className="mx-auto w-full max-w-[360px]">
                <FactIllustration scene="education" />
              </div>
            </Parallax>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
