import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = process.cwd();
const routerEntryPath = resolve(projectRoot, "server/routers.ts");
const portfolioRouterPath = resolve(projectRoot, "server/routers/portfolio.ts");

describe("portfolio router source bundle", () => {
  it("includes the portfolio router module imported by the main server router", () => {
    expect(existsSync(portfolioRouterPath)).toBe(true);
    expect(readFileSync(routerEntryPath, "utf8")).toContain('from "./routers/portfolio"');
    expect(readFileSync(portfolioRouterPath, "utf8")).toContain("export const portfolioRouter");
  });
});
