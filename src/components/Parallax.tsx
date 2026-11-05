"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Parallax por scroll. `speed` positivo faz o elemento subir mais devagar que a página
 * (fica "para trás"); negativo, mais rápido. Em telas estreitas o efeito é reduzido.
 */
export function Parallax({
  children,
  speed = 0.1,
  rotate = 0,
  baseRotate = 0,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  /** Graus extras aplicados conforme o elemento atravessa a tela. */
  rotate?: number;
  baseRotate?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;

    let visible = false;
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = o.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (elemento acima do centro) .. 1 (abaixo do centro)
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      const k = window.innerWidth < 768 ? 0.4 : 1;
      i.style.transform = `translate3d(0, ${(-p * speed * vh * k).toFixed(1)}px, 0) rotate(${(baseRotate + p * rotate).toFixed(2)}deg)`;
    };
    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      schedule();
    });
    io.observe(o);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed, rotate, baseRotate]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} style={{ transform: `rotate(${baseRotate}deg)` }} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
