export type Project = {
  slug: string;
  name: string;
  client: string;
  category: string;
  platform: string;
  audience?: string;
  team?: string;
  status?: string;
  headline?: string;
  summary: string;
  problem: string;
  solution: string;
  listKind: "scope" | "features";
  list: string[];
  result: string;
  resultNote?: string;
  participation: string;
  decisions: { title: string; text: string }[];
  stack: string[];
  flow: { nodes: string[]; edges: [number, number][]; loop?: boolean };
  link?: { label: string; href: string };
  /** "browser" ganha moldura de navegador; "phone" e "device" já vêm com aparelho. */
  media?: { src: string; width: number; height: number; frame: "browser" | "device" | "phone" };
  /** Cor do brilho atrás da imagem. */
  glow: string;
};

const teamParticipation =
  "Projeto da equipe da Dzign-e, com atuação em desenvolvimento full stack desde 2021. A experiência na empresa reúne aplicações, APIs, integração de dados e operação dos serviços. As funcionalidades aqui apresentadas descrevem o produto construído em equipe.";

const teamDecisions = (delivery: string, stack: string[]) => [
  { title: "Domínio e experiência", text: delivery },
  { title: "Tecnologia aplicada", text: `${stack.join(", ")}.` },
  {
    title: "Desenvolvimento em equipe",
    text: "Produto profissional construído no contexto da Dzign-e, com aplicações, backend e operação conectados.",
  },
];

const chain = (n: number): [number, number][] =>
  Array.from({ length: n - 1 }, (_, i) => [i, i + 1] as [number, number]);

const dzigne = (slug: string) => ({ label: "Case na Dzign-e", href: `https://www.dzign-e.com.br/cases/${slug}` });

