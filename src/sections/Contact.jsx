import { contact } from "../data/contact";
import { profile } from "../data/profile";
import { Panel, Badge, Pill, SectionBand } from "./sectionShared";

export function Contact() {
    return (
        <SectionBand
            id="contact"
            eyebrow="08 / Contact"
            title="Professional availability"
            description="Current role interest, core backend focus, and direct hiring paths."
            className="pb-20 md:pb-24"
        >
            <Panel className="p-5 md:p-6">
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(300px,0.82fr)]">
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <Badge tone="success">{contact.availability}</Badge>
                            <Badge>{profile.location}</Badge>
                        </div>

                        <h3 className="mt-5 max-w-3xl text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                            Open to backend engineering work with security, workflows, and async systems at the core.
                        </h3>
                        <p className="copy-readable mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)]">
                            {contact.closing}
                        </p>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
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
                    </div>

                    <div>
                        <p className="technical-label">Direct Channels</p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                            <a className="panel-interactive rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-4 py-3" href={`mailto:${contact.email}`}>
                                <p className="technical-label">Email</p>
                                <p className="mt-1 break-words text-sm text-[var(--text-primary)]">{contact.email}</p>
                            </a>
                            <a className="panel-interactive rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-4 py-3" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                                <p className="technical-label">LinkedIn</p>
                                <p className="mt-1 break-words text-sm text-[var(--text-primary)]">{contact.linkedin.replace("https://", "")}</p>
                            </a>
                            <a className="panel-interactive rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-4 py-3" href={contact.github} target="_blank" rel="noopener noreferrer">
                                <p className="technical-label">GitHub</p>
                                <p className="mt-1 break-words text-sm text-[var(--text-primary)]">{contact.github.replace("https://", "")}</p>
                            </a>
                            <a className="panel-interactive rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-4 py-3" href={profile.resumePath}>
                                <p className="technical-label">Resume</p>
                                <p className="mt-1 text-sm text-[var(--text-primary)]">Download PDF</p>
                            </a>
                        </div>
                    </div>
                </div>
            </Panel>
        </SectionBand>
    );
}
