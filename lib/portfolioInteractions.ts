export const universityUrl = "https://www.uettaxila.edu.pk/";

export const experienceTimeline = [
  {
    id: "aicp",
    year: "2024",
    company: "AICP",
    companyUrl:
      "https://www.linkedin.com/company/aicommunitypakistan/posts/?feedView=all",
    role: "Remote Python Intern",
    period: "Aug 2024 — Sep 2024",
    summary:
      "Weekly Python assignments, from a tic-tac-toe game to exploratory data analysis exercises.",
    tools: ["Python", "Data Analysis"],
  },
  {
    id: "oradigitals",
    year: "2025",
    company: "OraDigitals",
    companyUrl:
      "https://www.linkedin.com/company/oradigitals/posts/?feedView=all",
    role: "Backend Developer Intern",
    period: "Jun 2025 — Aug 2025",
    summary:
      "Worked on OIMS, an internal system, building authentication, authorization, and database logic with Node.js and MySQL.",
    tools: ["Node.js", "Express", "MySQL", "Authentication"],
  },
  {
    id: "endpoint",
    year: "2026",
    company: "Endpoint Clients",
    companyUrl: "https://www.endpointclients.com/",
    role: "Backend Developer",
    period: "Jul 2026 — Present",
    summary:
      "Working on production backend systems: real-time notifications through WebSockets and SendGrid, file upload pipelines, and deployments on AWS.",
    tools: ["NestJS", "PostgreSQL", "WebSockets", "SendGrid", "AWS", "TypeORM"],
  },
] as const;

export const initialExperience = experienceTimeline[2];

export function shouldClosePreviewOnKey(key: string) {
  return key === "Escape";
}
