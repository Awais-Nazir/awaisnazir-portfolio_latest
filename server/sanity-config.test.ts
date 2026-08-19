import { describe, expect, it } from "vitest";

describe("Sanity portfolio configuration", () => {
  it("can query the configured dataset with a lightweight read-only request", async () => {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

    expect(projectId).toBeTruthy();
    expect(dataset).toBeTruthy();

    const url = new URL(`https://${projectId}.api.sanity.io/v2025-01-01/data/query/${dataset}`);
    url.searchParams.set("query", "*[_type in [\"project\", \"skill\", \"blogPost\"]][0...1]{_type}");

    const response = await fetch(url);
    expect(response.ok).toBe(true);
    const payload = await response.json() as { result?: unknown[] };
    expect(Array.isArray(payload.result)).toBe(true);
  }, 15_000);
});
