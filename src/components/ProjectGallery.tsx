"use client";

import Image from "next/image";
import { useState } from "react";
import type { Shot } from "@/content/projects";

/**
 * Galeria no padrão do Trabalho: uma imagem grande por vez e, abaixo, a régua para escolher a tela.
 * As setas do teclado também trocam de tela.
 */
export function ProjectGallery({ shots, name }: { shots: Shot[]; name: string }) {
  const [i, setI] = useState(0);
  const s = shots[i];
  const go = (n: number) => setI((n + shots.length) % shots.length);

  return (
    <div
      className="flex flex-col gap-4"
      role="group"
      aria-roledescription="galeria"
      aria-label={`Telas de ${name}`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
    >
      <div className="relative">
      <div
        key={s.src}
        className="fact-fig relative flex items-center justify-center overflow-hidden rounded-[20px] bg-panel [--stage:56svh] md:[--stage:min(72svh,680px)]"
        style={{ height: "var(--stage)" }}
        aria-live="polite"
      >
        {s.kind === "browser" ? (
          <div className="flex max-h-[92%] max-w-[92%] flex-col overflow-hidden rounded-xl border border-line-2">
            <div aria-hidden="true" className="flex h-7 shrink-0 items-center gap-1.5 bg-panel-2 px-3">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
            </div>
            <Image
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              quality={90}
              priority={i === 0}
              sizes="(min-width: 1200px) 1100px, 92vw"
              className="block h-auto max-h-[calc(var(--stage)*0.92-28px)] w-auto min-h-0 max-w-full object-contain"
            />
          </div>
        ) : (
          <Image
            src={s.src}
            alt={s.alt}
            width={s.width}
            height={s.height}
            quality={90}
            priority={i === 0}
            sizes={s.kind === "phone" ? "(min-width: 768px) 420px, 70vw" : "(min-width: 1200px) 1100px, 94vw"}
            className={
              s.kind === "phone"
                ? "h-[94%] w-auto max-w-full object-contain"
                : "h-auto max-h-[96%] w-auto max-w-[96%] object-contain"
            }
          />
        )}
      </div>
      {shots.length > 1 ? (
        <>
          {[
            { d: -1, side: "left-3", icon: "←", text: "Tela anterior" },
            { d: 1, side: "right-3", icon: "→", text: "Próxima tela" },
          ].map((b) => (
            <button
              key={b.d}
              type="button"
              onClick={() => go(i + b.d)}
              aria-label={b.text}
              className={`absolute top-1/2 ${b.side} flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[18px] text-black transition-colors hover:bg-white/85`}
            >
              <span aria-hidden="true">{b.icon}</span>
            </button>
          ))}
          <p className="absolute bottom-3 right-4 text-[13px] tabular-nums text-fg-3" aria-hidden="true">
            {i + 1} / {shots.length}
          </p>
        </>
      ) : null}
      </div>

      {shots.length > 1 ? (
        <div role="tablist" aria-label={`Escolher tela de ${name}`} className="flex gap-2 overflow-x-auto pb-1">
          {shots.map((t, n) => (
            <button
              key={t.src}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={t.alt}
              onClick={() => setI(n)}
              className={`relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-panel transition-opacity ${
                n === i ? "opacity-100 ring-1 ring-accent-2" : "opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={t.src}
                alt=""
                width={t.width}
                height={t.height}
                sizes="96px"
                className={t.kind === "phone" ? "h-[92%] w-auto" : "h-auto max-h-[92%] w-auto max-w-[92%] object-contain"}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
