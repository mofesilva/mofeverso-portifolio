const email = "contato@mofeverso.com.br";

export const site = {
  brand: "mofe/",
  name: "Moisés Ferreira e Silva",
  title: "Mofe — Engenharia de software",
  description:
    "Moisés Ferreira e Silva, Mofe. Engenharia full stack com IA no processo, decisões técnicas próprias e experiência em produtos web e mobile.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mofeverso.com.br",
  email,
  linkedin: "https://www.linkedin.com/in/mofesilva",
  github: "https://github.com/mofesilva",
  nav: [
    { label: "Trabalho", href: "/#trabalho" },
    { label: "Método", href: "/#metodo" },
    { label: "Habilidades", href: "/#habilidades" },
    { label: "Trajetória", href: "/#sobre" },
  ],
  contactCta: { label: "Contato", href: "/#contato" },
  newTab: "abre em nova aba",
};

export const hero = {
  role: "Engenheiro de software / Full stack",
  titleStart: "O problema é o começo.",
  titleEnd: "A IA amplia a construção.",
  text: "Concepção de soluções, decisões técnicas e implementação conduzida com IA. Base em Flutter e Node.js, com atuação atual também em Next.js, React e TypeScript.",
  cta: { label: "Ver o trabalho", href: "#trabalho" },
  portrait: {
    src: "/images/mofe.jpg",
    alt: "Retrato de Moisés Ferreira e Silva",
    name: "Moisés Ferreira e Silva",
    nickname: "Mofe",
  },
  /** Credenciais reunidas num único bloco, logo abaixo da abertura. */
  facts: {
    role: { label: "Atuação", value: "Full stack software engineer" },
    place: { label: "Base", value: "Belo Horizonte / Brasil" },
    process: { label: "Processo", value: "AI-centered & AI-assisted" },
    company: { label: "Dzign-e", value: "desde 2021" },
    areas: { label: "Frentes", items: ["Web", "Mobile", "APIs", "Infraestrutura"] },
    github: { label: "GitHub", value: "github.com/mofesilva" },
  },
};

export const method = {
  label: "Método",
  title: "Desenvolvimento com IA, do começo ao fim.",
  lead: "A IA está presente em todo o desenvolvimento e assume praticamente toda a implementação. A condução humana acontece continuamente, em colaboração com a IA — inclusive na investigação, nos testes e nas decisões.",
};

export const education = {
  label: "Formação atual",
  title: "MBA em Engenharia de Software com IA Aplicada",
  text: "Formação conectada à atuação atual com desenvolvimento centrado em IA.",
  institution: "UNIPDS",
  status: "Em andamento",
  period: "Março de 2026 a março de 2027",
};

export const work = {
  title: "O software, em uso.",
  subtitle: "Projetos de equipe e entregas independentes",
  text: "Educação, gestão institucional, operação condominial e serviços. Produtos construídos em contextos e equipes diferentes.",
  counter: "06",
  counterLabel: "projetos",
  note: "Os produtos profissionais são apresentados como entregas da equipe Dzign-e. Cada projeto distingue o escopo do produto da participação individual.",
  open: "Ver estudo de caso",
};

export const studioIntro = {
  title: "O que está em construção agora.",
  subtitle: "Pesquisa, construção e necessidades pessoais",
  text: "Experimentos e projetos pessoais, apresentados com seu estágio atual.",
};

export const skillsIntro = {
  title: "Uma base prática. Novas possibilidades.",
  text: "Flutter, Dart e Node.js compõem a experiência manual. React, Next.js e TypeScript fazem parte do trabalho atual, principalmente com implementação por IA.",
  card: {
    practical: "Aplicação prática",
    linkedTo: "Vinculada a",
    branch: "Ramo",
    projects: "Projetos",
    main: "Principal",
    passive: "Passiva",
    tree: "Árvore de habilidades",
  },
};

export const journeyIntro = {
  title: "Outros caminhos. A mesma curiosidade.",
  subtitle: "Repertório além do código",
};

export const contact = {
  title: "Qual problema precisa ser resolvido?",
  email,
  copy: "Copiar email",
  copied: "Email copiado.",
  write: "Escrever email",
  line: "Engenharia de software — Concepção · Desenvolvimento · Operação",
};

export const footer = {
  line: "Moisés Ferreira e Silva / Belo Horizonte",
  top: "Voltar ao início ↑",
};

export const caseUi = {
  back: "Trabalho selecionado",
  context: "Contexto",
  product: "O produto",
  flow: "Funcionamento",
  participation: "Participação",
  problem: "Problema",
  solution: "Solução",
  stack: "Tecnologias",
  scope: "O produto permite",
  features: "Funcionalidades",
  result: "Resultado",
  flowNote: "Fluxo funcional do produto. As ligações representam relações de uso, não um diagrama de infraestrutura.",
  myWork: "Participação",
  decisions: "Decisões",
  meta: { client: "Cliente", category: "Categoria", platform: "Plataforma", audience: "Público", team: "Equipe", status: "Status" },
  previous: "Projeto anterior",
  next: "Próximo projeto",
};
