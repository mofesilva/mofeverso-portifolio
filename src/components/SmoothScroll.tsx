"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Rolagem suave com inércia. Fica ligada mesmo com "reduzir movimento" no sistema (decisão do dono do site). */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      anchors: true,
      duration: 1.8,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
    });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
