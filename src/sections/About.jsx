import { about } from "../data/about";
import profileImg from "../assets/images/profile.jpg";

export default function About() {
    return (
        <section
            id="about"
            className="py-28 px-6 bg-slate-900 text-white"
        >
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                {/* LEFT — IMAGE */}
                <div className="flex justify-center">
                    <div className="
            w-64 h-64 md:w-80 md:h-80
            rounded-2xl
            overflow-hidden
            border border-white/10
            shadow-2xl
          ">
                        <img
                            src={profileImg}
                            alt="about profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* RIGHT — CONTENT */}
                <div>

                    {/* TITLE */}
                    <h2 className="text-3xl md:text-4xl font-bold">
                        About Me
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="
            text-slate-300
            mt-6
            leading-relaxed
            whitespace-pre-line
          ">
                        {about.description}
                    </p>

                    {/* HIGHLIGHTS GRID */}
                    <div className="grid sm:grid-cols-2 gap-4 mt-10">

                        {about.highlights.map((item, index) => (
                            <div
                                key={index}
                                className="
                  bg-slate-800
                  border border-white/10
                  rounded-xl
                  p-4
                  hover:bg-slate-700/50
                  transition
                "
                            >
                                <h3 className="font-semibold text-blue-400">
                                    {item.title}
                                </h3>

                                <p className="text-sm text-slate-300 mt-2">
                                    {item.description}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </section>
    );
}
