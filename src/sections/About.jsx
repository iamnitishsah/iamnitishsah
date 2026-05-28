import { about } from "../data/about";
import { profile } from "../data/profile";
import { Divider } from "../components/ui";
import { Panel, SectionBand, SignalRow } from "./sectionShared";

export function About() {
    const aboutParagraphs = about.description.trim().split("\n\n");

    return (
        <SectionBand
            id="about"
            eyebrow="About Me"
            title="Concise engineering profile"
            description="Human context, academic signal, and backend engineering interests without turning the page into a resume wall."
        >
            <div className="grid gap-5">
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                    <Panel className="p-5 md:p-6">
                        <div className="flex h-full flex-col">
                            <div>
                                <p className="technical-label">Education</p>
                                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                                    Academic base
                                </h3>
                                <div className="mt-5 grid gap-3">
                                    {about.education.map((item) => (
                                        <div
                                            key={`${item.institute}-${item.duration}`}
                                            className="grid gap-3 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[rgba(255,248,237,0.035)] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
                                        >
                                            <div>
                                                <h4 className="text-sm font-semibold text-[var(--text-primary)]">{item.institute}</h4>
                                                <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.degree}</p>
                                            </div>
                                            <p className="font-mono text-xs leading-5 text-[var(--text-muted)] sm:text-right">
                                                {item.duration}
                                                <span className="block">{item.location}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Divider className="my-4" />

                            <div>
                                <p className="technical-label">Certifications</p>
                                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    {about.certifications.map((item) => (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`View certificate for ${item.title}`}
                                            className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-3 py-2 transition-colors hover:border-[var(--accent-border)] hover:text-[var(--text-primary)]"
                                        >
                                            <span className="block text-xs font-semibold leading-5 text-[var(--text-secondary)]">
                                                {item.title}
                                            </span>
                                            <span className="mt-0.5 block font-mono text-[0.68rem] uppercase leading-4 text-[var(--text-muted)]">
                                                {item.provider}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Panel>

                    <div className="grid gap-3">
                        <Panel className="p-4 md:p-5">
                            <p className="technical-label">Achievements</p>
                            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                                Hackathon podiums
                            </h3>

                            <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                {about.achievements.map((item) => (
                                    <div
                                        key={`${item.title}-${item.detail}`}
                                        className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[rgba(255,248,237,0.035)] p-3"
                                    >
                                        <p className="text-sm font-semibold leading-5 text-[var(--text-primary)]">
                                            {item.title}
                                        </p>

                                        {item.detail ? (
                                            <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                                                {item.detail}
                                            </p>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </Panel>

                        <Panel className="p-4">
                            <p className="technical-label">Algorithmic Programming Profile</p>
                            <div className="mt-3 grid gap-2 sm:grid-rows-3">
                                {about.algorithmicProfiles.map((item) => (
                                    <div
                                        key={item.platform}
                                        className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-3 py-2"
                                    >
                                        <p className="font-mono text-[0.68rem] font-semibold uppercase leading-4 text-[var(--text-muted)]">
                                            {item.platform}
                                        </p>
                                        <p className="mt-1 text-sm font-semibold leading-5 text-[var(--text-primary)]">
                                            {item.value}
                                        </p>
                                        <p className="mt-0.5 text-xs leading-5 text-[var(--text-muted)]">
                                            {item.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Panel>
                    </div>
                </div>
                <Panel className="overflow-hidden">
                    <div className="border-b border-[var(--border-subtle)] p-5 md:p-6">
                        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                            <div>
                                <p className="technical-label">Profile Summary</p>
                                <h3 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                                    {profile.headline}
                                </h3>
                            </div>
                            <SignalRow items={profile.roles} />
                        </div>
                    </div>

                    <div className="grid gap-3 border-b border-[var(--border-subtle)] p-5 md:grid-cols-3 md:p-6">
                        {about.stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[rgba(255,248,237,0.04)] p-4"
                            >
                                <p className="text-3xl font-semibold tracking-tight text-[var(--accent-strong)]">{stat.value}</p>
                                <p className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-5 p-5 md:p-6 lg:grid-rows lg:items-start">
                        <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[rgba(255,248,237,0.035)] p-4">
                            <p className="technical-label">Engineering Snapshot</p>
                            <div className="mt-3 grid gap-3 text-sm leading-7 text-[var(--text-muted)]">
                                {aboutParagraphs.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="technical-label">Engineering Interests</p>
                            <div className="mt-3 grid gap-3">
                                {about.engineeringFocus.map((item) => (
                                    <div
                                        key={item.title}
                                        className="grid gap-2 rounded-[var(--radius-sm)] bg-white/[0.025] px-3 py-2.5 sm:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)]"
                                    >
                                        <h4 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h4>
                                        <p className="text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>
        </SectionBand>
    );
}
