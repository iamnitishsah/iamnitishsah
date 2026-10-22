// ─────────────────────────────────────────────────────────────
// Everything you'll want to edit lives in this file.
// Live stats (GitHub / LeetCode / Codeforces / CodeChef) are fetched
// in lib/stats — you don't type those numbers anywhere.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Nitish Kumar Sah",
  first: "Nitish",
  last: "Kumar Sah",
  role: "Backend engineer",
  tagline:
    "I build secure APIs, async pipelines and the caches in between. And I like graphs.",
  meta: ["B.Tech, NIT Rourkela ’27", "SWE intern @ Saptang Labs"],
  status: "Open to SDE & backend roles",
  email: "iamnitishsah30@gmail.com",
  resume: "/resume.pdf",
  photo: "/nitish.jpg",
  site: "https://iamnitishsah.vercel.app",
  handles: {
    github: "iamnitishsah",
    leetcode: "iamnitishsah",
    codeforces: "nitiSHadow",
    codechef: "nitishadow",
  },
  links: {
    github: "https://github.com/iamnitishsah",
    linkedin: "https://www.linkedin.com/in/iamnitishsah/",
    leetcode: "https://leetcode.com/u/iamnitishsah/",
    codeforces: "https://codeforces.com/profile/nitiSHadow",
    codechef: "https://www.codechef.com/users/nitishadow",
  },
};

export const experience = {
  company: "Saptang Labs",
  domain: "Computer & Network Security",
  role: "Software Engineer Intern",
  period: "Dec 2025 – Apr 2026",
  where: "Remote · Chennai",
  certificate:
    "https://drive.google.com/file/d/1oetV1C-gmDS9wfi63tGqQiE_9Hp1fYAk/view?usp=drive_link",
  metrics: [
    { value: "50+", label: "secure REST APIs" },
    { value: "99%+", label: "OTP delivery" },
    { value: "30–40%", label: "lower latency" },
  ],
  points: [
    "FastAPI services with auth, RBAC, input validation and audit logging",
    "Email-OTP MFA on a Redis → Celery pipeline with 3-attempt exponential retry",
    "Indexing and Redis caching on the heaviest query paths",
  ],
  stack: ["FastAPI", "MongoDB", "Redis", "Celery", "JWT", "Docker"],
};

// `viz` picks the animation drawn beside each project:
//   "statemachine" | "unionfind" | "gridpath"
export const projects = [
  {
    id: "northstar",
    title: "NorthStar",
    year: "2026",
    viz: "statemachine",
    algo: "finite-state machine",
    blurb:
      "Goal-setting and performance portal where every goal moves through a role-gated approval lifecycle.",
    metrics: [
      { value: "25+", label: "REST APIs" },
      { value: "5", label: "lifecycle states" },
      { value: "5", label: "containers" },
    ],
    points: [
      "JWT + RBAC for Employee / Manager / Admin, audit log on every goal action",
      "100%-weightage and 8-goal validation, auto-scored check-ins across 4 UoM types",
      "GitHub Actions blocks deploys on failing pytest, ships to AWS EC2 on push",
    ],
    stack: ["FastAPI", "MongoDB", "Redis", "Celery", "Docker", "GitHub Actions", "AWS EC2"],
    links: [
      { label: "Live", href: "https://onenorthstar.vercel.app/" },
      { label: "Backend", href: "https://github.com/iamnitishsah/NorthStar-Backend" },
      { label: "Frontend", href: "https://github.com/iamnitishsah/NorthStar-Frontend" },
    ],
  },
  {
    id: "campussentinel",
    title: "CampusSentinel",
    year: "2025",
    viz: "unionfind",
    algo: "union–find entity resolution",
    badge: "Runner-up · Ethos 2025, IIT Guwahati",
    blurb:
      "AI campus-security backend that stitches WiFi, CCTV, card-swipe and library logs into one timeline per person.",
    metrics: [
      { value: "200", label: "req/s load-tested" },
      { value: "100ms", label: "p95 latency" },
      { value: "10k+", label: "events / day" },
    ],
    points: [
      "Django REST + FastAPI microservices behind JWT auth",
      "Indexed event store correlating multi-source logs across 6000+ entities",
      "Agentic /chat endpoint (LangGraph + Gemini) for timelines and alert triage",
    ],
    stack: ["Django REST", "FastAPI", "MySQL", "LangGraph", "LangChain", "Gemini"],
    links: [
      { label: "GitHub", href: "https://github.com/iamnitishsah/CampusSentinel" },
      { label: "Demo", href: "https://www.youtube.com/watch?v=egYNxHbyYaM" },
    ],
  },
  {
    id: "foodops",
    title: "FoodOps.AI",
    year: "2026",
    viz: "gridpath",
    algo: "shortest path → ETA",
    blurb:
      "Food-delivery ML platform: weekly demand forecasting and delivery-time prediction, both deployed.",
    metrics: [
      { value: "9.97", label: "min ETA error (MAE)" },
      { value: "88.2%", label: "P90 coverage" },
      { value: "28.6%", label: "demand WAPE" },
    ],
    points: [
      "LightGBM with quantile loss for calibrated ETA ranges, not just point guesses",
      "Baseline → linear → LSTM → GBDT progression, benchmarked per module",
    ],
    stack: ["Python", "LightGBM", "PyTorch", "scikit-learn", "Streamlit"],
    links: [
      { label: "ETA app", href: "https://foodops-delivery.streamlit.app/" },
      { label: "Demand app", href: "https://foodops-demand.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/iamnitishsah/FoodOps.AI" },
    ],
  },
];

