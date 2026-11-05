/**
 * Printer: uma impressora 3D construindo uma torre de sete camadas, o software
 * sendo construído com IA. O cursor escolhe a camada que está sendo impressa:
 * as de baixo ficam prontas, a escolhida recebe o brilho e o bico da impressora
 * sobe ou desce até ela, e as de cima voltam a ser só o contorno tracejado.
 * Em repouso a impressora está na quarta camada.
 *
 * Padrão: itens discretos. Tweens com atraso crescente a partir da camada em que
 * a impressora estava, e o teste do cursor feito sobre as posições de repouso.
 * O controle é o atraso entre camadas, em ms.
 */
const {
  Cam, circ, facing, fit, hull, poly, proj, put, prism, ringAt, rings,
  tdone, tset, tval, tween, disposer, mk, pointer, register, solid,
} = HL;

const N = 7, T = 9, PT = 4, REST = 3;
const HS = [38, 34, 30, 26.5, 23, 19, 15]; // meia-largura de cada camada: a torre afina
const OFF = [0, 2, -1.5, 1.5, -2, 1, 0];  // cada camada assenta um pouco fora do eixo
const z0 = (i) => PT + i * T;
const tipOf = (a) => z0(a) + T + 1.5;      // o bico paira logo acima da camada em impressão

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value;

  const C = Cam(45, 0.5, 2.0);
  fit(C, [[-46, -46, 0], [46, 46, 0], [46, -46, 0], [-46, 46, 0], [-44, 0, 94], [8, 0, 94], [38, 38, 66]], 200, 168);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);

  // a mesa de impressão e a coluna, que nunca se movem
  const [bedR, bedI] = rings(-46, -46, 46, 46, 9, 2);
  put(solid(g), prism(P, front, bedR, bedI, 0, PT));
  const [colR, colI] = rings(-46, -5, -36, 5, 3.4, 1.3);
  put(solid(g), prism(P, front, colR, colI, PT, 94));

  // a torre: cada camada é uma placa que cresce do chão até a espessura, com o contorno tracejado de quando ainda não existe
  const layers = [];
  for (let i = 0; i < N; i++) {
    const h = HS[i], o = OFF[i];
    const [ring, inner] = rings(o - h, o - h, o + h, o + h, 5, 1.4);
    const ghost = mk("path", { class: "nf lo dash" }, g);
    const s = solid(g);
    layers.push({ ring, inner, ghost, s, b: tween(i <= REST ? 1 : 0) });
  }

  // o braço, o bico e o seu carro, que sobem e descem com a camada
  const [armR, armI] = rings(-42, -3.8, 8, 3.8, 1.9, 0.9);
  const noz = mk("path", { class: "sil" }, g);
  const arm = solid(g);
  const foot = circ(1.5, 8), top = circ(4.6, 10);
  const nz = tween(tipOf(REST));

  let last = "";
  function draw(now) {
    const key = layers.map((L) => tval(L.b, now).toFixed(3)).join() + tval(nz, now).toFixed(2);
    if (key === last) return;
    last = key;
    layers.forEach((L, i) => {
      const h = T * tval(L.b, now);
      if (h > 0.4) put(L.s, prism(P, front, L.ring, L.inner, z0(i), z0(i) + h));
      else { L.s.sil.setAttribute("d", ""); L.s.cr.setAttribute("d", ""); }
      L.ghost.setAttribute("d", h < T - 0.4 ? poly(ringAt(P, L.ring, z0(i) + T)) : "");
    });
    const t = tval(nz, now);
    noz.setAttribute("d", poly(hull(ringAt(P, foot, t).concat(ringAt(P, top, t + 7)))));
    put(arm, prism(P, front, armR, armI, t + 7, t + 13));
  }

  const B = register(stage, (_dt, now) => {
    draw(now);
    return layers.some((L) => !tdone(L.b, now)) || !tdone(nz, now);
  });
  bag.add(B.unregister);

  // posições de repouso: o centro de cada camada na tela. Nada disso se move.
  const cx = P(0, 0, 0)[0];
  const rows = layers.map((_, i) => P(0, 0, z0(i) + T / 2)[1]);
  const half = (P(HS[0], -HS[0], 0)[0] - P(-HS[0], HS[0], 0)[0]) / 2 + 4;
  function hit([x, y]) {
    if (Math.abs(x - cx) > half) return -1;
    if (y < rows[N - 1] - 22 || y > rows[0] + 18) return -1;
    let best = 0;
    rows.forEach((r, i) => { if (Math.abs(y - r) < Math.abs(y - rows[best])) best = i; });
    return best;
  }

  let act = -1, shown = -1;
  const caption = (a) => (a < 0 ? "rest" : String(a + 1).padStart(2, "0"));
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), A = a < 0 ? REST : a, from = shown < 0 ? REST : shown;
    act = a; shown = A;
    layers.forEach((L, i) => {
      tset(L.b, i <= A ? 1 : 0, now, Math.abs(i - from) * stag);
      L.s.sil.classList.toggle("hi", i === A);
    });
    tset(nz, tipOf(A), now, 0);
    read.textContent = caption(a);
    B.wake();
  }

  draw(performance.now());
  layers[REST].s.sil.classList.add("hi");
  shown = REST;
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return { set: (v) => { stag = v; }, destroy: bag.dispose };
}

hairline({
  name: "printer",
  means: "Uma impressora 3D construindo uma torre de sete camadas: o cursor escolhe a camada em impressão.",
  rules: [1, 2, 5, 8, 10],
  range: [0, 45, 100],
  tour: [[200, 218], [200, 165], [200, 128], null],
  mount,
});
