import { brandIcons, linkedinIcon, riverpodIcon } from "@/content/skill-icons";

type Tone = "base" | "path" | "active";

const tones: Record<Tone, string> = {
  // Todos os containers na mesma cor base e todos os ícones na mesma cor.
  base: "bg-white/[0.07] text-fg",
  // Habilidades no caminho da raiz até a escolhida.
  path: "bg-accent/25 text-fg",
  // A habilidade escolhida.
  active: "bg-accent text-white",
};

/** Ícone de uma tecnologia num container liso. Sem borda, sem brilho e sem cor de marca. */
export function SkillIcon({
  icon,
  tone = "base",
  className = "",
  rounded = "rounded-xl",
}: {
  icon: string;
  tone?: Tone;
  className?: string;
  rounded?: string;
}) {
  const data = icon === "riverpod" ? riverpodIcon : icon === "linkedin" ? linkedinIcon : brandIcons[icon];
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center transition-colors duration-200 ${tones[tone]} ${rounded} ${className}`}
    >
      <svg
        data-icon={icon}
        // As ondas do glifo próprio têm o centro em y=13; as marcas em y=12.
        viewBox={icon === "riverpod" ? "0 1 24 24" : "0 0 24 24"}
        preserveAspectRatio="xMidYMid meet"
        className="block size-[44%] place-self-center"
        fill={data.stroke ? "none" : "currentColor"}
        stroke={data.stroke ? "currentColor" : undefined}
        strokeWidth={data.stroke ? 2 : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={data.path} />
      </svg>
    </span>
  );
}
