// @vitest-environment jsdom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
describe("contact feedback", () => {
  it("explains invalid fields without making a request", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    for (const name of ["Name", "Email", "Message"]) {
      const field = screen.getByLabelText(name);
      expect(field.getAttribute("aria-invalid")).toBe("true");
      expect(
        document.getElementById(field.getAttribute("aria-describedby")!)
      ).toBeTruthy();
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("preserves the message when delivery fails and allows a retry", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue({
          ok: false,
          json: async () => ({ error: "Please try again shortly." }),
        })
    );
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test Person" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "An engineering opportunity." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await waitFor(() =>
      expect(screen.getByRole("alert").textContent).toContain(
        "Please try again shortly."
      )
    );
    expect(
      (screen.getByLabelText("Message") as HTMLTextAreaElement).value
    ).toBe("An engineering opportunity.");
    expect(
      (
        screen.getByRole("button", {
          name: "Send Message",
        }) as HTMLButtonElement
      ).disabled
    ).toBe(false);
  });
});
