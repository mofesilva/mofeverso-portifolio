"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Barra contínua na lateral direita que enche conforme a página rola (0 no topo, cheia no fim). */
export function ScrollProgress() {
  // A barra acompanha a home; nas páginas de projeto ela não aparece.
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
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

  if (pathname !== "/") return null;

  return (
    <div
      role="progressbar"
      aria-label="Progresso da página"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="pointer-events-none fixed right-4 top-1/2 z-50 hidden h-[200px] w-[3px] -translate-y-1/2 rounded-full bg-white/10 sm:block"
    >
      {/* A altura muda de verdade (sem scale), então as pontas continuam redondas. */}
      <div className="w-full rounded-full bg-accent" style={{ height: `${progress * 100}%`, minHeight: 3 }} />
    </div>
  );
}
