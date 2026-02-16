import { useEffect, useRef } from "react";
import useTypewriter from "../hooks/useTypewriter";
import { profile } from "../data/profile";
import Button from "../components/common/Button";
import profileImg from "../assets/images/profile.jpg";

export default function Hero() {
    const typedText = useTypewriter(profile.roles);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 0.5 - 0.25,
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(59, 130, 246, 0.5)";

            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white px-6">
            {/* Animated Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none opacity-20"
            />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
                {/* LEFT CONTENT */}
                <div className="space-y-8 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                        <p className="text-blue-300 font-medium text-sm">
                            Available for opportunities
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                            {profile.name}
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 font-light">
                            {profile.subtitle}
                        </p>
                    </div>

                    {/* TYPEWRITER */}
                    <div className="flex items-center gap-3 text-lg md:text-xl">
                        <span className="text-slate-400 font-medium">I am</span>
                        <span className="text-blue-400 font-mono font-semibold">
                            {typedText}
                        </span>
                        <span className="animate-pulse text-blue-400 text-2xl">|</span>
                    </div>

                    {/* CTA BUTTONS */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button href="#projects" variant="primary">
                            <span>View Projects</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Button>
                        <Button href={profile.resumePath} variant="secondary">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Resume</span>
                        </Button>
                        <Button href="#contact" variant="ghost">
                            Contact Me
                        </Button>
                    </div>

                    {/* SOCIAL LINKS */}
                    <div className="flex items-center gap-6 pt-4">
                        <a
                            href={profile.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            <span className="font-medium">GitHub</span>
                        </a>
                        <a
                            href={profile.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            <span className="font-medium">LinkedIn</span>
                        </a>
                        <a
                            href={profile.socials.mail}
                            className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">Email</span>
                        </a>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
                    <div className="relative group">
                        {/* Glowing effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity"></div>

                        {/* Image container */}
                        <div className="relative w-72 h-72 md:w-108 md:h-108 rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                            <img
                                src={profileImg}
                                alt="Nitish Kumar Sah"
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}