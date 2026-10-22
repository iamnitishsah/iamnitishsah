"use client";

import { useState } from "react";

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <div className="mail">
      <a className="mail__addr" href={`mailto:${email}`}>
        {email}
      </a>
      <button type="button" className="chip-btn" onClick={copy} aria-live="polite">
        {copied ? "copied ✓" : "copy"}
      </button>
    </div>
  );
}
