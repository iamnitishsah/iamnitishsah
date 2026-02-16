export const projects = [
    {
        id: 1,
        title: "CampusSentinel",
        description: "AI-powered campus surveillance system featuring real-time threat detection, multi-source event correlation, and intelligent agent orchestration. Built microservice architecture with 12+ indexed PostgreSQL tables and comprehensive REST API infrastructure.",
        tech: ["Django REST", "FastAPI", "PostgreSQL", "pgvector", "LangGraph", "JWT", "Redis"],
        github: "https://github.com/iamnitishsah/campussentinel",
        live: "#",
        image: "/projects/campus.png",
        achievement: "Runners-Up, IIT Guwahati"
    },
    {
        id: 2,
        title: "MediMind",
        description: "Comprehensive AI-powered medical assistant platform generating accurate diagnoses and prescriptions using advanced LLM pipelines. Features 15+ REST endpoints with JWT authentication, deployed on enterprise-grade infrastructure with Gunicorn and Uvicorn.",
        tech: ["Django REST", "FastAPI", "LangChain", "Google Gemini 2.5", "PostgreSQL", "Pydantic"],
        github: "https://github.com/iamnitishsah/medimind",
        live: "https://medimindai.vercel.app/",
        image: "/projects/medimind.png"
    },
    {
        id: 3,
        title: "MetaFin",
        description: "AI-powered investment platform with jargon-free UI featuring custom ML models for stock predictions, hybrid recommendation system, real-time sentiment analysis from Reddit and Yahoo Finance, candlestick charts, and personalized news curation with optimal buy/sell window predictions.",
        tech: ["Next.js", "Django", "PostgreSQL", "Machine Learning", "NLP", "TailwindCSS", "Yahoo Finance API", "Reddit API"],
        github: "https://github.com/iamnitishsah/MetaFin",
        live: "#",
        image: "/projects/metafin.png",
        achievement: "2nd Runners-Up, IIT-ISM"
    },
    {
        id: 4,
        title: "NITR-Mart",
        description: "Campus marketplace platform for NIT Rourkela with OTP-based email verification restricted to @nitrkl.ac.in domain. Features include product listings with Cloudinary image hosting, role-based profiles for students and faculty, WhatsApp seller integration, and secure JWT authentication with comprehensive CRUD operations.",
        tech: ["Next.js", "Django REST", "PostgreSQL", "JWT", "Cloudinary", "TypeScript", "TailwindCSS"],
        github: "https://github.com/iamnitishsah/NITR-Mart",
        live: "https://nitrmart.vercel.app"
    }
];