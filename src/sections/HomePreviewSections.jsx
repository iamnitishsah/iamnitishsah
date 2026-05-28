import { about } from "../data/about";
import { contact } from "../data/contact";
import { experiences } from "../data/experience";
import { engineeringFocus } from "../data/focus";
import { featuredProjects, secondaryProjects } from "../data/projects";
import { profile } from "../data/profile";
import { skills } from "../data/skills";
import profilePhoto from "../assets/images/Official.jpeg";
import { Badge, Container, Divider, Metric, Panel, Pill, Section, SectionHeading } from "../components/ui";

function SectionBand({ id, eyebrow, title, description, children, className = "" }) {
    const headingId = `${id}-heading`;

    return (
        <Section id={id} className={`py-14 md:py-18 ${className}`} labelledBy={headingId}>
            <Container>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,250px)_minmax(0,1fr)] lg:gap-10">
                    <SectionHeading eyebrow={eyebrow} title={title} id={headingId} className="lg:sticky lg:top-24 lg:self-start">
                        {description}
                    </SectionHeading>
                    <div className="animate-enter">{children}</div>
                </div>
            </Container>
        </Section>
    );
}

function SignalRow({ items }) {
    return (
        <div className="chip-wrap">
            {items.map((item) => (
                <Badge key={item}>{item}</Badge>
            ))}
        </div>
    );
}

