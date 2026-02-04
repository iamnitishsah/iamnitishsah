import { useState, useEffect } from 'react';


function App() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsLoaded(true);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const projects = [
        {
            title: "CampusSentinel",
            subtitle: "AI Campus Surveillance",
            achievement: "Runners-Up at IIT Guwahati",
            tech: ["Django REST", "FastAPI", "PostgreSQL", "LangGraph", "JWT"],
            highlights: [
                "Relational PostgreSQL data model with 12+ indexed tables",
                "Microservice backend with 10+ endpoints and JWT auth",
                "A.R.I.A. FastAPI agent with four tool integrations"
            ],
            github: "https://github.com/iamnitishsah/CampusSentinel",
            demo: "https://www.youtube.com/watch?v=egYNxHbyYaM"
        },
        {
            title: "MediMind",
            subtitle: "AI-Powered Medical Assistant",
            tech: ["Django REST", "FastAPI", "PostgreSQL", "LangChain", "Gemini 2.5"],
            highlights: [
                "REST APIs with 15+ endpoints and normalized PostgreSQL schema",
                "Django REST backend with Gunicorn + FastAPI microservice",
                "LangChain + Google Gemini 2.5 with Pydantic v2 validation"
            ],
            github: "https://github.com/iamnitishsah/MediMind",
            demo: "https://medimindai.vercel.app/"
        }
    ];

    const experiences = [
        {
            company: "Saptang Labs",
            role: "Software Engineer Intern",
            domain: "Computer & Network Security",
            period: "Dec 2025 - Present",
            location: "Remote",
            achievements: [
                "Designed production-grade backend REST APIs using FastAPI with RBAC and authentication flows",
                "Implemented activity logging, pagination, and audit-ready data pipelines"
            ]
        }
    ];

    const achievements = [
        "Runners-Up, Ethos 2025, IIT Guwahati",
        "2nd Runners-Up, Hackfest'25, IIT-ISM Dhanbad",
        "Supervised Machine Learning - DeepLearning.AI",
        "Advanced Learning Algorithms - DeepLearning.AI"
    ];

    const skills = {
        "Languages": ["Python", "C++", "JavaScript", "SQL"],
        "Databases": ["MongoDB", "PostgreSQL", "MySQL", "Pinecone", "Redis"],
        "Frameworks": ["FastAPI", "Django REST", "React.js", "LangChain", "Pydantic"],
        "Cloud & DevOps": ["AWS (EC2, RDS)", "Docker", "Git", "GitHub", "Cloudinary"],
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
            {/* Cursor follower */}
            <div
                className="fixed w-96 h-96 rounded-full pointer-events-none z-0 blur-3xl opacity-20 transition-all duration-700"
                style={{
                    background: 'radial-gradient(circle, #00ff87 0%, transparent 70%)',
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                }}
            />

            <div className="relative z-10">
                {/* Navigation */}
                <nav className={`fixed top-0 w-full backdrop-blur-md bg-[#0a0a0a]/80 border-b border-[#00ff87]/10 z-50 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="text-2xl font-bold tracking-tighter">
                            <span className="text-[#00ff87]">NK</span>SAH
                        </div>
                        <div className="flex gap-8">
                            {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item, i) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm uppercase tracking-wider hover:text-[#00ff87] transition-all duration-300 relative group"
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00ff87] group-hover:w-full transition-all duration-300"></span>
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
                    <div className={`max-w-6xl w-full transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-2 border border-[#00ff87]/30 rounded-full text-sm text-[#00ff87] mb-6 animate-pulse">
                                Available for opportunities
                            </div>

                            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
                                NITISH<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] to-[#00ffff]">
                  KUMAR SAH
                </span>
                            </h1>

                            <div className="flex flex-wrap gap-4 text-xl md:text-2xl text-gray-400 font-light tracking-wide">
                                <span className="border-l-2 border-[#00ff87] pl-4">Backend Engineer</span>
                                <span className="border-l-2 border-[#00ff87] pl-4">AI/ML Enthusiast</span>
                                <span className="border-l-2 border-[#00ff87] pl-4">Competitive Programmer</span>
                            </div>

                            <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mt-8">
                                Biotechnology student at NIT Rourkela with a passion for building scalable backend systems,
                                AI-powered solutions, and solving complex problems. Hackathon winner with hands-on experience
                                in production-grade API development and microservices architecture.
                            </p>

                            <div className="flex gap-6 mt-12">
                                <a
                                    href="#projects"
                                    className="px-8 py-4 bg-[#00ff87] text-black font-bold uppercase tracking-wider hover:bg-[#00ff87]/90 transition-all duration-300 hover:scale-105"
                                >
                                    View Projects
                                </a>
                                <a
                                    href="#contact"
                                    className="px-8 py-4 border-2 border-[#00ff87] text-[#00ff87] font-bold uppercase tracking-wider hover:bg-[#00ff87] hover:text-black transition-all duration-300"
                                >
                                    Get in Touch
                                </a>
                            </div>

                            <div className="flex gap-6 mt-8">
                                {[
                                    { icon: '⚡', url: 'https://github.com/iamnitishsah', label: 'GitHub' },
                                    { icon: '💼', url: 'https://www.linkedin.com/in/iamnitishsah/', label: 'LinkedIn' },
                                    { icon: '🧠', url: 'https://leetcode.com/u/iamnitishsah/', label: 'LeetCode' },
                                    { icon: '👨‍💻', url: 'https://codeforces.com/profile/nitiSHadow', label: 'Codeforces' },
                                ].map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative"
                                    >
                                        <div className="text-2xl hover:scale-110 transition-transform duration-300">
                                            {social.icon}
                                        </div>
                                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-[#00ff87] text-black px-2 py-1 rounded whitespace-nowrap">
                      {social.label}
                    </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-32 px-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff87]/5 to-transparent"></div>
                    <div className="max-w-6xl mx-auto relative">
                        <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">
                            ABOUT <span className="text-[#00ff87]">ME</span>
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div className="border-l-4 border-[#00ff87] pl-6">
                                    <h3 className="text-2xl font-bold mb-2">Education</h3>
                                    <p className="text-xl text-gray-300">B.Tech in Biotechnology</p>
                                    <p className="text-gray-400">National Institute of Technology, Rourkela</p>
                                    <p className="text-sm text-[#00ff87]">Aug 2023 - Present</p>
                                </div>

                                <div className="border-l-4 border-[#00ff87] pl-6">
                                    <h3 className="text-2xl font-bold mb-2">School</h3>
                                    <p className="text-xl text-gray-300">CBSE, Science (PCM)</p>
                                    <p className="text-gray-400">DAV Public School, Hehal, Ranchi</p>
                                    <p className="text-sm text-[#00ff87]">2022</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold mb-4">Coursework</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        "Data Structures",
                                        "DBMS",
                                        "OOP",
                                        "Machine Learning",
                                        "Computer Networks",
                                        "Operating Systems"
                                    ].map((course, i) => (
                                        <div
                                            key={course}
                                            className="px-4 py-3 bg-white/5 border border-[#00ff87]/20 hover:border-[#00ff87] transition-all duration-300 hover:translate-x-2"
                                            style={{ animationDelay: `${i * 50}ms` }}
                                        >
                                            <span className="text-sm">{course}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" className="py-32 px-6 bg-gradient-to-b from-transparent to-[#00ff87]/5">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">
                            WORK <span className="text-[#00ff87]">EXPERIENCE</span>
                        </h2>

                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="group mb-12 p-8 border-l-4 border-[#00ff87] bg-white/5 hover:bg-white/10 transition-all duration-500 hover:translate-x-4"
                            >
                                <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                                    <div>
                                        <h3 className="text-3xl font-bold mb-2">{exp.company}</h3>
                                        <p className="text-xl text-[#00ff87]">{exp.role}</p>
                                        <p className="text-gray-400">{exp.domain}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-400">{exp.period}</p>
                                        <p className="text-sm text-gray-500">{exp.location}</p>
                                    </div>
                                </div>

                                <ul className="space-y-3 mt-6">
                                    {exp.achievements.map((achievement, i) => (
                                        <li key={i} className="flex gap-3 text-gray-300">
                                            <span className="text-[#00ff87] mt-1">▹</span>
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" className="py-32 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">
                            FEATURED <span className="text-[#00ff87]">PROJECTS</span>
                        </h2>

                        <div className="space-y-16">
                            {projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="group relative border border-[#00ff87]/20 p-8 hover:border-[#00ff87] transition-all duration-500 bg-gradient-to-br from-white/5 to-transparent hover:from-white/10"
                                >
                                    {/* Project number */}
                                    <div className="absolute -top-6 -left-6 text-8xl font-black text-[#00ff87]/10 group-hover:text-[#00ff87]/20 transition-all duration-500">
                                        0{index + 1}
                                    </div>

                                    <div className="relative">
                                        <div className="mb-6">
                                            {project.achievement && (
                                                <span className="inline-block px-3 py-1 bg-[#00ff87] text-black text-xs font-bold uppercase tracking-wider mb-4">
                          {project.achievement}
                        </span>
                                            )}
                                            <h3 className="text-4xl font-black mb-2">{project.title}</h3>
                                            <p className="text-xl text-gray-400">{project.subtitle}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-[#00ff87]/10 border border-[#00ff87]/30 text-[#00ff87] text-sm"
                                                >
                          {tech}
                        </span>
                                            ))}
                                        </div>

                                        <ul className="space-y-3 mb-8">
                                            {project.highlights.map((highlight, i) => (
                                                <li key={i} className="flex gap-3 text-gray-300">
                                                    <span className="text-[#00ff87] mt-1">▹</span>
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex gap-4">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 border-2 border-[#00ff87] text-[#00ff87] font-bold uppercase tracking-wider text-sm hover:bg-[#00ff87] hover:text-black transition-all duration-300"
                                            >
                                                View Code
                                            </a>
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 bg-[#00ff87] text-black font-bold uppercase tracking-wider text-sm hover:bg-[#00ff87]/90 transition-all duration-300"
                                            >
                                                Live Demo
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" className="py-32 px-6 bg-gradient-to-b from-transparent via-[#00ff87]/5 to-transparent">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">
                            TECHNICAL <span className="text-[#00ff87]">SKILLS</span>
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {Object.entries(skills).map(([category, items], index) => (
                                <div
                                    key={category}
                                    className="p-6 border border-[#00ff87]/20 hover:border-[#00ff87] transition-all duration-500 bg-white/5 hover:bg-white/10"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <h3 className="text-2xl font-bold mb-4 text-[#00ff87]">{category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {items.map((item, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-2 bg-white/5 border border-white/10 text-sm hover:border-[#00ff87] transition-all duration-300"
                                            >
                        {item}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Achievements */}
                        <div className="mt-16">
                            <h3 className="text-3xl font-bold mb-8">Achievements & Certifications</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {achievements.map((achievement, i) => (
                                    <div
                                        key={i}
                                        className="p-4 border-l-4 border-[#00ff87] bg-white/5 hover:bg-white/10 transition-all duration-300 hover:translate-x-2"
                                    >
                                        <p className="text-gray-300">{achievement}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Extracurricular */}
                <section className="py-32 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter">
                            EXTRA<span className="text-[#00ff87]">CURRICULAR</span>
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { club: "Pantomime", role: "Treasurer", period: "Mar 2024 - Present" },
                                { club: "Webwiz", role: "Technical Team Member", period: "Jan 2025 - Present" },
                                { club: "Innovision", role: "Coordinator", period: "Sep 2024 - Nov 2024" }
                            ].map((activity, i) => (
                                <div
                                    key={i}
                                    className="p-6 bg-white/5 border border-[#00ff87]/20 hover:border-[#00ff87] transition-all duration-300 hover:scale-105"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-[#00ff87]">{activity.club}</h3>
                                    <p className="text-gray-300 mb-2">{activity.role}</p>
                                    <p className="text-sm text-gray-500">{activity.period}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-32 px-6 bg-gradient-to-t from-[#00ff87]/10 to-transparent">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
                            LET'S <span className="text-[#00ff87]">CONNECT</span>
                        </h2>

                        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        </p>

                        <div className="flex flex-col gap-6 items-center mb-12">
                            <a
                                href="mailto:iamnitishsah12@gmail.com"
                                className="text-2xl md:text-3xl font-bold text-[#00ff87] hover:underline"
                            >
                                iamnitishsah12@gmail.com
                            </a>
                            <a
                                href="tel:+918862887291"
                                className="text-xl text-gray-300 hover:text-[#00ff87] transition-colors"
                            >
                                +91 8862887291
                            </a>
                        </div>

                        <div className="flex justify-center gap-8 flex-wrap">
                            {[
                                { name: 'GitHub', url: 'https://github.com/iamnitishsah' },
                                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/iamnitishsah/' },
                                { name: 'Portfolio', url: 'https://iamnitishsah.vercel.app/' },
                                { name: 'LeetCode', url: 'https://leetcode.com/u/iamnitishsah/' },
                                { name: 'CodeChef', url: 'https://www.codechef.com/users/nitishadow' },
                                { name: 'Codeforces', url: 'https://codeforces.com/profile/nitiSHadow' }
                            ].map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 border border-[#00ff87]/30 hover:border-[#00ff87] hover:bg-[#00ff87]/10 transition-all duration-300 uppercase tracking-wider text-sm"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 px-6 border-t border-[#00ff87]/10">
                    <div className="max-w-6xl mx-auto text-center">
                        <p className="text-gray-500">
                            © 2025 Nitish Kumar Sah. Built with React + Vite + Tailwind CSS
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                            Designed & Developed with 💚
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;