import { getText, BROWSER_UA } from "./http";

// CodeChef has no public API, so this reads the profile page.
// If they change their markup this throws and the snapshot is used instead.
export async function fetchCodeChef(handle) {
  const html = await getText(`https://www.codechef.com/users/${handle}`, {
    headers: { "User-Agent": BROWSER_UA },
  });

  let history = null;
  const hist = html.match(/var\s+all_rating\s*=\s*(\[[\s\S]*?\]);/);
  if (hist) {
    try {
      history = JSON.parse(hist[1])
        .map((r) => [Math.floor(new Date(r.end_date.replace(" ", "T")).getTime() / 1000), Number(r.rating)])
        .filter(([t, r]) => Number.isFinite(t) && Number.isFinite(r));
    } catch {
      history = null;
    }
  }

  const current = num(html.match(/class="rating-number"[^>]*>\s*(\d+)/));
  const highest =
    num(html.match(/Highest Rating\s*(\d+)/i)) ??
    (history?.length ? Math.max(...history.map((h) => h[1])) : null);
  const solved = num(html.match(/Total Problems Solved:\s*(\d+)/i));
  const contests =
    num(html.match(/Contests Participated:?\s*(?:<[^>]+>\s*)*(\d+)/i)) ?? history?.length ?? null;

  if (!current || !highest) throw new Error("codechef: markup changed");

  return { rating: current, maxRating: highest, contests, solved, history };
}

function num(m) {
  return m ? Number(m[1]) : null;
}
