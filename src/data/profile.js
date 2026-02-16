import { generateInterviewLink } from '../utils/emailTemplates';

export const profile = {
    name: "Nitish Kumar Sah",
    headline: "Backend and Distributed Systems Engineer",
    subtitle: "B.Tech - NIT Rourkela",
    summary:
        "I build scalable APIs and data platforms with a focus on reliability, performance, and clean architecture.",
    availability: "Open to internships and entry-level roles",
    location: "India",
    speciality: [
        "Backend Development",
        "Distributed Systems",
        "API Development",
        "Database Design",
        "AI Integration",
    ],
    roles: [
        "Backend Engineer",
        "Software Engineer",
        "API Developer",
        "Platform Engineer",
        "Systems Engineer",
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
        leetcode: "https://leetcode.com/iamnitishsah",
        codechef: "https://www.codechef.com/users/iamnitishsah",
        codeforces: "https://codeforces.com/profile/nitiSHadow"
    },
};