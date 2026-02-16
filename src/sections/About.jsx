import { about } from "../data/about";

export default function About() {
    return (
        <section
            id="about"
            className="relative py-32 px-6 bg-slate-950 text-white overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Description */}
                    <div className="space-y-6">
                        <div className="prose prose-lg prose-invert max-w-none">
                            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                {about.description}
                            </p>
                        </div>

                        {/* Stats/Quick Facts */}
                        <div className="grid grid-cols-3 gap-4 pt-8">
                            <div className="text-center p-4 bg-slate-900/50 border border-white/5 rounded-xl backdrop-blur-sm">
                                <div className="text-3xl font-bold text-blue-400">25+</div>
                                <div className="text-sm text-slate-400 mt-1">API Endpoints</div>
                            </div>
                            <div className="text-center p-4 bg-slate-900/50 border border-white/5 rounded-xl backdrop-blur-sm">
                                <div className="text-3xl font-bold text-blue-400">2+</div>
                                <div className="text-sm text-slate-400 mt-1">Hackathon Wins</div>
                            </div>
                            <div className="text-center p-4 bg-slate-900/50 border border-white/5 rounded-xl backdrop-blur-sm">
                                <div className="text-3xl font-bold text-blue-400">10+</div>
                                <div className="text-sm text-slate-400 mt-1">Projects Built</div>
                            </div>
                        </div>
                    </div>

                    {/* Highlights Grid */}
                    <div className="grid gap-4">
                        {about.highlights.map((item, index) => (
                            <div
                                key={index}
                                className="group relative bg-slate-900/50 border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm"
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-2xl transition-all duration-300"></div>

                                <div className="relative z-10 space-y-3">
                                    {/* Icon */}
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                        {index === 0 && (
                                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                            </svg>
                                        )}
                                        {index === 1 && (
                                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        )}
                                        {index === 2 && (
                                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                            </svg>
                                        )}
                                        {index === 3 && (
                                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-xl text-blue-400 group-hover:text-blue-300 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-slate-300 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <a
                        href="#experience"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                    >
                        <span className="font-medium">Explore My Journey</span>
                        <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}