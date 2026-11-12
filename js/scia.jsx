// Scia: freccia guida che si disegna con lo scroll. mode "through" = attraversa i componenti della home, "gutter" = zig-zag lungo i margini (fallback per le altre pagine).
const sciaRect = (el) => {
  let x = 0, y = 0, n = el;
  while (n) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
  const w = el.offsetWidth, h = el.offsetHeight;
  return { l: x, t: y, w, h, r: x + w, b: y + h, rad: parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0 };
};
// Punto di partenza sul filetto, al sottopixel (offsetTop arrotonda ai pixel interi), ignorando i transform delle animazioni d'entrata.
// Parte da dentro la metà rossa del filetto con un tratto dritto: la levigatura non piega l'attacco e la freccia ne esce in orizzontale.
const sciaRuleStart = (rule, add) => {
  const b = rule.getBoundingClientRect();
  let tx = 0, ty = 0;
  for (let n = rule.parentElement; n && n !== document.body; n = n.parentElement) {
    const t = getComputedStyle(n).transform;
    if (t && t !== 'none') { const m = new DOMMatrixReadOnly(t); tx += m.m41; ty += m.m42; }
  }
  const l = b.left + window.scrollX - tx, cy = b.top + window.scrollY - ty + b.height / 2, lead = Math.min(18, b.width * 0.4);
  add(l + lead, cy, 'l');
  add(l, cy, 'l');
  return { l, r: l + b.width, cy, sx: l + lead };
};
const sciaIn = (rs, x, y) => rs.some((r) => x >= r.l && x <= r.r && y >= r.t && y <= r.b);
const sciaPf = (v) => parseFloat(v) || 0;
const sciaCs = (el) => getComputedStyle(el);
const SCIA_D = { d: [0, 1], u: [0, -1], r: [1, 0], l: [-1, 0] };

// Waypoint {x,y,d} → path: tratti dritti quando allineati, altrimenti curve di Hermite con tangente = direzione di marcia
const sciaPath = (P) => {
  const f = (v) => Math.round(v * 10) / 10;
  let s = `M${f(P[0].x)} ${f(P[0].y)}`;
  for (let i = 1; i < P.length; i++) {
    const p = P[i - 1], q = P[i], a = SCIA_D[p.d], b = SCIA_D[q.d], dx = q.x - p.x, dy = q.y - p.y;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue;
    const ap = a[0] * dx + a[1] * dy, bq = b[0] * dx + b[1] * dy, perp = Math.abs(a[0] * dy - a[1] * dx);
    if (p.d === q.d && perp < 0.5 && ap > 0) { s += ` L${f(q.x)} ${f(q.y)}`; continue; }
    const kd = q.k || 30, kp = ap > 1 ? ap * 0.55 : kd, kq = bq > 1 ? bq * 0.55 : kd;
    s += ` C${f(p.x + a[0] * kp)} ${f(p.y + a[1] * kp)} ${f(q.x - b[0] * kq)} ${f(q.y - b[1] * kq)} ${f(q.x)} ${f(q.y)}`;
  }
  return s;
};

