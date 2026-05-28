import { skills } from "../data/skills";
import { Panel, Pill, SectionBand, SignalRow } from "./sectionShared";

export function Skills() {
    return (
        <SectionBand
            id="skills"
            eyebrow="My Skills"
            title="Backend stack map"
            description="Grouped by engineering function for fast backend capability scanning."
        >
            <Panel className="overflow-hidden">
                <div className="border-b border-[var(--border-subtle)] p-5 md:p-6">
                    <div className="space-y-3">
                        <p className="technical-label">
                            Primary Stack
                        </p>

                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                            <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                                Systems-oriented backend capability coverage
                            </h3>

                            <SignalRow
                                items={[
                                    "SECURITY",
                                    "SCALABILITY",
                                    "API SYSTEMS",
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 p-5 md:p-6">
                    {skills.map((group) => (
                        <div
                            key={group.category}
                            className="border-b border-[var(--border-subtle)] pb-6 last:border-none last:pb-0"
                        >
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                                            {group.category}
                                        </h3>

                                        <SignalRow items={group.signals} />
                                    </div>

                                    <p className="max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
                                        {group.summary}
                                    </p>
                                </div>

                                <div className="shrink-0 text-xs font-medium tracking-[0.24em] text-[var(--text-tertiary)] uppercase">
                                    {String(group.items.length).padStart(2, "0")} Skills
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <Pill
                                        key={item}
                                        className="text-xs tracking-wide"
                                    >
                                        {item}
                                    </Pill>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Panel>
        </SectionBand>
    );
}