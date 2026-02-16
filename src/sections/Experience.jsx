import { experiences } from "../data/experience";

export default function Experience() {
    return (
        <section
            id="experience"
            className="relative py-32 px-6 bg-slate-900 text-white overflow-hidden"
        >
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Experience
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        My professional journey and engineering contributions in backend development and AI systems.
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"></div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div
                                key={exp.id}
                                className="relative"
                                style={{
                                    animationDelay: `${index * 150}ms`,
                                }}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-blue-500 border-4 border-slate-900 z-10"></div>

                                {/* Content card */}
                                <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                                    <div className="group bg-slate-800/50 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm hover:transform hover:scale-105">
                                        {/* Header */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                                    {exp.role}
                                                </h3>
                                            </div>
                                            <p className="text-blue-400 font-semibold">
                                                {exp.company}
                                            </p>
                                            <p className="text-slate-400 text-sm flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {exp.duration}
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <ul className="space-y-2 mb-4">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-slate-300">
                                                    <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <p className="text-slate-400 mb-4">Want to know more about my work?</p>
                    <a
                        href={experiences[0]?.linkedinPost || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 rounded-xl transition-all duration-300 group"
                    >
                        <span className="font-medium">View Announcement</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}