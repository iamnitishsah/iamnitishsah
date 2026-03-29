import { generateInterviewLink } from '../utils/emailTemplates';

export const profile = {
    name: "Nitish Kumar Sah",
    headline: "Backend Engineer focused on building secure and reliable systems",
    subtitle: "B.Tech, NIT Rourkela",
    summary:
        "I design backend systems where security, performance, and simplicity are not trade-offs but design constraints. My work revolves around APIs, authentication, async workflows, and building systems that behave correctly under real-world pressure.",
    availability: "Open to internships and entry-level roles",
    location: "India",
    speciality: [
        "Backend Development",
        "REST API Security",
        "System Design",
        "Database Design",
        "AI Integration",
    ],
    roles: [
        "Software Engineer",
        "Backend Engineer",
        "API Engineer",
        "Platform Engineer",
    ],
    resumePath: "/resume.pdf",
    ctas: {
        primary: { label: "View Projects", href: "#projects" },
        secondary: {
            label: "Schedule Interview",
            href: generateInterviewLink("iamnitishsah12@gmail.com"),
        },
        tertiary: { label: "Contact Me", href: "#contact" },
    },
    socials: {
        github: "https://github.com/iamnitishsah",
        linkedin: "https://linkedin.com/in/iamnitishsah",
        mail: "mailto:iamnitishsah12@gmail.com",
        leetcode: "https://leetcode.com/u/iamnitishsah/",
        codechef: "https://www.codechef.com/users/nitishadow",
        codeforces: "https://codeforces.com/profile/nitiSHadow"
    },
};