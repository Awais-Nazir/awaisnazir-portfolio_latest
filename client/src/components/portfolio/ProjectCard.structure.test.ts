import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./PortfolioUI.tsx", import.meta.url), "utf8");

describe("ProjectCard interaction zones", () => {
  it("keeps image preview, detail navigation, and external live-demo actions distinct", () => {
    expect(source).toContain('aria-label={project.coverImageUrl ? `Preview ${project.title} project image` : undefined}');
    expect(source).toContain('onClick={() => project.coverImageUrl && setImageOpen(true)}');
    expect(source).toContain('top-[56.25%]');
    expect(source).toContain('pointer-events-none relative z-10 flex flex-1 flex-col');
    expect(source).toContain('pointer-events-auto relative z-10 inline-flex items-center gap-1 text-xs');
    expect(source).toContain('Live demo <ArrowUpRight size={13} />');
  });
});
