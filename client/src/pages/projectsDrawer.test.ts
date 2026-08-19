import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./Projects.tsx", import.meta.url), "utf8");

describe("Projects mobile filter drawer", () => {
  it("uses controlled open state and exposes a compact mobile trigger", () => {
    expect(source).toContain('const [filtersOpen, setFiltersOpen] = useState(false);');
    expect(source).toContain('<Drawer open={filtersOpen} onOpenChange={setFiltersOpen}>');
    expect(source).toContain('onClick={() => setFiltersOpen(true)}');
    expect(source).toContain('Filter projects');
  });

  it("allows visitors to close the drawer after adjusting project filters", () => {
    expect(source).toContain('onClick={() => setFiltersOpen(false)}');
    expect(source).toContain('Show {visibleProjects.length} project');
  });
});
