import { useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const links = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className="
      fixed top-0 left-0 w-full z-50
      bg-slate-950/80 backdrop-blur
      border-b border-white/10
    ">
            <div className="
        max-w-6xl mx-auto
        px-6 py-4
        flex justify-between items-center
      ">

                {/* LOGO */}
                <a
                    href="#home"
                    className="text-xl font-bold text-white"
                >
                    Nitish.dev
                </a>

                {/* DESKTOP LINKS */}
                <ul className="
          hidden md:flex
          gap-8
          text-slate-300
          font-medium
        ">
                    {links.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className="hover:text-white transition"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* MOBILE BUTTON */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white text-2xl"
                >
                    ☰
                </button>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="
          md:hidden
          bg-slate-950
          border-t border-white/10
        ">
                    <ul className="flex flex-col items-center py-6 gap-6 text-slate-300">

                        {links.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="hover:text-white transition"
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
