const points = ["Requisitos", "Arquitetura", "Código", "Testes"];

export function MethodOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[600px]" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="absolute inset-[38%] size-[24%]" fill="none">
        <path d="M60 43 A17 17 0 0 0 60 77 Z" fill="#ededef" />
        <path d="M60 43 A17 17 0 0 1 60 77 Z" fill="#6a5ce6" />
        <circle cx="60" cy="24" r="17" fill="#ededef" />
        <circle cx="91.2" cy="42" r="17" fill="#6a5ce6" />
        <circle cx="91.2" cy="78" r="17" fill="#ededef" />
        <circle cx="60" cy="96" r="17" fill="#6a5ce6" />
        <circle cx="28.8" cy="78" r="17" fill="#ededef" />
        <circle cx="28.8" cy="42" r="17" fill="#6a5ce6" />
      </svg>
      {points.map((point, i) => (
        <div key={point} className={`method-orbit method-orbit-${i}`}>
          <div className={`method-orbit-motion method-orbit-motion-${i}`}>
            <div className={`method-orbit-marker method-orbit-marker-${i}`}><span className="method-orbit-dot" /><span className="whitespace-nowrap text-[11px] font-medium text-fg sm:text-[13px]">{point}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}
