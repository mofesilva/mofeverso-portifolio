/**
 * Minim: a small agent on a board of dots. A rounded block with an antenna
 * stands on the board, off its middle; the antenna is the bright mark at rest.
 * The pointer is projected back onto the ground, and the agent glides to the
 * cell it names on a spring, while that cell's dot takes the bright fill and the
 * antenna gives its place up. Leaving sends it home. The slider is the stiffness
 * of the spring, how quickly the agent follows.
 *
 * The pattern: where, not which. A spring on position, a hit test on the ground
 * plane (which never moves), and a rest that is a composition.
 */
const { Cam, clamp, facing, fit, prism, proj, rings, unproj, spring, stepS, flatDot, mk, place, pointer, put, register, disposer, solid } = HL;

const N = 5, CELL = 20, EXT = N * CELL, PB = 5, BH = 14, AH = 21, HOME = [3, 1];
const mid = (i) => (i + 0.5) * CELL;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.95);
  fit(C, [[-8, -8, -PB], [EXT + 8, -8, -PB], [-8, EXT + 8, -PB], [EXT + 8, EXT + 8, -PB], [mid(HOME[0]), mid(HOME[1]), AH + 6]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [pr, pi] = rings(-8, -8, EXT + 8, EXT + 8, 10, 2.2);
  put(solid(g), prism(P, front, pr, pi, -PB, 0));

  // The dots lie on the ground and are painted first; the agent is painted over the ones behind it.
  const dots = [];
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const d = flatDot(g, C, 1.9, "dot off");
    place(d, P(mid(i), mid(j), 0));
    dots.push(d);
  }
  const body = solid(g), ant = solid(g);
  ant.sil.classList.add("hi");

  const ax = spring(mid(HOME[0]), { k: value, eps: 0.02 }), ay = spring(mid(HOME[1]), { k: value, eps: 0.02 });
  let drawn = [NaN, NaN], at = null;

  function draw() {
    if (ax.x === drawn[0] && ay.x === drawn[1]) return;
    drawn = [ax.x, ay.x];
    const x = ax.x, y = ay.x;
    const [r, i] = rings(x - 7, y - 7, x + 7, y + 7, 4, 1.4), [ra, ia] = rings(x - 1.7, y - 1.7, x + 1.7, y + 1.7, 1.7, 0.55);
    put(body, prism(P, front, r, i, 0, BH));
    put(ant, prism(P, front, ra, ia, BH, AH));
  }
  const B = register(stage, (dt) => {
    const m = stepS(ax, dt) | stepS(ay, dt);
    draw();
    return !!m;
  });
  bag.add(B.unregister);

  /** Sends the agent to cell [i, j], or home when none. The target's dot takes the bright fill. */
  function go(cell) {
    if (at) dots[at[1] * N + at[0]].setAttribute("class", "dot off");
    at = cell;
    const [i, j] = cell || HOME;
    ax.t = mid(i); ay.t = mid(j);
    if (cell) dots[j * N + i].setAttribute("class", "dot");
    ant.sil.classList.toggle("hi", !cell);
    read.textContent = cell ? `cell ${i + 1}·${j + 1}` : "rest";
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => {
      const q = unproj(C, p[0], p[1], 0);
      if (q[0] < -6 || q[1] < -6 || q[0] > EXT + 6 || q[1] > EXT + 6) return go(null);
      const i = clamp(Math.floor(q[0] / CELL), 0, N - 1), j = clamp(Math.floor(q[1] / CELL), 0, N - 1);
      if (!at || at[0] !== i || at[1] !== j) go([i, j]);
    },
    leave: () => go(null),
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { ax.k = v; ay.k = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "minim",
  means: "A small agent on a board of dots glides to the cell the pointer names, and goes home when it leaves.",
  rules: [1, 4, 5, 8],
  range: [60, 100, 170],
  tour: [[145, 130], [283, 144], [200, 213], null],
  mount,
});
