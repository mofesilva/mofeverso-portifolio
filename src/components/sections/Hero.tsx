import Image from "next/image";
import { hero, site } from "@/content/site";
import { Parallax } from "../Parallax";
import Prism from "../Prism";
import { SkillIcon } from "../SkillIcon";
import { Button, Container } from "../ui";

export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden pt-16 lg:flex lg:min-h-[82svh] lg:items-center"
    >
      {/* fundo: prisma WebGL (React Bits) nas cores do site, esmaecendo para o fundo na base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_65%,transparent)]"
      >
        <Prism
          animationType="rotate"
          colors={["#6a5ce6", "#ada3ff", "#8b53c5"]}
          glow={0.7}
          saturation={1}
          scale={3}
          timeScale={0.15}
          offset={{ x: 0, y: 130 }}
          interactive={false}
        />
      </div>

      <Container className="relative grid w-full gap-16 pb-24 pt-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24">
        <Parallax speed={-0.06} className="lg:col-span-7">
          <div className="rise flex flex-col gap-10">
            <h1
              id="hero-titulo"
              className="text-balance text-[36px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[48px] lg:text-[60px]"
            >
              {hero.titleStart}{" "}
              <span className="bg-[linear-gradient(180deg,#ffffff_20%,#8a8a94)] bg-clip-text text-transparent">
                {hero.titleEnd}
              </span>
            </h1>
            <p className="max-w-[54ch] text-[18px] leading-relaxed text-fg lg:text-[20px]">{hero.text}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={hero.cta.href}>{hero.cta.label} ↓</Button>
              <Button href={site.contactCta.href} variant="secondary">
                {site.contactCta.label}
              </Button>
            </div>
          </div>
        </Parallax>

        <figure className="relative lg:col-span-5">
          {/* Crachá 3:4 inclinado para a direita, com leve giro ao rolar. */}
          <Parallax speed={0.12} baseRotate={4} rotate={3}>
            <div className="rise mx-auto flex aspect-[3/4] w-full max-w-[460px] flex-col overflow-hidden rounded-[24px] border border-line-2 bg-panel lg:mr-0">
              <div className="relative h-[70%]">
                <Image
                  src={hero.portrait.src}
                  alt={hero.portrait.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 460px, 90vw"
                  className="object-cover object-[50%_35%]"
                />
              </div>
              <figcaption className="flex flex-1 flex-col justify-center gap-1 border-t border-line-2 px-7">
                <span className="text-[15px] font-medium leading-none text-accent-2">{hero.portrait.nickname}</span>
                <span className="text-[24px] font-semibold leading-none tracking-[-0.02em] text-fg">
                  {hero.portrait.name}
                </span>
                <span className="text-[14px] leading-none text-fg-2">{hero.role}</span>
                <ul aria-label="Perfis" className="mt-3 flex gap-2">
                  {site.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`${link.label} ${link.handle}`}
                        aria-label={`${link.label}, ${link.handle} (${site.newTab})`}
                        className="group block"
                      >
                        <SkillIcon icon={link.icon} className="size-9 group-hover:bg-accent group-hover:text-white" rounded="rounded-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </figcaption>
            </div>
          </Parallax>
        </figure>
      </Container>
    </section>
  );
}
