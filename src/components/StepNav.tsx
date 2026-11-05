"use client";

/** Régua de progresso da sequência: linha fina preenchida e os rótulos de cada passo, clicáveis. */
export function StepNav({
  label,
  items,
  index,
  progress,
  onSelect,
}: {
  label: string;
  items: string[];
  index: number;
  progress: number;
  onSelect: (i: number) => void;
}) {
  return (
    <nav aria-label={label} className="relative mt-8 md:mt-12">
      <div className="absolute inset-x-0 top-0 h-px bg-line-2" />
      <div className="absolute left-0 top-0 h-px bg-accent-2" style={{ width: `${progress * 100}%` }} />
      <div className="flex justify-between gap-1 pt-3">
        {items.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={i === index}
            className={`truncate text-[12px] transition-colors sm:text-[14px] ${i === index ? "text-fg" : "text-fg-3 hover:text-fg-2"}`}
          >
            {name}
          </button>
        ))}
      </div>
    </nav>
  );
}
