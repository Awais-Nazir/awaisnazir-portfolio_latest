import nodemailer from "nodemailer";

function gmailConfig() {
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL?.trim();
  const appPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  const username = process.env.GMAIL_SMTP_USER?.trim() || recipient;

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
