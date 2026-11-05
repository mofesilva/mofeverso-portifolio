// Extrai o caminho e a cor das marcas usadas na árvore de habilidades.
// Uso: node scripts/gen-skill-icons.mjs  (requer o pacote simple-icons instalado)
import * as si from "simple-icons";
import { writeFileSync } from "node:fs";

const slugs = [
  "flutter", "dart", "nextdotjs", "react", "typescript", "javascript", "nodedotjs",
  "express", "mysql", "mongodb", "docker", "git", "github", "debian", "jest",
  "firebase", "akamai", "zod", "electron", "sqlite", "vite", "tailwindcss",
];

const all = Object.values(si).filter((v) => v && typeof v === "object" && v.slug);
const out = {};
for (const slug of slugs) {
  const icon = all.find((i) => i.slug === slug);
  if (!icon) throw new Error(`ícone ausente: ${slug}`);
  out[slug] = { path: icon.path, hex: icon.hex };
}

const body = `/* Gerado por scripts/gen-skill-icons.mjs a partir do pacote simple-icons (CC0). Não editar à mão. */
export type BrandIcon = { path: string; hex: string; stroke?: boolean };

export const brandIcons: Record<string, BrandIcon> = ${JSON.stringify(out, null, 2)};

/** O Riverpod não existe no simple-icons: glifo próprio de ondas. */
export const riverpodIcon: BrandIcon = {
  path: "M3 8c3-3 6 3 9 0s6 3 9 0M3 13c3-3 6 3 9 0s6 3 9 0M3 18c3-3 6 3 9 0s6 3 9 0",
  hex: "53B1FD",
  stroke: true,
};
`;
writeFileSync("src/content/skill-icons.ts", body);
console.log("ok", Object.keys(out).length);
