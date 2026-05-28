export function Container({ children, className = "" }) {
    return <div className={`container-shell ${className}`}>{children}</div>;
}

export function Section({ children, id, className = "", labelledBy }) {
    return (
        <section id={id} className={`section-shell ${className}`} aria-labelledby={labelledBy}>
            {children}
        </section>
    );
}

export function Grid({ children, className = "" }) {
    return <div className={`grid gap-4 md:gap-5 ${className}`}>{children}</div>;
}

export function Panel({ children, className = "" }) {
    return <div className={`panel ${className}`}>{children}</div>;
}

export function Badge({ children, tone = "default", className = "" }) {
    const tones = {
        default: "border-[var(--border-medium)] bg-white/[0.035] text-[var(--text-secondary)]",
        accent: "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent-strong)]",
        success: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    };

    return (
        <span
            className={`inline-flex min-h-7 items-center gap-2 rounded-[var(--radius-sm)] border px-2.5 py-1 text-left font-mono text-[0.72rem] font-semibold leading-snug ${tones[tone]} ${className}`}
        >
            {children}
        </span>
    );
}

export function Pill({ children, className = "" }) {
    return (
        <span className={`inline-flex min-h-8 max-w-full items-center rounded-full border border-[var(--border-subtle)] bg-white/[0.03] px-3 py-1.5 text-left text-sm leading-snug text-[var(--text-secondary)] ${className}`}>
            {children}
        </span>
    );
}

export function Metric({ label, value, detail, className = "" }) {
    return (
        <div className={`rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.025)] p-4 ${className}`}>
            <div className="font-mono text-[0.72rem] font-semibold uppercase text-[var(--text-muted)]">{label}</div>
            <div className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)]">{value}</div>
            {detail ? <div className="mt-1 text-sm leading-6 text-[var(--text-muted)]">{detail}</div> : null}
        </div>
    );
}

export function Divider({ className = "" }) {
    return <div className={`h-px w-full bg-[var(--border-subtle)] ${className}`} role="presentation" />;
}

export function SectionHeading({ eyebrow, title, children, className = "", id }) {
    return (
        <div className={`max-w-3xl ${className}`}>
            {eyebrow ? <p className="technical-label mb-3">{eyebrow}</p> : null}
            <h2 id={id} className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-[2.1rem]">{title}</h2>
            {children ? <p className="copy-readable mt-4 text-base leading-7 text-[var(--text-secondary)] md:text-[1.05rem]">{children}</p> : null}
        </div>
    );
}

export function TerminalCard({ title = "system", lines = [], className = "" }) {
    return (
        <Panel className={`overflow-hidden ${className}`}>
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                <div className="font-mono text-xs font-semibold text-[var(--text-muted)]">{title}</div>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-[var(--text-faint)]" />
                    <span className="h-2 w-2 rounded-full bg-[var(--warning)]" />
                    <span className="h-2 w-2 rounded-full bg-[var(--success)]" />
                </div>
            </div>
            <div className="space-y-3 p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
                {lines.map((line) => (
                    <div key={line} className="flex gap-3">
                        <span className="text-[var(--accent)]">$</span>
                        <span>{line}</span>
                    </div>
                ))}
            </div>
        </Panel>
    );
}

export function TimelineItem({ label, title, children, className = "" }) {
    return (
        <div className={`relative border-l border-[var(--border-subtle)] pl-5 ${className}`}>
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-[var(--accent-border)] bg-[var(--bg-base)]" />
            <p className="technical-label">{label}</p>
            <h3 className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
            {children ? <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{children}</div> : null}
        </div>
    );
}
