import { layoutFlow, type FlowInput } from "@/lib/flow";

/** Fluxo funcional: pílulas ligadas por linhas finas, em tema escuro. */
export function FlowDiagram({ flow, label }: { flow: FlowInput; label: string }) {
  const { width, height, nodes, paths, nodeH } = layoutFlow(flow);

  return (
    <div tabIndex={0} role="region" aria-label={label} className="overflow-x-auto pb-2">
      <svg
        role="img"
        aria-label={label}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto block h-auto w-full min-w-[640px]"
        style={{ maxWidth: Math.round(width * 1.3) }}
      >
        <defs>
          <marker id="seta" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 8 4 0 8z" fill="#71717a" />
          </marker>
        </defs>
        {paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#52525b" strokeWidth="1.25" markerEnd="url(#seta)" />
        ))}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <rect
              x={n.x}
              y={n.y - nodeH / 2}
              width={n.w}
              height={nodeH}
              rx={nodeH / 2}
              fill={i === 0 ? "#6a5ce6" : "#18181d"}
              stroke={i === 0 ? "none" : "rgba(255,255,255,0.14)"}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="14"
              fontWeight={500}
              fill={i === 0 ? "#ffffff" : "#ededef"}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
