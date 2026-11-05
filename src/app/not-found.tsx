import { Button, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <main id="conteudo" className="pt-16">
      <Container className="flex min-h-[70vh] flex-col items-start justify-center gap-6 py-24">
        <p className="text-[14px] text-accent-2">404</p>
        <h1 className="text-[44px] font-semibold tracking-[-0.04em] lg:text-[64px]">Página não encontrada.</h1>
        <p className="text-[18px] text-fg-2">O endereço não existe ou foi movido.</p>
        <Button href="/">Voltar ao início</Button>
      </Container>
    </main>
  );
}
