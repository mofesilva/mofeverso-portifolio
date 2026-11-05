import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";

/* Peças compartilhadas: contêiner, botões, cabeçalho de seção, etiquetas. */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`}>{children}</div>;
}

type Variant = "primary" | "secondary";

export function buttonClasses(variant: Variant = "primary") {
  return `inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[15px] font-medium transition-colors ${
    variant === "primary"
      ? "bg-white text-black hover:bg-white/85"
      : "border border-line-2 text-fg hover:bg-white/[0.06]"
  }`;
}

export function Button({
  href,
  variant = "primary",
  external,
  children,
}: {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
}) {
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={buttonClasses(variant)} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {external ? (
          <>
            <span aria-hidden="true">↗</span>
            <span className="sr-only"> ({site.newTab})</span>
          </>
        ) : null}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses(variant)}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-accent-2">{children}</p>;
}

export function SectionHeader({
  id,
  title,
  aside,
}: {
  id: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <header className="flex max-w-[760px] flex-col gap-5">
      <h2 id={id} className="text-balance text-[36px] font-semibold leading-[1.08] tracking-[-0.035em] lg:text-[52px]">
        {title}
      </h2>
      {/* O texto de apoio fica sempre abaixo do título, nunca ao lado. */}
      {aside ? <div className="max-w-[62ch] text-[17px] leading-relaxed text-fg-2">{aside}</div> : null}
    </header>
  );
}

export function Section({
  id,
  labelledBy,
  divider = true,
  children,
}: {
  id?: string;
  labelledBy: string;
  /** Linha fina no topo, separando da seção anterior. */
  divider?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-16 py-24 lg:py-32 ${divider ? "border-t border-line" : ""}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center whitespace-nowrap rounded-full border border-line-2 px-3 text-[12.5px] text-fg-2">
      {children}
    </span>
  );
}

export function TagList({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i}>
          <Tag>{i}</Tag>
        </li>
      ))}
    </ul>
  );
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-fg-2 transition-colors hover:text-fg">
      {children} <span aria-hidden="true">↗</span>
      <span className="sr-only"> ({site.newTab})</span>
    </a>
  );
}
