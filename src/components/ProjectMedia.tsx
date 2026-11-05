import Image from "next/image";
import type { Project } from "@/content/projects";

/**
 * Painel escuro com brilho na cor do projeto e a imagem no tratamento certo:
 * moldura de navegador, mockup de aparelho ou celular. O ContrataJá, sem
 * captura, mostra o caminho do usuário no app.
 */
export function ProjectMedia({ project, priority, tall }: { project: Project; priority?: boolean; tall?: boolean }) {
  const m = project.media;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[20px] border border-line bg-panel ${
        tall ? "aspect-[4/3] lg:aspect-[16/11]" : "aspect-[16/11]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(70% 70% at 50% 100%, ${project.glow}55, transparent 70%)` }}
      />

      {!m ? (
        <div aria-hidden="true" className="relative flex flex-wrap items-center justify-center gap-3 px-8">
          {["Serviço", "Prestador", "Contato"].map((step, i) => (
            <span key={step} className="flex items-center gap-3">
              {i > 0 ? <span className="text-fg-3">→</span> : null}
              <span className="rounded-full border border-line-2 bg-panel-2 px-5 py-3 text-[17px] font-medium">
                {step}
              </span>
            </span>
          ))}
        </div>
      ) : m.frame === "browser" ? (
        <div className="relative w-[86%] overflow-hidden rounded-xl border border-line-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
          <div aria-hidden="true" className="flex h-7 items-center gap-1.5 bg-[#1c1c21] px-3">
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
            <span className="size-2.5 rounded-full bg-white/20" />
          </div>
          <Image
            src={m.src}
            alt={`Captura do site ${project.name}`}
            width={m.width}
            height={m.height}
            priority={priority}
            sizes="(min-width: 1024px) 600px, 90vw"
            className="block h-auto w-full"
          />
        </div>
      ) : m.frame === "phone" ? (
        <Image
          src={m.src}
          alt={`Aplicativo ${project.name}`}
          width={m.width}
          height={m.height}
          priority={priority}
          sizes="260px"
          className="relative h-[80%] w-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
        />
      ) : (
        <Image
          src={m.src}
          alt={`Plataforma ${project.name} no computador e no celular`}
          width={m.width}
          height={m.height}
          priority={priority}
          sizes="(min-width: 1024px) 640px, 90vw"
          className="relative h-auto w-[90%] drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
        />
      )}
    </div>
  );
}
