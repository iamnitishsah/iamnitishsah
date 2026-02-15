import useTypewriter from "../hooks/useTypewriter";
import { profile } from "../data/profile";
import Button from "../components/common/Button";

import profileImg from "../assets/images/profile.jpg"; // add image here

export default function Hero() {
    const typedText = useTypewriter(profile.roles);

    return (
        <section className="min-h-[80vh] flex items-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-6">
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">

                {/* LEFT CONTENT */}
                <div>
                    <p className="text-blue-400 font-semibold mb-2">
                        Hi, I’m
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        {profile.name}
                    </h1>

                    <p className="text-slate-300 mt-3">
                        {profile.subtitle}
                    </p>

                    {/* TYPEWRITER */}
                    <div className="mt-5 text-lg font-semibold flex items-center gap-2">
                        <span className="text-slate-400">I build —</span>
                        <span className="text-white">
              {typedText}
            </span>
                        <span className="animate-pulse text-blue-400">|</span>
                    </div>

                    {/* CTA BUTTONS */}
                    <div className="flex gap-4 mt-8 flex-wrap">
                        <Button href="#projects">View Projects</Button>
                        <Button href={profile.resumePath} variant="ghost">
                            Download Resume
                        </Button>
                        <Button href={profile.socials.mail} variant="ghost">
                            Contact
                        </Button>
                    </div>

                    {/* SOCIALS */}
                    <div className="flex gap-4 mt-6 text-slate-400">
                        <a
                            href={profile.socials.github}
                            target="_blank"
                            className="hover:text-white"
                        >
                            GitHub
                        </a>
                        <a
                            href={profile.socials.linkedin}
                            target="_blank"
                            className="hover:text-white"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex justify-center">
                    <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <img
                            src={profileImg}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