export function ExperiencePreview() {
    return (
        <SectionBand
            id="experience"
            eyebrow="02 / Experience"
            title="Production-oriented backend ownership"
            description="Implementation depth across authentication, async processing, API engineering, and operational reliability."
        >
            <div className="grid gap-5">
                {experiences.map((experience) => (
                    <Panel key={experience.id} className="panel-interactive overflow-hidden">
                        <div className="border-b border-[var(--border-subtle)] p-5 md:p-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <p className="technical-label">backend ownership</p>
                                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                                        {experience.role}
                                    </h3>
                                    <p className="mt-2 text-sm text-[var(--text-secondary)]">{experience.company}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Badge tone="accent">{experience.duration}</Badge>
                                    {experience.systems.map((item) => (
                                        <Badge key={item}>{item}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5 p-5 md:p-6">
                            <div className="grid gap-3 md:grid-cols-3">
                                {experience.metrics.map((metric) => (
                                    <Metric
                                        key={metric.label}
                                        label={metric.label}
                                        value={metric.value}
                                    />
                                ))}
                            </div>

                            <div className="grid gap-4 xl:grid-cols-2">
                                {experience.domains.map((domain) => (
                                    <Panel
                                        key={domain.title}
                                        className="panel-interactive bg-white/[0.02] p-4 shadow-none"
                                    >
                                        <p className="technical-label">{domain.title}</p>
                                        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                                            {domain.summary}
                                        </p>
                                        <div className="mt-4 grid gap-2.5">
                                            {domain.items.map((item) => (
                                                <div
                                                    key={item}
                                                    className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[rgba(255,248,237,0.035)] px-3 py-2.5 text-sm leading-6 text-[var(--text-secondary)]"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </Panel>
                                ))}
                            </div>

                            <Divider />

                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="technical-label">Core Stack</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {experience.tech.map((item) => (
                                            <Pill key={item} className="font-mono text-xs uppercase">
                                                {item}
                                            </Pill>
                                        ))}
                                    </div>
                                </div>

                                {experience.linkedinPost ? (
                                    <a
                                        href={experience.linkedinPost}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 self-start rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--accent-border)] hover:bg-white/[0.045] hover:text-[var(--text-primary)]"
                                    >
                                        LinkedIn Update
                                        <span className="font-mono text-xs text-[var(--text-muted)]">OPEN</span>
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    </Panel>
                ))}
            </div>
        </SectionBand>
    );
}

export function FeaturedProjectsPreview() {
    return (
        <SectionBand
            id="projects"
            eyebrow="03 / Projects"
            title="Featured backend case studies"
            description="System narratives focused on problem shape, architecture, constraints, and operational capability."
        >
            <div className="grid gap-5">
                {featuredProjects.slice(0, 3).map((project, index) => (
                    <Panel
                        key={project.id}
                        className={`panel-interactive overflow-hidden ${index === 0 ? "border-[var(--accent-border)] shadow-[0_0_0_1px_rgba(92,200,255,0.08),0_22px_80px_rgba(0,0,0,0.32)]" : ""}`}
                    >
                        <div className="border-b border-[var(--border-subtle)] p-5 md:p-6">
                            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                                <div className="max-w-3xl">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge tone={index === 0 ? "accent" : "default"}>
                                            {project.status ?? project.category}
                                        </Badge>
                                        <Badge>{project.category}</Badge>
                                        {project.achievement ? <Badge tone="accent">{project.achievement}</Badge> : null}
                                    </div>
                                    <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                                        {project.title}
                                    </h3>
                                    <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{project.problem}</p>
                                </div>

                                <div className="grid min-w-0 gap-2 sm:grid-cols-2 xl:w-[20rem]">
                                    {project.highlights?.map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[rgba(255,248,237,0.04)] px-3 py-2.5 text-sm text-[var(--text-secondary)]"
                                        >
                                            <span className="font-mono text-xs text-[var(--text-muted)]">signal</span>
                                            <div className="mt-1 font-medium text-[var(--text-primary)]">{item}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5 p-5 md:p-6">
                            <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                                <div className="grid gap-4">
                                    <Panel className="bg-white/[0.02] p-4 shadow-none">
                                        <p className="technical-label">Backend Architecture</p>
                                        <div className="mt-4 grid gap-2.5">
                                            {project.architecture.map((item) => (
                                                <div
                                                    key={item}
                                                    className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-white/[0.02] px-3 py-2.5 text-sm leading-6 text-[var(--text-secondary)]"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </Panel>

                                    <Panel className="bg-white/[0.02] p-4 shadow-none">
                                        <p className="technical-label">Engineering Challenges</p>
                                        <div className="mt-4 grid gap-2.5">
                                            {project.challenges?.map((item) => (
                                                <div
                                                    key={item}
                                                    className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-white/[0.02] px-3 py-2.5 text-sm leading-6 text-[var(--text-secondary)]"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </Panel>
                                </div>

                                <div className="grid gap-4">
                                    <Panel className="bg-white/[0.02] p-4 shadow-none">
                                        <p className="technical-label">Core Systems</p>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {project.systems?.map((item) => (
                                                <Pill key={item} className="font-mono text-xs uppercase">
                                                    {item}
                                                </Pill>
                                            ))}
                                        </div>
                                    </Panel>

                                    <Panel className="bg-white/[0.02] p-4 shadow-none">
                                        <p className="technical-label">Capability Areas</p>
                                        <div className="mt-4 grid gap-2">
                                            {project.capabilities?.map((item) => (
                                                <div
                                                    key={item}
                                                    className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-white/[0.02] px-3 py-2.5 text-sm text-[var(--text-secondary)]"
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                    </Panel>
                                </div>
                            </div>

                            <Divider />

                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="technical-label">Stack</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.tech.map((item) => (
                                            <Pill key={item} className="font-mono text-xs uppercase">
                                                {item}
                                            </Pill>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {project.links?.map((link) => (
                                        <a
                                            key={`${project.id}-${link.label}`}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--accent-border)] hover:bg-white/[0.045] hover:text-[var(--text-primary)]"
                                        >
                                            {link.label}
                                            <span className="font-mono text-xs text-[var(--text-muted)]">
                                                {link.kind.toUpperCase()}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Panel>
                ))}
            </div>
        </SectionBand>
    );
}

export function FocusPreview() {
    return (
        <SectionBand
            id="focus"
            eyebrow="04 / Focus"
            title="Engineering direction"
            description="Backend problem spaces that shape implementation choices and architectural tradeoffs."
        >
            <div className="grid gap-5">
                <Panel className="overflow-hidden">
                    <div className="border-b border-[var(--border-subtle)] p-5 md:p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-3xl">
                                <p className="technical-label">Systems Identity</p>
                                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                                    Backend specialization with workflow-heavy system thinking
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                                    {profile.subtitle}
                                </p>
                            </div>
                            <SignalRow items={profile.speciality.slice(0, 4).map((item) => item.toUpperCase())} />
                        </div>
                    </div>

                    <div className="grid gap-4 p-5 md:grid-cols-2 md:p-6">
                        {engineeringFocus.map((item) => (
                            <Panel
                                key={item.title}
                                className="panel-interactive bg-white/[0.02] p-5 shadow-none"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="technical-label">Capability Domain</p>
                                        <h4 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                                            {item.title}
                                        </h4>
                                    </div>
                                    <span className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] px-2.5 py-1 font-mono text-xs text-[var(--text-muted)]">
                                        SYS
                                    </span>
                                </div>

                                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>

                                <Divider className="my-4" />

                                <SignalRow items={item.labels} />
                            </Panel>
                        ))}
                    </div>
                </Panel>
            </div>
        </SectionBand>
    );
}

export function SkillsPreview() {
    return (
        <SectionBand
            id="skills"
            eyebrow="05 / Skills"
            title="Backend stack map"
            description="Grouped by engineering function for fast backend capability scanning."
        >
            <div className="grid gap-5">
                <Panel className="overflow-hidden">
                    <div className="border-b border-[var(--border-subtle)] p-5 md:p-6">
                        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                            <div>
                                <p className="technical-label">Primary Stack</p>
                                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                                    Systems-oriented backend capability coverage
                                </h3>
                            </div>
                            <SignalRow items={["SECURITY-FOCUSED", "ASYNC WORKFLOWS", "API DESIGN"]} />
                        </div>
                    </div>

                    <div className="grid gap-4 p-5 md:grid-cols-2 md:p-6 xl:grid-cols-3">
                        {skills.map((group) => (
                            <Panel
                                key={group.category}
                                className="panel-interactive flex h-full flex-col bg-white/[0.02] p-5 shadow-none"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="technical-label">Skill Group</p>
                                        <h4 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                                            {group.category}
                                        </h4>
                                    </div>
                                    <span className="font-mono text-xs text-[var(--text-muted)]">
                                        {String(group.items.length).padStart(2, "0")}
                                    </span>
                                </div>

                                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                                    {group.summary}
                                </p>

                                <div className="mt-4">
                                    <SignalRow items={group.signals} />
                                </div>

                                <Divider className="my-4" />

                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <Pill key={item} className="font-mono text-xs uppercase">
                                            {item}
                                        </Pill>
                                    ))}
                                </div>
                            </Panel>
                        ))}
                    </div>
                </Panel>
            </div>
        </SectionBand>
    );
}

export function AboutPreview() {
    const aboutParagraphs = about.description.trim().split("\n\n");
    const aboutSummary = aboutParagraphs[0];
    const aboutApproach = aboutParagraphs[1] ?? "";
    const aboutInterest = aboutParagraphs[2] ?? "";

    return (
        <SectionBand
            id="about"
            eyebrow="07 / About"
            title="Concise engineering profile"
            description="Human context, academic signal, and backend engineering interests without turning the page into a resume wall."
        >
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)]">
                <Panel className="overflow-hidden">
                    <div className="grid gap-0 md:grid-cols-[220px_minmax(0,1fr)]">
                        <div className="relative min-h-72 overflow-hidden border-b border-[var(--border-subtle)] md:border-b-0 md:border-r md:border-[var(--border-subtle)]">
                            <img
                                src={profilePhoto}
                                alt={profile.name}
                                className="h-full w-full object-cover object-[50%_18%]"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(21,20,26,0.94)] to-transparent p-4">
                                <p className="text-sm font-semibold text-[var(--text-primary)]">{profile.name}</p>
                                <p className="mt-1 font-mono text-xs text-[var(--accent-strong)]">{profile.location}</p>
                            </div>
                        </div>

                        <div className="p-5 md:p-6">
                            <p className="technical-label">Profile Summary</p>
                            <p className="copy-readable mt-4 text-base leading-8 text-[var(--text-secondary)]">{aboutSummary}</p>
                            {aboutInterest ? (
                                <p className="copy-readable mt-4 text-sm leading-7 text-[var(--text-muted)]">{aboutInterest}</p>
                            ) : null}
                        </div>
                    </div>

                    <Divider className="my-5" />

                    <div className="grid gap-4 px-5 md:grid-cols-3 md:px-6">
                        {about.stats.map((stat) => (
                            <div key={stat.label}>
                                <p className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{stat.value}</p>
                                <p className="mt-1 text-sm text-[var(--text-muted)]">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <Divider className="my-5" />

                    <div className="px-5 pb-5 md:px-6 md:pb-6">
                        <p className="technical-label">Engineering Interests</p>
                        <div className="mt-3 grid gap-3 md:grid-cols-2">
                            {about.engineeringFocus.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] p-4"
                                >
                                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h4>
                                    <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        {aboutApproach ? (
                            <p className="mt-4 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[rgba(255,248,237,0.035)] p-4 text-sm leading-7 text-[var(--text-muted)]">
                                {aboutApproach}
                            </p>
                        ) : null}
                    </div>
                </Panel>

                <div className="grid gap-5">
                    <Panel className="p-5 md:p-6">
                        <p className="technical-label">Education</p>
                        <div className="mt-4 grid gap-4">
                            {about.education.map((item) => (
                                <div
                                    key={`${item.institute}-${item.duration}`}
                                    className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] p-4"
                                >
                                    <h4 className="text-sm font-semibold text-[var(--text-primary)]">{item.institute}</h4>
                                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.degree}</p>
                                    <p className="mt-2 font-mono text-xs text-[var(--text-muted)]">
                                        {item.duration} / {item.location}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Panel>

                    <Panel className="p-5 md:p-6">
                        <p className="technical-label">Achievements</p>
                        <div className="mt-4 grid gap-3">
                            {about.achievements.map((item) => (
                                <div
                                    key={item}
                                    className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-4 py-3 text-sm text-[var(--text-secondary)]"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </Panel>

                    <Panel className="p-5 md:p-6">
                        <p className="technical-label">Certifications</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {about.certifications.map((item) => (
                                <Pill key={item} className="font-mono text-xs uppercase">
                                    {item}
                                </Pill>
                            ))}
                        </div>
                    </Panel>
                </div>
            </div>
        </SectionBand>
    );
}

export function SecondaryProjectsPreview() {
    return (
        <SectionBand
            id="secondary-projects"
            eyebrow="06 / Additional Builds"
            title="Supporting backend breadth"
            description="Additional builds that show range across auth, workflow handling, and backend orchestration."
        >
            <div className="grid gap-4 lg:grid-cols-2">
                {secondaryProjects.map((project) => (
                    <Panel
                        key={project.id}
                        className="panel-interactive flex h-full flex-col p-5 md:p-6"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="flex flex-wrap gap-2">
                                    <Badge>{project.status}</Badge>
                                    <Badge>{project.category}</Badge>
                                </div>
                                <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                                    {project.title}
                                </h3>
                            </div>
                        </div>

                        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{project.problem}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.systems.map((item) => (
                                <Pill key={item} className="font-mono text-xs uppercase">
                                    {item}
                                </Pill>
                            ))}
                        </div>

                        <Divider className="my-4" />

                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((item) => (
                                <Pill key={item} className="font-mono text-xs uppercase">
                                    {item}
                                </Pill>
                            ))}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {project.links?.map((link) => (
                                <a
                                    key={`${project.id}-${link.label}`}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--accent-border)] hover:bg-white/[0.045] hover:text-[var(--text-primary)]"
                                >
                                    {link.label}
                                    <span className="font-mono text-xs text-[var(--text-muted)]">{link.kind.toUpperCase()}</span>
                                </a>
                            ))}
                        </div>
                    </Panel>
                ))}
            </div>
        </SectionBand>
    );
}

export function ContactPreview() {
    return (
        <SectionBand
            id="contact"
            eyebrow="08 / Contact"
            title="Professional availability"
            description="Current role interest, core backend focus, and direct hiring paths."
            className="pb-20 md:pb-24"
        >
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
                <Panel className="p-5 md:p-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <Badge tone="success">{contact.availability}</Badge>
                        <Badge>{profile.location}</Badge>
                    </div>

                    <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                        Open to backend engineering work with security, workflows, and async systems at the core.
                    </h3>
                    <p className="copy-readable mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                        {contact.closing}
                    </p>

                    <Divider className="my-5" />

                    <div className="grid gap-5 md:grid-cols-2">
                        <div>
                            <p className="technical-label">Role Interests</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {contact.preferredRoles.map((item) => (
                                    <Pill key={item} className="font-mono text-xs uppercase">
                                        {item}
                                    </Pill>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="technical-label">Priority Areas</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {contact.focusAreas.map((item) => (
                                    <Pill key={item} className="font-mono text-xs uppercase">
                                        {item}
                                    </Pill>
                                ))}
                            </div>
                        </div>
                    </div>
                </Panel>

                <Panel className="p-5 md:p-6">
                    <p className="technical-label">Direct Channels</p>
                    <div className="mt-4 grid gap-3">
                        <a className="panel-interactive rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] p-4" href={`mailto:${contact.email}`}>
                            <p className="technical-label">Email</p>
                            <p className="mt-2 text-sm text-[var(--text-primary)]">{contact.email}</p>
                        </a>
                        <a className="panel-interactive rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] p-4" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                            <p className="technical-label">LinkedIn</p>
                            <p className="mt-2 text-sm text-[var(--text-primary)]">{contact.linkedin.replace("https://", "")}</p>
                        </a>
                        <a className="panel-interactive rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] p-4" href={contact.github} target="_blank" rel="noopener noreferrer">
                            <p className="technical-label">GitHub</p>
                            <p className="mt-2 text-sm text-[var(--text-primary)]">{contact.github.replace("https://", "")}</p>
                        </a>
                        <a className="panel-interactive rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] p-4" href={profile.resumePath}>
                            <p className="technical-label">Resume</p>
                            <p className="mt-2 text-sm text-[var(--text-primary)]">Download PDF</p>
                        </a>
                    </div>
                </Panel>
            </div>
        </SectionBand>
    );
}
