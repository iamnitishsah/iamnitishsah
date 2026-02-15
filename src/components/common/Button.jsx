export default function Button({ children, href, variant = "primary" }) {
    const base =
        "px-5 py-2.5 rounded-xl font-semibold transition-all duration-200";

    const styles = {
        primary:
            "bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:scale-105 shadow-lg",
        ghost:
            "border border-white/20 text-white hover:bg-white/10",
    };

    const className = `${base} ${styles[variant]}`;

    if (href) {
        return (
            <a href={href} className={className}>
                {children}
            </a>
        );
    }

    return <button className={className}>{children}</button>;
}
