import Ago from "./Ago";
import { cfTier, ccTier } from "@/lib/ratings";
import { profile, hiddenRepos } from "@/data/profile";

// ── small SVG pieces (rendered on the server) ───────────────

function RatingChart({ history, bands, tier, id }) {
  if (!history || history.length < 2) return null;
  const W = 600;
  const H = 190;
  const padL = 34;
  const padR = 14;
  const padT = 14;
  const padB = 22;
  const rs = history.map((h) => h[1]);
  const ts = history.map((h) => h[0]);
  const lo = Math.max(0, Math.floor((Math.min(...rs) - 80) / 100) * 100);
  const hi = Math.ceil((Math.max(...rs) + 80) / 100) * 100;
  const x = (t) => padL + ((t - ts[0]) / (ts[ts.length - 1] - ts[0] || 1)) * (W - padL - padR);
  const y = (r) => padT + (1 - (r - lo) / (hi - lo)) * (H - padT - padB);
  const d = history.map(([t, r], i) => `${i ? "L" : "M"}${x(t).toFixed(1)} ${y(r).toFixed(1)}`).join(" ");
  const peakI = rs.indexOf(Math.max(...rs));
  const last = history.length - 1;
  const yr = (t) => new Date(t * 1000).getFullYear();
  const ticks = [];
  for (let r = Math.ceil(lo / 200) * 200; r <= hi; r += 200) ticks.push(r);

  return (
    <svg className="rc" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Rating history, peak ${rs[peakI]}, current ${rs[last]}`}>
      <defs>
        <clipPath id={`rc-${id}`}>
          <rect x={padL} y={padT} width={W - padL - padR} height={H - padT - padB} />
        </clipPath>
      </defs>
      <g clipPath={`url(#rc-${id})`}>
        {bands.map(([min, color], i) => {
          const max = bands[i + 1]?.[0] ?? 5000;
          if (max < lo || min > hi) return null;
          return (
            <rect
              key={min}
              x={padL}
              width={W - padL - padR}
              y={y(Math.min(max, hi))}
              height={y(Math.max(min, lo)) - y(Math.min(max, hi))}
              fill={color}
              opacity="0.09"
            />
          );
        })}
      </g>
      {ticks.map((r) => (
        <g key={r}>
          <line x1={padL} x2={W - padR} y1={y(r)} y2={y(r)} className="rc__grid" />
          <text x={padL - 6} y={y(r) + 3.5} textAnchor="end" className="rc__tick">
            {r}
          </text>
        </g>
      ))}
      <path d={d} className="rc__line" pathLength="1" />
      {history.map(([t, r], i) => (
        <circle key={i} cx={x(t)} cy={y(r)} r="2.2" className="rc__pt" />
      ))}
      <g className="rc__peak">
        <circle cx={x(ts[peakI])} cy={y(rs[peakI])} r="5" fill={tier(rs[peakI]).color} />
        <text x={x(ts[peakI])} y={y(rs[peakI]) - 10} textAnchor="middle">
          peak {rs[peakI]}
        </text>
      </g>
      {peakI !== last && (
        <circle cx={x(ts[last])} cy={y(rs[last])} r="4" className="rc__now" />
      )}
      <text x={padL} y={H - 5} className="rc__tick">
        {yr(ts[0])}
      </text>
      <text x={W - padR} y={H - 5} textAnchor="end" className="rc__tick">
        {yr(ts[last])}
      </text>
    </svg>
  );
}

function Ring({ easy, medium, hard, solved }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  const gap = 5;
  const parts = [
    { v: easy, cls: "e" },
    { v: medium, cls: "m" },
    { v: hard, cls: "h" },
  ];
  const sum = easy + medium + hard || 1;
  let offset = 0;
  return (
    <svg className="ring" viewBox="0 0 140 140" role="img" aria-label={`${solved} problems solved`}>
      <circle cx="70" cy="70" r={R} className="ring__track" />
      {parts.map(({ v, cls }) => {
        const len = Math.max(0, (v / sum) * C - gap);
        const el = (
          <circle
            key={cls}
            cx="70"
            cy="70"
            r={R}
            className={`ring__seg ring__seg--${cls}`}
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 70 70)"
          />
        );
        offset += (v / sum) * C;
        return el;
      })}
      <text x="70" y="70" textAnchor="middle" className="ring__n">
        {solved}
      </text>
      <text x="70" y="90" textAnchor="middle" className="ring__l">
        solved
      </text>
    </svg>
  );
}

