import { about } from "../data/about";

export default function About() {
    return (
        <section
            id="about"
            className="relative py-24 px-6 bg-slate-900 text-white overflow-hidden"
        >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
            <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-3">
                    <span className="inline-block text-sm font-bold text-emerald-400 tracking-wider uppercase">
                        Professional Overview
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
                        About Me
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    {about.stats?.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:bg-slate-800/80 hover:border-emerald-500/30 transition-all duration-300"
                        >
                            <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-400 font-medium uppercase tracking-wide">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-300">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Engineering Secure Backend Systems
                                </h3>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                        {about.description}
                                    </p>
                                </div>
                            </div>

                            {about.education?.length > 0 && (
                                <div className="pt-4 border-t border-slate-700/50">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">
                                        Education
                                    </h4>
                                    <div className="space-y-3">
                                        {about.education.map((item) => (
                                            <div key={`${item.institute}-${item.duration}`} className="text-sm">
                                                <p className="text-white font-semibold">{item.institute}</p>
                                                <p className="text-slate-300">{item.degree}</p>
                                                <p className="text-slate-500">
                                                    {item.duration} | {item.location}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {about.coursework?.length > 0 && (
                                <div className="pt-4 border-t border-slate-700/50">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">
                                        Relevant Coursework
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {about.coursework.map((course) => (
                                            <span
                                                key={course}
                                                className="px-3 py-1 bg-slate-700/60 text-slate-300 text-xs font-medium rounded-full border border-slate-600/50"
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {about.achievements?.length > 0 && (
                                <div className="pt-4 border-t border-slate-700/50">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">
                                        Achievements
                                    </h4>
                                    <ul className="space-y-2">
                                        {about.achievements.map((item) => (
                                            <li key={item} className="text-slate-300 text-sm">
                                                - {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {about.extracurricular?.length > 0 && (
                                <div className="pt-4 border-t border-slate-700/50">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">
                                        Extracurricular Activities
                                    </h4>
                                    <ul className="space-y-2">
                                        {about.extracurricular.map((item) => (
                                            <li key={item} className="text-slate-300 text-sm">
                                                - {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="pt-4 border-t border-slate-700/50">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-3">
                                    Core Competencies
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full border border-emerald-500/20">
                                        API Security
                                    </span>
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full border border-emerald-500/20">
                                        Async Systems
                                    </span>
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full border border-emerald-500/20">
                                        Database Design
                                    </span>
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full border border-emerald-500/20">
                                        AI Integration
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {about.highlights.map((item, index) => (
                            <div
                                key={index}
                                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/80 hover:border-emerald-500/30 transition-all duration-300"
                            >
                                <div className="space-y-3">
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                                        {index === 0 && (
                                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                            </svg>
                                        )}
                                        {index === 1 && (
                                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                            </svg>
                                        )}
                                        {index === 2 && (
                                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        )}
                                        {index === 3 && (
                                            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M2 12h2m14.828 6.828l1.414 1.414M4.758 4.758L6.172 6.172m0 11.314l-1.414 1.414M19.242 4.758L17.828 6.172M12 8a4 4 0 100 8 4 4 0 000-8z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                                        <p className="text-sm text-slate-300 leading-relaxed mt-1">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}