// Ammorbidisce tutta la traiettoria: ricampiona il path e applica una media gaussiana lungo la lunghezza (estremi fissi)
const sciaSmooth = (d, sig = 20) => {
  const ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'), p = document.createElementNS(ns, 'path');
  svg.setAttribute('style', 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden');
  p.setAttribute('d', d); svg.appendChild(p); document.body.appendChild(svg);
  const L = p.getTotalLength(), st = 4, n = Math.max(2, Math.ceil(L / st));
  const X = new Float32Array(n + 1), Y = new Float32Array(n + 1);
  for (let i = 0; i <= n; i++) { const pt = p.getPointAtLength(Math.min(i * st, L)); X[i] = pt.x; Y[i] = pt.y; }
  svg.remove();
  const h = Math.ceil(sig * 2.5), wt = Array.from({ length: h + 1 }, (_, k) => Math.exp(-(k * k) / (2 * sig * sig)));
  let out = '';
  for (let i = 0; i <= n; i = i === n ? n + 1 : Math.min(n, i + 2)) {
    const hw = Math.min(h, i, n - i);
    let sx = 0, sy = 0, sw = 0;
    for (let k = -hw; k <= hw; k++) { const w = wt[Math.abs(k)]; sx += X[i + k] * w; sy += Y[i + k] * w; sw += w; }
    out += `${i ? ' L' : 'M'}${(sx / sw).toFixed(1)} ${(sy / sw).toFixed(1)}`;
  }
  return out;
};

const sciaCtx = (page) => {
  const W = document.documentElement.clientWidth;
  const wrap = page.querySelector('.wrap');
  const cl = wrap ? sciaRect(wrap).l + sciaPf(sciaCs(wrap).paddingLeft) : 24;
  const off = Math.min(cl / 2, 56);
  const P = [], st = [], holes = [];
  return { W, X: [cl - off, W - cl + off], P, st, holes, add: (x, y, d, k) => P.push({ x, y, d, k }), at: (el, x, y, kind = 'on') => st.push({ el, x, y, kind }), cur: () => P[P.length - 1] };
};

// Righe di componenti da percorrere in orizzontale, a serpentina se vanno a capo
const sciaRows = (els, fy, fx, kind) => {
  const rows = [];
  els.forEach((el) => { const r = sciaRect(el); let row = rows.find((w) => Math.abs(w.t - r.t) < 8); if (!row) rows.push(row = { t: r.t, l: r.l, r: r.r, els: [] }); row.l = Math.min(row.l, r.l); row.r = Math.max(row.r, r.r); row.els.push(el); });
  rows.sort((a, b) => a.t - b.t);
  rows.forEach((row) => { row.items = row.els.map((el) => ({ el, x: fx(el), kind })).sort((a, b) => a.x - b.x); row.y = Math.max(...row.els.map(fy)); });
  return rows;
};
const sciaOneRow = (els, y, fx, kind) => {
  const rs = els.map(sciaRect);
  return { y, l: Math.min(...rs.map((r) => r.l)), r: Math.max(...rs.map((r) => r.r)), items: els.map((el) => ({ el, x: fx(el), kind })).sort((a, b) => a.x - b.x) };
};
const sciaRide = (c, rows, side, lim) => {
  const [mn, mx] = lim || [c.X[0] + 24, c.X[1] - 24];
  rows.forEach((row, i) => {
    const dir = side ? 'l' : 'r';
    const sx = side ? Math.min(row.r + 6, mx) : Math.max(row.l - 6, mn);
    const ex = side ? Math.max(row.l - 6, mn) : Math.min(row.r + 6, mx);
    const room = side ? c.W - sx : sx;
    c.add(sx, row.y, dir, i ? Math.max(8, Math.min(40, (room - 4) / 0.75)) : undefined);
    (side ? [...row.items].reverse() : row.items).forEach((it) => c.at(it.el, it.x, row.y, it.kind));
    c.add(ex, row.y, dir);
    side = 1 - side;
  });
  return side;
};

// Finale: sottolinea l'em del CTA e punta al pulsante
const sciaEnd = (c, cta) => {
  const em = cta.querySelector('h2 em'), btn = cta.querySelector('.btn');
  if (!em) return false;
  const er = sciaRect(em), fs = sciaPf(sciaCs(em).fontSize), uy = er.b + fs * 0.08, p0 = c.cur();
  // scende nel margine fin sotto la parola, poi gira stretto: la curva non taglia le lettere (es. la gamba della "p")
  c.add(p0.x, uy - 28, 'd');
  c.add(Math.min(p0.x + 48, er.l - 8), uy + 12, 'r', 14);
  c.add(er.l + er.w * 0.3, uy + 12, 'r');
  if (btn) {
    const br = sciaRect(btn), card = sciaRect(cta), by = br.t + br.h / 2;
    if (br.l > er.r + 48) c.add(br.l - 18, by, 'r');
    else if (br.r + 44 < card.r - 12) { c.add(Math.min(br.r + 48, card.r - 14), (uy + by) / 2 + 4, 'd'); c.add(br.r + 16, by, 'l'); }
    else c.add(br.l + br.w * 0.72, br.t - 16, 'd');
    c.at(btn, c.cur().x, c.cur().y);
  } else c.add(er.r + 40, uy - 26, 'r');
  return true;
};

// Una fila sola: la percorre in orizzontale nello spazio libero sopra. Più file: scende nel margine e le accende al passaggio.
const sciaAcross = (c, els, yLine, side) => {
  const rows = sciaRows(els, () => 0, (el) => { const r = sciaRect(el); return r.l + r.w / 2; });
  if (rows.length === 1) {
    c.add(c.X[side], yLine - 28, 'd');
    return sciaRide(c, [{ y: yLine, l: rows[0].l, r: rows[0].r, items: rows[0].items }], side);
  }
  els.forEach((el) => { const r = sciaRect(el); c.at(el, c.X[side], r.t + r.h / 2); });
  return side;
};

function sciaHome(page, c) {
  const q = (s, r = page) => r.querySelector(s), qa = (s, r = page) => [...r.querySelectorAll(s)];
  const R = sciaRect, { X, add, at } = c;
  const need = ['.hx .label .rule', '.coach-copy', '.tx-card', '.steps .step .num', '.fb-list li', '.tease-item .tease-price', '.ab-stat .n', '.cta h2 em'];
  if (need.some((s) => !q(s))) return false;
  const glyph = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); return rg.getBoundingClientRect().width; };

  // Hero: nasce dal filetto dell'etichetta, scende e passa sotto le tre icone
  const { cy } = c.tf = sciaRuleStart(q('.hx .label .rule'), add);
  add(X[0], cy + 48, 'd');
  const pills = qa('.hx-pill');
  if (pills.length) {
    const py = Math.max(...pills.map((p) => R(p).b)) + Math.min(18, sciaPf(sciaCs(q('.hx-in')).paddingBottom) * 0.45);
    add(X[0], py - 28, 'd');
    sciaRide(c, [sciaOneRow(pills, py, (p) => { const r = R(q('.ic', p)); return r.l + r.w / 2; })], 0);
  }

  // Filosofia: corre nel margine tra foto e testo, accende i tre principi
  const copy = q('.coach-copy'), card = R(q('.coach')), cr = R(copy);
  const rx = cr.l + sciaPf(sciaCs(copy).paddingLeft) / 2;
  add(rx, card.t + 20, 'd');
  qa('.ph-list li').forEach((li) => { const r = R(li); at(li, rx, r.t + r.h / 2); });
  add(rx, card.b, 'd');

  // Trasformazioni: passa nello spazio libero sopra le card e le accende una a una
  const txEl = q('.tx'), tx = R(txEl), grid = R(q('.tx-grid')), txh = R(q('.tx-head'));
  add(X[0], tx.t + sciaPf(sciaCs(txEl).paddingTop) * 0.5, 'd');
  let side = sciaAcross(c, qa('.tx-card'), (txh.b + grid.t) / 2, 0);
  add(X[side], grid.b + 24, 'd');

  // Metodo: ampia curva sotto il testo, poi linea del tempo dietro i numeri 01-02-03
  const steps = qa('.steps .step'), n0 = q('.num', steps[0]);
  const railX = R(n0).l + glyph(n0) / 2;
  const head = q('.mx-head'), s0 = R(steps[0]);
  if (head && Math.abs(X[side] - railX) > 200) {
    const hb = R(head).b, gy = (hb + s0.t) / 2;
    // scende nel margine fino quasi alla fine del testo, poi curva stretta nello spazio sotto: non taglia titolo e paragrafo
    add(X[side], Math.max(hb - 60, c.cur().y + 60), 'd');
    add(X[side] + (side ? -70 : 70), gy, side ? 'l' : 'r', 20);
    add(railX + (side ? 90 : -90), gy, side ? 'l' : 'r');
  } else if (head) add(X[side], (R(head).b + s0.t) / 2 - 6, 'd');
  add(railX, s0.t + Math.max(8, Math.min(28, sciaPf(sciaCs(steps[0]).paddingTop) - 6)), 'd');
  steps.forEach((s) => {
    // .num si allunga a tutta l'altezza della card (grid stretch): il buco segue solo le cifre
    const n = q('.num', s), nr = R(n), rg = document.createRange(); rg.selectNodeContents(n);
    const gb = rg.getBoundingClientRect(), nb = n.getBoundingClientRect(), gt = nr.t + (gb.top - nb.top), gh = Math.min(nr.h, gb.height);
    c.holes.push({ l: nr.l - 8, t: gt - 6, w: gb.width + 16, h: gh + 12, rad: 10 });
    at(s, railX, gt + gh / 2);
  });
  add(railX, R(steps[steps.length - 1]).b, 'd');

  // Fatica buona: Disciplina, Costanza, Risultati
  const fbEl = q('.fb'), fb = R(fbEl), lis = qa('.fb-list li'), list = R(q('.fb-list'));
  const column = lis.length < 2 || R(lis[1]).t >= R(lis[0]).b - 2;
  const fbSec = fbEl.closest('section');
  if (column) {
    const fx = list.l - 28;
    add(fx, list.t - 6, 'd');
    lis.forEach((li) => { const r = R(li); at(li, fx, r.t + r.h / 2); });
    add(fx, fb.b, 'd');
    add(X[0], fb.b + (fbSec ? sciaPf(sciaCs(fbSec).paddingBottom) : 64), 'd');
    side = 0;
  } else {
    const fin = q('.fb-in'), padL = sciaPf(sciaCs(fin).paddingLeft), padB = sciaPf(sciaCs(fin).paddingBottom);
    const fbx = fb.l + padL / 2, fy = list.b + Math.min(18, padB * 0.4);
    add(fbx, fb.t + 16, 'd');
    add(fbx, fy - 28, 'd');
    sciaRide(c, [sciaOneRow(lis, fy, (li) => { const r = R(li); return r.l + r.w / 2; })], 0, [fbx + 24, fb.r - 24]);
    add(X[1], fb.b + 28, 'd');
    side = 1;
  }

  // Pacchetti: corre sopra le card e spinge le frecce
  const teaseEl = q('.tease'), tease = R(teaseEl), sh = teaseEl.previousElementSibling;
  side = sciaAcross(c, qa('.tease-item'), sh ? (R(sh).b + tease.t) / 2 : tease.t - 24, side);
  add(X[side], tease.b + 24, 'd');

  // Radici: passa sotto i numeri e li fa contare
  const abEl = q('.ab'), ab = R(abEl), abIn = q('.ab-in');
  const stats = qa('.ab-stat'), sr = stats.map(R), capEl = q('.ab-cap'), cap = capEl ? R(capEl) : null;
  const sy = Math.max(...sr.map((r) => r.b)) + 16;
  if (side === 0) {
    const yA = ab.t + sciaPf(sciaCs(abIn).paddingTop) * 0.45;
    add(X[0], yA - 40, 'd');
    add(X[1], yA + 40, 'd');
  }
  add(X[1], sy - 28, 'd');
  sciaRide(c, [{ y: sy, l: Math.min(...sr.map((r) => r.l)), r: Math.max(...sr.map((r) => r.r), cap && cap.b <= sy ? cap.r : 0), items: stats.map((s, i) => ({ el: q('.n', s), x: sr[i].l + sr[i].w / 2, kind: 'count' })).sort((a, b) => a.x - b.x) }], 1);
  add(X[0], sy + 28, 'd');

  // Prova: sottolinea e indica il pulsante
  sciaEnd(c, q('.cta'));
  return true;
}

