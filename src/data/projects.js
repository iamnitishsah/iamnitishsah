export const featuredProjects = [
    {
        id: 1,

        title: "NorthStar",

        category: "Backend Systems",

        status: "Flagship",

        description:
            "Goal management and performance tracking platform built around workflow-driven backend architecture. Designed systems for KPI synchronization, approval workflows, role-aware state transitions, and audit-tracked updates across Employee, Manager, and Admin hierarchies.",

        problem:
            "A workflow-heavy performance management system needed backend orchestration across approvals, hierarchy-aware updates, KPI synchronization, and audit-tracked state changes.",

        architecture: [
            "Microservice-oriented backend structure",

            "JWT authentication with RBAC",

            "Async notifications using Redis and Celery",

            "Workflow-driven state management",

            "Hierarchy traversal and analytics computation",
        ],

        capabilities: [
            "Approval workflows",
            "Role-aware state transitions",
            "KPI synchronization",
            "Hierarchy traversal",
        ],

        systems: [
            "Workflow Engine",
            "JWT + RBAC",
            "Redis Workers",
            "Async Notifications",
            "Audit Tracking",
        ],

        challenges: [
            "Coordinating state transitions across Employee, Manager, and Admin hierarchies",
            "Keeping KPI synchronization consistent across workflow-driven updates",
            "Supporting async notifications without blocking core business flows",
        ],

        tech: [
            "FastAPI",
            "MongoDB",
            "Redis",
            "Celery",
            "React",
            "TypeScript",
        ],

        github: {
            frontend:
                "https://github.com/iamnitishsah/NorthStar-Frontend",

            backend:
                "https://github.com/iamnitishsah/NorthStar-Backend",
        },

        live: "https://onenorthstar.vercel.app/",

        highlights: [
            "35+ backend APIs",
            "Role-based workflows",
            "KPI synchronization engine",
            "Async task processing",
        ],

        links: [
            {
                label: "Backend",
                href: "https://github.com/iamnitishsah/NorthStar-Backend",
                kind: "github",
            },

            {
                label: "Frontend",
                href: "https://github.com/iamnitishsah/NorthStar-Frontend",
                kind: "github",
            },

            {
                label: "Live",
                href: "https://onenorthstar.vercel.app/",
                kind: "live",
            },
        ],
    },

    {
        id: 2,

        title: "CampusSentinel",

        category: "AI-integrated Backend System",

        status: "Featured",

        description:
            "AI campus surveillance backend designed to correlate multi-source campus events through structured relational models and secure APIs. Focused on backend modeling, event correlation, and ML service integration.",

        problem:
            "A campus surveillance platform required structured backend modeling to correlate events, manage relational entities, and integrate ML inference through secure APIs.",

        architecture: [
            "Hybrid DRF + FastAPI backend",

            "Relational PostgreSQL schema design",

            "JWT-secured APIs",

            "ML inference integration",

            "Timestamp-driven event correlation",
        ],

        capabilities: [
            "Relational data modeling",
            "Event correlation",
            "Hybrid service boundaries",
            "ML API integration",
        ],

        systems: [
            "Indexed Tables",
            "JWT APIs",
            "FastAPI + DRF",
            "Redis Cache",
            "Inference Layer",
        ],

        challenges: [
            "Modeling multi-source campus events with relational consistency",
            "Correlating timestamp-driven security data across multiple entities",
            "Balancing DRF and FastAPI responsibilities in a hybrid backend",
        ],

        tech: [
            "Django REST Framework",
            "FastAPI",
            "PostgreSQL",
            "Redis",
            "Pydantic",
        ],

        github: "https://github.com/iamnitishsah/CampusSentinel",

        demo: "https://www.youtube.com/watch?v=egYNxHbyYaM",

        achievement: "Runners-Up, Ethos 2025 — IIT Guwahati",

        highlights: [
            "12+ indexed tables",
            "Complex relational modeling",
            "Hybrid backend architecture",
        ],

        links: [
            {
                label: "GitHub",
                href: "https://github.com/iamnitishsah/CampusSentinel",
                kind: "github",
            },

            {
                label: "Demo",
                href: "https://www.youtube.com/watch?v=egYNxHbyYaM",
                kind: "demo",
            },
        ],
    },

    {
        id: 3,

        title: "MediMind",

        category: "AI-assisted Backend Application",

        status: "Featured",

        description:
            "Medical assistant backend integrating LLM-driven prescription generation with schema-validated API responses, secure authentication, and structured relational data handling.",

        problem:
            "A medical assistant workflow needed guarded AI integration, structured backend validation, and secure API handling for sensitive health-oriented interactions.",

        architecture: [
            "DRF + FastAPI integration",

            "Structured API validation",

            "JWT authentication",

            "LLM-backed response generation",
        ],

        capabilities: [
            "Schema-validated AI responses",
            "Authentication-aware APIs",
            "Structured backend orchestration",
            "Relational data handling",
        ],

        systems: [
            "Structured Validation",
            "JWT Auth",
            "LLM Integration",
            "Relational Models",
            "API Contracts",
        ],

        challenges: [
            "Constraining AI-generated outputs through structured response validation",
            "Combining DRF and FastAPI roles without weakening API clarity",
            "Maintaining authentication and relational consistency around AI-backed flows",
        ],

        tech: [
            "Django REST Framework",
            "FastAPI",
            "PostgreSQL",
            "LangChain",
            "Pydantic",
        ],

        github: "https://github.com/iamnitishsah/MediMind",

        live: "https://medimindai.vercel.app/",

        links: [
            {
                label: "GitHub",
                href: "https://github.com/iamnitishsah/MediMind",
                kind: "github",
            },

            {
                label: "Live",
                href: "https://medimindai.vercel.app/",
                kind: "live",
            },
        ],
    },
];

