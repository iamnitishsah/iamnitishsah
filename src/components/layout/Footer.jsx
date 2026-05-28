import { profile } from "../../data/profile";
import Button from "../common/Button";
import { Container } from "../ui";

const links = [
    { name: "Home", href: "#home" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Focus", href: "#focus" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-base)] text-[var(--text-secondary)]">
            <Container className="grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:py-16">
                <div>
                    <h2 className="font-mono text-sm font-semibold text-[var(--text-primary)]">{profile.name}</h2>
                    <p className="mt-4 max-w-md text-sm leading-6 text-[var(--text-muted)]">
                        {profile.headline}
                    </p>
                </div>

                <nav aria-label="Footer navigation">
                    <h3 className="technical-label mb-4">Map</h3>
                    <ul className="grid gap-2 text-sm">
                        {links.map((link) => (
                            <li key={link.name}>
                                <a className="text-[var(--link)] underline decoration-[var(--link-border)] underline-offset-4 transition-colors hover:text-[var(--link-strong)]" href={link.href}>
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div>
                    <h3 className="technical-label mb-4">Connect</h3>
                    <div className="flex flex-wrap gap-3">
                        <a className="text-sm text-[var(--link)] underline decoration-[var(--link-border)] underline-offset-4 hover:text-[var(--link-strong)]" href={profile.socials.github} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <a className="text-sm text-[var(--link)] underline decoration-[var(--link-border)] underline-offset-4 hover:text-[var(--link-strong)]" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                        <a className="text-sm text-[var(--link)] underline decoration-[var(--link-border)] underline-offset-4 hover:text-[var(--link-strong)]" href={profile.socials.mail}>
                            Email
                        </a>
                    </div>
                    <Button href={profile.resumePath} variant="secondary" className="mt-6 border-[var(--link-border)] text-[var(--link)] hover:border-[var(--link-strong)] hover:text-[var(--link-strong)]">
                        Download Resume
                    </Button>
                </div>
            </Container>

            <div className="border-t border-[var(--border-subtle)] py-5 text-center text-xs text-[var(--text-faint)]">
                © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </div>
        </footer>
    );
}