function sciaGutter(page, c) {
  const secs = [...page.children].filter((el) => el.tagName === 'SECTION' && el.offsetHeight > 0);
  if (secs.length < 2) return false;
  const { X, add, at } = c;
  const cross = [];
  for (let i = 0; i < secs.length - 1; i++) {
    const padB = sciaPf(sciaCs(secs[i]).paddingBottom), padT = sciaPf(sciaCs(secs[i + 1]).paddingTop), gap = padB + padT;
    if (gap < 48) continue;
    cross.push({ yc: sciaRect(secs[i + 1]).t + (padT - padB) / 2, a: Math.min(gap * 0.3, 44), gap });
  }
  const last = secs[secs.length - 1];
  const hasEnd = last.classList.contains('cta') && last.querySelector('h2 em');
  if (hasEnd && cross.length % 2) cross.splice(cross.reduce((m, x, i) => (x.gap < cross[m].gap ? i : m), 0), 1);
  const rule = secs[0].querySelector('.label .rule');
  if (rule) { const { cy } = c.tf = sciaRuleStart(rule, add); add(X[0], cy + 48, 'd'); }
  else add(X[0], sciaRect(secs[0]).t + 32, 'd');
  let side = 0;
  cross.forEach((x) => { add(X[side], x.yc - x.a, 'd'); add(X[1 - side], x.yc + x.a, 'd'); at(null, (X[0] + X[1]) / 2, x.yc, 'node'); side = 1 - side; });
  if (!(hasEnd && sciaEnd(c, last))) add(X[side], sciaRect(last).b - 40, 'd');
  return true;
}

