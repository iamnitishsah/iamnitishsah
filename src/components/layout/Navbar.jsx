import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* LOGO */}
                <a
                    href="#home"
                    className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                >
                    Nitish Sah
                </a>

                {/* DESKTOP LINKS */}
                <ul className="hidden md:flex gap-8 text-slate-300 font-medium">
                    {links.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className="hover:text-emerald-400 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                    ))}
                </ul>

                {/* MOBILE BUTTON */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white text-2xl"
                    aria-label="Toggle menu"
                >
                    {open ? '✕' : '☰'}
                </button>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/50">
                    <ul className="flex flex-col items-center py-6 gap-6 text-slate-300">
                        {links.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="hover:text-emerald-400 transition-colors text-lg"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}