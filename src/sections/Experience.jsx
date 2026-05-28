import { experiences } from "../data/experience";
import { Metric } from "../components/ui";
import { ActionLink, Badge, Panel, Pill, PointList, SectionBand, TextStrip } from "./sectionShared";

export function Experience() {
    return (
        <SectionBand
            id="experience"
            eyebrow="My Experience"
            title="Backend Ownership in Production"
            description="Implementation depth across authentication, async processing, API engineering, and operational reliability."
        >
            <div className="grid gap-5">
                {experiences.map((experience) => {
                    const [companyName, companyContext] = experience.company.split(" — ");

                    return (
                        <Panel key={experience.id} className="panel-interactive overflow-hidden">
                            <div className="border-b border-[var(--border-subtle)] p-5 md:p-6">
                                <div className="grid gap-5">
                                    <p className="technical-label">backend ownership</p>
                                    <div>
                                        <h3 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-[2.4rem]">
                                            {companyName}
                                        </h3>
                                        {companyContext ? (
                                            <p className="mt-2 text-sm text-[var(--text-muted)]">{companyContext}</p>
                                        ) : null}
                                    </div>

                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-lg font-semibold text-[var(--accent-strong)]">
                                            {experience.role}
                                        </p>
                                        <Badge tone="accent" className="w-fit sm:ml-auto">
                                            {experience.duration}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
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
                            </div>
                        </Panel>
                    );
                })}
            </div>
        </SectionBand>
    );
}
