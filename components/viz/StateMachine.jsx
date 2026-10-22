"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "../useInView";

// NorthStar's real goal lifecycle (GoalStatus enum) with the role allowed to make each move.

const S = {
  DRAFT: [78, 196],
  SUBMITTED: [262, 196],
  LOCKED: [478, 196],
  RETURNED: [372, 328],
  ADMIN_UNLOCKED: [372, 62],
};
const H = 30;
const halfW = (name) => (name.length * 7.3 + 26) / 2;

function clip([cx, cy], [tx, ty], name, gap = 4) {
  const dx = tx - cx;
  const dy = ty - cy;
  const t = Math.min(halfW(name) / Math.abs(dx || 1e-6), H / 2 / Math.abs(dy || 1e-6));
  const d = Math.hypot(dx, dy);
  return [cx + dx * t + (dx / d) * gap, cy + dy * t + (dy / d) * gap];
}

function edge(from, to, bend, actor, verb) {
  const a = S[from];
  const b = S[to];
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const d = Math.hypot(dx, dy);
  const ctrl = [mx + (-dy / d) * bend, my + (dx / d) * bend];
  const p0 = clip(a, ctrl, from);
  const p2 = clip(b, ctrl, to, 9);
  const lbl = [0.25 * p0[0] + 0.5 * ctrl[0] + 0.25 * p2[0], 0.25 * p0[1] + 0.5 * ctrl[1] + 0.25 * p2[1]];
  return {
    id: `${from}-${to}`,
    from,
    to,
    actor,
    verb,
    d: `M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} Q${ctrl[0].toFixed(1)} ${ctrl[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`,
    lbl,
  };
}

const EDGES = [
  edge("DRAFT", "SUBMITTED", 0.01, "employee", "submit"),
  edge("SUBMITTED", "LOCKED", 0.01, "manager", "approve"),
  edge("SUBMITTED", "RETURNED", -34, "manager", "return"),
  edge("RETURNED", "SUBMITTED", -34, "employee", "resubmit"),
  edge("LOCKED", "ADMIN_UNLOCKED", 50, "admin", "unlock"),
  edge("ADMIN_UNLOCKED", "SUBMITTED", 50, "employee", "resubmit"),
];
const byId = Object.fromEntries(EDGES.map((e) => [e.id, e]));

const SCRIPT = [
  "DRAFT-SUBMITTED",
  "SUBMITTED-RETURNED",
  "RETURNED-SUBMITTED",
  "SUBMITTED-LOCKED",
  "LOCKED-ADMIN_UNLOCKED",
  "ADMIN_UNLOCKED-SUBMITTED",
  "SUBMITTED-LOCKED",
];

export default function StateMachine() {
  const [viewRef, inView] = useInView({ threshold: 0.25 });
  const reduced = useReducedMotion();
  const pathRefs = useRef({});
  const tokenRef = useRef(null);
  const [cur, setCur] = useState({ state: "DRAFT", edge: null, log: [] });

  useEffect(() => {
    if (!inView || reduced) return;
    let step = 0;
    let phase = "move";
    let t0 = performance.now();
    let raf = 0;
    let clock = 9 * 3600 + 12 * 60;

    // token is only visible while travelling an edge; at rest the state itself glows
    const place = (x, y, visible = true) => {
      const tk = tokenRef.current;
      if (!tk) return;
      tk.setAttribute("transform", `translate(${x} ${y})`);
      tk.setAttribute("opacity", visible ? "1" : "0");
    };
    place(...S.DRAFT, false);
    setCur({ state: "DRAFT", edge: SCRIPT[0], log: [] });

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const id = SCRIPT[step];
      const e = byId[id];
      const el = pathRefs.current[id];
      if (phase === "move") {
        const t = Math.min(1, (now - t0) / 900);
        const ease = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        if (el) {
          const p = el.getPointAtLength(el.getTotalLength() * ease);
          place(p.x, p.y);
        }
        if (t >= 1) {
          place(...S[e.to], false);
          clock += 37 + Math.floor(Math.random() * 300);
          const hh = String(Math.floor(clock / 3600) % 24).padStart(2, "0");
          const mm = String(Math.floor(clock / 60) % 60).padStart(2, "0");
          const ss = String(clock % 60).padStart(2, "0");
          setCur((c) => ({
            state: e.to,
            edge: id,
            log: [{ k: `${now}`, ts: `${hh}:${mm}:${ss}`, actor: e.actor, from: e.from, to: e.to }, ...c.log].slice(0, 3),
          }));
          phase = "rest";
          t0 = now;
        }
      } else if (now - t0 > 650) {
        step++;
        if (step >= SCRIPT.length) {
          step = 0;
          place(...S.DRAFT, false);
          setCur((c) => ({ ...c, state: "DRAFT" }));
        }
        setCur((c) => ({ ...c, edge: SCRIPT[step] }));
        phase = "move";
        t0 = now;
      }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  return (
    <figure className="fsm" ref={viewRef}>
      <svg viewBox="0 0 560 380" role="img" aria-label="Goal lifecycle: draft, submitted, returned, locked, admin unlocked">
        <defs>
          <marker id="fsm-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="#465071" />
          </marker>
          <marker id="fsm-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="var(--frontier)" />
          </marker>
        </defs>

        {EDGES.map((e) => {
          const on = cur.edge === e.id;
          return (
            <g key={e.id} className={`fsm__edge ${on ? "on" : ""}`}>
              <path
                ref={(el) => (pathRefs.current[e.id] = el)}
                d={e.d}
                markerEnd={on ? "url(#fsm-b)" : "url(#fsm-a)"}
              />
              <text x={e.lbl[0]} y={e.lbl[1] - 7} textAnchor="middle">
                <tspan className="fsm__actor">{e.actor}</tspan> · {e.verb}
              </text>
            </g>
          );
        })}

        {Object.entries(S).map(([name, [x, y]]) => {
          const w = halfW(name) * 2;
          const on = cur.state === name;
          return (
            <g key={name} className={`fsm__state ${on ? "on" : ""} ${name === "LOCKED" ? "final" : ""}`}>
              <rect x={x - w / 2} y={y - H / 2} width={w} height={H} rx={H / 2} />
              <text x={x} y={y + 4} textAnchor="middle">
                {name}
              </text>
            </g>
          );
        })}

        <g ref={tokenRef} className="fsm__token" transform={`translate(${S.DRAFT[0]} ${S.DRAFT[1]})`}>
          <circle r="5" />
        </g>
      </svg>

      <figcaption className="fsm__log" aria-hidden="true">
        <span className="dim">audit_log</span>
        {cur.log.length === 0 && <span className="dim">· waiting for first transition</span>}
        {cur.log.map((l) => (
          <span key={l.k} className="fsm__row">
            <span className="dim">{l.ts}</span> <span className="fsm__who">{l.actor}</span> {l.from} → <b>{l.to}</b>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
