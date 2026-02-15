import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white border-t border-white/10">

            <div className="
        max-w-6xl mx-auto
        px-6 py-16
        grid md:grid-cols-3
        gap-10
      ">

                {/* BRAND */}
                <div>
                    <h2 className="text-xl font-bold">
                        Nitish.dev
                    </h2>

                    <p className="text-slate-400 mt-4 text-sm leading-relaxed">
                        Backend Engineer focused on scalable APIs,
                        distributed systems, and AI-powered platforms.
                    </p>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className="font-semibold mb-4 text-blue-400">
                        Quick Links
                    </h3>

                    <ul className="space-y-2 text-slate-300 text-sm">
                        <li>
                            <a href="#home" className="hover:text-white">Home</a>
                        </li>
                        <li>
                            <a href="#about" className="hover:text-white">About</a>
                        </li>
                        <li>
                            <a href="#projects" className="hover:text-white">Projects</a>
                        </li>
                        <li>
                            <a href="#experience" className="hover:text-white">Experience</a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-white">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* SOCIALS */}
                <div>
                    <h3 className="font-semibold mb-4 text-blue-400">
                        Connect
                    </h3>

                    <div className="flex gap-4 text-xl">

                        <a
                            href="https://github.com/iamnitishsah"
                            target="_blank"
                            className="hover:text-white text-slate-400"
                        >
                            <FaGithub />
                        </a>

                        <a
                            href="https://linkedin.com/in/iamnitishsah"
                            target="_blank"
                            className="hover:text-white text-slate-400"
                        >
                            <FaLinkedin />
                        </a>

                        <a
                            href="mailto:iamnitishsah12@gmail.com"
                            className="hover:text-white text-slate-400"
                        >
                            <FaEnvelope />
                        </a>

                    </div>

                    {/* RESUME BUTTON */}
                    <a
                        href="/resume.pdf"
                        className="
              inline-block
              mt-6
              px-5 py-2
              rounded-lg
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              text-sm font-semibold
              hover:scale-105
              transition
            "
                    >
                        Download Resume
                    </a>
                </div>

            </div>

            {/* BOTTOM BAR */}
            <div className="
        border-t border-white/10
        text-center
        py-6
        text-sm text-slate-400
      ">
                © {new Date().getFullYear()} Nitish Kumar Sah · All rights reserved.
            </div>

        </footer>
    );
}
