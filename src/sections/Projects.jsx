import { featuredProjects, secondaryProjects } from "../data/projects";
import { Divider } from "../components/ui";
import { ActionLink, Badge, Panel, Pill, PointList, SectionBand, TextStrip } from "./sectionShared";

export function FeaturedProjects() {
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

                                <div className="grid min-w-0 gap-2 sm:grid-cols-2 xl:w-[22rem]">
                                    {project.highlights?.map((item) => (
                                        <div
                                            key={item}
                                            className="rounded-[var(--radius-sm)] bg-white/[0.03] px-3 py-2.5 text-sm text-[var(--text-secondary)]"
                                        >
                                            <span className="font-mono text-xs text-[var(--text-muted)]">signal</span>
                                            <div className="mt-1 font-medium text-[var(--text-primary)]">{item}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5 p-5 md:p-6">
                            <Panel className="bg-white/[0.02] p-5 shadow-none">
                                <TextStrip label="System Shape" title="Backend Architecture">
                                    <PointList items={project.architecture} className="md:grid-cols-2" />
                                </TextStrip>

                                <TextStrip label="Hard Parts" title="Engineering Challenges">
                                    <PointList items={project.challenges} className="md:grid-cols-3" />
                                </TextStrip>

                                <TextStrip
                                    label="Capabilities"
                                    title="Core Systems"
                                    meta={
                                        <div className="flex flex-wrap gap-2">
                                            {project.systems?.map((item) => (
                                                <Pill key={item} className="font-mono text-xs uppercase">
                                                    {item}
                                                </Pill>
                                            ))}
                                        </div>
                                    }
                                >
                                    <div className="flex flex-wrap gap-2">
                                        {project.capabilities?.map((item) => (
                                            <Badge key={item}>{item}</Badge>
                                        ))}
                                    </div>
                                </TextStrip>
                            </Panel>

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
                                        <ActionLink
                                            key={`${project.id}-${link.label}`}
                                            href={link.href}
                                            kind={link.kind.toUpperCase()}
                                        >
                                            {link.label}
                                        </ActionLink>
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

export function SecondaryProjects() {
    return (
        <SectionBand
            id="secondary-projects"
            eyebrow="06 / Additional Builds"
            title="Supporting backend breadth"
            description="Additional builds that show range across auth, workflow handling, and backend orchestration."
        >
            <Panel className="p-5 md:p-6">
                {secondaryProjects.map((project) => (
                    <TextStrip
                        key={project.id}
                        label={project.status}
                        title={project.title}
                        meta={
                            <div className="flex flex-wrap gap-2">
                                <Badge>{project.category}</Badge>
                                {project.systems.map((item) => (
                                    <Pill key={item} className="font-mono text-xs uppercase">
                                        {item}
                                    </Pill>
                                ))}
                            </div>
                        }
                    >
                        <p>{project.problem}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tech.map((item) => (
                                <Pill key={item} className="font-mono text-xs uppercase">
                                    {item}
                                </Pill>
                            ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.links?.map((link) => (
                                <ActionLink
                                    key={`${project.id}-${link.label}`}
                                    href={link.href}
                                    kind={link.kind.toUpperCase()}
                                >
                                    {link.label}
                                </ActionLink>
                            ))}
                        </div>
                    </TextStrip>
                ))}
            </Panel>
        </SectionBand>
    );
}
