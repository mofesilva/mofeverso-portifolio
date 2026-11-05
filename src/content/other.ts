/* Projetos próprios, repertório técnico e trajetória. */

export type StudioProject = {
  n: string;
  name: string;
  stage: string;
  text?: string;
  stack?: string[];
  notice?: string;
  link?: { label: string; href: string };
  /** Figura Hairline do card: nome da página em public/hairline. */
  figure: "presso" | "nerdcave" | "finch" | "minim";
};

export const studio: StudioProject[] = [
  {
    n: "01",
    name: "Presso",
    stage: "Desktop, MVP em construção",
    text: "Um mapa visual do uso do teclado. Contagens agregadas de teclas em um heatmap, com dados armazenados localmente em SQLite.",
    stack: ["Electron", "TypeScript", "SQLite", "Vite", "Tailwind CSS"],
    link: { label: "GitHub", href: "https://github.com/mofesilva/presso" },
    figure: "presso",
  },
  {
    n: "02",
    name: "Nerdcave Admin",
    stage: "CMS, em desenvolvimento",
    text: "Um CMS para um blog de games, com artigos e tags. A intenção é evoluir a base para um headless CMS reutilizável; arquitetura e infraestrutura ainda estão em definição.",
    stack: ["Next.js", "React", "TypeScript"],
    link: { label: "GitHub", href: "https://github.com/mofesilva/nerdcave-admin" },
    figure: "nerdcave",
  },
  {
    n: "03",
    name: "Finch",
    stage: "App + API, projeto pessoal",
    text: "Aplicativo de finanças pessoais com workspaces, contas e transações. Concepção e modelagem com apoio de IA; as decisões finais permanecem com o autor. Implementação guiada por essas escolhas.",
    stack: ["Flutter", "Dart", "TypeScript", "Express", "MongoDB"],
    notice: "Em desenvolvimento. Não é um serviço financeiro em produção.",
    figure: "finch",
  },
  {
    n: "04",
    name: "Minim Agent",
    stage: "Projeto pessoal, em concepção",
    text: "Um agente de gestão de produtividade com dados persistidos em banco de dados e acessados via MCP. Um app acompanha o agente para a gestão visual desses dados.",
    figure: "minim",
  },
];

/** Árvore de habilidades: cada nó é uma tecnologia; "passive" são as ligadas a uma principal. */
export type SkillKind = "main" | "passive";

export type SkillNode = {
  id: string;
  name: string;
  /** Chave em skill-icons.ts ("riverpod" é o glifo próprio). */
  icon: string;
  kind: SkillKind;
  /** id do nó pai; null liga direto à raiz da árvore. */
  parent: string | null;
  /** Nome do ramo, mostrado na ficha dos nós de topo. */
  branch?: string;
  description: string;
  /** Projetos listados à mão, somados aos que o stack de cada projeto já indica. */
  projects?: string[];
  /** Soma os projetos de outras habilidades (quando a tecnologia é base delas). */
  inheritFrom?: string[];
};

const gitProjects = ["Nerdcave Admin", "Finch", "La Chapelle", "ContrataJá"];