// Modalità "steps": solo la linea del tempo (.tl), dal primo all'ultimo passaggio. Su una fila corre sulla linea e attraversa i pallini; su più file scende nel margine sinistro.
function sciaSteps(page, c) {
  const tl = page.querySelector('.tl'), items = tl ? [...tl.querySelectorAll('.tl-i')] : [];
  if (items.length < 2) return false;
  const { X, add, at } = c, R = sciaRect;
  const dots = items.map((el) => {
    const r = R(el), b = getComputedStyle(el, '::before'), w = sciaPf(b.width) || 11, h = sciaPf(b.height) || 11;
    const l = r.l + sciaPf(b.left), t = r.t + sciaPf(b.top);
    return { el, l, t, w, h, x: l + w / 2, y: t + h / 2 };
  });
  dots.forEach((d) => c.holes.push({ l: d.l - 7, t: d.t - 7, w: d.w + 14, h: d.h + 14, rad: (d.w + 14) / 2 }));
  const one = dots.every((d) => Math.abs(d.y - dots[0].y) < 4);
  const first = dots[0], last = dots[dots.length - 1];
  if (one) {
    const gap = dots[1].x - first.x;
    add(Math.max(X[0], first.x - 40), first.y, 'r');
    dots.forEach((d) => at(d.el, d.x, d.y));
    add(Math.min(X[1] - 8, last.x + Math.max(48, gap * 0.35)), last.y, 'r');
  } else {
    // timeline verticale (pallini in colonna): scorre sui pallini; altrimenti nel margine sinistro
    const col = dots.every((d) => Math.abs(d.x - first.x) < 4), x = col ? first.x : Math.max(X[0], first.x - 28);
    add(x, first.y - 24, 'd');
    dots.forEach((d) => at(d.el, x, d.y));
    add(x, last.y + Math.max(48, (last.y - first.y) / (dots.length - 1) * 0.35), 'd');
  }
  return true;
}