export const secondaryProjects = [
    {
        id: 4,

        title: "NITR-Mart",

        category: "Workflow-backed Marketplace Backend",

        status: "Supporting Build",

        description:
            "Campus marketplace platform with JWT authentication, email verification restricted to institute domains, image hosting workflows, and role-aware listing management.",

        problem:
            "A campus-only marketplace required trusted user verification, role-aware listing workflows, and authenticated CRUD handling tied to institute-restricted onboarding.",

        systems: [
            "JWT Auth",
            "Institute Verification",
            "CRUD Workflows",
        ],

        tech: [
            "Next.js",
            "Django REST Framework",
            "PostgreSQL",
            "JWT",
            "Cloudinary",
        ],

        github: "https://github.com/iamnitishsah/NITR-Mart",

        live: "https://nitrmart.vercel.app",

        links: [
            {
                label: "GitHub",
                href: "https://github.com/iamnitishsah/NITR-Mart",
                kind: "github",
            },

            {
                label: "Live",
                href: "https://nitrmart.vercel.app",
                kind: "live",
            },
        ],
    },

    {
        id: 5,

        title: "MetaFin",

        category: "ML-assisted Financial Backend",

        status: "Supporting Build",

        description:
            "Investment platform integrating ML-based stock analysis, sentiment aggregation, recommendation logic, and financial data visualization.",

        problem:
            "A financial analysis workflow needed backend orchestration for recommendation logic, sentiment-aware processing, and structured market data handling.",

        systems: [
            "Recommendation Logic",
            "ML Analysis",
            "Financial Data",
        ],

        tech: [
            "Next.js",
            "Django REST Framework",
            "PostgreSQL",
            "Machine Learning",
        ],

        github: "https://github.com/iamnitishsah/MetaFin",

        links: [
            {
                label: "GitHub",
                href: "https://github.com/iamnitishsah/MetaFin",
                kind: "github",
            },
        ],
    },
];
