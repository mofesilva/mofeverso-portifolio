"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const sections = [
  { id: "topo", label: "Início" },
  { id: "formacao", label: "Formação" },
  { id: "metodo", label: "Método" },
  { id: "trabalho", label: "Trabalho" },
  { id: "atelie", label: "Ateliê" },
  { id: "habilidades", label: "Habilidades" },
  { id: "sobre", label: "Trajetória" },
  { id: "contato", label: "Contato" },
];

const STEP = 30; // distância entre checkpoints, em px
const HEIGHT = STEP * (sections.length - 1);

/**
 * Trilho na lateral direita com um checkpoint por seção. O preenchimento acompanha a
 * rolagem dentro de cada seção, e cada checkpoint é um link: clicar rola até a seção
 * (a rolagem suave do Lenis trata os links de âncora).
 */
export function ScrollProgress() {
  // As seções são da home; nas páginas de projeto o trilho não tem o que mostrar.
  const pathname = usePathname();
  // Posição do preenchimento, em "checkpoints": 0 = Início, 1 = Formação, 2.5 = metade até Método...
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.scrollY + window.innerHeight * 0.4;
      const pageEnd = document.documentElement.scrollHeight;
      const tops = sections.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : null;
      });

      let current = 0;
      tops.forEach((top, i) => {
        if (top !== null && top <= line) current = i;
      });
      const start = tops[current] ?? 0;
      const next = tops.slice(current + 1).find((top) => top !== null) ?? pageEnd;
      const t = next > start ? Math.min(1, Math.max(0, (line - start) / (next - start))) : 0;
      setPosition(current + t);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  const active = Math.floor(position + 0.0001);

  if (pathname !== "/") return null;

  return (
    <nav
      aria-label="Seções da página"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 sm:block"
      style={{ height: HEIGHT }}
    >
      {/* Trilho e preenchimento: a altura muda de verdade (sem scale), então as pontas ficam redondas. */}
      <div className="absolute right-[3px] top-0 h-full w-[2px] rounded-full bg-white/15" />
      <div
        className="absolute right-[3px] top-0 w-[2px] rounded-full bg-accent-2"
        style={{ height: position * STEP }}
      />

      {sections.map((section, i) => {
        const reached = i <= active;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={section.label}
            aria-current={i === active ? "location" : undefined}
            className="group absolute right-0 flex h-6 -translate-y-1/2 items-center justify-end gap-3"
            style={{ top: i * STEP }}
          >
            <span
              className={`whitespace-nowrap text-[12px] font-medium tracking-wide transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                i === active ? "text-fg opacity-100" : "text-fg-3 opacity-0 2xl:opacity-100"
              }`}
            >
              {section.label}
            </span>
            <span
              className={`block size-2 shrink-0 rounded-full transition-colors duration-200 group-hover:bg-fg ${
                reached ? "bg-accent-2" : "bg-[#3a3a42]"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
