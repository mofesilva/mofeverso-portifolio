"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { SkillIcon } from "./SkillIcon";

const item =
  "grid size-10 place-items-center rounded-full outline-none transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent";

/** Um ícone por rede. O Instagram da Nerdcave fica de fora aqui para não repetir o glifo. */
const social = site.links.filter((link, i, all) => all.findIndex((l) => l.icon === link.icon) === i);

/** Contatos e "voltar ao topo", presos no canto inferior direito durante toda a navegação. */
export function ContactDock() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
      <div className="hidden items-center gap-2 sm:flex">
        <a href={`mailto:${site.email}`} aria-label="Enviar email" title="Email" className={item}>
          <span aria-hidden="true" className="grid size-full place-items-center rounded-full bg-white/[0.07] text-fg backdrop-blur-md">
            <svg viewBox="0 0 24 24" className="size-[44%]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 6L2 7" />
            </svg>
          </span>
        </a>
        {social.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (${site.newTab})`}
            title={link.label}
            className={item}
          >
            <SkillIcon icon={link.icon} rounded="rounded-full" className="size-full backdrop-blur-md" />
          </a>
        ))}
      </div>
      <button
        type="button"
        aria-label="Voltar ao topo"
        title="Voltar ao topo"
        tabIndex={scrolled ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`${item} bg-accent text-white ${scrolled ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[44%]" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
