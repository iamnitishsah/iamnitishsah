// Shared fetch helper: hourly cache on Vercel, hard timeout, throws on non-2xx.
export const REVALIDATE_SECONDS = 3600;

export async function getJSON(url, init = {}) {
  const res = await fetch(url, {
    ...init,
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

export async function getText(url, init = {}) {
  const res = await fetch(url, {
    ...init,
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

export const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
