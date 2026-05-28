import { engineeringFocus } from "../data/focus";
import { experiences } from "../data/experience";
import { profile } from "../data/profile";
import Button from "../components/common/Button";
import { Badge, Container, Divider, Metric, Panel, Pill, Section } from "../components/ui";

function uppercaseSignal(value) {
    return value.toUpperCase();
}

export default function Hero() {
    const primaryExperience = experiences[0];
    const primaryCta = profile.ctas?.primary ?? {
        label: "View Projects",
        href: "#projects",
    };
    const secondaryCta = {
        label: "Resume",
        href: profile.resumePath,
    };
    const tertiaryCta = profile.ctas?.tertiary ?? {
        label: "Contact Me",
        href: "#contact",
    };

    const technicalTags = Array.from(new Set([...profile.speciality, ...primaryExperience.highlights])).slice(0, 6);
    const systemSignals = Array.from(new Set([...primaryExperience.tech, ...primaryExperience.highlights]))
        .slice(0, 5)
        .map(uppercaseSignal);
    const focusCards = engineeringFocus.slice(0, 3);

    return (
        <Section id="home" className="min-h-screen pb-16 pt-28 md:pb-24 md:pt-32">
            <Container className="grid min-h-[calc(100vh-9rem)] items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-14 xl:gap-18">
                <div className="animate-enter">
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge tone="success">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" aria-hidden="true" />
                            {profile.availability}
                        </Badge>
                        <Badge>{profile.location}</Badge>
                    </div>

                    <div className="mt-8 max-w-3xl">
                        <p className="technical-label">01 / Engineering Profile</p>
                        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-[3.85rem] xl:text-[4.25rem]">
                            {profile.name}
                        </h1>
                        <h2 className="mt-5 max-w-2xl text-xl font-medium leading-8 text-[var(--text-secondary)] md:text-[1.5rem]">
                            {profile.headline}
                        </h2>
                        <p className="copy-readable mt-5 max-w-2xl text-base leading-8 text-[var(--text-muted)] md:text-lg">
                            {profile.summary}
                        </p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button href={primaryCta.href} variant="primary">
                            {primaryCta.label}
                        </Button>
                        <Button href={secondaryCta.href} variant="secondary">
                            {secondaryCta.label}
                        </Button>
                        <Button href={tertiaryCta.href} variant="ghost">
                            {tertiaryCta.label}
                        </Button>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2.5">
                        {technicalTags.map((tag) => (
                            <Pill key={tag} className="font-mono text-xs uppercase tracking-normal">
                                {tag}
                            </Pill>
                        ))}
                    </div>
                </div>

                <Panel className="animate-enter overflow-hidden">
                    <div className="border-b border-[var(--border-subtle)] p-5 md:p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="technical-label">system overview</p>
                                <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{primaryExperience.role}</h3>
                                <p className="mt-1 text-sm text-[var(--text-muted)]">{primaryExperience.company}</p>
                            </div>
                            <Badge tone="accent">{primaryExperience.duration}</Badge>
                        </div>
                    </div>

                    <div className="grid gap-5 p-5 md:p-6">
                        <div className="grid grid-cols-2 gap-3">
                            <Metric label="Focus Areas" value={String(engineeringFocus.length)} detail="specialized domains" />
                            <Metric label="Core Stack" value={String(primaryExperience.tech.length)} detail="active technologies" />
                            <Metric label="Delivery Scope" value={String(primaryExperience.description.length)} detail="backend outcomes" />
                            <Metric label="Role Tracks" value={String(profile.roles.length)} detail="targeted positions" />
                        </div>

                        <div className="grid gap-2">
                            {systemSignals.map((signal) => (
                                <div
                                    key={signal}
                                    className="panel-interactive flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-3 py-2.5"
                                >
                                    <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">{signal}</span>
                                    <span className="h-2 w-2 rounded-full bg-[var(--success)]" aria-hidden="true" />
                                </div>
                            ))}
                        </div>

                        <Divider />

                        <div className="grid gap-3 md:grid-cols-3">
                            {focusCards.map((item) => (
                                <div
                                    key={item.title}
                                    className="panel-interactive rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] p-4"
                                >
                                    <p className="technical-label">{item.title}</p>
                                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Panel>
            </Container>
        </Section>
    );
}
