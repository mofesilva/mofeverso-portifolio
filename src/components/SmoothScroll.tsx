"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Rolagem suave com inércia. Fica ligada mesmo com "reduzir movimento" no sistema (decisão do dono do site). */
export function SmoothScroll() {
  useEffect(() => {
    // No toque a rolagem fica com o próprio celular: o Lenis ali trava e briga com o iOS.
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({
      anchors: true,
      respectReducedMotion: false,
      duration: 1.2,
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
