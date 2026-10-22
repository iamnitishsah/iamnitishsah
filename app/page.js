import HeroGraph from "@/components/HeroGraph";
import Spine from "@/components/Spine";
import Reveal from "@/components/Reveal";
import Pipeline from "@/components/viz/Pipeline";
import StateMachine from "@/components/viz/StateMachine";
import UnionFind from "@/components/viz/UnionFind";
import GridPath from "@/components/viz/GridPath";
import Stats, { RepoStrip } from "@/components/Stats";
import CopyEmail from "@/components/CopyEmail";
import { profile, experience, projects, stack, achievements } from "@/data/profile";
import { getStats } from "@/lib/stats";
import { cfTier, ccTier } from "@/lib/ratings";

// Re-generate the page (and its live stats) at most once an hour.
export const revalidate = 3600;

const SECTIONS = [
  { id: "root", label: "root" },
  { id: "experience", label: "experience" },
  { id: "shipped", label: "shipped" },
  { id: "stats", label: "live stats" },
  { id: "stack", label: "stack" },
  { id: "achievements", label: "achievements" },
  { id: "contact", label: "return" },
];

const VIZ = { statemachine: StateMachine, unionfind: UnionFind, gridpath: GridPath };

const USED_IN = {
  saptang: "Saptang Labs",
  northstar: "NorthStar",
  campussentinel: "CampusSentinel",
  foodops: "FoodOps.AI",
  cp: "competitive programming",
};

function SecHead({ idx, name, title, sub }) {
  return (
    <Reveal className="sechead">
      <p className="eyebrow">
        <span className="eyebrow__v">v{idx}</span> {name}
      </p>
      <h2 className="sechead__title">{title}</h2>
      {sub && <p className="sechead__sub">{sub}</p>}
    </Reveal>
  );
}

