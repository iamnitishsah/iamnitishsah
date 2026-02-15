import { projects } from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";

export default function Projects() {
    return (
        <section
            id="projects"
            className="py-28 px-6 bg-slate-950 text-white"
        >
            <div className="max-w-6xl mx-auto">

                {/* SECTION TITLE */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Projects
                    </h2>
                    <p className="text-slate-400 mt-3">
                        A showcase of systems, platforms, and AI solutions I’ve engineered.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}