"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Sequência presa à tela: o contêiner é alto e o palco dentro dele fica fixo (sticky).
 * Retorna o passo atual e o progresso (0..1) conforme a rolagem, e uma função para ir a um passo.
 */
export function useScrollSteps<T extends HTMLElement>(count: number) {
  const ref = useRef<T>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = Math.min(Math.max(-r.top / span, 0), 1);
      setProgress(p);
      setIndex(Math.min(count - 1, Math.floor(p * count)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  const goTo = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const span = el.offsetHeight - window.innerHeight;
      const top = el.getBoundingClientRect().top + window.scrollY + ((i + 0.5) / count) * span;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [count],
  );

  return { ref, index, progress, goTo, height: `${count * 85 + 15}svh` };
}