// Adjacency list: key → neighbours. `in` = where it was used (project ids / "saptang").
export const stack = [
  {
    key: "lang",
    items: [
      { name: "Python", in: ["saptang", "northstar", "campussentinel", "foodops"] },
      { name: "C++", in: ["cp"] },
      { name: "SQL", in: ["campussentinel"] },
    ],
  },
  {
    key: "backend",
    items: [
      { name: "FastAPI", in: ["saptang", "northstar", "campussentinel"] },
      { name: "Django REST", in: ["campussentinel"] },
      { name: "Pydantic", in: ["saptang", "northstar"] },
      { name: "asyncio", in: ["saptang"] },
      { name: "Celery", in: ["saptang", "northstar"] },
      { name: "JWT · RBAC", in: ["saptang", "northstar", "campussentinel"] },
    ],
  },
  {
    key: "data",
    items: [
      { name: "MongoDB", in: ["saptang", "northstar"] },
      { name: "MySQL", in: ["campussentinel"] },
      { name: "Redis", in: ["saptang", "northstar"] },
    ],
  },
  {
    key: "infra",
    items: [
      { name: "Docker", in: ["saptang", "northstar"] },
      { name: "GitHub Actions", in: ["northstar"] },
      { name: "AWS EC2 · RDS", in: ["northstar"] },
      { name: "pytest", in: ["northstar"] },
    ],
  },
  {
    key: "ai",
    items: [
      { name: "LangGraph", in: ["campussentinel"] },
      { name: "LangChain", in: ["campussentinel"] },
      { name: "LightGBM", in: ["foodops"] },
      { name: "PyTorch", in: ["foodops"] },
    ],
  },
  {
    key: "web",
    items: [
      { name: "React", in: ["northstar"] },
      { name: "Next.js", in: [] },
    ],
  },
];

export const achievements = [
  {
    title: "Runner-up",
    event: "Ethos 2025",
    where: "IIT Guwahati",
    note: "national hackathon · team lead",
    href: "https://drive.google.com/drive/folders/18v1dUkxh1Sssssg4KZjA8nYXXXTiTihl?usp=sharing",
  },
  {
    title: "2nd Runner-up",
    event: "Hackfest’25",
    where: "IIT (ISM) Dhanbad",
    note: "tech-fest hackathon",
    href: "https://drive.google.com/drive/folders/18v1dUkxh1Sssssg4KZjA8nYXXXTiTihl?usp=sharing",
  },
  { live: "codeforces" },
  { live: "codechef" },
  {
    title: "Advanced Learning Algorithms",
    event: "DeepLearning.AI",
    where: "Coursera",
    note: "certification",
    href: "https://www.coursera.org/account/accomplishments/verify/JC23T9W6LH1V",
  },
];

// Projects featured above — hidden from the auto-pulled "more on GitHub" strip.
export const hiddenRepos = [
  "iamnitishsah",
  "NorthStar-Backend",
  "NorthStar-Frontend",
  "CampusSentinel",
  "FoodOps.AI",
];
