"use client";

import { useEffect, useRef, useState } from "react";
import { graphNodes, graphEdges } from "@/data/graph";

const COL = {
  wire: "#2a3142",
  wireHi: "#465071",
  fog: "#8891a5",
  chalk: "#e8ebf2",
  visited: "#8e9bff",
  frontier: "#ffb547",
  ink: "#0b0d13",
};

const UNSEEN = 0;
const FRONTIER = 1;
const DONE = 2;

// ── graph model ─────────────────────────────────────────────
function buildGraph() {
  const index = new Map(graphNodes.map((n, i) => [n.id, i]));
  const adj = graphNodes.map(() => []);
  const edges = graphEdges.map(([a, b, w], k) => {
    const i = index.get(a);
    const j = index.get(b);
    adj[i].push({ to: j, w, e: k });
    adj[j].push({ to: i, w, e: k });
    return { a: i, b: j, w };
  });
  adj.forEach((list) => list.sort((x, y) => x.w - y.w || x.to - y.to));
  return { index, adj, edges, root: index.get("me") };
}

// ── traversals → step lists ─────────────────────────────────
function bfsSteps(G) {
  const steps = [];
  const seen = new Set([G.root]);
  const q = [G.root];
  steps.push({ t: "push", n: G.root, ds: [...q] });
  while (q.length) {
    const u = q.shift();
    steps.push({ t: "done", n: u, ds: [...q] });
    for (const { to, e } of G.adj[u]) {
      if (seen.has(to)) continue;
      seen.add(to);
      q.push(to);
      steps.push({ t: "push", n: to, e, tree: true, ds: [...q] });
    }
  }
  return steps;
}

function dfsSteps(G) {
  const steps = [];
  const seen = new Set();
  const stack = [];
  const go = (u, e) => {
    seen.add(u);
    stack.push(u);
    steps.push({ t: "push", n: u, e, tree: e != null, ds: [...stack] });
    for (const nb of G.adj[u]) if (!seen.has(nb.to)) go(nb.to, nb.e);
    stack.pop();
    steps.push({ t: "done", n: u, ds: [...stack] });
  };
  go(G.root, null);
  return steps;
}

function dijkstraSteps(G, target) {
  const n = graphNodes.length;
  const dist = Array(n).fill(Infinity);
  const prevE = Array(n).fill(null);
  const prevN = Array(n).fill(null);
  const done = new Set();
  const heap = [[0, G.root]];
  dist[G.root] = 0;
  const steps = [{ t: "push", n: G.root, ds: [G.root], dist: 0 }];
  const snap = () =>
    [...heap]
      .filter(([d, v]) => !done.has(v) && d === dist[v])
      .sort((a, b) => a[0] - b[0])
      .map(([d, v]) => ({ v, d }));

  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [d, u] = heap.shift();
    if (done.has(u)) continue;
    done.add(u);
    steps.push({ t: "done", n: u, e: prevE[u], tree: prevE[u] != null, ds: snap(), dist: d });
    if (u === target) break;
    for (const { to, w, e } of G.adj[u]) {
      if (done.has(to)) continue;
      const nd = d + w;
      if (nd < dist[to]) {
        dist[to] = nd;
        prevE[to] = e;
        prevN[to] = u;
        heap.push([nd, to]);
        steps.push({ t: "push", n: to, e, flash: true, ds: snap(), dist: nd });
      }
    }
  }
  const pathE = [];
  const pathN = [target];
  for (let v = target; prevN[v] != null; v = prevN[v]) {
    pathE.push(prevE[v]);
    pathN.push(prevN[v]);
  }
  steps.push({ t: "path", edges: pathE, nodes: pathN, dist: dist[target], target });
  return steps;
}

// ── component ───────────────────────────────────────────────
const MODES = {
  bfs: { label: "BFS", ds: "queue" },
  dfs: { label: "DFS", ds: "call stack" },
  dijkstra: { label: "Dijkstra", ds: "min-heap" },
};

