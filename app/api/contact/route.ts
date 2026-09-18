import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { describeGmailError, sendPortfolioContactEmail } from "@/lib/email";

const contactAttempts = new Map<string, { count: number; resetAt: number }>();
const CONTACT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_MAX_ATTEMPTS = 5;

export const contactInputSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(320, "Email is too long."),
  message: z.string().trim().min(10, "Please enter a message of at least 10 characters.").max(5000, "Message is too long."),
});

export async function POST(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

  const now = Date.now();
  const current = contactAttempts.get(ip);
  const attempt = current && current.resetAt > now ? current : { count: 0, resetAt: now + CONTACT_WINDOW_MS };

  if (attempt.count >= CONTACT_MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Too many messages from this address. Please try again later." },
      { status: 429 }
    );
  }
  contactAttempts.set(ip, { count: attempt.count + 1, resetAt: attempt.resetAt });

  try {
    const body = await req.json();
    const parsed = contactInputSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    await sendPortfolioContactEmail(parsed.data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API] Email delivery failed:", describeGmailError(error));
    return NextResponse.json(
      { error: "The message could not be delivered at the moment. Please try again shortly." },
      { status: 503 }
    );
  }
}
