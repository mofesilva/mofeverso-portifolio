export type FlowInput = { nodes: string[]; edges: [number, number][]; loop?: boolean };

export type FlowLayout = {
  width: number;
  height: number;
  nodeH: number;
  nodes: { label: string; x: number; y: number; w: number }[];
  paths: string[];
};

const PAD = 12;
const NODE_H = 40;
const PITCH = 58;
const GAP_X = 48;
const CHAR_W = 7.6;
const LANE = 16;
const R = 12;

/**
 * Coloca cada nó numa coluna pelo caminho mais longo até ele. Ligações entre
 * colunas vizinhas são curvas; as demais e o laço de retorno passam por baixo.
 */
export function layoutFlow({ nodes, edges, loop }: FlowInput): FlowLayout {
  const depth = new Array<number>(nodes.length).fill(0);
  for (let pass = 0; pass < nodes.length; pass += 1) {
    for (const [a, b] of edges) depth[b] = Math.max(depth[b], depth[a] + 1);
  }

  const cols: number[][] = [];
  depth.forEach((d, i) => (cols[d] ??= []).push(i));
  const widths = nodes.map((n) => Math.round(n.length * CHAR_W) + 40);
  const colW = cols.map((c) => Math.max(...c.map((i) => widths[i])));
  const colX: number[] = [];
  let x = PAD;
  colW.forEach((w, c) => {
    colX[c] = x;
    x += w + GAP_X;
  });

  const stack = Math.max(...cols.map((c) => c.length));
  const mid = PAD + ((stack - 1) * PITCH) / 2 + NODE_H / 2;
  const bottom = PAD + (stack - 1) * PITCH + NODE_H;

  const placed = nodes.map((label, i) => {
    const col = cols[depth[i]];
    return {
      label,
      w: widths[i],
      x: colX[depth[i]] + (colW[depth[i]] - widths[i]) / 2,
      y: mid + (col.indexOf(i) - (col.length - 1) / 2) * PITCH,
    };
  });

  const all: [number, number][] = loop ? [...edges, [nodes.length - 1, 0]] : edges;
  let lanes = 0;
  const paths = all.map(([a, b]) => {
    const s = placed[a];
    const t = placed[b];
    if (depth[b] - depth[a] === 1) {
      const x1 = s.x + s.w;
      const x2 = t.x - 2;
      const mx = (x1 + x2) / 2;
      return `M${x1} ${s.y}C${mx} ${s.y} ${mx} ${t.y} ${x2} ${t.y}`;
    }
    const yb = bottom + 20 + lanes * LANE;
    lanes += 1;
    const sx = s.x + s.w / 2;
    const tx = t.x + t.w / 2;
    const dir = tx >= sx ? 1 : -1;
    return `M${sx} ${s.y + NODE_H / 2}V${yb - R}Q${sx} ${yb} ${sx + dir * R} ${yb}H${tx - dir * R}Q${tx} ${yb} ${tx} ${yb - R}V${t.y + NODE_H / 2 + 2}`;
  });

  return {
    width: x - GAP_X + PAD,
    height: bottom + (lanes ? 20 + (lanes - 1) * LANE + 12 : 0) + PAD,
    nodeH: NODE_H,
    nodes: placed,
    paths,
  };
}
