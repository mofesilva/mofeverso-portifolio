import { BrainCircuit, Code2, Landmark, Languages, Palette } from "lucide-react";
import { milestones } from "@/content/other";
import { journeyIntro } from "@/content/site";
import { Section, SectionHeader } from "../ui";

const stages = [
  { Icon: Landmark, label: "Formação" },
  { Icon: Languages, label: "Ensino & vivência" },
  { Icon: Palette, label: "Repertório criativo" },
  { Icon: Code2, label: "Desenvolvimento" },
  { Icon: BrainCircuit, label: "Aprendizado contínuo" },
];

export function Journey() {
  return (
    <Section id="sobre" labelledBy="sobre-titulo">
      <SectionHeader
        id="sobre-titulo"
        title={journeyIntro.title}
        aside={<p className="font-medium text-fg">{journeyIntro.subtitle}</p>}
      />

      <ol className="journey-path" aria-label="Trajetória profissional e formação">
        {milestones.map((milestone, index) => {
          const { Icon, label } = stages[index] ?? { Icon: Landmark, label: "Trajetória" };
          const last = index === milestones.length - 1;
          const left = index % 2 === 0;

          return (
            <li key={`${milestone.period}-${milestone.title}`} className="journey-step"
              data-side={left ? "left" : "right"} data-current={milestone.current || undefined}>
              <div className="journey-track" aria-hidden="true">
                {!last ? (
                  <svg className="journey-connector" viewBox="0 0 240 100" preserveAspectRatio="none" fill="none">
                    <path d={left ? "M 56 0 C 56 50 184 50 184 100" : "M 184 0 C 184 50 56 50 56 100"} />
                  </svg>
                ) : null}
                <span className="journey-marker"><Icon strokeWidth={1.5} /></span>
              </div>

              <article className="journey-card" aria-labelledby={`journey-title-${index}`}>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-fg-3">
                    <span className="mr-2 text-accent-2">{String(index + 1).padStart(2, "0")}</span>{label}
                  </p>
                  {milestone.current ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] text-accent-2">
                      <span aria-hidden="true" className="size-1 rounded-full bg-accent-2" />Atuação atual
                    </span>
                  ) : null}
                </div>
                <p className="mb-2 font-mono text-[14px] text-accent-2">{milestone.period}</p>
                <h3 id={`journey-title-${index}`} className="text-[28px] leading-[1.15] sm:text-[32px]">{milestone.title}</h3>
                <p className="mt-2 text-[13px] text-fg-3">{milestone.place}</p>
                <p className="mt-5 border-t border-line pt-5 text-[15px] leading-relaxed text-fg-2">{milestone.text}</p>
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
