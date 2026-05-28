import { generateInterviewLink } from "../utils/emailTemplates";

export const profile = {
    name: "Nitish Kumar Sah",

    headline:
        "Backend-focused Software Engineer building secure and scalable systems",

    subtitle:
        "FastAPI • Authentication • Async Workflows • Backend Architecture",

    summary:
        "I build backend systems focused on API correctness, authentication, workflow management, and async processing. My work primarily revolves around FastAPI, PostgreSQL, Redis, and backend architectures that handle real-world business logic, role-based workflows, and operational reliability.",

    availability: "Open to Software Engineer and Backend Engineer roles",

    location: "India",

    speciality: [
        "Backend Systems",
        "Authentication & Authorization",
        "Workflow-driven APIs",
        "Async Processing",
        "Backend Architecture",
    ],

    roles: [
        "Software Engineer",
        "Backend Engineer",
        "Backend Systems Engineer",
    ],

    resumePath: "/resume.pdf",

    ctas: {
        primary: {
            label: "View Projects",
            href: "#projects",
        },

        secondary: {
            label: "Schedule Interview",
            href: generateInterviewLink("iamnitishsah12@gmail.com"),
        },

        tertiary: {
            label: "Contact Me",
            href: "#contact",
        },
    },

    socials: {
        github: "https://github.com/iamnitishsah",
        linkedin: "https://linkedin.com/in/iamnitishsah",
        mail: "mailto:iamnitishsah12@gmail.com",

        leetcode: "https://leetcode.com/u/iamnitishsah/",
        codechef: "https://www.codechef.com/users/nitishadow",
        codeforces: "https://codeforces.com/profile/nitiSHadow",
    },
};