export const projects: Project[] = [
  {
    slug: "la-chapelle",
    name: "La Chapelle",
    client: "Igreja na França",
    category: "Projeto independente",
    platform: "Site público + CMS + API",
    status: "Em funcionamento",
    headline: "Conteúdo publicado. Solução conectada.",
    summary: "Site público em Next.js, administração de conteúdo e API própria, conectados em uma solução em funcionamento.",
    problem: "A igreja precisava reunir sua apresentação institucional e conteúdos atualizáveis em um site, com uma administração para gerenciar as publicações.",
    solution: "Três frentes: site público, CMS administrativo e API. O conteúdo gerenciado no backend chega à experiência pública em francês, português e inglês.",
    listKind: "features",
    list: ["Conteúdo institucional e contato", "Sermões e podcasts", "Blog e eventos", "Galeria e arquivos", "Administração de conteúdo", "Experiência em três idiomas"],
    result: "Site publicado com gestão de conteúdo, API e infraestrutura próprias. O escopo é um CMS de conteúdo; a entrega reúne as camadas necessárias para operá-lo.",
    participation: "Concepção da solução, condução das decisões técnicas e orientação da implementação com IA. Avaliação do comportamento, da organização e do resultado, com ajustes manuais pontuais.",
    decisions: [
      { title: "Três frentes conectadas", text: "Site e administração em Next.js se integram a uma API em Express e TypeScript." },
      { title: "Dados e validação", text: "MongoDB para persistência; Zod para validar os dados recebidos pela API." },
      { title: "Serviços em contêineres", text: "Docker Compose organiza site, API e banco; volumes persistentes mantêm dados e arquivos entre recriações." },
      { title: "Publicação", text: "Serviços em servidor Debian na Akamai Cloud, localizado na Itália." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Express", "MongoDB", "Zod", "Docker", "Debian", "Akamai Cloud"],
    flow: { nodes: ["Administração", "API (Express + Zod)", "MongoDB / Arquivos", "Next.js público", "Visitante"], edges: chain(5) },
    link: { label: "Site ao vivo", href: "https://www.erelachapelle.fr/fr" },
    media: { src: "/images/projects/chapelle-wide.png", width: 1920, height: 1080, frame: "browser" },
    glow: "#8a1d36",
  },
  {
    slug: "icalvinus",
    name: "iCalvinus",
    client: "Igreja Presbiteriana do Brasil",
    category: "Gestão institucional",
    platform: "Web + mobile",
    audience: "Gestão conciliar da IPB",
    team: "2 desenvolvedores",
    summary: "Gestão conciliar em uma plataforma web e mobile.",
    problem: "Documentos, atas e decisões dispersos em processos manuais dificultavam o acesso à informação e a organização das reuniões.",
    solution: "Centralização documental, geração de atas, presença e votação eletrônica em uma plataforma para a governança presbiteriana.",
    listKind: "scope",
    list: ["Base documental com documentos históricos e atuais", "Geração de atas e registro de presença", "Módulo de votação eletrônica", "Acesso integrado a Digesto, Anuário, decisões e atas"],
    result: "A Dzign-e relata redução de dois terços no tempo das reuniões do Supremo Concílio.",
    resultNote: "Resultado informado pela Dzign-e, não uma métrica pessoal inferida do código.",
    participation: teamParticipation,
    decisions: teamDecisions(
      "Centralização documental, geração de atas, presença e votação eletrônica em uma plataforma para a governança presbiteriana.",
      ["Flutter", "Dart", "Node.js", "MySQL", "Firebase", "Akamai Cloud"],
    ),
    stack: ["Flutter", "Dart", "Node.js", "MySQL", "Firebase", "Akamai Cloud"],
    flow: { nodes: ["Base documental", "Consulta", "Reunião", "Presença", "Votação eletrônica", "Atas e decisões"], edges: chain(6), loop: true },
    link: dzigne("icalvinus"),
    media: { src: "/images/projects/icalvinus.webp", width: 2310, height: 1177, frame: "device" },
    glow: "#1f6fb2",
  },
  {
    slug: "oab-mack",
    name: "OAB Mack",
    client: "Universidade Presbiteriana Mackenzie",
    category: "Educação",
    platform: "Aplicativo + painel web",
    audience: "Alunos e professores de Direito",
    team: "2 desenvolvedores / 6 meses",
    summary: "Preparação para a OAB, do estudo à gestão de conteúdo.",
    problem: "Alunos precisavam praticar para o exame; professores precisavam atualizar e organizar o conteúdo sem depender de alterações no aplicativo.",
    solution: "Aplicativo de estudos com simulados personalizados e acompanhamento do progresso, conectado a um painel web de questões e conteúdo.",
    listKind: "scope",
    list: ["Simulados personalizados para preparação ao exame", "Acompanhamento do progresso de estudo", "Identificação de áreas de maior dificuldade", "Criação, edição e organização de questões por professores"],
    result: "Plataforma proprietária desenvolvida sob medida para a Mackenzie.",
    participation: teamParticipation,
    decisions: teamDecisions(
      "Duas frentes complementares: prática no aplicativo e manutenção editorial no painel de professores.",
      ["Flutter", "Dart", "Node.js", "MySQL", "Akamai Cloud"],
    ),
    stack: ["Flutter", "Dart", "Node.js", "MySQL", "Akamai Cloud"],
    flow: { nodes: ["Professor", "Base de conteúdo", "Simulado personalizado", "Estudante", "Respostas", "Acompanhamento"], edges: chain(6) },
    link: dzigne("oab-mack"),
    media: { src: "/images/projects/oabmack.webp", width: 1072, height: 2192, frame: "phone" },
    glow: "#c0262d",
  },
  {
    slug: "sigmaapp",
    name: "SigmaApp",
    client: "Sigmacon",
    category: "Segurança & condomínios",
    platform: "Aplicativo mobile",
    audience: "Moradores e administração condominial",
    team: "2 desenvolvedores",
    summary: "Um produto em evolução para a rotina dos condomínios.",
    problem: "A comunicação entre moradores e administração precisava de um fluxo para abertura e acompanhamento de ocorrências.",
    solution: "O aplicativo evoluiu para incluir controle de acesso, reservas de espaços, notificações e integrações externas, além da gestão de ocorrências.",
    listKind: "scope",
    list: ["Abertura e acompanhamento de ocorrências", "Controle de acesso", "Reserva e gestão de espaços comuns", "Notificações e comunicação com condôminos", "Integrações externas e sistema de câmeras"],
    result: "Produto ativo no mercado, com desenvolvimento contínuo para novas demandas.",
    resultNote: "Informado pela Dzign-e.",
    participation: teamParticipation,
    decisions: teamDecisions(
      "O aplicativo evoluiu para incluir controle de acesso, reservas de espaços, notificações e integrações externas, além da gestão de ocorrências.",
      ["Flutter", "Dart", "Node.js", "MySQL", "Firebase", "Akamai Cloud"],
    ),
    stack: ["Flutter", "Dart", "Node.js", "MySQL", "Firebase", "Akamai Cloud"],
    flow: {
      nodes: ["Usuário", "Ocorrências", "Controle de acesso", "Reservas", "Notificações", "Integrações"],
      edges: [[0, 1], [0, 2], [0, 3], [1, 4], [3, 4], [2, 5]],
    },
    link: dzigne("sigmaapp"),
    media: { src: "/images/projects/sigmaapp.webp", width: 1072, height: 2192, frame: "phone" },
    glow: "#2a5bd7",
  },
  {
    slug: "ipiconecta",
    name: "IPIConecta",
    client: "Igreja Presbiteriana Independente do Brasil",
    category: "Gestão & dados",
    platform: "Web + mobile",
    audience: "Estrutura institucional da IPIB",
    team: "2 desenvolvedores",
    summary: "Uma estrutura institucional conectada em um só sistema.",
    problem: "A instituição precisava organizar documentos e sua estrutura de membros, igrejas, presbitérios e sínodos.",
    solution: "Plataforma web e mobile que reúne cadastros institucionais e gestão conciliar, com atas, presença, votação e documentação.",
    listKind: "scope",
    list: ["Cadastros de membros e igrejas", "Organização de presbitérios e sínodos", "Centralização de documentos e decisões", "Atas, presença e votação eletrônica", "Gestão conciliar e institucional no mesmo ambiente"],
    result: "Base documental centralizada e gestão adaptada à estrutura da denominação.",
    participation: teamParticipation,
    decisions: teamDecisions(
      "Plataforma web e mobile que reúne cadastros institucionais e gestão conciliar, com atas, presença, votação e documentação.",
      ["Flutter", "Dart", "Node.js", "MySQL", "Akamai Cloud"],
    ),
    stack: ["Flutter", "Dart", "Node.js", "MySQL", "Akamai Cloud"],
    flow: {
      nodes: ["Membros e igrejas", "Presbitérios e sínodos", "Documentação", "Concílio", "Presença e votação", "Atas e decisões"],
      edges: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 2]],
    },
    link: dzigne("ipiconecta"),
    media: { src: "/images/projects/ipiconecta.webp", width: 2300, height: 1177, frame: "device" },
    glow: "#3d4fb8",
  },
  {
    slug: "contrataja",
    name: "ContrataJá",
    client: "Cliente da Dzign-e",
    category: "Produto entregue",
    platform: "Aplicativo + backend",
    status: "Publicado e utilizado pelo cliente",
    headline: "Encontrar um serviço. Chegar ao prestador.",
    summary: "Aplicativo publicado e utilizado pelo cliente, com descoberta por proximidade, perfis, avaliações e contato.",
    problem: "O cliente queria conectar pessoas a serviços e estabelecimentos por meio de uma experiência de descoberta local.",
    solution: "Aplicativo com busca por proximidade, perfis de estabelecimentos e prestadores, avaliações e contato por canais como telefone e WhatsApp.",
    listKind: "features",
    list: ["Busca por proximidade", "Perfis de prestadores e estabelecimentos", "Avaliações", "Contato por telefone e WhatsApp", "Diferentes perfis de acesso"],
    result: "Aplicativo entregue, publicado e utilizado pelo cliente. A maturação e a divulgação comercial não alcançaram uma adoção ampla.",
    participation: "Atuação na entrega do aplicativo no contexto da Dzign-e, com desenvolvimento em Flutter e integração com backend. O produto foi publicado e utilizado pelo cliente.",
    decisions: [
      { title: "Descoberta e contato", text: "Busca por proximidade, perfis, avaliações e contato por telefone e WhatsApp." },
      { title: "Perfis de acesso", text: "Administração, moderação, prestadores, operadores e clientes." },
      { title: "Entrega e adoção", text: "A publicação foi concluída. A adoção comercial foi limitada e não é apresentada como resultado de escala." },
    ],
    stack: ["Flutter", "Dart", "Node.js", "MongoDB"],
    flow: { nodes: ["Cliente", "Busca", "Perfil", "Avaliações", "Contato", "Prestador"], edges: chain(6) },
    media: { src: "/images/projects/contrataja-phone.png", width: 1075, height: 2166, frame: "phone" },
    link: dzigne("contrata-ja"),
    glow: "#b08300",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function getNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { previous: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}
