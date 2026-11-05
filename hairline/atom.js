/**
 * Atom: a desk model of an atom. Three shells, each a great circle in its own
 * tilted plane, nest round a nucleus of six rounded nucleons; an electron rides
 * each shell and never stops. Hovering a shell slows its electron on a spring
 * so it can be followed, and the shell and its electron take the bright stroke.
 * At rest the nucleus's near nucleon is the bright mark. The slider is the
 * rate an electron keeps under the pointer.
 *
 * The pattern: dilate time. Ambient motion, a spring on the rate, and a hit
 * test on the shells themselves, which never move, never on the electrons.
 */
const { Cam, fit, proj, open, spring, stepS, disposer, mk, place, pointer, register } = HL;

const rad = Math.PI / 180, N = 120, REACH = 15;
// One orb per shell, each its own size; they ride for ever, whatever the reader's motion setting.
const SHELLS = [
  { r: 42, tilt: 82, az: 200, w: -1.8, ph: 5.3, size: 3.6 },
  { r: 56, tilt: 58, az: 20, w: 1.5, ph: 0.5, size: 7.5 },
  { r: 70, tilt: 58, az: 140, w: 1.05, ph: 2.6, size: 4.8 },
  { r: 84, tilt: 58, az: 260, w: 0.72, ph: 4.5, size: 9.2 },
];
const NUCLEONS = [[-5, -4, -3], [5, -3, -5], [0, 6, -4], [-4, 3, 5], [5, 5, 3], [0, -6, 4]].map((q) => q.map((v) => v * 0.62));

/** Two unit vectors spanning the plane whose normal leans `tilt` from vertical towards `az`. */
function basis(tilt, az) {
  const t = tilt * rad, a = az * rad;
  const n = [Math.sin(t) * Math.cos(a), Math.sin(t) * Math.sin(a), Math.cos(t)];
  const s = Math.hypot(n[0], n[1]), u = [n[1] / s, -n[0] / s, 0];
  const v = [n[1] * u[2] - n[2] * u[1], n[2] * u[0] - n[0] * u[2], n[0] * u[1] - n[1] * u[0]];
  return { u, v };
}
const onShell = (b, r, t) => [0, 1, 2].map((k) => r * (Math.cos(t) * b.u[k] + Math.sin(t) * b.v[k]));
const isFront = (q) => q[0] + q[1] >= 0;

/** A closed ring of samples split at the silhouette: the run nearer the camera, and the run behind. */
function halves(world, scr) {
  const n = world.length, f = world.map(isFront);
  let s = 0;
  while (s < n && !(f[s] && !f[(s + n - 1) % n])) s++;
  const rot = (a) => a.slice(s).concat(a.slice(0, s)), F = rot(f), S = rot(scr);
  const m = F.indexOf(false);
  return { front: S.slice(0, m + 1), back: S.slice(m - 1).concat([S[0]]) };
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let rate = value, act = -1;

  const shells = SHELLS.map((s) => {
    const b = basis(s.tilt, s.az);
    return { ...s, b, world: Array.from({ length: N }, (_, k) => onShell(b, s.r, (k / N) * 2 * Math.PI)), a: s.ph, sp: spring(1, { eps: 0.002 }), f: true };
  });
  const C = Cam(45, 0.5, 1.8);
  fit(C, shells.flatMap((s) => s.world), 200, 166);
  const P = proj(C);

  const g = mk("g", {}, svg), back = mk("g", {}, g), nuc = mk("g", {}, g), front = mk("g", {}, g);
  for (const s of shells) {
    s.scr = s.world.map((q) => P(q[0], q[1], q[2]));
    const h = halves(s.world, s.scr);
    s.bk = mk("path", { d: open(h.back), class: "nf lo" }, back);
    s.fr = mk("path", { d: open(h.front), class: "nf" }, front);
    s.el = mk("circle", { r: s.size, class: "dot m orb" }, front);
  }

  // The same six nucleons as before, in the same places: each is still its outlined ball, now filled, medium and bright in turn.
  const order = NUCLEONS.slice().sort((p, q) => p[0] + p[1] - (q[0] + q[1]));
  const lead = order.map((q, i) => {
    const e = mk("ellipse", { rx: 9.5, ry: 9.5 }, nuc), at = P(q[0], q[1], q[2]);
    place(e, at);
    place(mk("circle", { r: 9, class: i % 2 ? "dot" : "dot m" }, nuc), at);
    return e;
  }).pop();
  lead.classList.add("hi");

  const B = register(stage, (dt) => {
    const h = Math.min(dt, 0.05);
    for (const s of shells) {
      stepS(s.sp, h);
      s.a += s.w * Math.max(0, s.sp.x) * h;
      const q = onShell(s.b, s.r, s.a), f = isFront(q);
      place(s.el, P(q[0], q[1], q[2]));
      if (f !== s.f) { (f ? front : back).appendChild(s.el); s.f = f; }
    }
    return true;
  });
  bag.add(B.unregister);

  /** The shell nearest the pointer, by distance to the shell itself, which never moves; -1 when none is near. */
  function hit(p) {
    let best = -1, bd = REACH;
    shells.forEach((s, i) => {
      for (const q of s.scr) {
        const d = Math.hypot(q[0] - p[0], q[1] - p[1]);
        if (d < bd) { bd = d; best = i; }
      }
    });
    return best;
  }

  function setActive(a) {
    if (a === act) return;
    act = a;
    shells.forEach((s, i) => {
      const on = i === a;
      s.fr.setAttribute("class", on ? "nf hi" : "nf");
      s.bk.setAttribute("class", on ? "nf hi" : "nf lo");
      s.el.setAttribute("class", on ? "dot orb" : "dot m orb");
      s.sp.t = on ? rate : 1;
    });
    lead.classList.toggle("hi", a < 0);
    read.textContent = a < 0 ? "rest" : "shell " + (a + 1);
    B.wake();
  }

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { rate = v; if (act >= 0) { shells[act].sp.t = rate; B.wake(); } },
    destroy: bag.dispose,
  };
}

hairline({
  name: "atom",
  means: "Four orbs circle a nucleus; hover an orbit and its orb slows so it can be followed.",
  rules: [1, 4, 6, 8],
  range: [0.03, 0.12, 0.4],
  tour: [[136, 91], [263, 57], [332, 233], null],
  mount,
});
