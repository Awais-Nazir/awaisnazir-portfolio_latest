import { ArrowLeft, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { SiteFrame } from "@/components/portfolio/SiteFrame";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Awais Nazir. Reach out via WhatsApp, email, or send a message directly through the contact form.",
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.VITE_CONTACT_EMAIL;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_URL || process.env.VITE_WHATSAPP_URL;
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL || process.env.VITE_LINKEDIN_URL;
  const github = process.env.NEXT_PUBLIC_GITHUB_URL || process.env.VITE_GITHUB_URL;

  return (
    <SiteFrame>
      <main className="container py-8 sm:py-12">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm text-[#f0c276] transition hover:text-[#ffe0a5]"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div className="mt-7 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#f0c276]">Contact</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#f6f1e9] sm:text-5xl">
              Start the conversation.
            </h1>
          </div>
          <div className="mt-7 grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
            <aside className="surface-card p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#f0c276]">Direct channels</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#f6f1e9]">
                Let&apos;s connect directly.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#f6f1e9]/58">
                WhatsApp or email if you want a quick reply. Or check out my work and background through the links here.
              </p>
              <div className="mt-7 space-y-3">
                {whatsapp && (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-channel"
                  >
                    <span className="contact-channel-icon">
                      <MessageCircle size={17} />
                    </span>
                    <span>
                      <span className="contact-channel-label">WhatsApp</span>
                      <span className="contact-channel-value">Start a direct conversation</span>
                    </span>
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="contact-channel">
                    <span className="contact-channel-icon">
                      <Mail size={17} />
                    </span>
                    <span>
                      <span className="contact-channel-label">Email</span>
                      <span className="contact-channel-value">{email}</span>
                    </span>
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-channel"
                  >
                    <span className="contact-channel-icon">
                      <Linkedin size={17} />
                    </span>
                    <span>
                      <span className="contact-channel-label">LinkedIn</span>
                      <span className="contact-channel-value">Professional background</span>
                    </span>
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-channel"
                  >
                    <span className="contact-channel-icon">
                      <Github size={17} />
                    </span>
                    <span>
                      <span className="contact-channel-label">GitHub</span>
                      <span className="contact-channel-value">Code and project work</span>
                    </span>
                  </a>
                )}
              </div>
            </aside>
            <div className="surface-card p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#f0c276]">Send a message</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#f6f1e9]">
                Got something on your mind? Send a message.
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#f6f1e9]/58">
                Whatever you send here goes straight to my inbox.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </SiteFrame>
  );
}
