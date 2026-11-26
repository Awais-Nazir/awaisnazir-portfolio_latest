type Node = { id: string; name: string; x: number; y: number; build: unknown };
type Edge = { from: string; to: string };

export function graphLabel(name: string): string[] {
  const words = name.match(/\S{1,26}/g) || [name];
  const lines: string[] = [];
  for (const word of words) {
    const last = lines.length - 1;
    if (last >= 0 && lines[last].length + word.length < 27) lines[last] += ` ${word}`;
    else lines.push(word);
  }
  return lines;
}

// Deterministic settling: anchored projects, spring-linked skills and label-aware repulsion.
// No animation loop or random server/client coordinates are needed.
export function layoutSkillGraph<T extends Node>(input: T[], edges: Edge[]): T[] {
  const nodes = input.map(n => ({ ...n, vx: 0, vy: 0, fx: 0, fy: 0,
    degree: edges.filter(e => e.from === n.id || e.to === n.id).length,
    lines: graphLabel(n.name) }));
  const byId = new Map(nodes.map(n => [n.id, n]));
  const links = edges.flatMap(e => {
    const a = byId.get(e.from), b = byId.get(e.to);
    return a && b ? [{ a, b }] : [];
  });
  let seed = 11;
  const random = () => (seed = seed * 16807 % 2147483647) / 2147483647;
  const radius = (n: typeof nodes[number]) => n.build ? 28 + Math.min(n.degree, 8) : 9 + Math.min(n.degree, 5) * 2;
  for (const n of nodes) {
    if (n.build) continue;
    const parents = links.filter(l => l.b === n).map(l => l.a);
    if (parents.length) {
      n.x = parents.reduce((sum, p) => sum + p.x, 0) / parents.length + (random() - .5) * 100;
      n.y = parents.reduce((sum, p) => sum + p.y, 0) / parents.length + (random() - .5) * 100;
    }
  }
  for (let step = 0; step < 700; step++) {
    const cooling = Math.max(.06, 1 - step / 550);
    nodes.forEach(n => { n.fx = (500 - n.x) * .004; n.fy = (370 - n.y) * .004; });
    for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      let dx = b.x - a.x, dy = b.y - a.y;
      if (Math.abs(dx) + Math.abs(dy) < .01) { dx = .1; dy = .1; }
      const d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
      const force = (a.build || b.build ? 16000 : 5200) / Math.max(100, d * d);
      a.fx -= ux * force; a.fy -= uy * force; b.fx += ux * force; b.fy += uy * force;
      // Include the text beneath each circle in the collision box.
      const halfWidth = (n: typeof a) => Math.max(radius(n) + 12, Math.max(...n.lines.map(l => l.length)) * 3.5 + 10);
      const halfHeight = (n: typeof a) => radius(n) + 12 + n.lines.length * 8;
      const overlapX = halfWidth(a) + halfWidth(b) - Math.abs(dx);
      const offsetA = 10 + a.lines.length * 8, offsetB = 10 + b.lines.length * 8;
      const labelDy = dy + offsetB - offsetA;
      const overlapY = halfHeight(a) + halfHeight(b) - Math.abs(labelDy);
      if (overlapX > 0 && overlapY > 0) {
        if (overlapX < overlapY || (a.y > 620 && b.y > 620) || (a.y < 80 && b.y < 80)) {
          const f = Math.sign(dx || 1) * overlapX * .5;
          a.fx -= f; b.fx += f;
        } else {
          const f = Math.sign(labelDy || 1) * overlapY * .5;
          a.fy -= f; b.fy += f;
        }
      }
    }
    for (const {a, b} of links) {
      const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy) || 1;
      const force = (d - radius(a) - radius(b) - 65) * .03;
      b.fx += dx / d * force; b.fy += dy / d * force;
    }
    for (const n of nodes) {
      if (n.build) continue;
      n.vx = (n.vx + n.fx) * .8; n.vy = (n.vy + n.fy) * .8;
      const inset = Math.max(45, Math.max(...n.lines.map(l => l.length)) * 3.5 + 15);
      n.x = Math.max(inset, Math.min(1000 - inset, n.x + n.vx * cooling));
      n.y = Math.max(35, Math.min(720 - radius(n) - n.lines.length * 16, n.y + n.vy * cooling));
    }
  }
  // Node and browser engines can differ in the last floating-point digits.
  // Quantize SVG coordinates to keep server/client hydration consistent.
  return nodes.map(({ vx, vy, fx, fy, degree, lines, ...n }) => ({
    ...n, x: Math.round(n.x * 100) / 100, y: Math.round(n.y * 100) / 100,
  }) as unknown as T);
}
