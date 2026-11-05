"use client";

import { useEffect, useRef, useState } from "react";

const START = new Date(2026, 2, 1); // março de 2026
const MONTHS = 12;
const MONTH_NAMES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** Linha do tempo do curso: um marco por mês, preenchida até hoje, com o que já passou e o que falta. */
export function EduTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [months, setMonths] = useState<number | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const now = new Date();
        const m = (now.getFullYear() - START.getFullYear()) * 12 + (now.getMonth() - START.getMonth()) + now.getDate() / 31;
        setMonths(Math.min(Math.max(m, 0), MONTHS));
        setTimeout(() => setShown(true), 60);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const progress = months === null ? 0 : months / MONTHS;
  const pct = progress * 100;
  const done = Math.floor(months ?? 0);
  const current = Math.min(done + 1, MONTHS);
  const remaining = months === null ? 0 : Math.max(Math.ceil(MONTHS - months), 0);
  const ticks = Array.from({ length: MONTHS + 1 }, (_, i) => i);
  const startLabel = `${MONTH_NAMES[START.getMonth()]} ${START.getFullYear()}`;
  const endLabel = `${MONTH_NAMES[START.getMonth()]} ${START.getFullYear() + 1}`;

  return (
    <div ref={ref}>
      <div className="relative h-16">
        {months !== null && (
          <span
            className="absolute top-0 -translate-x-1/2 text-[13px] font-medium text-fg transition-[left] duration-[1600ms] ease-out"
            style={{ left: shown ? `${pct}%` : "0%" }}
          >
            hoje
          </span>
        )}
        <div className="absolute inset-x-0 top-[44px] h-[2px] -translate-y-1/2 bg-fg-3/40" />
        <div
          className="absolute left-0 top-[44px] h-[2px] -translate-y-1/2 bg-accent-2 transition-[width] duration-[1600ms] ease-out"
          style={{ width: shown ? `${pct}%` : "0%" }}
        />
        {ticks.map((i) => {
          const edge = i === 0 || i === MONTHS;
          const past = i <= done;
          return (
            <span
              key={i}
              className={`absolute top-[44px] w-[2px] -translate-x-1/2 -translate-y-1/2 ${edge ? "h-6" : "h-3"} ${past && shown ? "bg-accent-2" : "bg-fg-3/50"} transition-colors duration-700`}
              style={{ left: `${(i / MONTHS) * 100}%`, transitionDelay: `${i * 90}ms` }}
            />
          );
        })}
        {months !== null && (
          <span
            className="absolute top-[44px] size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-[left] duration-[1600ms] ease-out"
            style={{ left: shown ? `${pct}%` : "0%" }}
          />
        )}
      </div>
      <div className="mt-3 flex justify-between text-[14px] text-fg-3">
        <span>{startLabel}</span>
        <span>{endLabel}</span>
      </div>
      {months !== null && (
        <p className="mt-6 text-[18px] text-fg-2">
          <span className="text-fg">{current}º mês de {MONTHS}</span>
          {remaining > 0 ? ` · faltam ${remaining} ${remaining === 1 ? "mês" : "meses"} para a conclusão` : " · curso concluído"}
        </p>
      )}
    </div>
  );
}