export const skillTree: SkillNode[] = [
  // Mobile
  { id: "flutter", name: "Flutter", icon: "flutter", kind: "main", parent: null, branch: "Mobile", description: "Aplicações web e mobile na Dzign-e. Base de implementação manual." },
  { id: "dart", name: "Dart", icon: "dart", kind: "passive", parent: "flutter", description: "Linguagem da experiência profissional com Flutter." },
  { id: "riverpod", name: "Riverpod", icon: "riverpod", kind: "passive", parent: "flutter", description: "Gerenciamento de estado no cliente Flutter do Finch.", projects: ["Finch"] },
  { id: "firebase", name: "Firebase", icon: "firebase", kind: "passive", parent: "flutter", description: "Serviço usado nos produtos Flutter do iCalvinus e do SigmaApp." },

  // Web
  { id: "javascript", name: "JavaScript", icon: "javascript", kind: "main", parent: null, branch: "Web", description: "Linguagem base do ecossistema web e de Node.js, presente nos projetos com TypeScript, React e Next.js.", inheritFrom: ["nodejs", "typescript"] },
  { id: "typescript", name: "TypeScript", icon: "typescript", kind: "main", parent: "javascript", description: "APIs e aplicações com implementação assistida por IA." },
  { id: "react", name: "React", icon: "react", kind: "main", parent: "typescript", description: "Interfaces em projetos Next.js, com implementação por IA." },
  { id: "nextjs", name: "Next.js", icon: "nextdotjs", kind: "main", parent: "react", description: "Site e CMS da La Chapelle; desenvolvimento do Nerdcave Admin." },
  { id: "tailwind", name: "Tailwind CSS", icon: "tailwindcss", kind: "passive", parent: "nextjs", description: "Estilização do Presso e do Nerdcave Admin, e deste portfólio." },
  { id: "vite", name: "Vite", icon: "vite", kind: "passive", parent: "typescript", description: "Empacotador do front-end do Presso." },
  { id: "electron", name: "Electron", icon: "electron", kind: "passive", parent: "javascript", description: "Base do aplicativo desktop Presso." },

  // Backend e dados
  { id: "nodejs", name: "Node.js", icon: "nodedotjs", kind: "main", parent: null, branch: "Backend e dados", description: "APIs, serviços e integrações. Experiência manual e assistida.", projects: ["Finch"] },
  { id: "express", name: "Express", icon: "express", kind: "main", parent: "nodejs", description: "Backends com regras de negócio, validação e persistência.", projects: ["Finch"] },
  { id: "zod", name: "Zod", icon: "zod", kind: "passive", parent: "express", description: "Validação dos dados recebidos pelas APIs da La Chapelle e do Finch.", projects: ["Finch"] },
  { id: "jest", name: "Jest", icon: "jest", kind: "passive", parent: "nodejs", description: "Experiência inicial com testes em projetos assistidos por IA.", projects: ["Finch"] },
  { id: "mysql", name: "MySQL", icon: "mysql", kind: "main", parent: "nodejs", description: "Dados relacionais em produtos profissionais e APIs." },
  { id: "mongodb", name: "MongoDB", icon: "mongodb", kind: "main", parent: "nodejs", description: "Persistência em APIs profissionais e projetos próprios.", projects: ["Finch"] },
  { id: "sqlite", name: "SQLite", icon: "sqlite", kind: "passive", parent: "nodejs", description: "Armazenamento local de dados no Presso." },

  // Operação
  { id: "git", name: "Git", icon: "git", kind: "main", parent: null, branch: "Operação", description: "Versionamento na rotina de desenvolvimento.", projects: gitProjects },
  { id: "github", name: "GitHub", icon: "github", kind: "passive", parent: "git", description: "Repositórios e colaboração no desenvolvimento.", projects: gitProjects },
  { id: "docker", name: "Docker", icon: "docker", kind: "main", parent: "git", description: "Contêineres, Compose e volumes persistentes." },
  { id: "debian", name: "Debian", icon: "debian", kind: "main", parent: "docker", description: "Publicação e operação de serviços em servidores." },
  { id: "akamai", name: "Akamai Cloud", icon: "akamai", kind: "passive", parent: "debian", description: "Infraestrutura de hospedagem dos produtos da Dzign-e e da La Chapelle, em servidor Debian na Itália." },
];

export type Milestone = { period: string; title: string; place: string; text: string; current?: boolean };

export const milestones: Milestone[] = [
  { period: "2016", title: "Museologia", place: "Bacharelado / UFMG", text: "Formação em Museologia pela Universidade Federal de Minas Gerais, anterior à atuação profissional com desenvolvimento de software." },
  { period: "2016–2017", title: "Docência em inglês", place: "European School of Goa / Índia", text: "Professor de História, com preparação de aulas, atividades e avaliações em inglês para três grupos etários. Certificação atual EF SET 61, nível C1." },
  { period: "2017–2021", title: "Design & comunicação", place: "Zeus Games", text: "Atuação com atendimento, vendas, design gráfico, marketing digital, criação de conteúdo e rotinas administrativas e financeiras." },
  { period: "2021–atual", title: "Engenharia full stack", place: "Dzign-e", text: "Desde janeiro de 2021, atuação com aplicações web e mobile, APIs, integração de dados e operação de serviços. Produtos para educação, segurança e gestão institucional fazem parte dessa experiência.", current: true },
  { period: "2026–2027", title: "Software & IA", place: "MBA / UNIPDS", text: "MBA em Engenharia de Software com IA Aplicada, em andamento de março de 2026 a março de 2027. Formação conectada à atuação atual com desenvolvimento centrado em IA." },
];
