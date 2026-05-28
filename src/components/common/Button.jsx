export default function Button({ children, href, variant = "primary", className = "", ...props }) {
    const baseStyles = "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] border px-4 py-2.5 text-sm font-semibold transition-all duration-200 ease-[var(--ease-standard)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-strong)]";

    const variants = {
        primary: "border-[var(--accent-border)] bg-[var(--accent)] text-[#06111f] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] hover:-translate-y-px hover:bg-[var(--accent-strong)] hover:shadow-[var(--shadow-focus)]",
        secondary: "border-[var(--border-medium)] bg-white/[0.045] text-[var(--text-primary)] hover:-translate-y-px hover:border-[var(--accent-border)] hover:bg-white/[0.07]",
        ghost: "border-transparent bg-transparent text-[var(--text-secondary)] hover:-translate-y-px hover:border-[var(--border-subtle)] hover:bg-white/[0.035] hover:text-[var(--text-primary)]",
    };

    const classes = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
