export default function Button({ children, href, variant = "primary", className = "", ...props }) {
    const baseStyles = "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300";

    const variants = {
        primary: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40",
        secondary: "bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/50 text-white",
        ghost: "bg-transparent hover:bg-slate-800/50 border border-slate-700 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50",
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