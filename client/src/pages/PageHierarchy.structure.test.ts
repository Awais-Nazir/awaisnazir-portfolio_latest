import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const pages = ["Projects", "Skills", "Blog", "Contact"] as const;
const sources = Object.fromEntries(pages.map((name) => [name, readFileSync(new URL(`./${name}.tsx`, import.meta.url), "utf8")]));

describe("dedicated page hierarchy", () => {
  it("uses the compact page offset and begins each listing/contact route with primary content", () => {
    for (const name of ["Projects", "Skills", "Contact"] as const) expect(sources[name]).toContain('main className="container py-8 sm:py-12"');
    expect(sources.Blog).toContain('main className="bg-[#e8dfd1] text-[#21170f]"');
    expect(sources.Blog).toContain('className="container py-8 sm:py-12"');
    expect(sources.Projects).toContain('SectionHeading eyebrow="Projects" title="Work built for real constraints." />');
    expect(sources.Skills).toContain('SectionHeading eyebrow="Skills" title="Technical foundations, grouped by practice." />');
    expect(sources.Blog).toContain('Field notes');
    expect(sources.Blog).toContain('lg:grid-cols-[1.2fr_.8fr]');
    expect(sources.Contact).not.toContain("SectionHeading");
  });
});
