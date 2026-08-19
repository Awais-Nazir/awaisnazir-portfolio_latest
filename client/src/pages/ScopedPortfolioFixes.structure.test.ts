import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const siteFrame = readFileSync(new URL("../components/portfolio/SiteFrame.tsx", import.meta.url), "utf8");
const projects = readFileSync(new URL("./Projects.tsx", import.meta.url), "utf8");
const blog = readFileSync(new URL("./Blog.tsx", import.meta.url), "utf8");
const detail = readFileSync(new URL("./ProjectDetail.tsx", import.meta.url), "utf8");

describe("scoped portfolio fixes", () => {
  it("keeps mobile WhatsApp available outside Contact and routes navbar links to dedicated pages", () => {
    expect(siteFrame).toContain('useLocation');
    expect(siteFrame).toContain('location !== "/contact"');
    expect(siteFrame).toContain('data-testid="floating-whatsapp"');
    expect(siteFrame).toContain('createPortal(floatingWhatsAppAction, document.body)');
    expect(siteFrame).toContain('href={pageFor(item)}');
    expect(siteFrame).not.toContain('/#${item.toLowerCase()}');
  });

  it("maintains a single desktop Projects filter row and the editorial Blog presentation", () => {
    expect(projects).toContain('grid-cols-[minmax(0,1fr)_minmax(180px,.38fr)_auto] items-end');
    expect(blog).toContain('bg-[#e8dfd1] text-[#21170f]');
    expect(blog).toContain('lg:grid-cols-[1.2fr_.8fr]');
    expect(blog).toContain('Field notes');
  });

  it("centers project context and keeps desktop/mobile action paths available", () => {
    expect(detail).toContain('sm:grid-cols-[minmax(160px,1fr)_minmax(0,3.5fr)_minmax(160px,1fr)]');
    expect(detail).toContain('className="text-center sm:col-start-2"');
    expect(detail).toContain('sticky top-28');
    expect(detail).toContain('self-start lg:block');
    expect(detail).toContain('createPortal(mobileActionDock, document.body)');
    expect(detail).toContain('data-testid="mobile-project-actions"');
    expect(detail).toContain('fixed inset-x-0 bottom-0 z-[90]');
    expect(detail).toContain('project.video?.url');
    expect(detail).toContain('navigator.share');
    expect(detail).toContain('navigator.clipboard.writeText');
    expect(detail).toContain('lg:hidden');
  });
});
