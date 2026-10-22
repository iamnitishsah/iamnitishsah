import { getJSON, REVALIDATE_SECONDS } from "./http";

const API = "https://api.github.com";

function headers() {
  const h = { "User-Agent": "iamnitishsah-portfolio", Accept: "application/vnd.github+json" };
  // Optional: a fine-grained token with no scopes lifts the rate limit from 60 to 5000/hr
  // and unlocks the contribution calendar straight from GitHub.
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

async function contributionsViaGraphQL(user) {
  const query = `query($login:String!){ user(login:$login){ contributionsCollection { contributionCalendar {
    totalContributions weeks { contributionDays { date contributionCount } } } } } }`;
  const res = await fetch(`${API}/graphql`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: user } }),
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`github graphql ${res.status}`);
  const json = await res.json();
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) throw new Error("github graphql: no calendar");
  return {
    total: cal.totalContributions,
    days: cal.weeks.flatMap((w) => w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))),
  };
}

async function contributionsViaPublicAPI(user) {
  // Community API that reads the public contribution graph — no token required.
  const json = await getJSON(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`);
  return {
    total: json?.total?.lastYear ?? json.contributions.reduce((s, d) => s + d.count, 0),
    days: json.contributions.map((d) => ({ date: d.date, count: d.count })),
  };
}

export async function fetchGitHub(user) {
  const [u, repos] = await Promise.all([
    getJSON(`${API}/users/${user}`, { headers: headers() }),
    getJSON(`${API}/users/${user}/repos?per_page=100&sort=pushed`, { headers: headers() }),
  ]);

  const own = repos.filter((r) => !r.fork);
  const langCount = {};
  for (const r of own) if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;

  let contributions = null;
  try {
    contributions = process.env.GITHUB_TOKEN
      ? await contributionsViaGraphQL(user)
      : await contributionsViaPublicAPI(user);
  } catch {
    try {
      contributions = await contributionsViaPublicAPI(user);
    } catch {
      contributions = null;
    }
  }

  return {
    publicRepos: u.public_repos,
    followers: u.followers,
    stars: own.reduce((s, r) => s + r.stargazers_count, 0),
    languages: Object.entries(langCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    recent: own
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .map((r) => ({
        name: r.name,
        description: r.description || "",
        language: r.language,
        url: r.html_url,
        homepage: r.homepage || "",
        pushedAt: r.pushed_at,
        stars: r.stargazers_count,
      })),
    contributions,
  };
}
