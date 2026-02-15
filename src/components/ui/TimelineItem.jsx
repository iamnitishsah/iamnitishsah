export default function TimelineItem({ exp }) {
    return (
        <div className="relative pl-10 pb-12">

            {/* TIMELINE LINE */}
            <div className="absolute left-2 top-2 w-3 h-3 bg-blue-500 rounded-full border-4 border-slate-950"></div>

            {/* CARD */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition">

                {/* ROLE */}
                <h3 className="text-xl font-bold text-white">
                    {exp.role}
                </h3>

                {/* COMPANY */}
                <p className="text-blue-400 font-medium mt-1">
                    {exp.company}
                </p>

                {/* DURATION */}
                <p className="text-slate-400 text-sm mt-1">
                    {exp.duration}
                </p>

                {/* DESCRIPTION */}
                <ul className="mt-4 space-y-2">
                    {exp.description.map((point, i) => (
                        <li
                            key={i}
                            className="text-slate-300 text-sm flex gap-2"
                        >
                            <span className="text-blue-400">▹</span>
                            {point}
                        </li>
                    ))}
                </ul>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-2 mt-5">
                    {exp.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="text-xs bg-white/10 text-slate-200 px-2 py-1 rounded-md"
                        >
              {tech}
            </span>
                    ))}
                </div>

            </div>
        </div>
    );
}
