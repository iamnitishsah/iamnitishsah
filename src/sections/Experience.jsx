import { experiences } from "../data/experience";
import { Divider, Metric } from "../components/ui";
import { ActionLink, Badge, Panel, Pill, PointList, SectionBand, TextStrip } from "./sectionShared";

export function Experience() {
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
                                    <Metric key={metric.label} label={metric.label} value={metric.value} />
                                ))}
                            </div>

                            <Panel className="bg-white/[0.02] p-5 shadow-none">
                                {experience.domains.map((domain) => (
                                    <TextStrip
                                        key={domain.title}
                                        label="Ownership Area"
                                        title={domain.title}
                                        meta={<p className="text-sm leading-6 text-[var(--text-muted)]">{domain.summary}</p>}
                                    >
                                        <PointList items={domain.items} className="md:grid-cols-3" />
                                    </TextStrip>
                                ))}
                            </Panel>

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
                                    <ActionLink href={experience.linkedinPost} kind="OPEN">
                                        LinkedIn Update
                                    </ActionLink>
                                ) : null}
                            </div>
                        </div>
                    </Panel>
                ))}
            </div>
        </SectionBand>
    );
}