function sciaGeometry(page, mode) {
  let c = sciaCtx(page);
  let ok = mode === 'through' ? sciaHome(page, c) : mode === 'steps' ? sciaSteps(page, c) : false;
  if (!ok && mode !== 'steps') { c = sciaCtx(page); ok = sciaGutter(page, c); }
  if (!ok || c.P.length < 2) return null;
  // "steps" dentro una sezione sticky: coordinate relative al contenitore bloccato, avanzamento legato allo scroll della sezione
  const pinEl = mode === 'steps' && page.querySelector('.tl') && page.querySelector('.tl').closest('.pin-in');
  if (pinEl && sciaCs(pinEl).position === 'sticky') {
    // inizio = quando la sezione si aggancia sotto la navbar; corsa = altezza di .pin-run (elementi non sticky: posizioni stabili)
    const pr = sciaRect(pinEl), run = pinEl.parentElement.querySelector('.pin-run');
    const rr = run ? sciaRect(run) : { t: pr.b, h: 0 }, top = rr.t - pr.h - sciaPf(sciaCs(pinEl).top);
    const mv = (o) => { o.x -= pr.l; o.y -= pr.t; };
    c.P.forEach(mv); c.st.forEach(mv); c.holes.forEach((h) => { h.l -= pr.l; h.t -= pr.t; });
    c.st.forEach((x) => { x.ink = 'b'; });
    return { d: sciaSmooth(sciaPath(c.P), 20), W: pr.w, H: pr.h, st: c.st, holes: c.holes, dk: [], lt: [], few: true, pin: { el: pinEl, ox: pr.l, oy: pr.t, top, range: Math.max(1, rr.h) } };
  }
  const dk = [...page.querySelectorAll('.dk')].map(sciaRect);
  const lt = [...page.querySelectorAll('.cta')].map(sciaRect);
  c.st.forEach((x) => { x.ink = sciaIn(dk, x.x, x.y) ? 'd' : sciaIn(lt, x.x, x.y) ? 'l' : 'b'; });
  return { d: sciaSmooth(sciaPath(c.P), c.W < 760 ? 6 : c.W < 1100 ? 12 : 20), W: c.W, H: sciaRect(page).b, st: c.st, holes: c.holes, dk, lt, tf: c.tf, few: mode === 'steps' };
}

const sciaRng = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const sciaArrow = (S) => `M${.6 * S} 0 L${-.48 * S} ${-.5 * S} Q${-.26 * S} 0 ${-.48 * S} ${.5 * S}Z`;
const sciaBlob = (r, rnd) => {
  const k = 6 + Math.floor(rnd() * 3), pts = [];
  for (let i = 0; i < k; i++) { const a = (i / k) * Math.PI * 2 + (rnd() - 0.5) * 0.5, rr = r * (0.72 + rnd() * 0.5); pts.push([Math.cos(a) * rr * 1.2, Math.sin(a) * rr]); }
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], f = (v) => v.toFixed(2);
  let m = mid(pts[k - 1], pts[0]), s = `M${f(m[0])} ${f(m[1])}`;
  for (let i = 0; i < k; i++) { const p = pts[i], q = mid(p, pts[(i + 1) % k]); s += `Q${f(p[0])} ${f(p[1])} ${f(q[0])} ${f(q[1])}`; }
  return s + 'Z';
};
const SCIA_SPRAY = [
  [[-.5, -1.2, .13], [.4, -.95, .08, 1], [-1.25, 1, .1], [.8, .75, .07], [1.2, -.42, .055]],
  [[-.15, -1.1, .09, 1], [.65, -.8, .12], [-1.05, 1.15, .07], [.3, 1, .1], [1.3, .32, .06]],
  [[-.85, -1.05, .08], [.15, -1.25, .11], [-.4, 1.05, .12, 1], [.95, .6, .07], [1.1, -.8, .06]],
];

