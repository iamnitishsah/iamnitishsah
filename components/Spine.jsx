"use client";

import { useEffect, useState } from "react";

// The page is a path through a graph: each section is a vertex.
// Visited vertices turn periwinkle, the current one is the amber frontier,
// and edges fill as you scroll between them.
export default function Spine({ sections }) {
  const [state, setState] = useState({ active: 0, fill: sections.map(() => 0) });

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const mid = window.scrollY + window.innerHeight * 0.4;
      const tops = sections.map(({ id }) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      let active = 0;
      tops.forEach((t, i) => {
        if (mid >= t) active = i;
      });
      const fill = tops.map((t, i) => {
        const next = tops[i + 1];
        if (next == null) return 0;
        return Math.min(1, Math.max(0, (mid - t) / (next - t)));
      });
      setState({ active, fill });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [sections]);

  return (
    <>
      <nav className="spine" aria-label="Sections">
        <ol>
          {sections.map((s, i) => {
            const st = i < state.active ? "done" : i === state.active ? "cur" : "";
            return (
              <li key={s.id} className={`spine__v ${st}`}>
                <a href={`#${s.id}`} aria-current={i === state.active ? "true" : undefined}>
                  <span className="spine__dot" />
                  <span className="spine__label">
                    <span className="spine__idx">v{i}</span> {s.label}
                  </span>
                </a>
                {i < sections.length - 1 && (
                  <span className="spine__edge" aria-hidden="true">
                    <span style={{ transform: `scaleY(${state.fill[i]})` }} />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* compact version for small screens */}
      <div className="spine-m" aria-hidden="true">
        {sections.map((s, i) => (
          <span
            key={s.id}
            className={i < state.active ? "done" : i === state.active ? "cur" : ""}
          />
        ))}
      </div>
    </>
  );
}
