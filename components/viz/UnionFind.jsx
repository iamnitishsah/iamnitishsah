"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "../useInView";

// CampusSentinel's core idea, drawn as a disjoint-set: events from different
// sources get union()-ed into one entity; find() compresses paths to the root.

const SOURCES = [
  { k: "W", name: "wifi" },
  { k: "C", name: "cctv" },
  { k: "K", name: "card" },
  { k: "L", name: "library" },
  { k: "B", name: "lab" },
];
const CENTERS = [
  [122, 104],
  [398, 100],
  [126, 268],
  [402, 264],
];
const PER = [6, 5, 6, 5];

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeRound(seed) {
  const r = rng(seed);
  const events = [];
  PER.forEach((n, person) => {
    for (let i = 0; i < n; i++) {
      const src = SOURCES[Math.floor(r() * SOURCES.length)];
      events.push({ person, src, id: `${src.name}#${10 + Math.floor(r() * 89)}` });
    }
  });
  // shuffle positions onto a jittered grid
  const cells = [];
  for (let gy = 0; gy < 4; gy++) for (let gx = 0; gx < 6; gx++) cells.push([gx, gy]);
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  events.forEach((e, i) => {
    const [gx, gy] = cells[i];
    e.home = [48 + gx * 85 + (r() - 0.5) * 30, 52 + gy * 88 + (r() - 0.5) * 26];
  });

  // ops: first event of each person is make_set; then round-robin unions + occasional finds
  const ops = [];
  const members = PER.map(() => []);
  const queues = PER.map(() => []);
  events.forEach((e, i) => queues[e.person].push(i));
  const parent = events.map((_, i) => i);
  let left = events.length;
  while (left > 0) {
    for (let p = 0; p < PER.length; p++) {
      const q = queues[p];
      if (!q.length) continue;
      const x = q.shift();
      left--;
      if (!members[p].length) {
        ops.push({ t: "make", x });
      } else {
        const y = members[p][Math.floor(r() * members[p].length)];
        parent[x] = y;
        ops.push({ t: "union", x, y });
        // occasionally run a find on a deep node → path compression
        const deep = members[p].filter((m) => parent[m] !== m && parent[parent[m]] !== parent[m]);
        if (deep.length && r() < 0.45) {
          const d = deep[Math.floor(r() * deep.length)];
          let root = d;
          while (parent[root] !== root) root = parent[root];
          parent[d] = root;
          ops.push({ t: "find", x: d, root });
        }
      }
      members[p].push(x);
    }
  }
  return { events, ops };
}

