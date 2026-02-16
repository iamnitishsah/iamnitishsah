import { projects } from "../data/projects";
import { useState } from "react";

export default function Projects() {
    const [hoveredId, setHoveredId] = useState(null);

    // Dynamic gradient backgrounds for each project
    const getProjectGradient = (id) => {
        const gradients = [
            'bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700',
            'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600',
            'bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600',
            'bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600',
            'bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-600',
            'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600',
            'bg-gradient-to-br from-rose-600 via-red-600 to-orange-600',
            'bg-gradient-to-br from-teal-600 via-green-600 to-lime-600',
        ];
        return gradients[(id - 1) % gradients.length];
    };

    // Dynamic icons for each project type
    const getProjectIcon = (id, index) => {
        const icons = [
            // AI/Security icon for CampusSentinel
            <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>,
            // Medical/Health icon for MediMind
            <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>,
            // Finance/Chart icon for MetaFin
            <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>,
            // Shopping/Marketplace icon for NITR-Mart
            <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>,
            // Task/Checklist icon for TaskFlow
            <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>,
            // E-commerce/Cart icon
            <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>,
            // AI/Robot icon for Content Generator
            <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>,
            // DevOps/Server icon for Dashboard
            <svg className="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>,
        ];
        return icons[index % icons.length];
    };

    return (
        <section
            id="projects"
            className="relative py-32 px-6 bg-slate-950 text-white overflow-hidden"
        >
            {/* Animated background elements */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        A showcase of production-grade systems, AI-powered platforms, and backend architectures I've engineered.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="group relative"
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            {/* Card container */}
                            <div className="relative h-full bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-2">
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>

                                {/* Visual Header with Dynamic Gradients and Icons */}
                                <div className={`relative h-48 overflow-hidden ${getProjectGradient(project.id)}`}>
                                    {/* Animated Background Pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`
                                        }}></div>
                                    </div>

                                    {/* Large Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {getProjectIcon(project.id, index)}
                                    </div>

                                    {/* Tech Stack Pills Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 text-xs font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="px-2 py-1 text-xs font-medium bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white">
                                                +{project.tech.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Badge for achievements */}
                                    {project.achievement && (
                                        <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm text-yellow-900 text-xs font-bold rounded-full flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {project.achievement}
                                        </div>
                                    )}

                                    {/* Animated Particles */}
                                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
                                    <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                                </div>

                                {/* Content */}
                                <div className="relative p-6 space-y-4">
                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-300 leading-relaxed">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tech.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Links */}
                                    <div className="flex items-center gap-4 pt-4">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group/link"
                                            >
                                                <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                                <span className="text-sm font-medium">Code</span>
                                            </a>
                                        )}
                                        {project.live && project.live !== "#" && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group/link"
                                            >
                                                <svg className="w-5 h-5 group-hover/link:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                <span className="text-sm font-medium">Live Demo</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Hover effect indicator */}
                                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-300 ${hoveredId === project.id ? 'scale-x-100' : 'scale-x-0'}`}></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Projects CTA */}
                <div className="mt-16 text-center">
                    <a
                        href="https://github.com/iamnitishsah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 rounded-xl transition-all duration-300 group"
                    >
                        <span className="font-medium">View All Projects on GitHub</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}