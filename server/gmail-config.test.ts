import { describe, expect, it } from "vitest";
import { verifyGmailSmtp } from "./gmail";

describe("Gmail contact delivery", () => {
  it("authenticates with Gmail SMTP using the configured server-side App Password", async () => {
    await expect(verifyGmailSmtp()).resolves.toBe(true);
  }, 20_000);
});
