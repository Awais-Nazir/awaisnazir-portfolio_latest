import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync(new URL("../index.css", import.meta.url), "utf8");
const siteFrame = readFileSync(new URL("../components/portfolio/SiteFrame.tsx", import.meta.url), "utf8");
const projectsPage = readFileSync(new URL("../pages/Projects.tsx", import.meta.url), "utf8");
const homePage = readFileSync(new URL("../pages/Home.tsx", import.meta.url), "utf8");

describe("mobile interaction styles", () => {
  it("enables offset smooth anchor scrolling by default", () => {
    expect(styles).toContain("scroll-behavior: smooth");
    expect(styles).toContain("scroll-padding-top: 6rem");
  });

  it("uses a continuous panel transition and disables nonessential motion when requested", () => {
    expect(styles).toContain(".about-panel-shell { display: grid; grid-template-areas: \"panel\"; }");
    expect(styles).toContain(".about-panel-layer { grid-area: panel; opacity: 0;");
    expect(styles).toContain(".about-panel-layer.is-active { opacity: 1;");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(styles).toContain(".about-panel-layer, .floating-whatsapp, .button-primary, .button-secondary, .whatsapp-cta, .nav-icon-button");
  });

  it("provides a slower circular, bottom-origin fill plus active states for portfolio actions", () => {
    expect(styles).toContain("bottom: -10%");
    expect(styles).toContain("translateY(115%) scale(.82)");
    expect(styles).toContain("transition: transform 760ms");
    expect(styles).toContain(".button-primary:hover::before, .button-secondary:hover::before, .whatsapp-cta:hover::before { transform: translateX(-50%) translateY(0) scale(1); }");
    expect(styles).toContain(".whatsapp-cta:hover { transform: translateY(-2px); border-color: #f0c276; color: #20180e; }");
    expect(styles).toContain(".button-primary:active, .button-secondary:active { transform: translateY(0) scale(.97); }");
    expect(styles).toContain("@media (min-width: 1024px) { .mobile-menu-trigger, .floating-whatsapp { display: none !important; } }");
    expect(styles).toContain("::-webkit-scrollbar-thumb { border: 3px solid #120f0c;");
    expect(styles).toContain(".floating-whatsapp { position: fixed !important; right: 1.25rem !important; bottom: 1.5rem !important; display: inline-flex !important;");
    expect(styles).toContain(".floating-whatsapp--above-project-dock { bottom: 6.25rem !important; }");
  });

  it("places mobile preview links after their respective homepage content", () => {
    expect(homePage).toContain('className="button-secondary mt-7 w-full sm:hidden">View all projects');
    expect(homePage).toContain('className="button-secondary mt-7 w-full sm:hidden">See all skills');
    expect(homePage).toContain('className="mt-7 inline-flex w-full items-center justify-center gap-2');
  });

  it("hides only the desktop navbar menu trigger while retaining the Projects clear-filter control", () => {
    expect(siteFrame).toContain('className="nav-icon-button mobile-menu-trigger lg:hidden"');
    expect(projectsPage).toContain('grid-cols-[minmax(0,1fr)_minmax(180px,.38fr)_auto] items-end');
    expect(projectsPage).toContain('className="nav-icon-button"');
    expect(styles).not.toContain("@media (min-width: 1024px) { .nav-icon-button, .floating-whatsapp");
  });
});
