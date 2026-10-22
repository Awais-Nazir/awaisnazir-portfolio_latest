export function displayTechnology(name: string): string {
  const names: Record<string, string> = {
    fastapi: "FastAPI",
    nestjs: "NestJS",
    postgressql: "PostgreSQL",
    posgtresql: "PostgreSQL",
    postgresql: "PostgreSQL",
  };
  return names[name.toLowerCase()] || name;
}

export function portableTextPreview(value?: unknown[]): string {
  return (value ?? [])
    .flatMap(block => {
      if (
        !block ||
        typeof block !== "object" ||
        !("children" in block) ||
        !Array.isArray(block.children)
      )
        return [];
      return [
        block.children
          .map((child: unknown) =>
            child &&
            typeof child === "object" &&
            "text" in child &&
            typeof child.text === "string"
              ? child.text
              : ""
          )
          .join(""),
      ];
    })
    .filter(Boolean)
    .join(" · ");
}

export function skillDescription(name: string, original?: string): string | undefined {
  const descriptions: Record<string, string> = {
    Python: "Backend services, AI integrations, and data analysis projects.",
    FastAPI: "Document intelligence and conversational AI backends.",
    Docker: "Container workflows developed through coursework and hands-on projects.",
    PostgreSQL: "Relational data storage used across multiple projects.",
    NestJS: "Production backend services at Endpoint Clients.",
  };
  return descriptions[displayTechnology(name)] || original;
}
