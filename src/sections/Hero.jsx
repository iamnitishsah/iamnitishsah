import { useEffect, useRef } from "react";
import useTypewriter from "../hooks/useTypewriter";
import { profile } from "../data/profile";
import Button from "../components/common/Button";
import profileImg from "../assets/images/profilenitr.jpg";

export default function Hero() {
    const typedText = useTypewriter(profile.speciality);
    const canvasRef = useRef(null);
    const primaryCta = profile.ctas?.primary ?? {
        label: "View Projects",
        href: "#projects",
    };
    const secondaryCta = profile.ctas?.secondary ?? {
        label: "Schedule Interview",
        href: profile.resumePath,
    };
    const tertiaryCta = profile.ctas?.tertiary ?? {
        label: "Contact Me",
        href: "#contact",
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        const prefersReducedMotion =
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!ctx || prefersReducedMotion) {
            window.addEventListener("resize", setCanvasSize);
            return () => window.removeEventListener("resize", setCanvasSize);
        }

        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                vx: Math.random() * 0.3 - 0.15,
                vy: Math.random() * 0.3 - 0.15,
            });
        }

        let animationFrameId;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(16, 185, 129, 0.3)";

            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            setCanvasSize();
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 text-white px-6 py-20">
            {/* Animated Background Canvas */}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-20"
            />

            {/* Modern gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-slate-950 to-teal-950/40" aria-hidden="true"></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" aria-hidden="true"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
                {/* LEFT CONTENT */}
                <div className="space-y-7 animate-fade-in-up">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        </span>
                        <p className="text-emerald-400 font-semibold text-sm tracking-tight">
                            {profile.availability}
                        </p>
                        <span className="h-1 w-1 rounded-full bg-slate-600"></span>
                        <p className="text-slate-400 text-sm">{profile.location}</p>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
                                <span className="text-white">{profile.name.split(' ')[0]}</span>
                                <br />
                                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                                    {profile.name.split(' ').slice(1).join(' ')}
                                </span>
                            </h1>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-2xl md:text-3xl font-semibold text-slate-200 tracking-tight">
                                {profile.headline}
                            </h2>
                            <p className="text-lg text-slate-400 leading-relaxed max-w-2xl font-light">
                                {profile.summary}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-slate-300 font-medium">{profile.subtitle}</span>
                            </div>
                        </div>
                    </div>

                    {/* Role Typewriter */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl backdrop-blur-sm">
                        <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-slate-400 text-sm font-medium">Specializing in:</span>
                        <span className="text-emerald-400 font-semibold text-sm min-w-[200px]">
                            {typedText}
                        </span>
                        <span className="animate-pulse text-emerald-400 text-lg font-light">|</span>
                    </div>

                    {/* Key Roles - Looking for */}
                    <div className="space-y-2">
                        <p className="text-slate-400 text-sm font-medium">Open to Roles:</p>
                        <div className="flex flex-wrap gap-2">
                            {profile.roles?.map((role) => (
                                <span
                                    key={role}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium backdrop-blur-sm hover:bg-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-200"
                                >
                                    {role}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3 pt-3">
                        <Button href={primaryCta.href} variant="primary">
                            <span className="font-semibold">{primaryCta.label}</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Button>
                        <Button href={secondaryCta.href} variant="secondary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-semibold">{secondaryCta.label}</span>
                        </Button>
                        <Button href={tertiaryCta.href} variant="ghost">
                            <span className="font-medium">{tertiaryCta.label}</span>
                        </Button>
                    </div>

                    {/* Professional Links */}
                    <div className="flex items-center gap-5 pt-2 border-t border-slate-800">
                        <a
                            href={profile.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub profile"
                            className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            <span className="text-sm font-medium">GitHub</span>
                        </a>
                        <a
                            href={profile.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn profile"
                            className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            <span className="text-sm font-medium">LinkedIn</span>
                        </a>
                        <a
                            href={profile.socials.mail}
                            aria-label="Email"
                            className="group flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium">Email</span>
                        </a>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
                    <div className="relative group">
                        {/* Glowing effect */}
                        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

                        {/* Image container */}
                        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border-2 border-emerald-500/20 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300">
                            <img
                                src={profileImg}
                                alt="Nitish Kumar Sah - Backend Engineer"
                                className="w-full h-full object-cover"
                            />

                            {/* Professional overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                        </div>

                        {/* Decorative accent */}
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl blur-2xl -z-10"></div>
                        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-2xl blur-2xl -z-10"></div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Scroll</span>
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}