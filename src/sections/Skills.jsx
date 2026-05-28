import { skills } from "../data/skills";
import { Panel, Pill, SectionBand, SignalRow, TextStrip } from "./sectionShared";

export function Skills() {
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

                    <div className="p-5 md:p-6">
                        {skills.map((group) => (
                            <TextStrip
                                key={group.category}
                                label={`${String(group.items.length).padStart(2, "0")} Skills`}
                                title={group.category}
                                meta={<SignalRow items={group.signals} />}
                            >
                                <p>{group.summary}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {group.items.map((item) => (
                                        <Pill key={item} className="font-mono text-xs uppercase">
                                            {item}
                                        </Pill>
                                    ))}
                                </div>
                            </TextStrip>
                        ))}
                    </div>
                </Panel>
            </div>
        </SectionBand>
    );
}
