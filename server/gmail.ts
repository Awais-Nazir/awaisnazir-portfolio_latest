import nodemailer from "nodemailer";

function envValue(name: string) {
  const value = process.env[name]?.trim();
  if (!value) return undefined;
  return value.replace(/^(["'])(.*)\1$/, "$2").trim();
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

export async function sendPortfolioContactEmail(input: { name: string; email: string; message: string }) {
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