function Heatmap({ days }) {
  if (!days?.length) return null;
  const recent = days.slice(-371);
  const first = new Date(recent[0].date);
  const lead = first.getUTCDay();
  const cells = [...Array(lead).fill(null), ...recent];
  const weeks = Math.ceil(cells.length / 7);
  const nonzero = recent.map((d) => d.count).filter(Boolean).sort((a, b) => a - b);
  const q = (p) => nonzero[Math.floor(p * (nonzero.length - 1))] || 1;
  const level = (c) => (!c ? 0 : c <= q(0.25) ? 1 : c <= q(0.5) ? 2 : c <= q(0.75) ? 3 : 4);
  const S = 11;
  const G = 3;
  const months = [];
  let lastM = -1;
  for (let w = 0; w < weeks; w++) {
    const d = cells[w * 7 + 6] || cells[w * 7];
    if (!d) continue;
    const m = new Date(d.date).getUTCMonth();
    if (m !== lastM) {
      if (w < weeks - 2) months.push({ w, m });
      lastM = m;
    }
  }
  const MN = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  return (
    <div className="hm">
      <svg viewBox={`0 0 ${weeks * (S + G)} ${7 * (S + G) + 16}`} role="img" aria-label="GitHub contributions over the last year">
        {months.map(({ w, m }) => (
          <text key={`${w}-${m}`} x={w * (S + G)} y="10" className="hm__m">
            {MN[m]}
          </text>
        ))}
        {cells.map((d, i) =>
          d ? (
            <rect
              key={d.date}
              x={Math.floor(i / 7) * (S + G)}
              y={16 + (i % 7) * (S + G)}
              width={S}
              height={S}
              rx="2.5"
              className={`hm__c l${level(d.count)}`}
            >
              <title>{`${d.count} on ${d.date}`}</title>
            </rect>
          ) : null
        )}
      </svg>
    </div>
  );
}