export default function UnionFind() {
  const [viewRef, inView] = useInView({ threshold: 0.25 });
  const reduced = useReducedMotion();
  const [round, setRound] = useState(() => makeRound(7));
  const nodeRefs = useRef([]);
  const lineRefs = useRef([]);
  const [log, setLog] = useState([]);
  const [entities, setEntities] = useState(0);
  const [hot, setHot] = useState(-1);
  const [roles, setRoles] = useState(() => round.events.map(() => "free"));

  useEffect(() => {
    const { events, ops } = round;
    const N = events.length;
    const parent = events.map((_, i) => i);
    const inSet = events.map(() => false);
    const pos = events.map((e) => [...e.home]);
    const target = events.map((e) => [...e.home]);
    const roleArr = events.map(() => "free");

    const root = (i) => {
      while (parent[i] !== i) i = parent[i];
      return i;
    };
    const retarget = () => {
      PER.forEach((_, p) => {
        const mem = events.map((e, i) => i).filter((i) => events[i].person === p && inSet[i]);
        if (!mem.length) return;
        const rt = root(mem[0]);
        const others = mem.filter((i) => i !== rt);
        target[rt] = [...CENTERS[p]];
        const R = 34 + others.length * 3.5;
        others.forEach((i, k) => {
          const a = (k / others.length) * Math.PI * 2 - Math.PI / 2;
          target[i] = [CENTERS[p][0] + Math.cos(a) * R, CENTERS[p][1] + Math.sin(a) * R];
        });
      });
    };

    const apply = (op) => {
      if (op.t === "make") {
        inSet[op.x] = true;
        roleArr[op.x] = "root";
      } else if (op.t === "union") {
        parent[op.x] = op.y;
        inSet[op.x] = true;
        roleArr[op.x] = "member";
      } else if (op.t === "find") {
        parent[op.x] = op.root;
      }
      retarget();
    };

    const draw = () => {
      for (let i = 0; i < N; i++) {
        const g = nodeRefs.current[i];
        if (g) g.setAttribute("transform", `translate(${pos[i][0].toFixed(1)} ${pos[i][1].toFixed(1)})`);
        const l = lineRefs.current[i];
        if (!l) continue;
        if (parent[i] === i || !inSet[i]) {
          l.setAttribute("opacity", "0");
        } else {
          const p = parent[i];
          l.setAttribute("opacity", "1");
          l.setAttribute("x1", pos[i][0].toFixed(1));
          l.setAttribute("y1", pos[i][1].toFixed(1));
          l.setAttribute("x2", pos[p][0].toFixed(1));
          l.setAttribute("y2", pos[p][1].toFixed(1));
        }
      }
    };

    if (reduced) {
      ops.forEach(apply);
      for (let i = 0; i < N; i++) pos[i] = [...target[i]];
      setRoles([...roleArr]);
      setEntities(PER.length);
      draw();
      return;
    }

    if (!inView) {
      draw();
      return;
    }

    let k = 0;
    let lastOp = performance.now();
    let doneAt = 0;
    let raf = 0;
    setLog([]);
    setEntities(0);
    setRoles(events.map(() => "free"));

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (k < ops.length && now - lastOp > 620) {
        const op = ops[k++];
        apply(op);
        lastOp = now;
        setRoles([...roleArr]);
        setHot(op.x);
        setEntities(new Set(events.map((_, i) => i).filter((i) => inSet[i]).map(root)).size);
        const label =
          op.t === "make"
            ? { f: "make_set", a: events[op.x].id }
            : op.t === "union"
            ? { f: "union", a: `${events[op.x].id}, ${events[op.y].id}` }
            : { f: "find", a: `${events[op.x].id}`, note: "path compressed" };
        setLog((l) => [{ ...label, key: k }, ...l].slice(0, 3));
        if (k === ops.length) doneAt = now;
      }
      if (doneAt && now - doneAt > 2800) {
        cancelAnimationFrame(raf);
        setRound(makeRound(Math.floor(Math.random() * 1e6)));
        return;
      }
      for (let i = 0; i < N; i++) {
        pos[i][0] += (target[i][0] - pos[i][0]) * 0.12;
        pos[i][1] += (target[i][1] - pos[i][1]) * 0.12;
      }
      draw();
    };
    draw();
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [round, inView, reduced]);

  const { events } = round;

  return (
    <figure className="uf" ref={viewRef}>
      <svg viewBox="0 0 520 372" role="img" aria-label="Union-find merging campus events from different sources into entities">
        {CENTERS.map(([x, y], p) => (
          <circle key={p} cx={x} cy={y} r="76" className="uf__zone" />
        ))}
        <g>
          {events.map((e, i) => (
            <line key={`l${i}`} ref={(el) => (lineRefs.current[i] = el)} className="uf__ptr" opacity="0" />
          ))}
        </g>
        {events.map((e, i) => (
          <g
            key={`${e.id}-${i}`}
            ref={(el) => (nodeRefs.current[i] = el)}
            className={`uf__n uf__n--${roles[i]} ${hot === i ? "hot" : ""}`}
            transform={`translate(${e.home[0]} ${e.home[1]})`}
          >
            <circle r={roles[i] === "root" ? 13 : 10.5} />
            <text y="4" textAnchor="middle">
              {e.src.k}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="uf__cap">
        <div className="uf__log">
          {log.map((l) => (
            <span key={l.key}>
              <span className="uf__fn">{l.f}</span>({l.a}){l.note && <span className="dim"> · {l.note}</span>}
            </span>
          ))}
          {!log.length && <span className="dim">{events.length} raw events · 0 entities</span>}
        </div>
        <div className="uf__legend">
          {SOURCES.map((s) => (
            <span key={s.k}>
              <b>{s.k}</b> {s.name}
            </span>
          ))}
          <span className="uf__ent">
            entities <b>{entities}</b>
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
