import { useState } from "react";
import { profile } from "../../data/profile";
import useActiveSection from "../../hooks/useActiveSection";
import profilePhoto from "../../assets/images/Official.jpeg";

const links = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Focus", href: "#focus" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

const observedSections = ["home", ...links.map((link) => link.href.slice(1))];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const activeSection = useActiveSection(observedSections);

    return (
        <nav className="fixed left-0 top-0 z-50 w-full border-b border-[var(--border-subtle)] bg-[rgba(21,20,26,0.78)] shadow-[0_8px_32px_rgba(0,0,0,0.16)] backdrop-blur-xl">
            <div className="container-shell flex h-16 items-center justify-between">
                <a
                    href="#home"
                    className="group inline-flex items-center gap-3 font-mono text-sm font-semibold text-[var(--text-primary)] transition-opacity duration-200 hover:opacity-100"
                    aria-label={`${profile.name} home`}
                >
                    <img
                        src={profilePhoto}
                        alt=""
                        aria-hidden="true"
                        className="h-8 w-8 rounded-full border border-[var(--accent-border)] object-cover object-[50%_18%]"
                    />
                    <span className="hidden sm:inline">{profile.name}</span>
                </a>

                <ul className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
                    {links.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
                                className={`rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-all duration-200 ${
                                    activeSection === link.href.slice(1)
                                        ? "bg-white/[0.06] text-[var(--text-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                                        : "text-[var(--text-muted)] hover:bg-white/[0.035] hover:text-[var(--text-primary)]"
                                }`}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={() => setOpen(!open)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-white/[0.035] text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent-border)] hover:bg-white/[0.05] md:hidden"
                    aria-label="Toggle navigation menu"
                    aria-expanded={open}
                    aria-controls="mobile-navigation"
                >
                    <span className="font-mono text-sm">{open ? "ESC" : "NAV"}</span>
                </button>
            </div>

            {open && (
                <div id="mobile-navigation" className="border-t border-[var(--border-subtle)] bg-[var(--bg-raised)] md:hidden">
                    <ul className="container-shell grid gap-1 py-4">
                        {links.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
                                    className={`block rounded-[var(--radius-md)] px-3 py-3 text-sm font-medium ${
                                        activeSection === link.href.slice(1)
                                            ? "bg-white/[0.06] text-[var(--text-primary)]"
                                            : "text-[var(--text-secondary)] hover:bg-white/[0.035] hover:text-[var(--text-primary)]"
                                    }`}
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
