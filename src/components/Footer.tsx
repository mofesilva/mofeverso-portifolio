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
        <div className="flex items-center gap-6">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            GitHub
          </a>
          <Link href="/#topo" className="hover:text-fg">
            {footer.top}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
