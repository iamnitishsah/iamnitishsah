"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "../useInView";

// A* on a traffic-weighted city grid: the routing problem underneath delivery ETAs.

const COLS = 24;
const ROWS = 15;
const TRAFFIC = 4;

function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeCity(seed) {
  const r = rng(seed);
  for (let attempt = 0; attempt < 30; attempt++) {
    const cost = new Uint8Array(COLS * ROWS).fill(1); // 0 = building
    // rectangular building blocks
    for (let b = 0; b < 26; b++) {
      const w = 1 + Math.floor(r() * 3);
      const h = 1 + Math.floor(r() * 3);
      const x0 = Math.floor(r() * (COLS - w));
      const y0 = Math.floor(r() * (ROWS - h));
      for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) cost[y * COLS + x] = 0;
    }
    // congested streets
    for (let t = 0; t < 7; t++) {
      const horiz = r() < 0.5;
      const len = 3 + Math.floor(r() * 6);
      let x = Math.floor(r() * COLS);
      let y = Math.floor(r() * ROWS);
      for (let k = 0; k < len; k++) {
        const i = y * COLS + x;
        if (cost[i]) cost[i] = TRAFFIC;
        horiz ? x++ : y++;
        if (x >= COLS || y >= ROWS) break;
      }
    }
    const pickFree = (xmin, xmax) => {
      for (let k = 0; k < 200; k++) {
        const x = xmin + Math.floor(r() * (xmax - xmin));
        const y = 1 + Math.floor(r() * (ROWS - 2));
        if (cost[y * COLS + x] === 1) return y * COLS + x;
      }
      return -1;
    };
    const start = pickFree(1, 6);
    const goal = pickFree(COLS - 6, COLS - 1);
    if (start < 0 || goal < 0) continue;
    const res = astar(cost, start, goal);
    if (res.path) return { cost, start, goal, ...res };
  }
  return makeCity(seed + 1);
}

function astar(cost, start, goal) {
  const gx = goal % COLS;
  const gy = Math.floor(goal / COLS);
  const h = (i) => Math.abs((i % COLS) - gx) + Math.abs(Math.floor(i / COLS) - gy);
  const g = new Float32Array(COLS * ROWS).fill(Infinity);
  const prev = new Int32Array(COLS * ROWS).fill(-1);
  const closed = new Uint8Array(COLS * ROWS);
  const open = [[h(start), start]];
  g[start] = 0;
  const order = []; // [cell, frontierSnapshotSize]
  const frontierAdds = [];
  while (open.length) {
    open.sort((a, b) => a[0] - b[0]);
    const [, u] = open.shift();
    if (closed[u]) continue;
    closed[u] = 1;
    order.push(u);
    if (u === goal) break;
    const ux = u % COLS;
    const uy = Math.floor(u / COLS);
    const adds = [];
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = ux + dx;
      const y = uy + dy;
      if (x < 0 || y < 0 || x >= COLS || y >= ROWS) continue;
      const v = y * COLS + x;
      if (!cost[v] || closed[v]) continue;
      const ng = g[u] + cost[v];
      if (ng < g[v]) {
        g[v] = ng;
        prev[v] = u;
        open.push([ng + h(v), v]);
        adds.push(v);
      }
    }
    frontierAdds.push(adds);
  }
  if (!closed[goal]) return { path: null };
  const path = [];
  for (let v = goal; v !== -1; v = prev[v]) path.unshift(v);
  return { path, order, frontierAdds, total: g[goal] };
}

