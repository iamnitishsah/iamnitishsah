export const experiences = [
    {
        id: 1,

        role: "Software Engineer Intern",

        company: "Saptang Labs — Computer & Network Security",

        duration: "Dec 2025 - Apr 2026 · Remote",

        systems: [
            "JWT Auth",
            "RBAC",
            "MFA",
            "Redis Queue",
            "Audit Logging",
        ],

        metrics: [
            {
                value: "50+",
                label: "Secure API endpoints",
            },

            {
                value: "30-40%",
                label: "Response time improvement",
            },

            {
                value: "4",
                label: "Core backend domains",
            },
        ],

        tech: [
            "FastAPI",
            "MongoDB",
            "Redis",
            "Celery",
            "JWT",
            "RBAC",
            "Docker",
        ],

        description: [
            "Developed 50+ secure REST API endpoints using FastAPI for authentication, user management, RBAC, validation, and activity tracking workflows.",

            "Designed and implemented a multi-factor authentication system using Email OTP and TOTP-based verification flows.",

            "Built an asynchronous email processing pipeline using Redis queues and worker-based execution to support retries and non-blocking API behavior.",

            "Implemented audit logging for critical actions to improve traceability and operational visibility across backend workflows.",

            "Optimized high-volume APIs using query improvements and pagination strategies, reducing average response times by 30–40%.",
        ],

        highlights: [
            "Authentication & Authorization",
            "Async Backend Workflows",
            "Audit-aware Systems",
            "API Security",
        ],

        domains: [
            {
                title: "Authentication Systems",

                summary:
                    "Built secure identity and access control flows for real production API usage.",

                items: [
                    "JWT-based authentication for secure session handling",
                    "Role-based access control across protected backend workflows",
                    "Email OTP and TOTP-based multi-factor authentication flows",
                ],
            },

            {
                title: "Async Processing",

                summary:
                    "Designed worker-backed flows to keep request handling non-blocking and retry-safe.",

                items: [
                    "Redis queue-backed email processing pipeline",
                    "Worker execution with retry-aware async handling",
                    "Non-blocking API behavior for operational workflows",
                ],
            },

            {
                title: "API Engineering",

                summary:
                    "Implemented backend interfaces with validation, performance tuning, and workflow awareness.",

                items: [
                    "50+ REST API endpoints for auth, user management, and activity tracking",
                    "Validation-heavy request handling for security-sensitive endpoints",
                    "Query optimization and pagination to improve high-volume API response times",
                ],
            },

            {
                title: "Operational Reliability",

                summary:
                    "Improved backend traceability and correctness around critical system behavior.",

                items: [
                    "Audit logging for critical actions across backend workflows",
                    "Traceability improvements for production-facing operational events",
                    "Workflow-aware backend behavior aligned with security and correctness requirements",
                ],
            },
        ],

        linkedinPost:
            "https://www.linkedin.com/posts/iamnitishsah_im-happy-to-share-that-im-starting-a-new-activity-7404507039772663808-TBc0?utm_source=share&utm_medium=member_desktop&rcm=ACoAADuppNkBllSy2t_ARL0tsMi9lkDWVTJnKpE",
    },
];
