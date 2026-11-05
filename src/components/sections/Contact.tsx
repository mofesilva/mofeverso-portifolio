import Image from "next/image";
import { contact, hero, site } from "@/content/site";
import { Button, Container } from "../ui";
import { CopyEmail } from "./CopyEmail";

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="relative scroll-mt-16 overflow-hidden py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-320px] left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(106,92,230,0.24),rgba(139,83,197,0.1)_55%,transparent)]"
      />
      <Container className="relative flex flex-col items-center gap-8 text-center">
        <Image
          src={hero.portrait.src}
          alt=""
          width={72}
          height={72}
          className="size-[72px] rounded-full border border-line-2 object-cover"
        />
        <h2 id="contato-titulo" className="max-w-[16ch] text-balance text-[44px] font-semibold leading-[1.04] tracking-[-0.04em] lg:text-[68px]">
          {contact.title}
        </h2>
        <a href={`mailto:${contact.email}`} className="text-[20px] text-fg-2 transition-colors hover:text-fg lg:text-[24px]">
          {contact.email}
        </a>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href={`mailto:${contact.email}`}>{contact.write}</Button>
          <CopyEmail email={contact.email} label={contact.copy} copied={contact.copied} />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href={site.linkedin} variant="secondary" external>
            LinkedIn
          </Button>
          <Button href={site.github} variant="secondary" external>
            GitHub
          </Button>
        </div>
        <p className="text-[14px] text-fg-3">{contact.line}</p>
      </Container>
    </section>
  );
}
