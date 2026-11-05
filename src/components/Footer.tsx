import Link from "next/link";
import { footer, site } from "@/content/site";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-4 text-[14px] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold text-fg">{site.brand}</span> {footer.line}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {site.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              {link.label}
              <span className="sr-only"> ({site.newTab})</span>
            </a>
          ))}
          <Link href="/#topo" className="hover:text-fg">
            {footer.top}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
