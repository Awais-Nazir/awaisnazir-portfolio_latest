export const experienceTimeline = [
  { id: "aicp", year: "2024", company: "AICP", role: "Remote Python Intern", period: "Aug 2024 — Sep 2024", summary: "Completed a remote Python internship focused on practical programming foundations.", tools: ["Python", "Remote internship"] },
  { id: "oradigitals", year: "2025", company: "OraDigitals", role: "Backend Developer Intern", period: "Jun 2025 — Aug 2025", summary: "Contributed to backend delivery work during a focused summer internship.", tools: ["Backend development", "APIs"] },
  { id: "endpoint", year: "2026", company: "Endpoint Clients", role: "Backend Developer", period: "Jul 2026 — Present", summary: "Building production backend systems with NestJS, PostgreSQL, WebSockets, SendGrid, AWS, and TypeORM.", tools: ["NestJS", "PostgreSQL", "WebSockets", "SendGrid", "AWS", "TypeORM"] },
] as const;

export const initialExperience = experienceTimeline[2];

export function shouldClosePreviewOnKey(key: string) {
  return key === "Escape";
}
