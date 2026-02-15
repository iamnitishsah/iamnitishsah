import { skills } from "../data/skills";
import SkillBadge from "../components/ui/SkillBadge";

export default function Skills() {
    return (
        <section
            id="skills"
            className="py-28 px-6 bg-slate-950 text-white"
        >
            <div className="max-w-6xl mx-auto">

                {/* TITLE */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Skills & Tech Stack
                    </h2>
                    <p className="text-slate-400 mt-3">
                        Technologies and tools I use to design, build, and scale systems.
                    </p>
                </div>

                {/* CATEGORY GRID */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {skills.map((group, index) => (
                        <div
                            key={index}
                            className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-lg"
                        >

                            {/* CATEGORY TITLE */}
                            <h3 className="text-lg font-semibold text-blue-400 mb-4">
                                {group.category}
                            </h3>

                            {/* SKILLS */}
                            <div className="flex flex-wrap gap-2">
                                {group.items.map((skill, i) => (
                                    <SkillBadge key={i} name={skill} />
                                ))}
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}
