import { experiences } from "../data/experience";
import TimelineItem from "../components/ui/TimelineItem";

export default function Experience() {
    return (
        <section
            id="experience"
            className="py-28 px-6 bg-slate-900 text-white"
        >
            <div className="max-w-5xl mx-auto">

                {/* TITLE */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Experience
                    </h2>
                    <p className="text-slate-400 mt-3">
                        My professional journey and engineering contributions.
                    </p>
                </div>

                {/* TIMELINE WRAPPER */}
                <div className="relative border-l border-white/10 ml-4">
                    {experiences.map((exp) => (
                        <TimelineItem key={exp.id} exp={exp} />
                    ))}
                </div>

            </div>
        </section>
    );
}
