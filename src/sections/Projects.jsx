import { featuredProjects } from "../data/projects";
import {
    ActionLink,
    Badge,
    Panel,
    Pill,
    PointList,
    SectionBand,
    TextStrip,
} from "./sectionShared";

function ProjectLinks({ project }) {
    return (
        <div className="flex flex-wrap gap-2">
            {project.links?.map((link) => (
                <ActionLink
                    key={`${project.id}-${link.label}`}
                    href={link.href}
                    kind={link.kind?.toUpperCase?.() ?? "DEFAULT"}
                >
                    {link.label}
                </ActionLink>
            ))}
        </div>
    );
}

export function FeaturedProjects() {
    const featured = featuredProjects.slice(0, 3);

    return (
        <SectionBand
            id="projects"
            eyebrow="My Projects"
            title="Featured Projects"
            description="System narratives focused on problem shape, architecture, constraints, and operational capability."
        >
            <div className="grid gap-5">
                {featured.map((project) => {
                    const isFlagship =
                        project.status?.toLowerCase() === "flagship";

                    return (
                        <Panel
                            key={project.id}
                            className={`panel-interactive overflow-hidden ${
                                isFlagship
                                    ? "border-[var(--accent-border)] shadow-[0_10px_40px_rgba(0,0,0,0.22)]"
                                    : ""
                            }`}
                        >
                            <div className="border-b border-[var(--border-subtle)] p-5 md:p-6">
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {project.status ? (
                                                <Badge
                                                    tone={
                                                        isFlagship
                                                            ? "accent"
                                                            : "default"
                                                    }
                                                >
                                                    {project.status}
                                                </Badge>
                                            ) : null}

                                            <Badge>
                                                {project.category}
                                            </Badge>

                                            {project.achievement ? (
                                                <Badge tone="accent">
                                                    {project.achievement}
                                                </Badge>
                                            ) : null}
                                        </div>

                                        <ProjectLinks project={project} />
                                    </div>

                                    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)] xl:items-start">
                                        <div className="max-w-3xl">
                                            <h3 className="text-5xl font-semibold tracking-tight text-[var(--text-primary)] md:text-6xl">
                                                {project.title}
                                            </h3>

                                            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
                                                {project.problem}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="technical-label">
                                                Project Signals
                                            </p>

                                            <div className="mt-3 grid min-w-0 gap-2 sm:grid-cols-2 xl:grid-cols-1">
                                                {(
                                                    project.highlights?.length
                                                        ? project.highlights
                                                        : project.capabilities?.slice(
                                                            0,
                                                            3
                                                        )
                                                )?.map((item) => (
                                                    <div
                                                        key={item}
                                                        className="rounded-[var(--radius-sm)] border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-sm font-medium text-[var(--text-primary)]"
                                                    >
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-5 p-5 md:p-6">
                                <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)]">
                                    <Panel className="bg-white/[0.02] p-5 shadow-none">
                                        <TextStrip
                                            label="Hard Parts"
                                            title="Engineering Challenges"
                                        >
                                            <PointList
                                                items={project.challenges}
                                                className="md:grid-cols-1"
                                            />
                                        </TextStrip>

                                        <TextStrip
                                            label="System Shape"
                                            title="Backend Architecture"
                                        >
                                            <PointList
                                                items={project.architecture}
                                                className="md:grid-cols-1"
                                            />
                                        </TextStrip>
                                    </Panel>

                                    <Panel className="grid content-start gap-5 bg-white/[0.02] p-5 shadow-none">
                                        <div>
                                            <p className="technical-label">
                                                Stack
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {project.tech.map((item) => (
                                                    <Pill
                                                        key={item}
                                                        className="font-mono text-xs uppercase"
                                                    >
                                                        {item}
                                                    </Pill>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="technical-label">
                                                Core Systems
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {project.systems?.map(
                                                    (item) => (
                                                        <Pill
                                                            key={item}
                                                            className="font-mono text-xs uppercase"
                                                        >
                                                            {item}
                                                        </Pill>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <p className="technical-label">
                                                Capabilities
                                            </p>

                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {project.capabilities?.map(
                                                    (item) => (
                                                        <Pill
                                                            key={item}
                                                            className="font-mono text-xs"
                                                        >
                                                            {item}
                                                        </Pill>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </Panel>
                                </div>
                            </div>
                        </Panel>
                    );
                })}
            </div>
        </SectionBand>
    );
}