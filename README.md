# Portfólio de Moisés Ferreira e Silva

Next.js (App Router), TypeScript e Tailwind CSS v4, estética neo-suíça escura. A especificação completa está em `portfolio-neo-swiss-spec.md`.

```bash
pnpm dev        # desenvolvimento
pnpm build      # build estático
pnpm lint
pnpm typecheck
```

- Todo o texto fica em `src/content/*.ts`.
- Imagens: coloque os arquivos em `public/images/` (`mofe.jpg` e `projects/*`). Enquanto faltarem, o site mostra um cartão com o nome esperado.
- Defina `NEXT_PUBLIC_SITE_URL` com o domínio de produção (canonical, sitemap e Open Graph).
- Deploy: Vercel sem configuração, ou `docker compose up -d --build` (saída `standalone`, porta 9010 em 127.0.0.1, atrás do Nginx).
