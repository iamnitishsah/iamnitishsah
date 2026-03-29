export const projects = [
    {
        id: 1,
        title: "CampusSentinel",
        description:
            "AI campus surveillance platform built around a microservice backend for multi-source event correlation. Designed relational PostgreSQL models, exposed secure REST APIs through Django REST Framework and FastAPI, and integrated ML model inference behind validated backend endpoints.",
        tech: ["Django REST Framework", "FastAPI", "Pydantic", "JWT", "PostgreSQL", "Redis"],
        github: "https://github.com/iamnitishsah/CampusSentinel",
        demo: "https://www.youtube.com/watch?v=egYNxHbyYaM",
        achievement: "Runners-Up, Ethos 2025, IIT Guwahati",
    },
    {
        id: 2,
        title: "MediMind",
        description:
            "AI-powered medical assistant backend with JWT-secured REST APIs, normalized relational models, and FastAPI-based LLM integration that returns schema-validated prescription outputs.",
        tech: ["Django REST Framework", "FastAPI", "Pydantic", "PostgreSQL", "LangChain"],
        github: "https://github.com/iamnitishsah/MediMind",
        live: "https://medimindai.vercel.app/",
    },
    {
        id: 3,
        title: "MetaFin",
        description:
            "AI-powered investment platform with custom ML models for stock predictions, hybrid recommendation logic, real-time sentiment analysis from Reddit and Yahoo Finance, candlestick charts, and personalized news curation with buy/sell window predictions.",
        tech: ["Next.js", "Django REST", "PostgreSQL", "Machine Learning", "TailwindCSS", "Yahoo Finance API", "Reddit API"],
        github: "https://github.com/iamnitishsah/MetaFin",
        live: "#",
        achievement: "2nd Runners-Up, IIT-ISM",
    },
    {
        id: 4,
        title: "NITR-Mart",
        description:
            "Campus marketplace platform for NIT Rourkela with OTP-based email verification restricted to @nitrkl.ac.in domain. Features include product listings with Cloudinary image hosting, role-based profiles, WhatsApp seller integration, and secure JWT authentication with full CRUD workflows.",
        tech: ["Next.js", "Django REST", "PostgreSQL", "JWT", "Cloudinary", "TypeScript", "TailwindCSS"],
        github: "https://github.com/iamnitishsah/NITR-Mart",
        live: "https://nitrmart.vercel.app",
    },
];