export default function GridPath() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [viewRef, inView] = useInView({ threshold: 0.25 });
  const reduced = useReducedMotion();
  const [info, setInfo] = useState({ explored: 0, cost: null, len: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas.getContext("2d");
    let W = 0;
    let cell = 0;
    let city = makeCity(42);
    let explored = 0;
    let pathShown = 0;
    let rider = 0;
    let phase = "search";
    let phaseAt = performance.now();
    let raf = 0;
    const fontFamily =
      getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() || "monospace";

    const size = () => {
      W = wrap.getBoundingClientRect().width;
      cell = W / COLS;
      const Hpx = cell * ROWS;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = Hpx * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${Hpx}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const cx = (i) => (i % COLS) * cell + cell / 2;
    const cy = (i) => Math.floor(i / COLS) * cell + cell / 2;

    const draw = (now) => {
      ctx.clearRect(0, 0, W, cell * ROWS);
      const { cost, order, frontierAdds, path, start, goal } = city;
      // streets + buildings
      for (let i = 0; i < cost.length; i++) {
        const x = (i % COLS) * cell;
        const y = Math.floor(i / COLS) * cell;
        if (!cost[i]) {
          ctx.fillStyle = "#171b27";
          ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
        } else {
          ctx.fillStyle = cost[i] === TRAFFIC ? "rgba(255,181,71,0.28)" : "#2a3142";
          ctx.beginPath();
          ctx.arc(x + cell / 2, y + cell / 2, cost[i] === TRAFFIC ? 2 : 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // explored (closed) set
      const closedSet = new Set(order.slice(0, explored));
      ctx.fillStyle = "rgba(142,155,255,0.16)";
      for (let k = 0; k < explored; k++) {
        const i = order[k];
        ctx.fillRect((i % COLS) * cell + 1, Math.floor(i / COLS) * cell + 1, cell - 2, cell - 2);
      }
      // frontier = neighbours discovered but not yet closed
      if (phase === "search") {
        ctx.strokeStyle = "rgba(255,181,71,0.85)";
        ctx.lineWidth = 1.2;
        for (let k = 0; k < explored; k++) {
          for (const v of frontierAdds[k] || []) {
            if (closedSet.has(v)) continue;
            ctx.strokeRect((v % COLS) * cell + 2.5, Math.floor(v / COLS) * cell + 2.5, cell - 5, cell - 5);
          }
        }
      }
      // path
      if (pathShown > 1) {
        ctx.save();
        ctx.strokeStyle = "#e8ebf2";
        ctx.lineWidth = Math.max(2, cell * 0.16);
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.shadowColor = "#8e9bff";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(cx(path[0]), cy(path[0]));
        for (let k = 1; k < pathShown; k++) ctx.lineTo(cx(path[k]), cy(path[k]));
        ctx.stroke();
        ctx.restore();
      }
      // endpoints
      const mark = (i, label, fill, ink) => {
        const r = cell * 0.42;
        ctx.fillStyle = fill;
        ctx.beginPath();
        if (label === "R") ctx.roundRect(cx(i) - r, cy(i) - r, r * 2, r * 2, 3);
        else ctx.arc(cx(i), cy(i), r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = ink;
        ctx.font = `600 ${Math.max(9, cell * 0.48)}px ${fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, cx(i), cy(i) + 0.5);
      };
      mark(start, "R", "#ffb547", "#0b0d13");
      mark(goal, "C", "#8e9bff", "#0b0d13");

      // rider
      if (phase === "ride" || phase === "hold") {
        const f = Math.min(rider, path.length - 1);
        const a = Math.floor(f);
        const b = Math.min(path.length - 1, a + 1);
        const t = f - a;
        const x = cx(path[a]) + (cx(path[b]) - cx(path[a])) * t;
        const y = cy(path[a]) + (cy(path[b]) - cy(path[a])) * t;
        ctx.fillStyle = "#ffb547";
        ctx.beginPath();
        ctx.arc(x, y, Math.max(3.5, cell * 0.22) * (1 + 0.15 * Math.sin(now * 0.02)), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const newCity = () => {
      city = makeCity(Math.floor(Math.random() * 1e6));
      explored = 0;
      pathShown = 0;
      rider = 0;
      phase = "search";
      phaseAt = performance.now();
      setInfo({ explored: 0, cost: null, len: null });
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (phase === "search") {
        explored = Math.min(city.order.length, explored + 2);
        if (explored % 6 === 0) setInfo((s) => ({ ...s, explored }));
        if (explored === city.order.length) {
          phase = "path";
          setInfo({ explored, cost: city.total, len: city.path.length - 1 });
        }
      } else if (phase === "path") {
        pathShown = Math.min(city.path.length, pathShown + 1);
        if (pathShown === city.path.length) {
          phase = "ride";
        }
      } else if (phase === "ride") {
        rider += 0.22;
        if (rider >= city.path.length - 1) {
          phase = "hold";
          phaseAt = now;
        }
      } else if (phase === "hold" && now - phaseAt > 1600) {
        newCity();
      }
      draw(now);
    };

    size();
    const ro = new ResizeObserver(() => {
      size();
      draw(performance.now());
    });
    ro.observe(wrap);

    if (reduced) {
      explored = city.order.length;
      pathShown = city.path.length;
      phase = "done";
      setInfo({ explored, cost: city.total, len: city.path.length - 1 });
      draw(0);
    } else if (inView) {
      raf = requestAnimationFrame(frame);
    } else {
      draw(0);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [inView, reduced]);

  return (
    <figure className="grid" ref={viewRef}>
      <div ref={wrapRef} className="grid__box">
        <canvas ref={canvasRef} role="img" aria-label="A-star search finding a delivery route on a city grid with traffic" />
      </div>
      <figcaption className="grid__cap">
        <span>
          <span className="sw sw--r">R</span> restaurant → <span className="sw sw--c">C</span> customer
        </span>
        <span>
          explored <b>{info.explored}</b>
        </span>
        <span>
          route <b>{info.len ?? "…"}</b> blocks · cost <b>{info.cost ?? "…"}</b>
        </span>
        <span className="dim">
          <span className="sw sw--t" /> traffic ×{TRAFFIC}
        </span>
      </figcaption>
    </figure>
  );
}
