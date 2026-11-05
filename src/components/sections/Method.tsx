import { method } from "@/content/site";
import { Container } from "../ui";
import { MethodAtom } from "./MethodAtom";
import { MethodIllustration } from "./MethodIllustration";

const practice = [
  { title: "Da demanda ao diagnóstico", text: "As demandas e os requisitos do cliente são entregues à IA para uma análise aprofundada. O diagnóstico é documentado em Markdown e revisado para confirmar o entendimento, identificar lacunas e orientar o planejamento." },
  { title: "Planejamento e arquitetura", text: "Um agente de planejamento organiza stack, modelagem de dados, design system, APIs, rotas, regras de negócio, segurança e LGPD. Cada pedido explicita objetivo, entradas, saída esperada, tarefas e critérios de conclusão." },
  { title: "Implementação e testes", text: "Após a revisão do plano, a IA implementa a solução e executa testes conforme os critérios definidos. O desenvolvimento acontece em ciclos de acompanhamento, orientação e ajustes, com a IA participando das decisões técnicas." },
  { title: "Verificação e entrega", text: "Além dos testes da IA, há uma verificação humana dos fluxos, da responsividade e do código. Falhas são investigadas e corrigidas com a IA ou diretamente; a decisão final e a responsabilidade pela entrega permanecem humanas." },
];

export function Method() {
  return (
    <section id="metodo" aria-labelledby="metodo-titulo" className="scroll-mt-16 pt-16 pb-32 lg:pt-24 lg:pb-40">
      <Container>
        <header className="mx-auto max-w-[860px] text-center">
          <p className="text-[14px] font-medium text-accent-2">{method.label} / humano + IA</p>
          <h2 id="metodo-titulo" className="mt-5 text-balance text-[42px] leading-[1.02] text-fg sm:text-[56px] lg:text-[68px]">{method.title}</h2>
          <p className="mx-auto mt-6 max-w-[60ch] text-[18px] leading-relaxed text-fg-2">{method.lead}</p>
        </header>
        <div className="relative mx-auto mt-0 max-w-[680px] sm:mt-2">
          <MethodAtom />
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[14px] text-fg-2" aria-label="Legenda do núcleo">
            <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-accent" /> Inteligência artificial</span>
            <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-white" /> Humano</span>
            <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-stage" /> Etapas do método</span>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-20 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {practice.map((item, index) => (
            <article key={item.title} className="flex flex-col rounded-[20px] border border-line-2 bg-panel p-6 sm:p-7">
              <span className="font-mono text-[12px] text-accent-2">0{index + 1}</span>
              <div className="mt-3 flex min-h-[208px] items-center justify-center"><MethodIllustration index={index} /></div>
              <h3 className="mt-5 text-[26px] leading-tight text-fg">{item.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-2">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
