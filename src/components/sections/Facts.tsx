import { Cabinet, Hub, Laptop, Stack, Terrain } from "@lucasmarkes/hairline/react";
import { hero } from "@/content/site";
import { LiveNote } from "../LiveNote";
import { Container } from "../ui";

const f = hero.facts;

/** Miniaturas das figuras prontas do Hairline, escolhidas pelo que cada informação representa. */
const items = [
  { label: f.role.label, value: f.role.value, Figure: Laptop, figure: "Notebook: a tela responde ao cursor." },
  { label: f.place.label, value: f.place.value, note: <LiveNote kind="time" />, Figure: Terrain, figure: "Relevo: o terreno sob o cursor se levanta." },
  { label: f.process.label, value: f.process.value, Figure: Hub, figure: "Núcleo ligado a vários pontos: o ponto sob o cursor reage." },
  { label: f.company.label, value: f.company.value, note: <LiveNote kind="years" />, Figure: Cabinet, figure: "Arquivo: a gaveta sob o cursor se abre." },
  { label: f.areas.label, value: f.areas.items.join(" / "), Figure: Stack, figure: "Camadas empilhadas: a camada sob o cursor se destaca." },
];

/** Credenciais em uma faixa curta logo abaixo da abertura: contexto rápido, sem rolagem presa. */
export function Facts() {
  return (
    <section id="credenciais" aria-label="Credenciais" className="scroll-mt-16 pb-6 pt-8 lg:pb-10">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 sm:gap-y-6 lg:grid-cols-5">
          {items.map(({ Figure, ...i }) => (
            <div key={i.label}>
              <Figure theme="dark" label={i.figure} className="hairline-figure mb-3 size-[64px] sm:mb-4 sm:size-[84px]" />
              <dt className="text-[12px] font-medium uppercase tracking-[0.13em] text-accent-2">{i.label}</dt>
              <dd className="mt-2 text-[16px] leading-snug sm:text-[18px] text-fg">{i.value}</dd>
              {i.note ? <dd className="mt-1 text-[13px] text-fg-3">{i.note}</dd> : null}
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
