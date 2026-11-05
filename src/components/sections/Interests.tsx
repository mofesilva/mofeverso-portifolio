import type { CSSProperties } from "react";
import { interests } from "@/content/site";

const rows = 15;

/** Palavras repetidas como textura da seção inteira, bem apagadas, com o título por cima. */
export function Interests() {
  const { words } = interests;
  return (
    <section id="interesses" aria-labelledby="interesses-titulo" className="relative scroll-mt-16 overflow-hidden py-14 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-center gap-2 sm:gap-2.5 lg:gap-3">
        {Array.from({ length: rows }, (_, row) => {
          // Cada linha começa em outra palavra, para a textura não repetir em coluna.
          const shift = (row * 4) % words.length;
          const set = [...words.slice(shift), ...words.slice(0, shift)];
          return (
            <div
              key={row}
              data-reverse={row % 2 === 1}
              className="interest-track"
              style={{ "--interest-time": `${70 + ((row * 17) % 40)}s` } as CSSProperties}
            >
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0">
                  {set.map((word) => (
                    <span key={word} className="shrink-0 whitespace-nowrap pr-5 font-display text-[18px] font-bold leading-none text-white/[0.1] sm:pr-6 sm:text-[24px] lg:pr-8 lg:text-[34px]">
                      {word}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <p className="sr-only">{words.join(", ")}</p>
      <div className="relative mx-auto flex w-full max-w-[1200px] justify-center px-6">
        {/* Vidro líquido: desfoca e satura as palavras atrás, com realce de luz na borda superior. */}
        <div className="interest-glass flex flex-col items-center gap-3 sm:gap-4 rounded-[22px] px-6 py-6 text-center sm:rounded-[36px] sm:px-10 sm:py-8 lg:px-14 lg:py-10">
          <h2 id="interesses-titulo" className="max-w-[18ch] text-balance text-[24px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[32px] sm:leading-[1.06] lg:text-[44px]">
            {interests.title}
          </h2>
          <p className="text-[13px] text-fg sm:text-[15px]">{interests.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
