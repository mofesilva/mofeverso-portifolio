/**
 * Finch: a tray of six coin stacks, one for each account, each stack as tall as
 * its balance. The stack under the pointer is the one chosen: its top coin lifts
 * and takes the bright stroke, and the stacks beside it stir a little less, the
 * further they are, staggered outwards on the 700ms lift curve. At rest the
 * tallest stack's top coin is the bright mark. The slider is the stagger, in ms.
 *
 * The pattern: discrete items. Tweens, a stagger by distance, and a hit test
 * against each stack's own resting top, which never moves.
 */
const {
  Cam, clamp, facing, fit, prism, proj, rings, rrect, unproj, tdone, tset, tval, tween, disposer, mk, pointer, put, register, solid,
} = HL;

const COUNTS = [5, 3, 8, 6, 2, 4], CX0 = 12, PITCH = 26, R = 11, T = 4, GAP = 0.8, LIFT = 14;
const X0 = -8, X1 = CX0 + (COUNTS.length - 1) * PITCH + R + 8, Y0 = -18, Y1 = 18, PB = 5, REACH = 15;

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value, act = -1;

  const C = Cam(45, 0.5, 2.2);
  fit(C, [[X0, Y0, -PB], [X1, Y0, -PB], [X0, Y1, -PB], [X1, Y1, -PB], [CX0 + 2 * PITCH, 0, 8 * T + LIFT]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [pr, pi] = rings(X0, Y0, X1, Y1, 10, 2.2);
  put(solid(g), prism(P, front, pr, pi, -PB, 0));

  // Left to right is back to front along the row, so appending is painting back to front.
  const tall = COUNTS.indexOf(Math.max(...COUNTS));
  const cols = COUNTS.map((n, i) => {
    const cx = CX0 + i * PITCH;
    return {
      i, n, cx, lf: tween(0), drawn: [],
      ring: rrect(cx - R, -R, cx + R, R, R, 14), inner: rrect(cx - R + 1.3, -R + 1.3, cx + R - 1.3, R - 1.3, R - 1.3, 14),
      coins: Array.from({ length: n }, () => solid(g)),
    };
  });

  /** A coin's lift for the stack's stir `f`: the top coin goes most, the one under it a little, the rest stay. */
  const lift = (c, j, f) => (j === c.n - 1 ? f * LIFT : j === c.n - 2 ? f * LIFT * 0.3 : 0);
  function draw(c, f) {
    c.coins.forEach((el, j) => {
      const l = lift(c, j, f);
      if (c.drawn[j] === l) return;
      c.drawn[j] = l;
      put(el, prism(P, front, c.ring, c.inner, j * T + l, j * T + l + T - GAP));
    });
  }
  const mark = () => cols.forEach((c) => c.coins[c.n - 1].sil.classList.toggle("hi", act < 0 ? c.i === tall : c.i === act));
  mark();

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const c of cols) { draw(c, tval(c.lf, now)); if (!tdone(c.lf, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  /** The stack whose resting top the pointer is nearest, found on that top's own plane; -1 when none is near. */
  function hit(p) {
    let best = -1, bd = REACH;
    for (const c of cols) {
      const q = unproj(C, p[0], p[1], c.n * T), d = Math.hypot(q[0] - c.cx, q[1]);
      if (d < bd) { bd = d; best = c.i; }
    }
    return best;
  }

  /** Stirs stack a (-1 settles them all). The stir spreads out from the stack chosen, or the one let go. */
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    cols.forEach((c) => {
      const d = Math.abs(c.i - from), to = a < 0 ? 0 : c.i === a ? 1 : clamp(0.24 / Math.abs(c.i - a), 0, 0.24);
      tset(c.lf, to, now, d * stag);
    });
    mark();
    read.textContent = a < 0 ? "rest" : "acct " + (a + 1);
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { stag = v; },
    destroy: bag.dispose,
  };
}

hairline({
  name: "finch",
  means: "Six coin stacks, one per account: the stack under the pointer lifts its top coin, and its neighbours stir in turn.",
  rules: [1, 2, 5, 8],
  range: [0, 40, 90],
  tour: [[100, 82], [181, 99], [302, 191], null],
  mount,
});
