"use client";

import { useEffect, useState } from "react";

// Relative time computed in the browser, so cached HTML never shows a stale "2 min ago".
export default function Ago({ iso, prefix = "" }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const update = () => setText(format(iso));
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, [iso]);
  return <span suppressHydrationWarning>{text ? `${prefix}${text}` : ""}</span>;
}

function format(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  const m = s / 60;
  if (m < 60) return `${Math.round(m)} min ago`;
  const h = m / 60;
  if (h < 24) return `${Math.round(h)}h ago`;
  const d = h / 24;
  if (d < 30) return `${Math.round(d)}d ago`;
  const mo = d / 30;
  if (mo < 12) return `${Math.round(mo)}mo ago`;
  return `${Math.round(mo / 12)}y ago`;
}
