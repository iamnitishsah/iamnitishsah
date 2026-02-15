export default function ProjectCard({ project }) {
    return (
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-lg">

            {/* IMAGE */}
            <div className="h-48 overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
            </div>

            {/* CONTENT */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-white">
                    {project.title}
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                    {project.description}
                </p>

                {/* TECH STACK */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.map((tech, index) => (
                        <span
                            key={index}
                            className="text-xs bg-white/10 text-slate-200 px-2 py-1 rounded-md"
                        >
              {tech}
            </span>
                    ))}
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-5">
                    <a
                        href={project.github}
                        target="_blank"
                        className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition"
                    >
                        GitHub
                    </a>

                    <a
                        href={project.live}
                        target="_blank"
                        className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                    >
                        Live Demo
                    </a>
                </div>
            </div>
        </div>
    );
}
