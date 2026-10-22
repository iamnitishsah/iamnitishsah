import { getJSON } from "./http";

const API = "https://codeforces.com/api";

export async function fetchCodeforces(handle) {
  const [info, rating] = await Promise.all([
    getJSON(`${API}/user.info?handles=${handle}`),
    getJSON(`${API}/user.rating?handle=${handle}`),
  ]);
  const u = info.result[0];

  let solved = null;
  try {
    const status = await getJSON(`${API}/user.status?handle=${handle}&from=1&count=10000`);
    const set = new Set();
    for (const s of status.result) {
      if (s.verdict === "OK" && s.problem) set.add(`${s.problem.contestId}-${s.problem.index}`);
    }
    solved = set.size;
  } catch {
    solved = null;
  }

  return {
    rating: u.rating,
    maxRating: u.maxRating,
    rank: u.rank,
    maxRank: u.maxRank,
    contests: rating.result.length,
    solved,
    history: rating.result.map((r) => [r.ratingUpdateTimeSeconds, r.newRating]),
  };
}