export default async function Home() {
  const stats = await getStats();
  const cf = stats.codeforces;
  const cc = stats.codechef;
  const lc = stats.leetcode;

  const listNodes = achievements.map((a) => {
    if (a.live === "codeforces")
      return {
        title: cfTier(cf.maxRating).name.replace(/^\w/, (c) => c.toUpperCase()),
        event: "Codeforces",
        where: `max rating ${cf.maxRating}`,
        note: `${cf.contests} rated contests`,
        href: profile.links.codeforces,
        color: cfTier(cf.maxRating).color,
      };
    if (a.live === "codechef")
      return {
        title: `${ccTier(cc.maxRating).stars}★`,
        event: "CodeChef",
        where: `max rating ${cc.maxRating}`,
        note: cc.contests ? `${cc.contests} contests` : "",
        href: profile.links.codechef,
        color: ccTier(cc.maxRating).color,
      };
    return a;
  });

  return (
    <>
      <header className="top">
        <a href="#root" className="top__brand">
          <span className="top__node" aria-hidden="true" />
          nitish<span className="dim">.sah</span>
        </a>
        <nav className="top__nav">
          <a href={profile.links.github} target="_blank" rel="noreferrer">
            github
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a href={profile.resume} className="btn btn--sm" target="_blank" rel="noreferrer">
            résumé
          </a>
        </nav>
      </header>

      <Spine sections={SECTIONS} />

      <main>
        {/* v0 — root */}
        <section id="root" className="hero">
          <div className="hero__text">
            <p className="eyebrow hero__status">
              <span className="dot dot--live" /> {profile.status}
            </p>
            <h1 className="hero__name">
              <span>{profile.first}</span>
              <span>{profile.last}</span>
            </h1>
            <p className="hero__role">{profile.role} · competitive programmer</p>
            <p className="hero__tag">{profile.tagline}</p>
            <ul className="hero__meta">
              {profile.meta.map((m) => (
                <li key={m}>{m}</li>
              ))}
              <li>
                CF max <b style={{ color: cfTier(cf.maxRating).color }}>{cf.maxRating}</b>
              </li>
              <li>
                LC <b>{lc.solved}</b> solved
              </li>
            </ul>
            <div className="hero__cta">
              <a href="#shipped" className="btn btn--solid">
                See what I’ve shipped
              </a>
              <a href={`mailto:${profile.email}`} className="btn">
                Email me
              </a>
            </div>
          </div>
          <HeroGraph photo={profile.photo} />
        </section>

        {/* v1 — experience */}
        <section id="experience" className="sec">
          <div className="wrap">
            <SecHead idx={1} name="experience" title={experience.company} sub={experience.domain} />
            <Reveal className="exp__role">
              <span>{experience.role}</span>
              <span className="dim">{experience.period}</span>
              <span className="dim">{experience.where}</span>
              <a href={experience.certificate} target="_blank" rel="noreferrer" className="link">
                certificate ↗
              </a>
            </Reveal>
            <Reveal delay={80}>
              <Pipeline />
            </Reveal>
            <div className="exp__grid">
              <Reveal as="dl" className="metrics metrics--lg">
                {experience.metrics.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </Reveal>
              <Reveal delay={120} className="exp__side">
                <ul className="ticks">
                  {experience.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <ul className="chips">
                  {experience.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* v2 — projects */}
        <section id="shipped" className="sec">
          <div className="wrap">
            <SecHead idx={2} name="shipped" title="Projects" sub="Each one drawn as the algorithm at its core." />
            <div className="projects">
              {projects.map((p, i) => {
                const Viz = VIZ[p.viz];
                return (
                  <article key={p.id} className={`proj ${i % 2 ? "proj--flip" : ""}`}>
                    <Reveal className="proj__viz">{Viz && <Viz />}</Reveal>
                    <Reveal delay={100} className="proj__body">
                      <p className="eyebrow">
                        {p.algo} <span className="dim">· {p.year}</span>
                      </p>
                      <h3 className="proj__title">{p.title}</h3>
                      {p.badge && <p className="badge">{p.badge}</p>}
                      <p className="proj__blurb">{p.blurb}</p>
                      <dl className="metrics">
                        {p.metrics.map((m) => (
                          <div key={m.label}>
                            <dt>{m.label}</dt>
                            <dd>{m.value}</dd>
                          </div>
                        ))}
                      </dl>
                      <details className="proj__more">
                        <summary>under the hood</summary>
                        <ul className="ticks">
                          {p.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>
                      </details>
                      <ul className="chips">
                        {p.stack.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                      <div className="proj__links">
                        {p.links.map((l, k) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className={`btn btn--sm ${k === 0 ? "btn--solid" : ""}`}
                          >
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    </Reveal>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* v3 — live stats */}
        <section id="stats" className="sec">
          <div className="wrap">
            <SecHead
              idx={3}
              name="live stats"
              title="Problem solving"
              sub="Pulled from each platform every hour — nothing on this part of the page is typed in."
            />
            <Reveal>
              <Stats stats={stats} />
            </Reveal>
            <Reveal delay={80}>
              <RepoStrip github={stats.github} />
            </Reveal>
          </div>
        </section>

        {/* v4 — stack as an adjacency list */}
        <section id="stack" className="sec">
          <div className="wrap">
            <SecHead idx={4} name="stack" title="adj[ ]" sub="My stack as an adjacency list. Hover a tool to see where I used it." />
            <Reveal as="ol" className="adj">
              {stack.map((row, r) => (
                <li key={row.key} className="adj__row" style={{ "--r": r }}>
                  <span className="adj__head">{row.key}</span>
                  {row.items.map((it, k) => (
                    <span key={it.name} className="adj__cell" style={{ "--k": k }}>
                      <span className="adj__arrow" aria-hidden="true" />
                      <span
                        className="adj__node"
                        tabIndex={0}
                        data-in={it.in.length ? `used in · ${it.in.map((x) => USED_IN[x] || x).join(", ")}` : "learning"}
                      >
                        {it.name}
                      </span>
                    </span>
                  ))}
                  <span className="adj__cell" style={{ "--k": row.items.length }}>
                    <span className="adj__arrow" aria-hidden="true" />
                    <span className="adj__null">∅</span>
                  </span>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* v5 — achievements as a linked list */}
        <section id="achievements" className="sec">
          <div className="wrap">
            <SecHead idx={5} name="achievements" title="Wins" sub="A singly linked list. Scroll sideways on small screens." />
            <Reveal as="ol" className="ll" aria-label="Achievements">
              <li className="ll__ptr" aria-hidden="true">
                head
              </li>
              {listNodes.map((n, i) => (
                <li key={`${n.event}-${i}`} className="ll__item" style={{ "--k": i }}>
                  <a href={n.href} target="_blank" rel="noreferrer" className="ll__node">
                    <span className="ll__data">
                      <span className="ll__title" style={n.color ? { color: n.color } : undefined}>
                        {n.title}
                      </span>
                      <span className="ll__event">{n.event}</span>
                      <span className="ll__where">{n.where}</span>
                      {n.note && <span className="ll__note">{n.note}</span>}
                    </span>
                    <span className="ll__next" aria-hidden="true">
                      next
                    </span>
                  </a>
                </li>
              ))}
              <li className="ll__ptr ll__ptr--null" aria-hidden="true">
                null
              </li>
            </Reveal>
          </div>
        </section>

        {/* v6 — return */}
        <section id="contact" className="sec sec--end">
          <div className="wrap">
            <Reveal className="end">
              <p className="eyebrow">
                <span className="eyebrow__v">v6</span> return
              </p>
              <h2 className="end__title">
                <span className="dim">return</span> hire(nitish)<span className="end__semi">;</span>
              </h2>
              <p className="end__sub">{profile.status}. Fastest reply is email.</p>
              <CopyEmail email={profile.email} />
              <ul className="end__links">
                {[
                  ["GitHub", profile.links.github],
                  ["LinkedIn", profile.links.linkedin],
                  ["LeetCode", profile.links.leetcode],
                  ["Codeforces", profile.links.codeforces],
                  ["CodeChef", profile.links.codechef],
                  ["Résumé", profile.resume],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noreferrer">
                      {label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <footer className="foot">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <span className="dim">Next.js · stats refresh hourly · graph drawn on canvas</span>
          </footer>
        </section>
      </main>
    </>
  );
}
