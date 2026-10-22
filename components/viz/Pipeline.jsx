"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "../useInView";

// The Saptang OTP pipeline: API returns 202 immediately, Redis queues the job,
// a Celery worker sends via SMTP, failures retry with exponential backoff.

const LAYOUTS = {
  wide: {
    vb: "0 0 960 290",
    n: {
      api: [90, 180],
      queue: [305, 180],
      worker: [525, 180],
      smtp: [735, 180],
      inbox: [895, 180],
    },
    qDir: [1, 0],
    retry: { from: [735, 148], ctrl: [630, 30], to: [525, 148], label: [630, 70] },
    flash: [90, 128],
  },
  tall: {
    vb: "0 0 360 700",
    n: {
      api: [140, 60],
      queue: [140, 215],
      worker: [140, 380],
      smtp: [140, 540],
      inbox: [140, 660],
    },
    qDir: [0, 1],
    retry: { from: [178, 540], ctrl: [330, 460], to: [178, 380], label: [262, 462] },
    flash: [214, 60],
  },
};

const NODES = [
  { key: "api", label: "FastAPI", sub: "POST /auth/otp" },
  { key: "queue", label: "Redis", sub: "queue" },
  { key: "worker", label: "Celery", sub: "worker" },
  { key: "smtp", label: "SMTP", sub: "send" },
  { key: "inbox", label: "Inbox", sub: "delivered" },
];

const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const quad = (p0, p1, p2, t) => {
  const u = 1 - t;
  return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
};

