export default function Button({ children, href, variant = "primary", className = "", ...props }) {
    const baseStyles = "inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105";

    const variants = {
        primary: "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50",
        secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-white/10 hover:border-blue-500/30",
        ghost: "bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:border-white/20",
    };

    const styles = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        // External link
        if (href.startsWith('http') || href.startsWith('mailto')) {
            return (
                <a
                    href={href}
                    className={styles}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    {...props}
                >
                    {children}
                </a>
            );
        }

        // Internal anchor or download
        return (
            <a href={href} className={styles} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button className={styles} {...props}>
            {children}
        </button>
    );
}