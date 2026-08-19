import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { describeGmailError, sendPortfolioContactEmail } from "../gmail";
import { publicProcedure, router } from "../_core/trpc";

const contactAttempts = new Map<string, { count: number; resetAt: number }>();
const CONTACT_WINDOW_MS = 15 * 60 * 1000;
const CONTACT_MAX_ATTEMPTS = 5;

export const contactInputSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(320, "Email is too long."),
  message: z.string().trim().min(10, "Please enter a message of at least 10 characters.").max(5000, "Message is too long."),
});

export const contactRouter = router({
  submit: publicProcedure.input(contactInputSchema).mutation(async ({ ctx, input }) => {
    const now = Date.now();
    const address = ctx.req.ip || ctx.req.socket.remoteAddress || "unknown";
    const current = contactAttempts.get(address);
    const attempt = current && current.resetAt > now ? current : { count: 0, resetAt: now + CONTACT_WINDOW_MS };
    if (attempt.count >= CONTACT_MAX_ATTEMPTS) {
      throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many messages from this address. Please try again later." });
    }
    contactAttempts.set(address, { count: attempt.count + 1, resetAt: attempt.resetAt });

    try {
      await sendPortfolioContactEmail(input);
    } catch (error) {
      console.error("[Contact] Gmail delivery failed", describeGmailError(error));
      throw new TRPCError({
        code: "SERVICE_UNAVAILABLE",
        message: "The message could not be delivered at the moment. Please try again shortly.",
      });
    }

    return { success: true } as const;
  }),
});
