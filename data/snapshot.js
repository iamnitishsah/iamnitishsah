// Fallback numbers, used only when a platform's live fetch fails
// (rate limit, platform down, blocked IP). Taken from the public profiles
// on 22 Oct 2026. The site marks any card showing these as "snapshot".

export const snapshotDate = "2026-10-22";

export const snapshot = {
  github: {
    publicRepos: 16,
    stars: 10,
    followers: 3,
    languages: [
      { name: "TypeScript", count: 4 },
      { name: "Python", count: 4 },
      { name: "Jupyter Notebook", count: 4 },
      { name: "JavaScript", count: 2 },
      { name: "C++", count: 1 },
    ],
    recent: [
      { name: "DSA", description: "", language: "C++", url: "https://github.com/iamnitishsah/DSA", homepage: "", pushedAt: "2026-10-19T21:56:14Z", stars: 0 },
      { name: "NITR-Mart", description: "Campus Marketplace", language: "TypeScript", url: "https://github.com/iamnitishsah/NITR-Mart", homepage: "https://nitrmart.vercel.app", pushedAt: "2026-10-19T20:12:46Z", stars: 1 },
      { name: "FundFlow", description: "Bank reconciliation, investor payment matching and capital-call funding tracking", language: "Python", url: "https://github.com/iamnitishsah/FundFlow", homepage: "", pushedAt: "2026-10-15T21:30:56Z", stars: 0 },
      { name: "DeepLearning", description: "", language: "Jupyter Notebook", url: "https://github.com/iamnitishsah/DeepLearning", homepage: "", pushedAt: "2026-08-20T09:13:14Z", stars: 0 },
      { name: "MetaFin", description: "Your intelligent, jargon-free investment companion", language: "TypeScript", url: "https://github.com/iamnitishsah/MetaFin", homepage: "", pushedAt: "2026-08-07T02:48:19Z", stars: 1 },
      { name: "ArogyAI", description: "Prediction-first lifetime health intelligence platform", language: "JavaScript", url: "https://github.com/iamnitishsah/ArogyAI", homepage: "", pushedAt: "2026-08-06T17:45:02Z", stars: 1 },
    ],
    contributions: null,
  },
  leetcode: {
    solved: 334,
    easy: 160,
    medium: 152,
    hard: 22,
    totals: null,
    contest: null,
    streak: null,
    activeDays: null,
  },
  codeforces: {
    rating: 1306,
    maxRating: 1452,
    rank: "pupil",
    maxRank: "specialist",
    contests: 26,
    solved: null,
    history: [
      [1717433400, 351], [1718125500, 620], [1719162300, 790], [1720716600, 868],
      [1722357300, 893], [1722963600, 934], [1725209400, 929], [1726938000, 914],
      [1733417400, 867], [1734281400, 910], [1734886200, 976], [1737306300, 972],
      [1748278200, 1014], [1750179000, 1008], [1751388600, 967], [1757263800, 932],
      [1768236600, 979], [1779381300, 965], [1782838200, 1034], [1784222100, 1357],
      [1784392500, 1452], [1785603900, 1415], [1785862200, 1354], [1786034100, 1435],
      [1786295100, 1375], [1789234500, 1306],
    ],
  },
  codechef: {
    rating: 1575,
    maxRating: 1628,
    contests: 20,
    solved: 100,
    history: null,
  },
};
