import type { ReactNode } from "react";

/**
 * Ilustrações isométricas abstratas em linha fina.
 * Projeção: x desce para a direita, y desce para a esquerda, z sobe.
 * O enquadramento é calculado a partir das peças de cada cena.
 */
const K = 0.866;
const WHITE = "237,237,239";
const ACCENT = "173,163,255";

type V = [number, number, number];
type Pt = [number, number];
type Tone = "white" | "accent";
type Opts = { tone?: Tone; o?: number; tint?: boolean; solid?: boolean; glass?: boolean; dash?: string };

const project = ([x, y, z]: V): Pt => [(x - y) * K, (x + y) * 0.5 - z];

function makeKit() {
  const bounds: Pt[] = [];
  const pts = (list: V[]) =>
    list
      .map((v) => {
        const q = project(v);
        bounds.push(q);
        return `${q[0].toFixed(2)},${q[1].toFixed(2)}`;
      })
      .join(" ");

  const stroke = (o: Opts, base: number) => ({
    stroke: `rgba(${o.tone === "accent" ? ACCENT : WHITE},${o.o ?? base})`,
    strokeWidth: 1,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    strokeDasharray: o.dash,
    vectorEffect: "non-scaling-stroke" as const,
  });

  const fill = (o: Opts, kind: "a" | "b" | "top") => {
    if (o.glass) return kind === "top" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)";
    if (o.solid) return { a: "#2a2358", b: "#201b45", top: "#4a3fb0" }[kind];
    if (o.tint) return { a: "rgba(106,92,230,0.14)", b: "rgba(106,92,230,0.08)", top: "rgba(106,92,230,0.28)" }[kind];
    return { a: "#0d0d11", b: "#0a0a0d", top: "#17171d" }[kind];
  };

  /** Prisma reto sobre um polígono no plano xy. */
  const prism = (poly: Pt[], z: number, h: number, o: Opts = {}): ReactNode => {
    const area = poly.reduce((s, a, i) => {
      const b = poly[(i + 1) % poly.length];
      return s + (a[0] * b[1] - b[0] * a[1]);
    }, 0);
    const ccw = area > 0 ? poly : [...poly].reverse();
    const sides = ccw.map((a, i) => {
      const b = ccw[(i + 1) % ccw.length];
      const nx = b[1] - a[1];
      const ny = -(b[0] - a[0]);
      if (nx + ny <= 1e-6) return null;
      const quad = pts([[a[0], a[1], z], [b[0], b[1], z], [b[0], b[1], z + h], [a[0], a[1], z + h]]);
      return <polygon key={i} points={quad} fill={fill(o, nx > ny ? "b" : "a")} {...stroke(o, 0.55)} />;
    });
    const top = pts(ccw.map(([x, y]): V => [x, y, z + h]));
    return (
      <g>
        {sides}
        <polygon points={top} fill={fill(o, "top")} {...stroke(o, 0.55)} />
      </g>
    );
  };

  const rect = (x: number, y: number, w: number, d: number): Pt[] => [[x, y], [x + w, y], [x + w, y + d], [x, y + d]];
  const box = (x: number, y: number, z: number, w: number, d: number, h: number, o: Opts = {}) => prism(rect(x, y, w, d), z, h, o);

  const line = (list: V[], o: Opts = {}): ReactNode => <polyline points={pts(list)} fill="none" {...stroke(o, 0.4)} />;

  return { bounds, prism, box, line };
}

type Kit = ReturnType<typeof makeKit>;

/** Cubos de vidro encaixados, cada vez menores, até o núcleo: a demanda sendo descascada. */
function diagnosis({ box, line }: Kit): ReactNode {
  const c = 50;
  const shells = [92, 64, 38];
  return (
    <>
      {shells.map((s, i) => {
        const a = c - s / 2;
        const hidden = { o: 0.18, dash: "2 3" };
        return (
          <g key={s}>
            {line([[a + s, a, a], [a, a, a], [a, a + s, a]], hidden)}
            {line([[a, a, a], [a, a, a + s]], hidden)}
            {box(a, a, a, s, s, s, { glass: true, o: 0.5 - i * 0.05 })}
          </g>
        );
      })}
      {box(c - 8, c - 8, c - 8, 16, 16, 16, { tone: "accent", o: 0.95, tint: true })}
    </>
  );
}

/** Cubo dividido em módulos separados, com um núcleo no centro. */
function planning({ box }: Kit): ReactNode {
  const s = 22;
  const gap = 14;
  const cubes: { x: number; y: number; z: number }[] = [];
  for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) cubes.push({ x: x * (s + gap), y: y * (s + gap), z: z * (s + gap) });
  cubes.sort((a, b) => a.x + a.y + a.z - (b.x + b.y + b.z));
  const mid = (2 * s + gap) / 2 - 6;
  const core = box(mid, mid, mid, 12, 12, 12, { tone: "accent", o: 0.95, tint: true });
  const half = cubes.length / 2;
  return (
    <>
      {cubes.slice(0, half).map((c, i) => <g key={i}>{box(c.x, c.y, c.z, s, s, s, { o: 0.55 })}</g>)}
      {core}
      {cubes.slice(half).map((c, i) => <g key={i + half}>{box(c.x, c.y, c.z, s, s, s, { o: 0.6 })}</g>)}
    </>
  );
}

/** Pilha de placas girando um pouco a cada nível: cada volta, uma iteração. */
function implementation({ prism }: Kit): ReactNode {
  const n = 8;
  const size = 66;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = (i * 6 * Math.PI) / 180;
        const c = Math.cos(a);
        const s = Math.sin(a);
        const poly = ([[-1, -1], [1, -1], [1, 1], [-1, 1]] as Pt[]).map(([px, py]): Pt => [(px * c - py * s) * (size / 2), (px * s + py * c) * (size / 2)]);
        const last = i === n - 1;
        return (
          <g key={i}>
            {prism(poly, i * 11, 4, last ? { tone: "accent", o: 0.95, tint: true } : { o: 0.28 + i * 0.05 })}
          </g>
        );
      })}
    </>
  );
}

/** Lâminas em fila que sobem até um pico e descem: o ponto onde a revisão decide. */
function verification({ box }: Kit): ReactNode {
  const n = 9;
  const step = 10;
  const peak = 4;
  const depth = 44;
  const width = 4;
  const span = (n - 1) * step + width;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const d = (i - peak) / 2.2;
        const h = 8 + 50 * Math.exp(-d * d);
        const top = i === peak;
        return (
          <g key={i}>
            {box(i * step - span / 2, -depth / 2, 0, width, depth, h, top ? { tone: "accent", o: 0.95, solid: true } : { o: 0.3 + 0.3 * Math.exp(-d * d) })}
          </g>
        );
      })}
    </>
  );
}

const scenes: ((kit: Kit) => ReactNode)[] = [diagnosis, planning, implementation, verification];

export function MethodIllustration({ index }: { index: number }) {
  const kit = makeKit();
  const body = (scenes[index] ?? scenes[0])(kit);
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
      className="aspect-square w-full max-w-[240px]"
    >
      {body}
    </svg>
  );
}
