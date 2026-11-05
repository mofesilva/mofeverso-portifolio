import Image from "next/image";
import { hero, site } from "@/content/site";
import { Parallax } from "../Parallax";
import { Button, Container } from "../ui";

export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden pt-16 lg:flex lg:min-h-[82svh] lg:items-center"
    >
      {/* fundo: grade sutil e brilho azul */}
      <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-280px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(106,92,230,0.26),rgba(139,83,197,0.1)_55%,transparent)]"
      />

      <Container className="relative grid w-full gap-16 pb-24 pt-20 lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-24">
        <Parallax speed={-0.06} className="lg:col-span-7">
          <div className="rise flex flex-col gap-10">
            <h1
              id="hero-titulo"
              className="text-balance text-[48px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[68px] lg:text-[92px]"
            >
              {hero.titleStart}{" "}
              <span className="bg-[linear-gradient(180deg,#ffffff_20%,#8a8a94)] bg-clip-text text-transparent">
                {hero.titleEnd}
              </span>
            </h1>
            <p className="max-w-[54ch] text-[19px] leading-relaxed text-fg-2 lg:text-[21px]">{hero.text}</p>
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
              <div className="relative h-[76%]">
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
              </figcaption>
            </div>
          </Parallax>
        </figure>
      </Container>
    </section>
  );
}
