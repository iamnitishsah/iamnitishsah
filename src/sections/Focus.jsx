import { engineeringFocus } from "../data/focus";
import { profile } from "../data/profile";
import { Panel, SectionBand, SignalRow, TextStrip } from "./sectionShared";

export function Focus() {
    return (
        <SectionBand
            id="focus"
            eyebrow="Focusd on"
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
                        </div>
                    </div>

                    <div className="p-5 md:p-6">
                        {engineeringFocus.map((item) => (
                            <TextStrip
                                key={item.title}
                                label="Capability Domain"
                                title={item.title}
                                meta={<SignalRow items={item.labels} />}
                            >
                                {item.description}
                            </TextStrip>
                        ))}
                    </div>
                </Panel>
            </div>
        </SectionBand>
    );
}
