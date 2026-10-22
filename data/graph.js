// The hero graph. Root = you; hubs = areas; leaves = tools & projects.
// Edge weight w is what Dijkstra uses (BFS/DFS ignore it).
// Add / remove nodes freely — layout is force-directed, nothing is hand-placed.

export const graphNodes = [
  { id: "me", label: "nitish", type: "root" },

  { id: "backend", label: "backend", type: "hub" },
  { id: "algo", label: "algorithms", type: "hub" },
  { id: "work", label: "shipped", type: "hub" },
  { id: "ml", label: "ml / genai", type: "hub" },
  { id: "infra", label: "infra", type: "hub" },

  { id: "fastapi", label: "fastapi" },
  { id: "django", label: "django-rest" },
  { id: "pydantic", label: "pydantic" },
  { id: "celery", label: "celery" },
  { id: "redis", label: "redis" },
  { id: "mongo", label: "mongodb" },
  { id: "mysql", label: "mysql" },
  { id: "auth", label: "jwt · rbac" },

  { id: "cpp", label: "c++" },
  { id: "cf", label: "codeforces" },
  { id: "cc", label: "codechef" },
  { id: "lc", label: "leetcode" },

  { id: "saptang", label: "saptang labs", type: "project" },
  { id: "northstar", label: "northstar", type: "project" },
  { id: "sentinel", label: "campussentinel", type: "project" },
  { id: "foodops", label: "foodops.ai", type: "project" },

  { id: "langgraph", label: "langgraph" },
  { id: "langchain", label: "langchain" },
  { id: "lightgbm", label: "lightgbm" },
  { id: "pytorch", label: "pytorch" },

  { id: "docker", label: "docker" },
  { id: "gha", label: "gh actions" },
  { id: "aws", label: "aws ec2" },
];

// [from, to, weight]
export const graphEdges = [
  ["me", "backend", 2],
  ["me", "algo", 3],
  ["me", "work", 2],
  ["me", "ml", 5],
  ["me", "infra", 4],

  ["backend", "fastapi", 1],
  ["backend", "django", 3],
  ["backend", "pydantic", 2],
  ["backend", "celery", 3],
  ["backend", "redis", 2],
  ["backend", "auth", 2],
  ["backend", "mongo", 3],
  ["backend", "mysql", 4],

  ["algo", "cpp", 1],
  ["algo", "lc", 2],
  ["cpp", "cf", 1],
  ["cpp", "cc", 2],

  ["work", "saptang", 1],
  ["work", "northstar", 2],
  ["work", "sentinel", 2],
  ["work", "foodops", 3],

  ["ml", "langgraph", 2],
  ["ml", "langchain", 2],
  ["ml", "lightgbm", 2],
  ["ml", "pytorch", 3],

  ["infra", "docker", 1],
  ["infra", "gha", 2],
  ["infra", "aws", 2],

  // cross edges — where tools were actually used
  ["saptang", "fastapi", 2],
  ["saptang", "celery", 2],
  ["saptang", "redis", 1],
  ["saptang", "auth", 1],
  ["northstar", "mongo", 2],
  ["northstar", "celery", 3],
  ["northstar", "docker", 2],
  ["northstar", "gha", 2],
  ["northstar", "aws", 3],
  ["sentinel", "django", 1],
  ["sentinel", "langgraph", 2],
  ["sentinel", "mysql", 2],
  ["foodops", "lightgbm", 1],
  ["foodops", "pytorch", 2],
  ["langgraph", "langchain", 1],
  ["celery", "redis", 1],
];