export default function Pipeline() {
  const boxRef = useRef(null);
  const layerRef = useRef(null);
  const flashRef = useRef(null);
  const [viewRef, inView] = useInView({ threshold: 0.2 });
  const reduced = useReducedMotion();
  const [kind, setKind] = useState("wide");
  const [count, setCount] = useState({ sent: 0, retried: 0 });

  useEffect(() => {
    const el = boxRef.current;
    const ro = new ResizeObserver(([e]) => setKind(e.contentRect.width < 620 ? "tall" : "wide"));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;
    const L = LAYOUTS[kind];
    const layer = layerRef.current;
    const NS = "http://www.w3.org/2000/svg";
    const packets = [];
    let raf = 0;
    let last = performance.now();
    let spawnT = 0;
    let dequeueT = 0;
    let sent = 0;
    let retried = 0;

    const qSlot = (i) => [
      L.n.queue[0] - 30 * L.qDir[0] + i * 15 * L.qDir[0],
      L.n.queue[1] - 30 * L.qDir[1] + i * 15 * L.qDir[1],
    ];

    const spawn = () => {
      const el = document.createElementNS(NS, "circle");
      el.setAttribute("r", "5.5");
      el.setAttribute("class", "pk");
      layer.appendChild(el);
      packets.push({ el, phase: "toQueue", t: 0, attempt: 0, wait: 0 });
      const f = flashRef.current;
      if (f) {
        f.classList.remove("on");
        void f.getBoundingClientRect();
        f.classList.add("on");
      }
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(48, now - last);
      last = now;
      spawnT += dt;
      dequeueT += dt;
      if (spawnT > 950) {
        spawnT = 0;
        spawn();
      }
      const queued = packets.filter((p) => p.phase === "queued");
      if (dequeueT > 820 && queued.length) {
        dequeueT = 0;
        queued[0].phase = "toWorker";
        queued[0].t = 0;
      }

      const speed = dt / 700;
      let qi = 0;
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        let pos;
        switch (p.phase) {
          case "toQueue":
            p.t += speed;
            pos = lerp(L.n.api, qSlot(4), Math.min(1, p.t));
            if (p.t >= 1) p.phase = "queued";
            break;
          case "queued":
            pos = null;
            break;
          case "toWorker":
            p.t += speed * 1.3;
            pos = lerp(qSlot(0), L.n.worker, Math.min(1, p.t));
            if (p.t >= 1) {
              p.phase = "toSmtp";
              p.t = 0;
            }
            break;
          case "toSmtp":
            p.t += speed;
            pos = lerp(L.n.worker, L.n.smtp, Math.min(1, p.t));
            if (p.t >= 1) {
              const fail = p.attempt < 2 && Math.random() < 0.28;
              p.t = 0;
              if (fail) {
                p.phase = "retry";
                p.el.setAttribute("class", "pk pk--retry");
                retried++;
                setCount({ sent, retried });
              } else {
                p.phase = "toInbox";
                p.el.setAttribute("class", "pk pk--ok");
              }
            }
            break;
          case "retry":
            p.t += speed * 0.9;
            pos = quad(L.retry.from, L.retry.ctrl, L.retry.to, Math.min(1, p.t));
            if (p.t >= 1) {
              p.attempt++;
              p.phase = "backoff";
              p.wait = 260 * 2 ** p.attempt;
            }
            break;
          case "backoff":
            p.wait -= dt;
            // parked beside the worker while it backs off
            pos = L.qDir[0] ? [L.n.worker[0], L.n.worker[1] - 40] : [L.n.worker[0] + 58, L.n.worker[1]];
            if (p.wait <= 0) {
              p.phase = "toSmtp";
              p.t = 0;
            }
            break;
          case "toInbox":
            p.t += speed;
            pos = lerp(L.n.smtp, L.n.inbox, Math.min(1, p.t));
            if (p.t >= 1) {
              p.el.remove();
              packets.splice(k, 1);
              sent++;
              setCount({ sent, retried });
              continue;
            }
            break;
          default:
            break;
        }
        if (pos) {
          p.el.setAttribute("cx", pos[0].toFixed(1));
          p.el.setAttribute("cy", pos[1].toFixed(1));
        }
      }
      // queued packets sit in FIFO slots inside the Redis box
      packets
        .filter((p) => p.phase === "queued")
        .reverse()
        .forEach((p) => {
          const s = qSlot(Math.min(qi++, 4));
          p.el.setAttribute("cx", s[0]);
          p.el.setAttribute("cy", s[1]);
        });
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      layer.replaceChildren();
    };
  }, [inView, reduced, kind]);

  const L = LAYOUTS[kind];
  const order = ["api", "queue", "worker", "smtp", "inbox"];
  const r = L.retry;

  return (
    <figure className="pipe" ref={viewRef}>
      <div ref={boxRef} className="pipe__box">
        <svg viewBox={L.vb} role="img" aria-label="OTP pipeline: FastAPI to Redis queue to Celery worker to SMTP, with exponential retry">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="pipe__arrowhead" />
            </marker>
            <marker id="arr-amb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--frontier)" />
            </marker>
          </defs>

          {order.slice(0, -1).map((k, i) => {
            const a = L.n[k];
            const b = L.n[order[i + 1]];
            const pad = 44;
            const dx = b[0] - a[0];
            const dy = b[1] - a[1];
            const d = Math.hypot(dx, dy);
            return (
              <line
                key={k}
                x1={a[0] + (dx / d) * pad}
                y1={a[1] + (dy / d) * pad}
                x2={b[0] - (dx / d) * pad}
                y2={b[1] - (dy / d) * pad}
                className="pipe__edge"
                markerEnd="url(#arr)"
              />
            );
          })}

          <path
            d={`M${r.from[0]} ${r.from[1]} Q${r.ctrl[0]} ${r.ctrl[1]} ${r.to[0]} ${r.to[1]}`}
            className="pipe__retry"
            markerEnd="url(#arr-amb)"
          />
          <text x={r.label[0]} y={r.label[1]} className="pipe__retrylabel" textAnchor="middle">
            retry ×3 · 2ⁿ backoff
          </text>

          {NODES.map(({ key, label, sub }) => {
            const [x, y] = L.n[key];
            const isQueue = key === "queue";
            const w = isQueue ? (L.qDir[0] ? 96 : 64) : 84;
            const h = isQueue ? (L.qDir[0] ? 52 : 96) : 52;
            return (
              <g key={key} className={`pipe__node pipe__node--${key}`}>
                <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={isQueue ? 6 : 26} />
                {!isQueue && (
                  <>
                    <text x={x} y={y - 2} textAnchor="middle" className="pipe__label">
                      {label}
                    </text>
                    <text x={x} y={y + 13} textAnchor="middle" className="pipe__sub">
                      {sub}
                    </text>
                  </>
                )}
                {isQueue && (
                  <text
                    x={L.qDir[0] ? x : x - 46}
                    y={L.qDir[0] ? y + h / 2 + 18 : y}
                    textAnchor={L.qDir[0] ? "middle" : "end"}
                    className="pipe__sub"
                  >
                    redis queue
                  </text>
                )}
              </g>
            );
          })}

          <text ref={flashRef} x={L.flash[0]} y={L.flash[1]} textAnchor="middle" className="pipe__flash">
            202 Accepted
          </text>

          <g ref={layerRef} />
        </svg>
      </div>
      <figcaption className="pipe__cap">
        <span>
          <span className="dot dot--ok" /> delivered <b>{count.sent}</b>
        </span>
        <span>
          <span className="dot dot--retry" /> retried <b>{count.retried}</b>
        </span>
        <span className="dim">API never waits on SMTP</span>
      </figcaption>
    </figure>
  );
}
