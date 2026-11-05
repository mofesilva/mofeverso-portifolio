import { HAIRLINE_VERSIONS } from "@/content/hairline-versions";
import { education } from "@/content/site";
import { EduTimeline } from "../EduTimeline";
import { Container } from "../ui";

/** Formação em destaque: seção própria, com a figura do Hairline e o andamento do curso mês a mês. */
export function Education() {
  return (
    <section id="formacao" aria-labelledby="formacao-titulo" className="scroll-mt-16 py-24 lg:py-36">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-16">
          <div>
            <p className="text-[14px] font-medium text-accent-2">
              {education.label} / {education.status}
            </p>
            <h2 id="formacao-titulo" className="mt-5 text-balance text-[40px] leading-[1.02] sm:text-[56px] lg:text-[72px]">
              {education.title}
            </h2>
            <p className="mt-7 max-w-[52ch] text-[18px] leading-relaxed text-fg-2">{education.text}</p>
            <p className="mt-5 text-[16px] text-fg-2">
              <span className="font-medium text-fg">{education.institution}</span> · {education.period}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <iframe
              src={`/hairline/impressora.html?v=${HAIRLINE_VERSIONS.impressora}`}
              title="Impressora 3D construindo uma torre de sete camadas. Passe o cursor sobre uma camada para escolher qual está sendo impressa."
              loading="lazy"
              className="block aspect-[5/4] w-full max-w-[520px] border-0 pointer-coarse:pointer-events-none"
            />
          </div>
        </div>

        <div className="mt-14 border-t border-line-2 pt-10 lg:mt-20 lg:pt-12">
          <EduTimeline />
        </div>
      </Container>
    </section>
  );
}