export default function HeroGraph({ photo }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const apiRef = useRef(null);
  const [readout, setReadout] = useState({
    mode: "bfs",
    ds: [],
    visited: 0,
    total: graphNodes.length,
    result: null,
  });

  useEffect(() => {
    const G = buildGraph();
    const N = graphNodes.length;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fontFamily =
      getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() || "monospace";

    const img = new Image();
    img.src = photo;

    // physics state
    const P = graphNodes.map((n, i) => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      phase: i * 1.7,
      type: n.type || "leaf",
      pinned: false,
    }));
    let W = 0;
    let H = 0;
    let scale = 1;
    let anchor = { x: 0, y: 0 };
    let bounds = { l: 0, r: 0, t: 0, b: 0 };
    let compact = false;

    // traversal state
    const nodeState = new Uint8Array(N);
    const edgeState = new Uint8Array(G.edges.length); // 0 none, 1 tree, 2 path
    let flashEdge = null;
    let pathNodes = new Set();
    let steps = [];
    let stepIdx = 0;
    let mode = "bfs";
    let lastStepAt = 0;
    let finishedAt = 0;
    let userUntil = 0;
    let cycle = 0;
    let hover = -1;
    let drag = null;
    let running = true;
    let raf = 0;

    const restLen = (e) => {
      const ta = P[e.a].type;
      const tb = P[e.b].type;
      if (ta === "root" || tb === "root") return 132;
      if ((ta === "hub" && tb !== "hub") || (tb === "hub" && ta !== "hub")) return 74;
      return 118;
    };

    function layout() {
      const rect = wrap.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      compact = W < 900;
      if (compact) {
        scale = Math.max(0.5, Math.min(W / 640, H / 520));
        anchor = { x: W / 2, y: H / 2 };
        bounds = { l: 18, r: W - 18, t: 22, b: H - 18 };
      } else {
        const textEdge = Math.min(W * 0.44, 620);
        scale = Math.max(0.72, Math.min((W - textEdge) / 640, H / 640, 1.15));
        anchor = { x: textEdge + (W - textEdge) * 0.52, y: H * 0.5 };
        bounds = { l: textEdge + 10, r: W - 30, t: 90, b: H - 110 };
      }
      // seed positions on rings, then settle
      graphNodes.forEach((n, i) => {
        const p = P[i];
        const ring = p.type === "root" ? 0 : p.type === "hub" ? 1 : 2;
        const a = (i / N) * Math.PI * 2;
        p.x = anchor.x + Math.cos(a) * ring * 90 * scale;
        p.y = anchor.y + Math.sin(a) * ring * 90 * scale;
        p.vx = p.vy = 0;
      });
      for (let k = 0; k < 500; k++) tick(1);
    }

    function tick(alpha) {
      const rep = 2600 * scale * scale;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = P[i];
          const b = P[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) {
            dx = Math.random() - 0.5;
            dy = Math.random() - 0.5;
            d2 = 1;
          }
          const f = rep / d2;
          const d = Math.sqrt(d2);
          const fx = (dx / d) * f;
          const fy = (dy / d) * f;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
      }
      for (const e of G.edges) {
        const a = P[e.a];
        const b = P[e.b];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.max(1, Math.hypot(dx, dy));
        const k = ((d - restLen(e) * scale) / d) * 0.05;
        a.vx += dx * k;
        a.vy += dy * k;
        b.vx -= dx * k;
        b.vy -= dy * k;
      }
      for (let i = 0; i < N; i++) {
        const p = P[i];
        if (p.type === "root" || p.pinned) {
          if (p.type === "root" && !p.pinned) {
            p.x = anchor.x;
            p.y = anchor.y;
          }
          p.vx = p.vy = 0;
          continue;
        }
        p.vx += (anchor.x - p.x) * 0.004;
        p.vy += (anchor.y - p.y) * 0.004;
        if (p.x < bounds.l) p.vx += (bounds.l - p.x) * 0.08;
        if (p.x > bounds.r) p.vx -= (p.x - bounds.r) * 0.08;
        if (p.y < bounds.t) p.vy += (bounds.t - p.y) * 0.08;
        if (p.y > bounds.b) p.vy -= (p.y - bounds.b) * 0.08;
        p.vx *= 0.78;
        p.vy *= 0.78;
        p.x += p.vx * alpha;
        p.y += p.vy * alpha;
      }
    }

    // ── traversal control ──
    function start(nextMode, target) {
      mode = nextMode;
      nodeState.fill(UNSEEN);
      edgeState.fill(0);
      flashEdge = null;
      pathNodes = new Set();
      steps =
        mode === "bfs" ? bfsSteps(G) : mode === "dfs" ? dfsSteps(G) : dijkstraSteps(G, target);
      stepIdx = 0;
      finishedAt = 0;
      setReadout({ mode, ds: [], visited: 0, total: N, result: null, target: mode === "dijkstra" ? target : null });
      if (reduced) {
        while (stepIdx < steps.length) applyStep(steps[stepIdx++], true);
        finishedAt = performance.now();
        pushReadout(steps[steps.length - 1]);
      }
    }

    function applyStep(s, silent) {
      flashEdge = null;
      if (s.t === "push") {
        nodeState[s.n] = FRONTIER;
        if (s.e != null) {
          if (s.tree) edgeState[s.e] = 1;
          if (s.flash) flashEdge = s.e;
        }
      } else if (s.t === "done") {
        nodeState[s.n] = DONE;
        if (s.tree && s.e != null) edgeState[s.e] = 1;
      } else if (s.t === "path") {
        for (const e of s.edges) edgeState[e] = 2;
        pathNodes = new Set(s.nodes);
      }
      if (!silent) pushReadout(s);
    }

    function pushReadout(s) {
      let visited = 0;
      for (let i = 0; i < N; i++) if (nodeState[i] === DONE) visited++;
      const ds = (s.ds || []).map((x) =>
        typeof x === "number" ? graphNodes[x].label : `${graphNodes[x.v].label}:${x.d}`
      );
      setReadout((r) => ({
        ...r,
        mode,
        ds: s.t === "path" ? r.ds : ds,
        visited,
        result:
          s.t === "path"
            ? { dist: s.dist, hops: s.edges.length, to: graphNodes[s.target].label }
            : r.result,
      }));
    }

    const projectIds = graphNodes.map((n, i) => (n.type === "project" ? i : -1)).filter((i) => i >= 0);
    function autoNext() {
      cycle++;
      const order = ["bfs", "dfs", "dijkstra"];
      const m = order[cycle % order.length];
      start(m, projectIds[Math.floor(Math.random() * projectIds.length)]);
    }

    // ── drawing ──
    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      const wob = (i, axis) =>
        reduced || drag?.i === i ? 0 : Math.sin(now * 0.0007 + P[i].phase + (axis ? 1.3 : 0)) * 2.2;
      const X = (i) => P[i].x + wob(i, 0);
      const Y = (i) => P[i].y + wob(i, 1);

      // edges
      G.edges.forEach((e, k) => {
        const st = edgeState[k];
        const isHover = hover >= 0 && (e.a === hover || e.b === hover);
        ctx.beginPath();
        ctx.moveTo(X(e.a), Y(e.a));
        ctx.lineTo(X(e.b), Y(e.b));
        if (st === 2) {
          ctx.strokeStyle = COL.chalk;
          ctx.lineWidth = 2.6;
          ctx.shadowColor = COL.visited;
          ctx.shadowBlur = 14;
        } else if (k === flashEdge) {
          ctx.strokeStyle = COL.frontier;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 0;
        } else if (st === 1) {
          ctx.strokeStyle = "rgba(142,155,255,0.75)";
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = isHover ? COL.wireHi : COL.wire;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (mode === "dijkstra" && (st === 2 || k === flashEdge || isHover)) {
          const mx = (X(e.a) + X(e.b)) / 2;
          const my = (Y(e.a) + Y(e.b)) / 2;
          ctx.font = `10px ${fontFamily}`;
          ctx.fillStyle = COL.ink;
          ctx.fillRect(mx - 7, my - 7, 14, 14);
          ctx.fillStyle = st === 2 ? COL.chalk : COL.frontier;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(String(e.w), mx, my + 0.5);
        }
      });

      // nodes
      for (let i = 0; i < N; i++) {
        const n = graphNodes[i];
        const p = P[i];
        const x = X(i);
        const y = Y(i);
        const st = nodeState[i];
        const onPath = pathNodes.has(i);
        const isHover = i === hover;
        const pulse = st === FRONTIER && !reduced ? 1 + Math.sin(now * 0.012) * 0.18 : 1;

        if (p.type === "root") {
          const r = (compact ? 26 : 34) * Math.max(scale, 0.8);
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, r + 7, 0, Math.PI * 2);
          ctx.strokeStyle = st === DONE ? COL.visited : st === FRONTIER ? COL.frontier : COL.wire;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 4]);
          ctx.lineDashOffset = reduced ? 0 : -now * 0.01;
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = "#151924";
          ctx.fill();
          ctx.clip();
          if (img.complete && img.naturalWidth) ctx.drawImage(img, x - r, y - r, r * 2, r * 2);
          ctx.restore();
          continue;
        }

        const base = p.type === "hub" ? 7.5 : p.type === "project" ? 6.5 : 4.5;
        const r = base * (isHover ? 1.35 : 1) * pulse;
        const fill =
          st === DONE ? COL.visited : st === FRONTIER ? COL.ink : COL.ink;
        const stroke =
          onPath ? COL.chalk : st === DONE ? COL.visited : st === FRONTIER ? COL.frontier : isHover ? COL.fog : "#3a4257";

        if (onPath) {
          ctx.shadowColor = COL.visited;
          ctx.shadowBlur = 18;
        }
        ctx.beginPath();
        if (p.type === "project") {
          const s = r * 1.15;
          ctx.rect(x - s, y - s, s * 2, s * 2);
        } else {
          ctx.arc(x, y, r, 0, Math.PI * 2);
        }
        ctx.fillStyle = onPath ? COL.chalk : fill;
        ctx.fill();
        ctx.lineWidth = st === FRONTIER ? 2 : 1.4;
        ctx.strokeStyle = stroke;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // labels
        const showLabel =
          !compact || p.type !== "leaf" || st === FRONTIER || onPath || isHover;
        if (showLabel) {
          const size = p.type === "hub" ? 12 : 11;
          ctx.font = `${p.type === "hub" ? 500 : 400} ${compact ? size - 1 : size}px ${fontFamily}`;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillStyle =
            onPath || isHover
              ? COL.chalk
              : st === FRONTIER
              ? COL.frontier
              : p.type === "hub" || p.type === "project"
              ? "#c3c8d4"
              : COL.fog;
          ctx.fillText(n.label, x + r + 6, y);
        }
      }
    }

    // ── loop ──
    function frame(now) {
      raf = requestAnimationFrame(frame);
      if (!running) return;
      tick(0.6);

      if (!reduced) {
        const delay = mode === "dijkstra" ? 170 : 105;
        if (stepIdx < steps.length && now - lastStepAt > delay) {
          applyStep(steps[stepIdx++]);
          lastStepAt = now;
          if (stepIdx === steps.length) finishedAt = now;
        }
        if (finishedAt && now - finishedAt > 2600 && now > userUntil) {
          finishedAt = 0;
          autoNext();
        }
      }
      draw(now);
    }

    // ── interaction ──
    function pick(ev) {
      const rect = canvas.getBoundingClientRect();
      const mx = ev.clientX - rect.left;
      const my = ev.clientY - rect.top;
      let best = -1;
      let bestD = 22;
      for (let i = 0; i < N; i++) {
        const d = Math.hypot(P[i].x - mx, P[i].y - my);
        const lim = P[i].type === "root" ? 40 : 18;
        if (d < lim && d < bestD + (P[i].type === "root" ? 20 : 0)) {
          best = i;
          bestD = d;
        }
      }
      return { i: best, mx, my };
    }

    function onDown(ev) {
      const { i, mx, my } = pick(ev);
      if (i < 0) return;
      drag = { i, sx: mx, sy: my, moved: false };
      P[i].pinned = true;
      canvas.setPointerCapture(ev.pointerId);
    }
    function onMove(ev) {
      const { i, mx, my } = pick(ev);
      if (drag) {
        if (Math.hypot(mx - drag.sx, my - drag.sy) > 4) drag.moved = true;
        if (drag.moved) {
          P[drag.i].x = mx;
          P[drag.i].y = my;
          if (P[drag.i].type === "root") {
            anchor.x = mx;
            anchor.y = my;
          }
        }
        return;
      }
      hover = i;
      canvas.style.cursor = i >= 0 ? "pointer" : "default";
    }
    function onUp(ev) {
      if (!drag) return;
      const { i, moved } = drag;
      P[i].pinned = false;
      drag = null;
      canvas.releasePointerCapture?.(ev.pointerId);
      if (!moved) {
        userUntil = performance.now() + 9000;
        if (i === G.root) start("bfs");
        else start("dijkstra", i);
      }
    }
    function onLeave() {
      hover = -1;
    }

    apiRef.current = {
      run: (m) => {
        userUntil = performance.now() + 9000;
        if (m === "dijkstra") {
          start("dijkstra", projectIds[Math.floor(Math.random() * projectIds.length)]);
        } else start(m);
      },
    };

    layout();
    start("bfs");
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(() => layout());
    ro.observe(wrap);
    const io = new IntersectionObserver(([en]) => (running = en.isIntersecting), { threshold: 0.01 });
    io.observe(wrap);
    const onVis = () => (running = document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [photo]);

  const m = MODES[readout.mode];
  const shown = readout.ds.slice(0, 5);
  const more = readout.ds.length - shown.length;

  return (
    <div className="hg">
      <div className="hg__canvas" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Interactive graph of Nitish's skills and projects. Click a node to see the shortest path from the root."
        />
      </div>

      <div className="hg__panel">
        <div className="hg__modes" role="group" aria-label="Traversal algorithm">
          {Object.entries(MODES).map(([key, v]) => (
            <button
              key={key}
              type="button"
              className="chip-btn"
              aria-pressed={readout.mode === key}
              onClick={() => apiRef.current?.run(key)}
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="hg__readout" aria-live="off">
          {readout.result && readout.mode === "dijkstra" ? (
            <span>
              <span className="k">dist</span>(nitish → <b>{readout.result.to}</b>) ={" "}
              <b className="hi">{readout.result.dist}</b>
              <span className="dim"> · {readout.result.hops} hops</span>
            </span>
          ) : (
            <span className="hg__ds">
              <span className="k">{m.ds}</span>
              <span className="br">[</span>
              {shown.map((s, i) => (
                <span key={`${s}-${i}`} className="hg__item">
                  {s}
                </span>
              ))}
              {more > 0 && <span className="dim">+{more}</span>}
              <span className="br">]</span>
            </span>
          )}
          <span className="hg__count">
            visited <b>{readout.visited}</b>/{readout.total}
          </span>
        </div>
        <p className="hg__hint">click a node → shortest path · drag to rearrange</p>
      </div>
    </div>
  );
}
