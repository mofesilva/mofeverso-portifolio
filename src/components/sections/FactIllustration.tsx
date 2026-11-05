import type { ReactNode } from "react";
import { makeKit, type Kit, type Pt, type V } from "./MethodIllustration";

/** Ilustrações isométricas das informações da abertura, no mesmo traço do Método. */

/** Duas camadas atravessadas por um eixo: o mesmo profissional em todas as camadas. */
function role({ box }: Kit): ReactNode {
  return (
    <>
      {box(8, 8, 0, 84, 84, 5, { glass: true, o: 0.5 })}
      {box(44, 44, 5, 12, 12, 34, { tone: "accent", tint: true, o: 0.95 })}
      {box(8, 8, 39, 84, 84, 5, { glass: true, o: 0.55 })}
      {box(44, 44, 44, 12, 12, 30, { tone: "accent", tint: true, o: 0.95 })}
    </>
  );
}

/** Malha de um mapa com um marcador suspenso no ponto da base. */
function place({ box, prism, line }: Kit): ReactNode {
  const grid: ReactNode[] = [];
  for (let i = 0; i <= 5; i++) {
    grid.push(<g key={`a${i}`}>{line([[i * 20, 0, 0], [i * 20, 100, 0]], { o: 0.22 })}</g>);
    grid.push(<g key={`b${i}`}>{line([[0, i * 20, 0], [100, i * 20, 0]], { o: 0.22 })}</g>);
  }
  const c: Pt = [60, 40];
  const diamond: Pt[] = [[c[0], c[1] - 13], [c[0] + 13, c[1]], [c[0], c[1] + 13], [c[0] - 13, c[1]]];
  return (
    <>
      {grid}
      {box(c[0] - 6, c[1] - 6, 0, 12, 12, 3, { tone: "accent", tint: true, o: 0.9 })}
      {line([[c[0], c[1], 3], [c[0], c[1], 56]], { tone: "accent", o: 0.5, dash: "2 3" })}
      {prism(diamond, 56, 6, { tone: "accent", solid: true, o: 0.95 })}
    </>
  );
}

/** Cubo humano na base e um cubo de IA em órbita acima dele. */
function process({ box, line }: Kit): ReactNode {
  const ring: V[] = Array.from({ length: 41 }, (_, i) => {
    const a = (i / 40) * Math.PI * 2;
    return [34 + Math.cos(a) * 30, 34 + Math.sin(a) * 30, 30];
  });
  return (
    <>
      {box(8, 8, 0, 70, 70, 4, { glass: true, o: 0.45 })}
      {box(23, 23, 4, 22, 22, 22, { o: 0.65 })}
      {line(ring, { tone: "accent", o: 0.4, dash: "2 3" })}
      {box(58, 54, 40, 15, 15, 15, { tone: "accent", tint: true, o: 0.95 })}
    </>
  );
}

/** Cubos subindo em espiral: os anos de uma mesma equipe. */
function company({ box }: Kit): ReactNode {
  const n = 8;
  const cubes = Array.from({ length: n }, (_, i) => {
    const a = (i * 52 * Math.PI) / 180;
    const s = 13 + i * 0.8;
    return { x: 50 + Math.cos(a) * 28 - s / 2, y: 50 + Math.sin(a) * 28 - s / 2, z: i * 9, s, last: i === n - 1 };
  }).sort((a, b) => a.x + a.y + a.z - (b.x + b.y + b.z));
  return (
    <>
      {cubes.map((c, i) => (
        <g key={i}>
          {box(c.x, c.y, c.z, c.s, c.s, c.s, c.last ? { tone: "accent", tint: true, o: 0.95 } : { o: 0.5 })}
        </g>
      ))}
    </>
  );
}

/** Quatro frentes, cada uma com uma forma própria sobre a mesma base. */
function areas({ box, prism }: Kit): ReactNode {
  const hex: Pt[] = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3;
    return [26 + Math.cos(a) * 15, 74 + Math.sin(a) * 15] as Pt;
  });
  return (
    <>
      {box(0, 0, 0, 100, 100, 4, { glass: true, o: 0.4 })}
      {box(8, 8, 4, 38, 30, 5, { o: 0.6 })}
      {box(62, 10, 4, 14, 24, 42, { o: 0.6 })}
      {prism(hex, 4, 22, { o: 0.6 })}
      {box(58, 58, 4, 32, 32, 8, { tone: "accent", tint: true, o: 0.9 })}
      {box(65, 65, 12, 18, 18, 8, { tone: "accent", tint: true, o: 0.95 })}
    </>
  );
}

/** Um tronco que se bifurca: ramos de um mesmo repositório. */
function github({ box, line }: Kit): ReactNode {
  return (
    <>
      {box(42, 42, 0, 16, 16, 8, { glass: true, o: 0.5 })}
      {line([[50, 50, 8], [50, 50, 34], [22, 70, 52]], { o: 0.5 })}
      {line([[50, 50, 34], [78, 30, 52]], { tone: "accent", o: 0.7 })}
      {box(14, 62, 52, 14, 14, 14, { o: 0.6 })}
      {box(70, 22, 52, 14, 14, 14, { tone: "accent", tint: true, o: 0.95 })}
    </>
  );
}

/** Colunas sustentando uma laje: a formação como estrutura. */
function education({ box, line }: Kit): ReactNode {
  const col = { o: 0.55 };
  return (
    <>
      {box(0, 0, 0, 100, 100, 4, { glass: true, o: 0.4 })}
      {box(6, 6, 4, 10, 10, 46, col)}
      {box(84, 6, 4, 10, 10, 46, col)}
      {box(6, 84, 4, 10, 10, 46, col)}
      {box(43, 43, 4, 14, 14, 14, { tone: "accent", tint: true, o: 0.95 })}
      {line([[50, 50, 18], [50, 50, 50]], { tone: "accent", o: 0.5, dash: "2 3" })}
      {box(0, 0, 50, 100, 100, 6, { glass: true, o: 0.55 })}
      {box(84, 84, 4, 10, 10, 46, col)}
    </>
  );
}

const scenes = { role, place, process, company, areas, github, education };
export type FactScene = keyof typeof scenes;

export function FactIllustration({ scene, className = "" }: { scene: FactScene; className?: string }) {
  const kit = makeKit();
  const body = scenes[scene](kit);
  const xs = kit.bounds.map((q) => q[0]);
  const ys = kit.bounds.map((q) => q[1]);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const y0 = Math.min(...ys);
  const y1 = Math.max(...ys);
  const side = Math.max(x1 - x0, y1 - y0) * 1.2;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return (
    <svg
      viewBox={`${(cx - side / 2).toFixed(2)} ${(cy - side / 2).toFixed(2)} ${side.toFixed(2)} ${side.toFixed(2)}`}
      fill="none"
      aria-hidden="true"
      className={`fact-art aspect-square w-full ${className}`}
    >
      {body}
    </svg>
  );
}
