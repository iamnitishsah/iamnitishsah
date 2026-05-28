import { engineeringFocus } from "../data/focus";
import { experiences } from "../data/experience";
import { profile } from "../data/profile";
import profilePhoto from "../assets/images/Official.jpeg";
import Button from "../components/common/Button";
import { Badge, Container, Metric, Pill, Section } from "../components/ui";

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
    const focusCards = engineeringFocus.slice(0, 3);

    return (
        <Section id="home" className="min-h-screen overflow-hidden pb-14 pt-24 md:pb-20 md:pt-28">
            <Container className="grid min-h-[calc(100vh-8rem)] items-stretch gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.92fr)] lg:gap-12 xl:gap-14">
                <div className="animate-enter flex h-full flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge tone="success">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" aria-hidden="true" />
                            {profile.availability}
                        </Badge>
                        <Badge>{profile.location}</Badge>
                    </div>

                    <div className="mt-8 max-w-3xl">
                        <p className="technical-label">Hello, I am</p>
                        <h1 className="mt-4 text-balance text-5xl font-bold leading-[0.98] tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-[4.55rem] xl:text-[5rem]">
                            {profile.name}
                        </h1>
                        <h2 className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-[var(--accent-strong)] md:text-[1.45rem]">
                            {profile.headline}
                        </h2>
                        <p className="copy-readable mt-5 max-w-xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
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
                            <Pill key={tag} className="border-[var(--border-medium)] bg-[rgba(255,248,237,0.055)] font-mono text-xs uppercase tracking-normal">
                                {tag}
                            </Pill>
                        ))}
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {focusCards.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[rgba(255,248,237,0.035)] px-4 py-3"
                            >
                                <p className="technical-label">{item.title}</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="animate-enter relative flex h-full items-center">
                    <span className="hero-orbit -right-12 top-8 h-44 w-44" aria-hidden="true" />
                    <span className="hero-orbit -bottom-4 left-2 h-28 w-28" aria-hidden="true" />

                    <div className="profile-frame relative z-10 w-full overflow-hidden p-3">
                        <div className="grid gap-3">
                            <div className="relative min-h-[360px] overflow-hidden rounded-[18px] bg-[var(--bg-raised)] sm:min-h-[390px] lg:min-h-[420px] xl:min-h-[440px]">
                                <img
                                    src={profilePhoto}
                                    alt={profile.name}
                                    className="h-full w-full object-cover object-[50%_18%]"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(21,20,26,0.94)] via-[rgba(21,20,26,0.45)] to-transparent p-5">
                                    <p className="technical-label text-[var(--accent-strong)]">Current Focus</p>
                                    <p className="mt-2 text-lg font-semibold leading-6 text-[var(--text-primary)]">
                                        Secure APIs, workflows, async backend systems.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 rounded-[var(--radius-lg)] bg-[rgba(21,20,26,0.42)] p-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                                <div>
                                    <p className="technical-label">Role Fit</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {profile.roles.map((role) => (
                                            <Badge key={role}>{role}</Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="technical-label">Active Stack</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {primaryExperience.tech.slice(0, 6).map((item) => (
                                            <Pill key={item} className="font-mono text-[0.7rem] uppercase">
                                                {item}
                                            </Pill>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-3 pt-3 sm:grid-cols-4">
                            <Metric label="Focus Areas" value={String(engineeringFocus.length)} detail="specialized domains" />
                            <Metric label="Core Stack" value={String(primaryExperience.tech.length)} detail="active technologies" />
                            <Metric label="Systems" value={String(primaryExperience.systems.length)} detail="owned areas" />
                            <Metric label="Role Tracks" value={String(profile.roles.length)} detail="targeted positions" />
                        </div>

                    </div>
                </div>
            </Container>
        </Section>
    );
}
