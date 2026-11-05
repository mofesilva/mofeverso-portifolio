/**
 * Presso: a keyboard whose keys stand at their heat. Thirty-five rounded keys
 * on a plinth, the space bar a long one, each on its own spring. At rest the
 * left hand's keys are the tall ones and the space bar a low ridge. The pointer
 * is projected back onto the ground, and the keys near it rise, falling off with
 * distance; the keys above half height take the bright stroke. The slider is the
 * radius, in keys.
 *
 * The pattern: a continuous field, as in Terrain, on a layout of rows.
 */
const { Cam, facing, fit, prism, proj, rings, unproj, spring, stepS, mk, pointer, put, register, disposer, solid } = HL;

const KW = 12.5, PITCH = 15, HMAX = 50, PB = 5, EX = 170, EY = 60;

/** Row offset and key count for the three letter rows; the fourth row is the space bar's. */
const ROWS = [[0, 10], [5, 10], [9, 9]];
const KEYS = [];
ROWS.forEach(([off, n], r) => { for (let c = 0; c < n; c++) KEYS.push({ r, c, x0: off + c * PITCH, w: KW }); });
[[24, KW], [39, KW], [57, 75], [135, KW], [150, KW]].forEach(([x0, w], c) => KEYS.push({ r: 3, c, x0, w }));

/** The share of full height at u radii from the pointer: 1 → .31 at 42% → .09 at the edge and beyond. */
const falloff = (u) =>
  u <= 0 ? 1 : u <= 0.417 ? 1 - (u / 0.417) * 0.6875 : u <= 1 ? 0.3125 - ((u - 0.417) / 0.583) * 0.2185 : 0.094;

/** Heat at rest: the left hand's cluster, a second warm patch, and a low ridge for the space bar. */
function heat(k) {
  if (k.r === 3 && k.w > 50) return 15;
  const u = (k.x0 + k.w / 2) / EX, v = (k.r * PITCH + KW / 2) / EY;
  return 5 + 29 * Math.exp(-((u - 0.2) ** 2 / 0.012 + (v - 0.35) ** 2 / 0.07)) + 13 * Math.exp(-((u - 0.7) ** 2 / 0.01 + (v - 0.2) ** 2 / 0.06));
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.9);
  fit(C, [[-6, -6, -PB], [EX + 6, -6, -PB], [-6, EY + 6, -PB], [EX + 6, EY + 6, -PB], [0, 0, HMAX], [EX, EY, HMAX * 0.6]], 200, 166);
  const P = proj(C), front = facing(C);
  let R = value * PITCH, over = null;

  const g = mk("g", {}, svg);
  const [pr, pi] = rings(-6, -6, EX + 6, EY + 6, 9, 2.2);
  put(solid(g), prism(P, front, pr, pi, -PB, 0));
  // Row by row from the back, so appending is painting back to front.
  const keys = KEYS.map((k) => {
    const y0 = k.r * PITCH, h0 = heat(k), [ring, inner] = rings(k.x0, y0, k.x0 + k.w, y0 + KW, 2.4, 0.9);
    return { ...k, cx: k.x0 + k.w / 2, cy: y0 + KW / 2, h0, ring, inner, sp: spring(h0, { eps: 0.04 }), drawn: NaN };
  });
  keys.forEach((k) => { k.el = solid(g); });

  // A key whose spring hasn't moved keeps its paths.
  function draw(k) {
    const h = Math.max(0.6, k.sp.x);
    if (h === k.drawn) return;
    k.drawn = h;
    put(k.el, prism(P, front, k.ring, k.inner, 0, h));
    k.el.sil.classList.toggle("hi", h > HMAX * 0.5);
  }
  const B = register(stage, (dt) => {
    let m = false;
    for (const k of keys) { if (stepS(k.sp, dt)) m = true; draw(k); }
    return m;
  });
  bag.add(B.unregister);

  function retarget() {
    for (const k of keys) {
      if (!over) { k.sp.t = k.h0; continue; }
      k.sp.t = HMAX * falloff(Math.hypot(k.cx - over[0], k.cy - over[1]) / R);
    }
    if (over) {
      const n = keys.reduce((a, b) => (Math.hypot(b.cx - over[0], b.cy - over[1]) < Math.hypot(a.cx - over[0], a.cy - over[1]) ? b : a));
      read.textContent = n.r === 3 && n.w > 50 ? "space" : `key ${n.r + 1}·${n.c + 1}`;
    } else read.textContent = "rest";
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0); retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { R = v * PITCH; if (over) retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "presso",
  means: "A keyboard whose keys stand at their heat: the pointer lifts the keys near it, and the rest fall away with distance.",
  rules: [1, 3, 5, 9],
  range: [1.5, 3, 5],
  tour: [[137, 116], [267, 187], [183, 204], null],
  mount,
});
