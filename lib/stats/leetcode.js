import { REVALIDATE_SECONDS, BROWSER_UA } from "./http";

const QUERY = `
query portfolio($username: String!) {
  allQuestionsCount { difficulty count }
  matchedUser(username: $username) {
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { streak totalActiveDays }
  }
  userContestRanking(username: $username) {
    rating attendedContestsCount topPercentage
  }
}`;

export async function fetchLeetCode(username) {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${username}/`,
      Origin: "https://leetcode.com",
      "User-Agent": BROWSER_UA,
    },
    body: JSON.stringify({ query: QUERY, variables: { username } }),
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`leetcode ${res.status}`);
  const { data } = await res.json();
  if (!data?.matchedUser) throw new Error("leetcode: user not found");

  const ac = Object.fromEntries(
    data.matchedUser.submitStatsGlobal.acSubmissionNum.map((d) => [d.difficulty, d.count])
  );
  const totals = Object.fromEntries(data.allQuestionsCount.map((d) => [d.difficulty, d.count]));
  const c = data.userContestRanking;

  return {
    solved: ac.All,
    easy: ac.Easy,
    medium: ac.Medium,
    hard: ac.Hard,
    totals: { easy: totals.Easy, medium: totals.Medium, hard: totals.Hard },
    // Contest rating only means something after a few rated contests.
    contest:
      c && c.attendedContestsCount >= 3
        ? { rating: Math.round(c.rating), attended: c.attendedContestsCount, top: c.topPercentage }
        : null,
    streak: data.matchedUser.userCalendar?.streak ?? null,
    activeDays: data.matchedUser.userCalendar?.totalActiveDays ?? null,
  };
}
