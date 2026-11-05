"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/** Barra fixa: fica translúcida com borda depois que a página rola. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/95 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <Link href="/#topo" className="flex items-baseline gap-2.5" onClick={() => setOpen(false)}>
          <span className="text-[18px] font-semibold tracking-[-0.02em]">{site.brand}</span>
          <span className="hidden text-[13px] text-fg-3 sm:inline">{site.name}</span>
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[14px] text-fg-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={site.contactCta.href}
            className="hidden h-9 items-center rounded-full bg-white px-4 text-[14px] font-medium text-black transition-colors hover:bg-white/85 md:inline-flex"
          >
            {site.contactCta.label}
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-movel"
            onClick={() => setOpen((v) => !v)}
            className="h-9 rounded-full border border-line-2 px-4 text-[14px] md:hidden"
          >
            {open ? "Fechar" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="menu-movel" aria-label="Principal" className="border-t border-line px-6 pb-6 md:hidden">
          <ul className="flex flex-col">
            {[...site.nav, site.contactCta].map((item) => (
              <li key={item.href} className="border-b border-line last:border-0">
                <Link href={item.href} onClick={() => setOpen(false)} className="block py-4 text-[20px] font-medium">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