function Status({ data, fetchedAt, snapshotDate }) {
  return data.live ? (
    <span className="pill pill--live">
      <span className="pill__dot" /> live · <Ago iso={fetchedAt} prefix="synced " />
    </span>
  ) : (
    <span className="pill" title="Live fetch failed — showing the last saved numbers">
      snapshot · {new Date(snapshotDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
    </span>
  );
}

function CardHead({ name, href, handle, children }) {
  return (
    <header className="card__head">
      <a href={href} target="_blank" rel="noreferrer" className="card__name">
        {name} <span className="card__handle">@{handle}</span> <span aria-hidden="true">↗</span>
      </a>
      {children}
    </header>
  );
}

const CF_BANDS = [[0, "#a3a8b4"], [1200, "#5fcf5f"], [1400, "#35c9bd"], [1600, "#6f8cff"], [1900, "#d07bff"], [2100, "#ffa43a"], [2400, "#ff5a5a"]];
const CC_BANDS = [[0, "#a3a8b4"], [1400, "#4fbf63"], [1600, "#6b97ff"], [1800, "#b48ad6"], [2000, "#ffd04a"], [2200, "#ff9a3c"], [2500, "#ff4d5e"]];

// ── cards ───────────────────────────────────────────────────

function Codeforces({ s, meta }) {
  const peak = cfTier(s.maxRating);
  const now = cfTier(s.rating);
  return (
    <article className="card card--cf">
      <CardHead name="Codeforces" href={profile.links.codeforces} handle={profile.handles.codeforces}>
        <Status data={s} {...meta} />
      </CardHead>
      <div className="peak">
        <div>
          <span className="peak__k">max rating</span>
          <span className="peak__v" style={{ color: peak.color }}>
            {s.maxRating}
          </span>
          <span className="peak__tier" style={{ color: peak.color }}>
            {peak.name}
          </span>
        </div>
        <dl className="mini">
          <div>
            <dt>now</dt>
            <dd>
              {s.rating} <span style={{ color: now.color }}>{now.name}</span>
            </dd>
          </div>
          <div>
            <dt>rated contests</dt>
            <dd>{s.contests}</dd>
          </div>
          {s.solved != null && (
            <div>
              <dt>solved</dt>
              <dd>{s.solved}</dd>
            </div>
          )}
        </dl>
      </div>
      <RatingChart history={s.history} bands={CF_BANDS} tier={cfTier} id="cf" />
    </article>
  );
}

function CodeChef({ s, meta }) {
  const peak = ccTier(s.maxRating);
  const now = ccTier(s.rating);
  return (
    <article className="card card--cc">
      <CardHead name="CodeChef" href={profile.links.codechef} handle={profile.handles.codechef}>
        <Status data={s} {...meta} />
      </CardHead>
      <div className="peak">
        <div>
          <span className="peak__k">max rating</span>
          <span className="peak__v" style={{ color: peak.color }}>
            {s.maxRating}
          </span>
          <span className="peak__tier" style={{ color: peak.color }}>
            {"★".repeat(peak.stars)} <span className="dim">{peak.stars}-star</span>
          </span>
        </div>
        <dl className="mini">
          <div>
            <dt>now</dt>
            <dd>
              {s.rating} <span style={{ color: now.color }}>{now.stars}★</span>
            </dd>
          </div>
          {s.contests != null && (
            <div>
              <dt>contests</dt>
              <dd>{s.contests}</dd>
            </div>
          )}
          {s.solved != null && (
            <div>
              <dt>solved</dt>
              <dd>{s.solved}</dd>
            </div>
          )}
        </dl>
      </div>
      <RatingChart history={s.history} bands={CC_BANDS} tier={(r) => ({ color: ccTier(r).color })} id="cc" />
    </article>
  );
}

function LeetCode({ s, meta }) {
  const rows = [
    { k: "easy", v: s.easy, t: s.totals?.easy, cls: "e" },
    { k: "medium", v: s.medium, t: s.totals?.medium, cls: "m" },
    { k: "hard", v: s.hard, t: s.totals?.hard, cls: "h" },
  ];
  return (
    <article className="card card--lc">
      <CardHead name="LeetCode" href={profile.links.leetcode} handle={profile.handles.leetcode}>
        <Status data={s} {...meta} />
      </CardHead>
      <div className="lc">
        <Ring easy={s.easy} medium={s.medium} hard={s.hard} solved={s.solved} />
        <ul className="lc__rows">
          {rows.map((r) => (
            <li key={r.k}>
              <span className={`lc__k lc__k--${r.cls}`}>{r.k}</span>
              <b>{r.v}</b>
              {r.t ? <span className="dim">/{r.t}</span> : null}
            </li>
          ))}
        </ul>
      </div>
      {(s.contest || s.activeDays) && (
        <dl className="mini mini--row">
          {s.contest && (
            <div>
              <dt>contest rating</dt>
              <dd>{s.contest.rating}</dd>
            </div>
          )}
          {s.activeDays != null && (
            <div>
              <dt>active days</dt>
              <dd>{s.activeDays}</dd>
            </div>
          )}
          {s.streak ? (
            <div>
              <dt>best streak</dt>
              <dd>{s.streak}d</dd>
            </div>
          ) : null}
        </dl>
      )}
    </article>
  );
}

function GitHub({ s, meta }) {
  const langTotal = s.languages.reduce((a, l) => a + l.count, 0) || 1;
  const top = s.languages.slice(0, 5);
  const lastPush = s.recent?.[0];
  return (
    <article className="card card--gh">
      <CardHead name="GitHub" href={profile.links.github} handle={profile.handles.github}>
        <Status data={s} {...meta} />
      </CardHead>
      <div className="gh__top">
        {s.contributions ? (
          <div className="gh__big">
            <span className="peak__v">{s.contributions.total}</span>
            <span className="peak__k">contributions · last 12 months</span>
          </div>
        ) : (
          <div className="gh__big">
            <span className="peak__v">{s.publicRepos}</span>
            <span className="peak__k">public repositories</span>
          </div>
        )}
        <dl className="mini">
          {s.contributions && (
            <div>
              <dt>repos</dt>
              <dd>{s.publicRepos}</dd>
            </div>
          )}
          {lastPush && (
            <div>
              <dt>last push</dt>
              <dd>
                <Ago iso={lastPush.pushedAt} /> <span className="dim">→ {lastPush.name}</span>
              </dd>
            </div>
          )}
        </dl>
      </div>
      <Heatmap days={s.contributions?.days} />
      <div className="langs" aria-label="Languages across repositories">
        <div className="langs__bar">
          {top.map((l, i) => (
            <span key={l.name} className={`langs__seg c${i}`} style={{ flexGrow: l.count }} />
          ))}
        </div>
        <ul className="langs__key">
          {top.map((l, i) => (
            <li key={l.name}>
              <span className={`langs__dot c${i}`} />
              {l.name} <span className="dim">{Math.round((l.count / langTotal) * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function RepoStrip({ github }) {
  const repos = (github.recent || []).filter((r) => !hiddenRepos.includes(r.name)).slice(0, 8);
  if (!repos.length) return null;
  return (
    <div className="repos">
      <div className="repos__head">
        <span className="eyebrow">more on github · sorted by last push</span>
        <a href={profile.links.github} target="_blank" rel="noreferrer" className="link">
          all repositories ↗
        </a>
      </div>
      <ul className="repos__list">
        {repos.map((r) => (
          <li key={r.name}>
            <a href={r.homepage || r.url} target="_blank" rel="noreferrer" className="repo">
              <span className="repo__name">{r.name}</span>
              {r.description && <span className="repo__desc">{r.description}</span>}
              <span className="repo__meta">
                {r.language && <span>{r.language}</span>}
                <Ago iso={r.pushedAt} />
                {r.homepage && <span className="repo__live">live</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Stats({ stats }) {
  const meta = { fetchedAt: stats.fetchedAt, snapshotDate: stats.snapshotDate };
  return (
    <div className="stats">
      <Codeforces s={stats.codeforces} meta={meta} />
      <LeetCode s={stats.leetcode} meta={meta} />
      <CodeChef s={stats.codechef} meta={meta} />
      <GitHub s={stats.github} meta={meta} />
    </div>
  );
}
