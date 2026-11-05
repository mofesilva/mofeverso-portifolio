/**
 * Gera as páginas das figuras Hairline para o site: o kernel e a figura, sem os
 * controles de bancada, com a paleta do portfólio. Cada figura vira uma página
 * em public/hairline/ e ganha uma versão em src/content/hairline-versions.ts.
 * Uso: node hairline/build-site.mjs
 */
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const kernel = readFileSync("C:/Users/mofesilva/.agents/skills/hairline-create/kernel.js", "utf8").replace(/\r\n/g, "\n").trimEnd();
// A cor das etapas vem de src/app/globals.css (--color-stage), a mesma da legenda.
const stage = /--color-stage:\s*(#[0-9a-fA-F]{6})/.exec(readFileSync(here("../src/app/globals.css"), "utf8"))?.[1] ?? "#8b53c5";

/** Fundo e cores de cada página: o átomo fica sobre o fundo do site, os demais sobre o painel dos cards. */
const pages = [
  { file: "atomo", src: "atom.js", bg: "#09090b", edge: "#ededef", extra: `[data-hairline] svg .dot.m.orb { fill: ${stage}; }`, width: 680 },
];

const html = ({ bg, edge, extra = "", width }, figure) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Figura</title>
<style>
  :root {
    color-scheme: dark;
    --hairline-plate: ${bg};
    --hairline-hi: #6a5ce6;
    --hairline-edge: ${edge};
    --hairline-mid: #4a4a52;
    --hairline-lo: #2c2c32;
    --hairline-stroke: 1;
  }
  ${extra}
  html, body { margin: 0; height: 100%; background: ${bg}; overflow: hidden; }
  body { display: grid; place-items: center; }
  #stage { width: 100%; max-width: ${width}px; }
</style>
</head>
<body>
<div id="stage"></div>
<script>
${kernel}
</script>
<script>
window.hairline = (figure) => {
  const stage = document.getElementById("stage");
  HL.inject(document);
  stage.setAttribute("data-hairline", figure.name);
  stage.setAttribute("role", "img");
  stage.setAttribute("aria-label", figure.means);
  const svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, stage);
  figure.mount({ stage, svg, read: { textContent: "" } }, figure.range[1]);
};
</script>
<script>
${figure}
</script>
</body>
</html>
`;

mkdirSync(here("../public/hairline"), { recursive: true });
const versions = {};
for (const page of pages) {
  const figure = readFileSync(here(`./${page.src}`), "utf8").replace(/\r\n/g, "\n").trim();
  const out = html(page, figure);
  writeFileSync(here(`../public/hairline/${page.file}.html`), out);
  // A página é um arquivo estático dentro de um iframe, e o navegador a guarda em cache.
  // A versão vai na URL: muda sozinha sempre que a página muda.
  versions[page.file] = createHash("sha1").update(out).digest("hex").slice(0, 8);
}
const body = Object.entries(versions).map(([k, v]) => `  ${k}: "${v}",`).join("\n");
writeFileSync(here("../src/content/hairline-versions.ts"), `/** Gerado por hairline/build-site.mjs: cada versão muda quando a página da figura muda. */\nexport const HAIRLINE_VERSIONS = {\n${body}\n} as const;\n`);
console.log(Object.entries(versions).map(([k, v]) => `${k} ${v}`).join("\n"));
