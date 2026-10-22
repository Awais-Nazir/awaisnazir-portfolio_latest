// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PublicLinksContext } from "@/contexts/PublicLinksContext";
import { SiteFrame } from "./SiteFrame";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
afterEach(cleanup);

describe("navigation", () => {
  it("keeps closed mobile links out of the document and returns focus on Escape", () => {
    render(
      <SiteFrame>
        <main>Content</main>
      </SiteFrame>
    );
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" })
    ).toBeNull();
    const toggle = screen.getByRole("button", { name: "Open navigation menu" });
    fireEvent.click(toggle);
    expect(
      screen.getByRole("navigation", { name: "Mobile navigation" })
    ).toBeTruthy();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(
      screen.queryByRole("navigation", { name: "Mobile navigation" })
    ).toBeNull();
    expect(document.activeElement).toBe(toggle);
  });
  it("uses the server-provided public destinations", () => {
    render(
      <PublicLinksContext.Provider
        value={{
          cv: "https://example.com/cv.pdf",
          whatsapp: "https://wa.me/123",
        }}
      >
        <SiteFrame>
          <main>Content</main>
        </SiteFrame>
      </PublicLinksContext.Provider>
    );
    expect(
      screen.getByRole("link", { name: "Résumé" }).getAttribute("href")
    ).toBe("https://example.com/cv.pdf");
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" })
    );
    expect(
      within(screen.getByRole("navigation", { name: "Mobile navigation" }))
        .getByRole("link", { name: /Talk on WhatsApp/ })
        .getAttribute("href")
    ).toBe("https://wa.me/123");
  });
  it("labels missing destinations honestly", () => {
    render(
      <SiteFrame>
        <main>Content</main>
      </SiteFrame>
    );
    expect(
      screen.getByRole("link", { name: "Request résumé" }).getAttribute("href")
    ).toBe("/contact");
    fireEvent.click(
      screen.getByRole("button", { name: "Open navigation menu" })
    );
    expect(screen.queryByRole("link", { name: /WhatsApp/ })).toBeNull();
  });
});