const sciaCount = (x) => {
  const t0 = performance.now(), v = +x.v || 0;
  const f = (t) => { const k = Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - k, 3); x.tn.nodeValue = String(Math.round(v * e)); if (k < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
};

function Scia({ pageKey, mode = 'through', ghost = false, stations = false, drops = true, w = 2.5 }) {
  const rootRef = React.useRef(null), mRef = React.useRef(null);
  const s = React.useRef({ L: 0, cur: 0, tgt: 0, step: 4, n: 0, xs: null, ys: null, env: null, st: [], raf: 0, fresh: true, geo: null, w: 2.5 }).current;
  const [geo, setGeo] = React.useState(null);
  const [dps, setDps] = React.useState([]);
  const reduce = React.useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  s.w = w;

  const lenAt = (y) => {
    const { env, n, step, L } = s;
    if (!env || y < env[0]) return 0;
    if (y >= env[n]) return L;
    let lo = 0, hi = n;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (env[m] <= y) lo = m; else hi = m - 1; }
    return Math.min(lo * step, L);
  };
  const target = () => {
    const pn = s.geo && s.geo.pin;
    if (!pn) return lenAt(window.scrollY + window.innerHeight * 0.66);
    // la freccia parte appena la sezione si blocca e arriva in fondo poco prima che si sblocchi
    const p = (window.scrollY - pn.top) / pn.range;
    return s.L * Math.min(1, Math.max(0, (p - 0.03) / 0.85));
  };

  const apply = () => {
    const { cur, L, step, xs, ys, n, geo: g } = s;
    if (!xs || !rootRef.current || !g) return;
    const root = rootRef.current;
    if (!s.els || s.els.root !== root || !s.els.hd.isConnected) s.els = { root, r: root.querySelectorAll('path.r'), t: root.querySelectorAll('path.t'), hd: root.querySelector('.hd'), nds: root.querySelectorAll('.nd') };
    const da = `${Math.max(0, cur - s.w * 2).toFixed(1)} ${L + 100}`, db = `${Math.max(0, cur - 60 + (s.tE || 0)).toFixed(1)} ${L + 100}`;
    s.els.r.forEach((p) => { p.style.strokeDasharray = da; });
    s.els.t.forEach((p) => { p.style.strokeDasharray = db; });
    const f = cur / step, i = Math.min(Math.floor(f), n - 1), k = f - i;
    const x = xs[i] + (xs[i + 1] - xs[i]) * k, y = ys[i] + (ys[i + 1] - ys[i]) * k;
    const a = Math.max(0, i - 7), b = Math.min(n, i + 1);
    const ang = Math.atan2(ys[b] - ys[a], xs[b] - xs[a]) * 180 / Math.PI;
    const hd = s.els.hd;
    hd.setAttribute('transform', `translate(${x} ${y}) rotate(${ang})`);
    hd.style.opacity = cur > 6 ? 1 : 0;
    hd.dataset.ink = sciaIn(g.dk, x, y) ? 'd' : sciaIn(g.lt, x, y) ? 'l' : 'b';
    hd.dataset.f = Math.floor(cur / 64) % 3;
    const de = s.dpEls, dl = s.dl;
    if (de && dl) {
      while (s.dk < de.length && dl[s.dk] <= cur) { de[s.dk].setAttribute('data-on', ''); s.dk++; }
      while (s.dk > 0 && dl[s.dk - 1] > cur) { s.dk--; de[s.dk].removeAttribute('data-on'); }
    }
    const nds = s.els.nds;
    const vb = window.scrollY + window.innerHeight * 0.85;   // i contatori partono appena visibili, senza aspettare la freccia
    let j = 0;
    s.st.forEach((x) => {
      if (x.kind === 'count' && x.y <= vb && !x.el.dataset.sciaDone && x.tn) { x.el.dataset.sciaDone = '1'; if (reduce) x.tn.nodeValue = x.v; else sciaCount(x); }
      const on = x.len <= cur + 2;
      if (x.kind === 'node') { const nd = nds[j++]; if (nd) { if (on) nd.setAttribute('data-on', ''); else nd.removeAttribute('data-on'); } return; }
      if (on === x.on) return;
      x.on = on;
      if (on) x.el.setAttribute('data-scia-on', ''); else x.el.removeAttribute('data-scia-on');
      if (x.kind === 'count' && on && !x.el.dataset.sciaDone && x.tn) { x.el.dataset.sciaDone = '1'; if (reduce) x.tn.nodeValue = x.v; else sciaCount(x); }
    });
  };
  const tick = (now) => {
    if (s.intro) {
      if (!s.t0) { s.t0 = now; s.dur = Math.min(2400, Math.max(1400, s.tgt * 1.5)); }
      const k = Math.min(1, (now - s.t0) / s.dur), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(2 - 2 * k, 3) / 2;
      s.cur = s.tgt * e;
      apply();
      if (k < 1) { s.raf = requestAnimationFrame(tick); return; }
      s.intro = false; s.raf = 0; s.last = 0;
      if (s.pend && s.build) { s.pend = false; s.build(); }
      return;
    }
    const dt = Math.min(100, s.last ? now - s.last : 16);
    s.last = now;
    const dd = s.tgt - s.cur, a = Math.abs(dd);
    s.cur += a < 0.6 ? dd : Math.sign(dd) * Math.min(a * (1 - Math.exp(-dt / 140)), 1.5 * dt);
    apply();
    if (Math.abs(s.tgt - s.cur) > 0.3) s.raf = requestAnimationFrame(tick); else { s.raf = 0; s.last = 0; }
  };
  const kick = () => { if (!s.raf && s.xs && (!s.intro || s.ready)) s.raf = requestAnimationFrame(tick); };

  React.useEffect(() => {
    Object.assign(s, { intro: !reduce, ready: false, t0: 0 });
    let t, alive = true;
    const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true }));
    Promise.all([loaded, document.fonts ? document.fonts.ready : null]).then(() => setTimeout(() => {
      if (!alive) return;
      clearTimeout(t); build();
      requestAnimationFrame(() => requestAnimationFrame(() => { if (!alive) return; s.ready = true; s.t0 = 0; kick(); }));
    }, 350));
    const build = () => {
      if (s.intro && s.ready) { s.pend = true; return; }
      const page = document.querySelector('.page'); if (page) setGeo(sciaGeometry(page, mode));
    };
    s.build = build; s.pend = false;
    const later = () => { clearTimeout(t); t = setTimeout(build, 150); };
    const page = document.querySelector('.page');
    build();
    const ro = new ResizeObserver(later);
    if (page) ro.observe(page);
    window.addEventListener('resize', later);
    if (document.fonts) document.fonts.ready.then(later);
    const onScroll = () => { s.tgt = target(); if (reduce) { s.cur = s.tgt; apply(); } else kick(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      alive = false; ro.disconnect(); clearTimeout(t); window.removeEventListener('resize', later); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(s.raf); s.raf = 0;
      s.st.forEach((x) => { if (!x.el) return; x.el.removeAttribute('data-scia-on'); delete x.el.dataset.sciaDone; if (x.tn) x.tn.nodeValue = x.v; });
      s.st = [];
      document.documentElement.classList.remove('scia-on');
    };
  }, [pageKey, mode]);

  React.useLayoutEffect(() => {
    if (!geo || !mRef.current) return;
    const p = mRef.current, L = p.getTotalLength(), step = s.step, n = Math.max(1, Math.ceil(L / step));
    const xs = new Float32Array(n + 1), ys = new Float32Array(n + 1), env = new Float32Array(n + 1);
    let m = -Infinity;
    const lagMax = window.innerHeight * 0.34;
    for (let i = 0; i <= n; i++) { const pt = p.getPointAtLength(Math.min(i * step, L)); xs[i] = pt.x; ys[i] = pt.y; m = Math.max(m, pt.y); env[i] = i ? Math.max(m, Math.min(env[i - 1] + step * 0.3, m + lagMax)) : m; }
    geo.st.forEach((x) => {
      let b = 0, bd = Infinity;
      for (let i = 0; i <= n; i++) { const d2 = (xs[i] - x.x) ** 2 + (ys[i] - x.y) ** 2; if (d2 < bd) { bd = d2; b = i; } }
      x.len = Math.min(b * step, L);
      if (x.kind === 'count' && x.el) {
        x.tn = [...x.el.childNodes].find((nd) => nd.nodeType === 3);
        if (x.tn) { if (!x.el.dataset.sciaV) x.el.dataset.sciaV = x.tn.nodeValue; x.v = x.el.dataset.sciaV; }
      }
    });
    Object.assign(s, { L, n, xs, ys, env, geo, st: geo.st, dpEls: null, dl: null, dk: 0 });
    const rnd = sciaRng(7), ww = s.w, list = [];
    const ang = (i) => { const a = Math.max(0, i - 2), b = Math.min(n, i + 2); return Math.atan2(ys[b] - ys[a], xs[b] - xs[a]); };
    const ox = geo.pin ? geo.pin.ox : 0, oy = geo.pin ? geo.pin.oy : 0, few = geo.few;
    const ko = [...document.querySelectorAll('.page :is(h1,h2,h3,p,figcaption,.label,.btn,.tx-tag,.tease-price,.num,.ab-stat,.ab-cap,.hx-pill,.ph-list li,.fb-list li,.tier,.pname,.sig,.yr)')].map(sciaRect).map((r) => ({ l: r.l - 8 - ox, r: r.r + 8 - ox, t: r.t - 8 - oy, b: r.b + 8 - oy }));
    const push = (x, y, len, r, rot, el) => { if (sciaIn(ko, x, y)) return; list.push({ x, y, len, r, rot, el, b: rot != null ? sciaBlob(r * 1.35, rnd) : null, teal: rnd() < 0.16, ink: sciaIn(geo.dk, x, y) ? 'd' : sciaIn(geo.lt, x, y) ? 'l' : 'b' }); };
    // few: meno gocce (Esperienza), scie più rade e un solo schizzo per goccia
    for (let L0 = 70 + rnd() * 80; L0 < L - 40; L0 += few ? 260 + rnd() * 220 : 90 + rnd() * 150) {
      const i = Math.round(L0 / step), a = ang(i), nx = -Math.sin(a), ny = Math.cos(a);
      const k = few ? 1 : 1 + Math.floor(rnd() * 3);
      for (let j = 0; j < k; j++) {
        const sd = rnd() < 0.5 ? -1 : 1, dist = ww + 3 + rnd() * (ww * 2.4 + 6), back = rnd() * 14;
        const r = 0.9 + rnd() * (ww * 0.62 + 0.6);
        push(xs[i] + nx * dist * sd - Math.cos(a) * back, ys[i] + ny * dist * sd - Math.sin(a) * back, L0 + j * 6, r, rnd() < 0.4 ? a * 180 / Math.PI + (rnd() - 0.5) * 50 : null);
      }
    }
    geo.st.forEach((x) => {
      if (!x.el) return;
      for (let j = 0; j < (few ? 1 : 4); j++) { const a = rnd() * Math.PI * 2, dist = 10 + rnd() * 16; push(x.x + Math.cos(a) * dist, x.y + Math.sin(a) * dist, x.len, 1 + rnd() * (ww * 0.5 + 0.8), a * 180 / Math.PI, true); }
    });
    list.sort((p, q) => p.len - q.len);
    s.dl = Float32Array.from(list.map((p) => p.len));
    setDps(list);
    s.tgt = target();
    if (!s.intro) s.cur = s.tgt;
    else if (!s.ready) s.cur = 0;
    s.st.forEach((x) => { if (x.kind === 'count' && x.tn && !x.el.dataset.sciaDone && x.len > s.cur + 2) x.tn.nodeValue = '0'; });
    document.documentElement.classList.toggle('scia-on', s.st.some((x) => x.el));
    apply();
    kick();
  }, [geo]);

  React.useLayoutEffect(() => {
    if (!rootRef.current) return;
    s.dpEls = rootRef.current.querySelectorAll('.dp');
    s.dk = 0; s.els = null;
    apply();
  }, [dps, drops]);

  React.useEffect(() => { s.els = null; apply(); }, [ghost, stations, w]);

  if (!geo) return null;
  const { W, H, d, dk, lt, holes } = geo;
  const rects = (arr, fill) => arr.map((r, i) => <rect key={i} x={r.l} y={r.t} width={r.w} height={r.h} rx={r.rad} fill={fill}></rect>);
  const off = Math.max(5, w + 2.5), tw = Math.max(1, w * 0.45);
  // Il filo teal parte dall'estremità destra del filetto: tratto dritto in testa, solo per il teal
  let dT = d;
  s.tE = 0;
  if (geo.tf) {
    const x0 = geo.tf.r - off * 0.7 - tw / 2;
    s.tE = Math.max(0, x0 - geo.tf.sx);
    if (s.tE > 0) dT = `M${x0.toFixed(1)} ${geo.tf.cy.toFixed(1)} L${d.slice(1)}`;
  }
  const strokes = (
    <>
      {ghost && <path className="g" d={d}></path>}
      <path className="r" d={d} strokeWidth={w}></path>
      <path className="t" d={dT} strokeWidth={tw} transform={`translate(${off * 0.7} ${off * 0.7})`}></path>
    </>
  );
  const S = 12 + w * 2.6;
  const out = (
    <div className="scia" ref={rootRef} style={{ width: W, height: H }} aria-hidden="true">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <mask id="scia-h" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}><rect width={W} height={H} fill="#fff"></rect>{rects(holes, '#000')}</mask>
          <mask id="scia-m" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}><rect width={W} height={H} fill="#fff"></rect>{rects([...dk, ...lt], '#000')}</mask>
          <clipPath id="scia-cd">{rects(dk)}</clipPath>
          <clipPath id="scia-cl">{rects(lt)}</clipPath>
        </defs>
        <path ref={mRef} d={d} fill="none" stroke="none"></path>
        <g mask="url(#scia-h)">
          <g className="ink-b" mask="url(#scia-m)">{strokes}</g>
          {dk.length > 0 && <g className="ink-d" clipPath="url(#scia-cd)">{strokes}</g>}
          {lt.length > 0 && <g className="ink-l" clipPath="url(#scia-cl)">{strokes}</g>}
        </g>
        {drops && dps.length > 0 && (
          <g mask="url(#scia-h)">
            {dps.map((p, i) => (
              <g key={i} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})${p.rot != null ? ` rotate(${p.rot.toFixed(0)})` : ''}`}>
                {p.rot != null ? <path className={`dp ink-${p.ink} ${p.teal ? 'tl' : ''}`} d={p.b}></path> : <circle className={`dp ink-${p.ink} ${p.teal ? 'tl' : ''}`} r={p.r.toFixed(2)}></circle>}
              </g>
            ))}
          </g>
        )}
        {stations && geo.st.filter((x) => x.kind === 'node').map((x, i) => <circle key={i} className={`nd ink-${x.ink}`} cx={x.x} cy={x.y} r="5.5"></circle>)}
        <g className="hd" style={{ opacity: 0 }}>
          {drops && !geo.few && SCIA_SPRAY.map((set, k) => <g key={k} className={`sp sp${k}`}>{set.map(([x, y, r, t], i) => <circle key={i} className={t ? 'tl' : ''} cx={x * S} cy={y * S} r={r * S}></circle>)}</g>)}
          <path className="ah" d={sciaArrow(S)}></path>
        </g>
      </svg>
    </div>
  );
  return geo.pin && geo.pin.el.isConnected ? ReactDOM.createPortal(out, geo.pin.el) : out;
}

Object.assign(window, { Scia });
