import { projects } from "../data/projects";

export default function Projects() {
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
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <article
                            key={project.id}
                            className="group relative bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-4 p-6 border-b border-white/5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a4 4 0 00-4 4v2a4 4 0 004 4m0-10a4 4 0 014 4v2a4 4 0 01-4 4m0 0v2m0-2a4 4 0 01-4-4v-2a4 4 0 014-4m0 10a4 4 0 004-4v-2a4 4 0 00-4-4" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 hover:text-white hover:border-blue-500/40 transition-colors"
                                            >
                                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                                Code
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 hover:text-white hover:border-blue-500/40 transition-colors"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276a1 1 0 010 1.788L15 16.34M4 6h10a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                                                </svg>
                                                Demo
                                            </a>
                                        )}
                                        {project.live && project.live !== "#" && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 hover:text-white hover:border-blue-500/40 transition-colors"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                Live
                                            </a>
                                        )}
                                        {project.achievement && (
                                            <span className="inline-flex items-center rounded-full bg-yellow-500/15 text-yellow-300 px-3 py-1 text-xs font-medium border border-yellow-500/30">
                                                {project.achievement}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <p className="text-slate-300 leading-relaxed [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.slice(0, 6).map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                    {project.tech.length > 6 && (
                                        <span className="px-3 py-1 text-xs font-medium bg-white/5 text-slate-300 border border-white/10 rounded-full">
                                            +{project.tech.length - 6}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </article>
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