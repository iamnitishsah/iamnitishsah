import { Badge, Container, Panel, Pill, Section, SectionHeading } from "../components/ui";

export function SectionBand({ id, eyebrow, title, description, children, className = "" }) {
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

export function SignalRow({ items }) {
    return (
        <div className="chip-wrap">
            {items.map((item) => (
                <Badge key={item}>{item}</Badge>
            ))}
        </div>
    );
}

export function TextStrip({ label, title, children, meta, className = "" }) {
    return (
        <div className={`grid gap-4 border-t border-[var(--border-subtle)] py-4 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] ${className}`}>
            <div>
                {label ? <p className="technical-label">{label}</p> : null}
                <h4 className="mt-2 text-base font-semibold text-[var(--text-primary)]">{title}</h4>
                {meta ? <div className="mt-3">{meta}</div> : null}
            </div>
            <div className="text-sm leading-7 text-[var(--text-secondary)]">
                {children}
            </div>
        </div>
    );
}

export function PointList({ items, className = "" }) {
    return (
        <div className={`grid gap-2 ${className}`}>
            {items?.map((item) => (
                <div
                    key={item}
                    className="flex gap-3 rounded-[var(--radius-sm)] bg-white/[0.025] px-3 py-2 text-sm leading-6 text-[var(--text-secondary)]"
                >
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--accent)]" aria-hidden="true" />
                    <span>{item}</span>
                </div>
            ))}
        </div>
    );
}

export function ActionLink({ href, children, kind }) {
    return (
        <a
            href={href}
            target={href?.startsWith("#") || href?.startsWith("/") ? undefined : "_blank"}
            rel={href?.startsWith("#") || href?.startsWith("/") ? undefined : "noopener noreferrer"}
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--accent-border)] hover:bg-white/[0.045] hover:text-[var(--text-primary)]"
        >
            {children}
            {kind ? <span className="font-mono text-xs text-[var(--text-muted)]">{kind}</span> : null}
        </a>
    );
}

export { Badge, Panel, Pill };
