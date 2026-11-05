"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { site } from "@/content/site";
import GooeyNav from "./GooeyNav";
import { SkillIcon } from "./SkillIcon";
import StaggeredMenu from "./StaggeredMenu";

/** Desktop: o Mofe é a primeira opção e leva ao topo (Hero); o Contato é a última, como as demais seções. */
const sections = [...site.nav, site.contactCta];
const desktopItems = [{ label: site.brand, href: "/#topo" }, ...sections];
const menuItems = [...site.nav, site.contactCta].map((i) => ({ label: i.label, ariaLabel: `Ir para ${i.label}`, link: i.href }));
const socials = site.links.map((l) => ({
  label: l.label,
  link: l.href,
  ariaLabel: `${l.label}, ${l.handle} (${site.newTab})`,
  icon: <SkillIcon icon={l.icon} className="size-11" rounded="rounded-full" />,
}));

const big = { "--gn-font": "15px", "--gn-x": "16px", "--gn-y": "10px", "--gn-pad": "6px" } as CSSProperties;

/** Navbar: a partir de lg, uma só pílula flutuante (GooeyNav) com o Mofe, as seções e o Contato; abaixo disso, o Staggered Menu. */
export function Nav() {
  const [section, setSection] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  // Após um clique, a seleção fica no item clicado até a rolagem suave parar (sem passar por cada seção do caminho).
  const lock = useRef<{ index: number; timer: number } | null>(null);

  // Seção ativa: a última cujo topo já passou de 40% da altura da tela (-1 = antes de todas).
  useEffect(() => {
    const items = sections;
    const update = () => {
      if (lock.current) {
        window.clearTimeout(lock.current.timer);
        const index = lock.current.index;
        lock.current.timer = window.setTimeout(() => {
          lock.current = null;
          update();
        }, 160);
        setSection(index);
        return;
      }
      let idx = -1;
      items.forEach((item, i) => {
        const el = document.getElementById(item.href.split("#")[1]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) idx = i;
      });
      setSection(idx);
    };
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const choose = (_: number, item: { href?: string }) => {
    // -1 = topo (Hero), antes da primeira seção.
    const index = item.href === "/#topo" ? -1 : sections.findIndex((i) => i.href === item.href);
    if (index === -1 && item.href !== "/#topo") return;
    if (lock.current) window.clearTimeout(lock.current.timer);
    lock.current = {
      index,
      timer: window.setTimeout(() => {
        lock.current = null;
      }, 1500),
    };
    setSection(index);
  };

  return (
    <>
    <header className="pointer-events-none fixed inset-x-0 top-3 z-50 flex items-center justify-center gap-2 px-3">
      <div className="pointer-events-auto hidden lg:block">
        <GooeyNav
          items={desktopItems}
          activeIndex={section + 1}
          theme="dark"
          size="md"
          frame
          style={big}
          onChange={choose}
        />
      </div>
    </header>
    <StaggeredMenu
      className={`lg:hidden${scrolled ? " is-scrolled" : ""}`}
      isFixed
      position="right"
      logoText={site.brand}
      menuLabel="Menu"
      closeLabel="Fechar"
      socialsTitle="Perfis"
      items={menuItems}
      socialItems={socials}
      displayItemNumbering={false}
      colors={["#121216", "#09090b"]}
      accentColor="#ada3ff"
      menuButtonColor="#ededef"
      openMenuButtonColor="#ededef"
      changeMenuColorOnOpen={false}
    />
    </>
  );
}
