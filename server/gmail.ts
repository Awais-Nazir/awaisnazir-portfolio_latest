import nodemailer from "nodemailer";

function envValue(name: string) {
  const value = process.env[name]?.trim();
  if (!value) return undefined;
  return value.replace(/^(["'])(.*)\1$/, "$2").trim();
}

type ContactMessage = { name: string; email: string; message: string };

function resendConfig() {
  const apiKey = envValue("RESEND_API_KEY");
  const recipient = envValue("CONTACT_RECIPIENT_EMAIL");
  const from = envValue("RESEND_FROM_EMAIL") || "Awais Nazir Portfolio <onboarding@resend.dev>";
  if (!apiKey || !recipient) return null;
  return { apiKey, recipient, from };
}

function gmailConfig() {
  const recipient = envValue("CONTACT_RECIPIENT_EMAIL");
  const appPassword = envValue("GMAIL_APP_PASSWORD")?.replace(/\s/g, "");
  const username = envValue("GMAIL_SMTP_USER") || recipient;

  if (!recipient || !appPassword || !username) {
    throw new Error("Gmail delivery is not configured. Set CONTACT_RECIPIENT_EMAIL and GMAIL_APP_PASSWORD.");
  }

  return { recipient, appPassword, username };
}

function createTransport() {
  const { username, appPassword } = gmailConfig();
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: username, pass: appPassword },
  });
}

export async function verifyGmailSmtp() {
  await createTransport().verify();
  return true;
}

async function sendWithResend(input: ContactMessage) {
  const config = resendConfig();
  if (!config) return false;
  const submittedAt = new Date().toISOString();
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.recipient],
      reply_to: input.email,
      subject: `Portfolio contact from ${input.name}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}\n\nSubmitted: ${submittedAt}`,
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    const error = new Error(`Resend request failed with HTTP ${response.status}`) as Error & { code?: string; responseCode?: number; command?: string; providerBody?: string };
    error.code = "RESEND_API_ERROR";
    error.responseCode = response.status;
    error.command = "HTTPS";
    error.providerBody = body.slice(0, 300);
    throw error;
  }
  return true;
}

export async function sendPortfolioContactEmail(input: ContactMessage) {
  if (await sendWithResend(input)) return;
  const { recipient, username } = gmailConfig();
  const submittedAt = new Date().toISOString();

  await createTransport().sendMail({
    from: `Awais Nazir Portfolio <${username}>`,
    to: recipient,
    replyTo: input.email,
    subject: `Portfolio contact from ${input.name}`,
    text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}\n\nSubmitted: ${submittedAt}`,
  });
}

export function describeGmailError(error: unknown) {
  if (!error || typeof error !== "object") return { name: "UnknownError" };
  const smtpError = error as { name?: string; code?: string; responseCode?: number; command?: string };
  return {
    name: smtpError.name || "Error",
    code: smtpError.code,
    responseCode: smtpError.responseCode,
    command: smtpError.command,
  };
}
