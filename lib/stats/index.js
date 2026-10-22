import { profile } from "@/data/profile";
import { snapshot, snapshotDate } from "@/data/snapshot";
import { fetchGitHub } from "./github";
import { fetchLeetCode } from "./leetcode";
import { fetchCodeforces } from "./codeforces";
import { fetchCodeChef } from "./codechef";

// Every platform is fetched independently; one failing never breaks the page.
export async function getStats() {
  const h = profile.handles;
  const jobs = {
    github: fetchGitHub(h.github),
    leetcode: fetchLeetCode(h.leetcode),
    codeforces: fetchCodeforces(h.codeforces),
    codechef: fetchCodeChef(h.codechef),
  };

  const keys = Object.keys(jobs);
  const results = await Promise.allSettled(Object.values(jobs));
  const out = { fetchedAt: new Date().toISOString(), snapshotDate };

  results.forEach((r, i) => {
    const key = keys[i];
    if (r.status === "fulfilled") {
      // Keep snapshot values for any field the live source couldn't fill.
      const live = Object.fromEntries(Object.entries(r.value).filter(([, v]) => v != null));
      out[key] = { ...snapshot[key], ...live, live: true };
    } else {
      if (process.env.NODE_ENV !== "production") console.warn(`[stats] ${key}:`, r.reason?.message);
      out[key] = { ...snapshot[key], live: false };
    }
  });

  return out;
}
